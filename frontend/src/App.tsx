import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { CandidateCard } from "./components/CandidateCard";
import { AssessmentChips } from "./components/AssessmentChips";
import { TerminalHeader } from "./components/TerminalHeader";
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

  // Load Health & Initial Welcome on Mount
  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((e) => console.warn("Backend not yet connected:", e));

    const welcomeMsg: ChatMessage = {
      id: "msg_welcome",
      role: "assistant",
      content:
        "Hello! I am Pavan Dasam's automated Voice Twin built for the 100x AI Agent Team interview. You can test me using the 1-click prompts on the left, click the microphone below to ask any questions in your own voice, or type in the box.",
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
        content: `Error: ${err.message || "Failed to reach AI Twin service."}`,
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

  const handleResetConversation = () => {
    stop();
    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        role: "assistant",
        content:
          "Hello! I am Pavan Dasam's automated Voice Twin built for the 100x AI Agent Team interview. You can test me using the 1-click prompts on the left, click the microphone below to ask any questions in your own voice, or type in the box.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        hasRetrievedEvidence: true
      }
    ]);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "var(--bg-deep)"
    }}>
      {/* Top Header with Resume Download, GitHub, and LinkedIn links */}
      <Header
        health={health}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Main Split-Pane Container (Reference Image 3) */}
      <main style={{
        flex: 1,
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "24px",
        height: "calc(100vh - 72px)",
        boxSizing: "border-box"
      }}>
        {/* Left Column: Candidate Info & Collapsible 100x Prompts */}
        <aside style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          paddingRight: "4px"
        }}>
          <CandidateCard />
          <AssessmentChips
            onSelectQuestion={handleSendMessage}
            disabled={isLoading}
          />
        </aside>

        {/* Right Column: Terminal Header, Chat Feed & Input */}
        <section className="glass-card" style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          height: "100%"
        }}>
          <TerminalHeader
            isListening={isListening}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            onInterrupt={stop}
            onReset={handleResetConversation}
          />

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
        </section>
      </main>

      {/* Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDocsChanged={() => fetchHealth().then(setHealth)}
      />
    </div>
  );
};

export default App;
