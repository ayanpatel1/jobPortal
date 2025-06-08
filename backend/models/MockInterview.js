import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true },
      answerText: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MockInterview = mongoose.model("MockInterview", mockInterviewSchema);
export default MockInterview;