import { useEffect, useState, useRef } from "react";

export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    recognition.current = new SpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.lang = "en-US";

    recognition.current.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    recognition.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  }, []);

  const startListening = () => {
    setTranscript("");
    recognition.current?.start();
    setListening(true);
  };

  const stopListening = () => {
    recognition.current?.stop();
    setListening(false);
  };

  return { transcript, listening, startListening, stopListening };
};
