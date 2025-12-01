import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/generate-content", async (req, res) => {
  const { prompt, type } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Generate a ${type} based on this prompt: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.send({
      output: response.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
