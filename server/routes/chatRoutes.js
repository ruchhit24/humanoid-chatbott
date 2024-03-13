const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
const dotenv= require("dotenv");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
   
  const { userPrompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": userPrompt  
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    
    const content = response.choices[0].message.content;
    console.log("Content from OpenAI API:", content);
    res.send(content);
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    res.status(500).send(error);
  }
});

module.exports = router;