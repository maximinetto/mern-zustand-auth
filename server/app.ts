import cors from "cors";
import express from "express";
import authRoute from "./routes/auth.routes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(authRoute);

export default app;
