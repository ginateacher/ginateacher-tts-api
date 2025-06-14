const textToSpeech = require('@google-cloud/text-to-speech');

const raw = process.env.GOOGLE_TTS_KEY_JSON.replace(/\\n/g, '\n'); // 修正 private_key 的換行
const key = JSON.parse(raw);

const client = new textToSpeech.TextToSpeechClient({ credentials: key });

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const word = req.query.word;
  if (!word) {
    res.status(400).send('Missing word');
    return;
  }

  const request = {
    input: { text: word },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('TTS Error:', err);
    res.status(500).send('TTS Failed');
  }
};
