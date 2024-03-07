import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/index";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

// app.use(router);

// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   return res.status(500).json({ message: err.message });
// });

const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => res.status(200).json({ message: "aaaa" }));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
