import app from "../src/app";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

app.get("/", (_req, res) => {
  return res.send("Express Typescript on Vercel");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
