import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./auth/controller";
import todosRouter from "./todos";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/auth", authRouter);
app.use("/todos", todosRouter);

export default app;
