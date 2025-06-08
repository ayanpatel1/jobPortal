
import React from 'react';
import { Button } from '@/components/ui/button';

const InterviewQuestion = ({
  question,
  onNextQuestion,
  onSkip,
  onCancel,
  startListening,
  stopListening,
  listening,
  timer
}) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold">{question}</h2>
      <p>Time left: {timer} seconds</p>

      <div className="space-x-2">
        <Button onClick={startListening} disabled={listening}>
          {listening ? 'Listening...' : 'Start Mic'}
        </Button>

        {listening && (
          <Button onClick={stopListening} className="bg-red-500">
            Stop Mic
          </Button>
        )}
      </div>

      <div className="space-x-2 mt-4">
        <Button onClick={onNextQuestion} disabled={listening}>
          {listening ? 'Waiting for Answer...' : 'Next Question'}
        </Button>

        <Button onClick={onSkip} variant="outline">
          Skip Question
        </Button>

        <Button onClick={onCancel} className="bg-gray-500">
          Cancel Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewQuestion;
