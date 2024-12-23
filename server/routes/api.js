const express = require('express');
const axios = require('axios');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

const vocabulary = ["apple", "banana", "grape", "orange", "mango", "learning", "adventure", "success"];

// Huawei Cloud TTS Endpoint
const ttsUrl = 'https://nls-hc.huaweicloud.com/v1.0/tts';
const config = { accessKey: 'your_access_key_here' }; // Replace with your credentials

router.get('/get-word', (req, res) => {
    const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    res.json({ word: randomWord });
});

router.post('/text-to-speech', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post(
            ttsUrl,
            { text, voice: 'xiaoyan', volume: 1.0, speed: 1.0, pitch: 1.0, format: 'mp3' },
            { headers: { 'Authorization': `Bearer ${config.accessKey}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer' }
        );
        res.set({ 'Content-Type': 'audio/mp3' });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "TTS Failed" });
    }
});

router.post('/get-predictions', async (req, res) => {
    const pythonProcess = spawn('python', [
        path.join(__dirname, '../public/ML/ml.ipynb'),
        JSON.stringify(req.body),
    ]);
    
    pythonProcess.stdout.on('data', (data) => {
        try {
            res.json(JSON.parse(data.toString()));
        } catch (error) {
            res.status(500).json({ error: 'Error parsing model output'});
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('Error running Python script');
    });
});

module.exports = router;
