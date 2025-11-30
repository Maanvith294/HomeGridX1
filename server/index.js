import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await result.json();

    if (!result.ok) {
      return res.status(500).json({ error: data.error?.message });
    }

    res.json({ text: data.candidates[0].content.parts[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server crashed" });
  }
});

app.listen(5000, () => console.log("API running on port 5000"));
