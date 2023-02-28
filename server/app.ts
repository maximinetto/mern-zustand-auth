import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import { StatsD } from "node-statsd";
import responseTime from "response-time";
import authRoute from "./routes/auth.routes";

export const measureRequestDuration = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log("%s : %fms", req.path, elapsedTimeInMs);
  });

  next();
};

const app = express();
const stats = new StatsD();

app.use(express.json());
stats.socket.on("error", function (error) {
  console.error(error.stack);
});

app.use(
  responseTime(function (req: Request, res: Response, time) {
    const stat = `${req.method}${req.url}`
      .toLowerCase()
      .replace(/[:.]/g, "")
      .replace(/\//g, "_");
    stats.timing(stat, time);
  })
);

app.use(measureRequestDuration);

app.use(cors());
app.use(authRoute);

export default app;
