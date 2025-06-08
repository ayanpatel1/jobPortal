import React from 'react';

const InterviewCard = ({ interview }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-blue-700">{interview.role}</h3>
      <p className="text-sm text-gray-500">Date: {interview.date}</p>
      <p className="mt-2 font-medium text-green-700">Score: {interview.score}</p>
      <p className="text-sm text-gray-700 mt-1">Feedback: {interview.feedback}</p>
    </div>
  );
};

export default InterviewCard;
