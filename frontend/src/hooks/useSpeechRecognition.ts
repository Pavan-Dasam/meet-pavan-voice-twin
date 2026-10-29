import { useState, useEffect, useRef, useCallback } from "react";

// Web Speech API interface declarations
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export function useSpeechRecognition(onFinalTranscript?: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const isSupported = typeof window !== "undefined" &&
    Boolean((window as IWindow).SpeechRecognition || (window as IWindow).webkitSpeechRecognition);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRec = (window as IWindow).SpeechRecognition || (window as IWindow).webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const current = final || interim;
      setTranscript(current);

      if (final && onFinalTranscript) {
        onFinalTranscript(final.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        setError("No speech detected. Please try again.");
      } else if (event.error === "not-allowed") {
        setError("Microphone permission denied. Please allow microphone access.");
      } else {
        setError(`Speech error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isSupported, onFinalTranscript]);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser. Please use keyboard input.");
      return;
    }
    try {
      recognitionRef.current?.start();
    } catch (e: any) {
      console.warn("Could not start recognition:", e);
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
}
