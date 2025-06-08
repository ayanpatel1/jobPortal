import React from "react";

const InterviewStart = ({ onStart }) => {
  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <button
        onClick={onStart}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Start Interview
      </button>
    </div>
  );
};

export default InterviewStart;
