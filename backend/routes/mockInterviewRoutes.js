import express from "express";
import { generateInterviewQuestions } from "../controllers/openaiController.js";

import { saveInterview, getUserInterviews } from "../controllers/mockInterviewController.js";

const router = express.Router();

router.post("/ai/generate", generateInterviewQuestions);
router.post("/interview/save", saveInterview);
router.get("/interview/user/:id", getUserInterviews);

export default router;
