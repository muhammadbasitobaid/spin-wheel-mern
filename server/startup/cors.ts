import cors from "cors";
import { Express } from "express";

export function initCORS(app: Express) {
  app.use(
    cors({
      origin: [process.env.HOST ?? "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      credentials: true, // enable set cookie
    })
  );
}
