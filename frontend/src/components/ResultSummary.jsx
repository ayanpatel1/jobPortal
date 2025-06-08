import React from "react";

const ResultSummary = ({ questions, answers }) => {
  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Interview Summary</h2>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index}>
            <p className="font-semibold">{question}</p>
            <p>{answers[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultSummary;
