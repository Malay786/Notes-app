import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"
dotenv.config();
import cors from 'cors'

import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';


const app = express();

// const frontendUrl = 'notes-app-git-main-dewarimalay-gmailcoms-projects.vercel.app'
app.use(cors({
    origin: "https://notes-app-git-main-dewarimalay-gmailcoms-projects.vercel.app",  // Vercel frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true   // Allow cookies (if needed)
}));

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes)



connectDB();
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port ", process.env.PORT || 5000)
})