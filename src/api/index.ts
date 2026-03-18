import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { router } from "./router/router.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

config();

app.use(cors({ origin: process.env.FRONTEND_URL, optionsSuccessStatus: 200 }));
app.use("/api", router);

app.listen(process.env.BACKEND_PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err.message);
  }
});
