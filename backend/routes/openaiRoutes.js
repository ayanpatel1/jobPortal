import express from "express";
import { generateInterviewQuestions } from "../controllers/openaiController.js";

const router = express.Router();

router.post("/generate", generateInterviewQuestions);

export default router;
