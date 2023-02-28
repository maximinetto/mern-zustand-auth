import cors from "cors";
import express from "express";
import authRoute from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(authRoute);

export default app;
