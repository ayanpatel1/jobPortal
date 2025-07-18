import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; 
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
//interveiw routes
import interviewRoute from "./routes/mockInterviewRoutes.js"; 
import openaiRoute from "./routes/openaiRoutes.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// updated code
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5175'], // Allow both origins
    credentials: true,
};


app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;





//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/interview", interviewRoute);
app.use("/api/v1/ai", openaiRoute);


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
    connectDB(); // Connect to DB when the server starts
    console.log(`Server is running on port ${PORT}`);
});
