import express from "express";
import { config } from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnection from "./DB/dbconfig.js";
import { Server } from "socket.io";
import http from "http";


config();
const PORT = process.env.PORT || 8080;
export const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST']
    }
});

import { socketEvents } from "./uitls/sockerEvents.js";
socketEvents(io);




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));
app.use(cookieParser());
app.use(morgan("dev"));

import authRoutes from "./routes/auth.routes.js";
import cardsRoutes from "./routes/card.routes.js";
import userRouter from "./routes/user.routes.js";
import partidaRouter from "./routes/partida.routes.js";

app.use("/api", authRoutes);
app.use("/api", cardsRoutes);
app.use("/api", userRouter);
app.use("/api", partidaRouter);

server.listen(PORT, () => console.log(`Server running on http://localhost:${server.address().port}`));
dbConnection();
