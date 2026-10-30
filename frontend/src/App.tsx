import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { VoiceVisualizer } from "./components/VoiceVisualizer";
import { AssessmentChips } from "./components/AssessmentChips";
import { ChatInterface } from "./components/ChatInterface";
import { InputBar } from "./components/InputBar";
import { AdminModal } from "./components/AdminModal";
import type { ChatMessage, HealthStatus } from "./types";
import { fetchHealth, sendChatMessage } from "./services/api";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

export const App: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  // Speech Synthesis Hook
  const {
    isSpeaking,
    isPaused,
    speak,
    pause,
    resume,
    stop
  } = useSpeechSynthesis();

  // Handle auto-submit from speech recognition
  const handleFinalSpeechTranscript = useCallback((finalText: string) => {
    if (finalText.trim() && !isLoading) {
      handleSendMessage(finalText.trim());
    }
  }, [isLoading]);

  // Speech Recognition Hook
  const {
    isSupported: isSpeechSupported,
    isListening,
    transcript,
    error: speechError,
    startListening,
    stopListening
  } = useSpeechRecognition(handleFinalSpeechTranscript);

  // Barge-in: if user starts speaking via mic, immediately silence any current playback
  useEffect(() => {
    if (isListening && isSpeaking) {
      stop();
    }
  }, [isListening, isSpeaking, stop]);

  // Load Health on Mount
  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((e) => console.warn("Backend not yet connected:", e));

    // Initial Welcome Message
    const welcomeMsg: ChatMessage = {
      id: "msg_welcome",
      role: "assistant",
      content:
        "Hello! I am Pavan Dasam's official AI Voice Twin. I'm an AI Engineer with over 3.5 years of experience in Generative AI, LangGraph multi-agent systems, and production RAG architectures across Financial and Health Insurance. Feel free to speak or type any question, or select one of the interview assessment topics below!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      hasRetrievedEvidence: true
    };
    setMessages([welcomeMsg]);
  }, []);

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    // Stop ongoing speech when user asks a new question
    stop();

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history for RAG service (last 6 turns)
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await sendChatMessage(queryText, historyPayload);

      const assistantMsgId = `ai_${Date.now()}`;
      const assistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: response.sources,
        hasRetrievedEvidence: response.has_retrieved_evidence
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Speak answer if not muted
      if (!isMuted) {
        setActiveSpeechId(assistantMsgId);
        speak(response.answer, () => {
          setActiveSpeechId(null);
        });
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: "assistant",
        content: `Error: ${err.message || "Failed to reach Pavan's AI Twin service. Please check your backend connection."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        hasRetrievedEvidence: false
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySpeech = (msg: ChatMessage) => {
    setActiveSpeechId(msg.id);
    speak(msg.content, () => {
      setActiveSpeechId(null);
    });
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      stop();
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      maxHeight: "100vh",
      background: "var(--bg-deep)"
    }}>
      {/* Top Navigation */}
      <Header
        health={health}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Center Interactive Area */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        maxWidth: "960px",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden"
      }}>
        {/* Voice Animation Visualizer */}
        <VoiceVisualizer
          isListening={isListening}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
        />

        {/* 1-Click Assessment Questions Pills */}
        <AssessmentChips
          onSelectQuestion={handleSendMessage}
          disabled={isLoading}
        />

        {/* Chat Feed */}
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          activeSpeechId={activeSpeechId}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          onPlaySpeech={handlePlaySpeech}
          onPauseSpeech={pause}
          onResumeSpeech={resume}
          onStopSpeech={stop}
        />

        {/* Bottom Input Controls (Voice & Text) */}
        <InputBar
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isListening={isListening}
          transcript={transcript}
          isSpeechSupported={isSpeechSupported}
          onStartListening={startListening}
          onStopListening={stopListening}
          speechError={speechError}
        />
      </main>

      {/* Protected Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDocsChanged={() => fetchHealth().then(setHealth)}
      />
    </div>
  );
};

export default App;
