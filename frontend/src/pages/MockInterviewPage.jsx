import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InterviewQuestion from '@/components/InterviewQuestion';
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Navbar from '@/components/shared/Navbar';

const MockInterviewPage = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [startInterview, setStartInterview] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [rating, setRating] = useState(0);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleStart = async () => {
    if (!topic) return alert('Please enter a topic');

    // 🔧 Resetting all states to avoid interference from previous interview session
    setAnswers([]);
    setQuestions([]);
    setCurrentIndex(0);
    setInterviewComplete(false);
    setCancelled(false);
    setRating(0);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: topic, difficulty })
      });
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setStartInterview(true);
      } else {
        alert('Failed to generate questions');
      }
    } catch (err) {
      console.error(err);
      alert('Error generating questions');
    } finally {
      setLoading(false);
    }
  };

  const handleRecordAnswer = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  useEffect(() => {
    if (!listening && transcript) {
      setAnswers((prev) => [...prev, { question: questions[currentIndex], answerText: transcript }]);
      nextQuestion();
    }
  }, [listening]);

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setInterviewComplete(true);
      generateReport();
    }
  };

  const handleSkip = () => {
    setAnswers((prev) => [...prev, { question: questions[currentIndex], answerText: 'Skipped' }]);
    nextQuestion();
  };

  const handleCancel = () => {
    setCancelled(true);
    generateReport(true);
  };

  const generateReport = async (wasCancelled = false) => {
    const validAnswers = answers.filter(a => a.answerText && a.answerText !== 'Skipped').length;
    const score = Math.round((validAnswers / (answers.length || 1)) * 100);
    setRating(score);
    setInterviewComplete(true);
    setCancelled(wasCancelled);
    await saveResults();
  };

  const saveResults = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/interview/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: "123456", questions: answers })
      });
      const data = await res.json();
      if (!data.success) alert("Failed to save interview");
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-white">
        <div className="max-w-4xl mx-auto p-8 rounded-2xl shadow-lg bg-white">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">AI Mock Interview</h1>
  
          {/* ✨ New Introduction Section */}
          {!startInterview && (
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-2xl font-bold text-indigo-600">Prepare Smarter with MyMock AI</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Welcome to <strong>MyMock Interview</strong> — your personal AI-powered interview simulator!
                Practice answering real-world technical questions, sharpen your communication skills,
                and get feedback instantly. Whether you're preparing for a tech job, coding round, or improving your confidence, 
                this platform helps you ace your next interview.
              </p>
              <p className="text-gray-500 text-md max-w-2xl mx-auto">
                Simply enter your technology or topic, select your preferred difficulty level, and let’s get started 🚀.
              </p>
            </div>
          )}
  
          {/* ✨ Main Section */}
          {!startInterview ? (
            <div className="space-y-6">
              <Input
                placeholder="Enter technology or topic (e.g. React, Java, Python)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="p-3 rounded-lg border"
              />
              <div>
                <label className="block mb-2 text-lg font-semibold">Select Difficulty Level:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleStart}
                  disabled={loading}
                  className="w-48 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : '🚀 Start Interview'}
                </Button>
              </div>
            </div>
          ) : interviewComplete ? (
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold">{cancelled ? 'Interview Cancelled' : 'Interview Completed'}</h2>
              <p className="text-lg">Your Score: <strong>{rating}/100</strong></p>
              <p className="text-lg">{rating >= 70 ? '🌟 Great performance!' : '⚡ Needs improvement'}</p>
              <div className="mt-6 space-y-3">
                {answers.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <strong>Q:</strong> {item.question}<br />
                    <strong>A:</strong> {item.answerText}
                  </div>
                ))}
              </div>
              <Button to="/interview-dashboard"  className="mt-6">
                Back to Home
              </Button>
              
            </div>
          ) : (
            <div className="space-y-8">
              <Webcam
                audio={false}
                height={200}
                screenshotFormat="image/jpeg"
                width={300}
                className="rounded-2xl shadow-md mx-auto"
              />
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <p className="text-2xl font-semibold mb-4 text-center">Q{currentIndex + 1}: {questions[currentIndex]}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button onClick={handleRecordAnswer}>
                    {listening ? '🎤 Recording...' : 'Answer with Mic'}
                  </Button>
                  <Button onClick={handleSkip} variant="outline">
                    Skip Question
                  </Button>
                  <Button onClick={handleCancel} className="bg-red-500 text-white hover:bg-red-600">
                    Cancel Interview
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
  


};

export default MockInterviewPage;
