require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Or "gpt-4" if enabled
      messages: [{ role: "user", content: userMessage }]
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.json({ reply: "AI server error: " + err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("AI server running on " + port));
