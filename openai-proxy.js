const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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';

app.post('/api/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 256
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`OpenAI proxy running on port ${PORT}`));