import { useState, useEffect, useRef, useCallback } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanSpokenText);
    utteranceRef.current = utterance;

    // Pick natural English voice if available
    const preferredVoice = voices.find(v =>
      (v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Daniel")))
    ) || voices.find(v => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, voices]);

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
