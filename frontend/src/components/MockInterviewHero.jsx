import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const MockInterviewHero = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleStartInterview = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/interview-dashboard");
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-10 rounded-2xl shadow-2xl my-14 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    🎤 Ready for an <span className="text-yellow-300">AI-Powered Mock Interview</span>?
                </h2>
                <p className="mb-6 text-lg text-white/90">
                    Sharpen your interview skills with instant feedback from our AI mock interviews.
                </p>
                <Button
                    onClick={handleStartInterview}
                    className="bg-yellow-300 text-indigo-800 hover:bg-yellow-400 px-8 py-3 text-lg rounded-full font-semibold shadow-lg transition-all"
                >
                    🚀 Start Interview
                </Button>
            </div>
            <img
                src="/Chatbot.svg"
                alt="AI Mock Interview"
                className="w-full md:max-w-sm"
            />
        </div>
    );
};

export default MockInterviewHero;
