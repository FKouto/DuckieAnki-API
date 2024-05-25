const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

router.post("/chat", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });
  const chat = model.startChat({
    history: req.body.history,
  });
  const msg = req.body.message;

  const result = await chat.sendMessage(msg);
  const response = result.response;
  const text = response.text();
  res.send(text);
});
module.exports = router;
