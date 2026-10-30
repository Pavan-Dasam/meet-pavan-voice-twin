import { useState, useEffect, useRef, useCallback } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const queueRef = useRef<string[]>([]);
  const isPlayingQueueRef = useRef(false);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    queueRef.current = [];
    isPlayingQueueRef.current = false;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSupported]);

  const pause = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported]);

  const playNextSentence = useCallback((onEnd?: () => void) => {
    if (!isSupported) return;

    if (queueRef.current.length === 0) {
      isPlayingQueueRef.current = false;
      setIsSpeaking(false);
      setIsPaused(false);
      if (onEnd) onEnd();
      return;
    }

    const sentence = queueRef.current.shift()!;
    const utterance = new SpeechSynthesisUtterance(sentence);
    activeUtteranceRef.current = utterance;

    const preferredVoice = voices.find(v =>
      (v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Daniel") || v.name.includes("Jenny")))
    ) || voices.find(v => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      // Stream directly into next sentence in queue
      playNextSentence(onEnd);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis chunk error:", e);
      playNextSentence(onEnd);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, voices]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!isSupported || !text) return;

    // Clean text of markdown characters before speaking
    const cleanSpokenText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/#+\s/g, "")
      .replace(/[-*•]\s+/g, "")
      .trim();

    // Cancel any ongoing audio (Barge-in / interruption)
    stop();

    // Split text into conversational sentences for instant playback
    const sentences = cleanSpokenText
      .split(/(?<=[.?!])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sentences.length === 0) return;

    queueRef.current = sentences;
    isPlayingQueueRef.current = true;
    setIsSpeaking(true);
    playNextSentence(onEnd);
  }, [isSupported, stop, playNextSentence]);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    speak,
    pause,
    resume,
    stop
  };
}
