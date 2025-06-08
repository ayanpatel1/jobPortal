import MockInterview from "../models/MockInterview.js";

export const saveInterview = async (req, res) => {
  try {
    const { userId, questions } = req.body;
    const interview = new MockInterview({ userId, questions });
    await interview.save();
    res.status(200).json({ success: true, message: "Interview saved!", data: interview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserInterviews = async (req, res) => {
  try {
    const interviews = await MockInterview.find({ userId: req.params.id });
    res.status(200).json(interviews);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

