import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MockInterviewHero = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleStartInterview = () => {
        if (!user) {
            navigate("/login"); // Redirect if not logged in
        } else {
            navigate("/interview-dashboard"); // Go to interview section
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-lg my-10 mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-4">🎤 Ready for an AI-Powered Mock Interview?</h2>
            <p className="mb-6 text-lg">
                Practice your interview skills with our smart mock interview feature that gives you real-time feedback.
            </p>
            <Button
                onClick={handleStartInterview}
                className="bg-yellow-300 text-blue-800 hover:bg-yellow-400 px-6 py-2 text-lg rounded-full transition-all"
            >
                Start Interview
            </Button>
        </div>
    );
};

export default MockInterviewHero;
