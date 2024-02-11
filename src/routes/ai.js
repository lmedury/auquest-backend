const express = require('express');
const { setupMongoDb } = require('../config/mongo_sb_setup');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

router.post('/ask', async (req, res) => {
    console.log(req.body.prompt)
    try {
        const messages = [
            { role: 'system', content: 'You are a friendly assistant' },
            { role: 'user', content: req.body.prompt }
        ];
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/ai/run/${process.env.LLAMA_MODEL}`,
            { messages },
            {
                headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;