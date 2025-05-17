const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// TODO: Replace with your Hugging Face API key
const HF_API_KEY = 'YOUR_HF_API_KEY';

app.post('/suggest-actions', async (req, res) => {
  const { goal } = req.body;
  const prompt = `Suggest 5 daily or weekly actions to achieve: ${goal}. Format as a checklist.`;
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf',
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy running on port 3001')); 