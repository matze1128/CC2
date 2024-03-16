const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const cors = require('cors');
const { promisify } = require('util');

const app = express();
app.use(cors());
const redisClient = redis.createClient({ 
    url: 'redis://10.136.17.195:6379' // Anpassen
});
redisClient.connect().catch(console.error);

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  const cacheKey = `translation:${text}:${targetLang}`;

  try {
    // Versuchen, die Übersetzung aus dem Cache abzurufen
    let translation = await getAsync(cacheKey);

    if (translation) {
      console.log('Cache Hit');
      res.json({ translation, source: 'cache' });
    } else {
      console.log('Cache Miss');
      // Wenn keine Übersetzung im Cache vorhanden ist, DeepL API anfragen
      const params = new URLSearchParams({
        auth_key: "9cd821ba-a2e0-4c0f-8db2-61e3c383d374:fx",
        text: text,
        target_lang: targetLang
      });

      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: 'POST',
        body: params,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      if (response.ok) {
        const data = await response.json();
        translation = data.translations[0].text;

        // Speichern der neuen Übersetzung im Cache für zukünftige Anfragen
        await setAsync(cacheKey, translation, 'EX', 3600); // 1 Stunde Ablauf
        res.json({ translation, source: 'DeepL' });
      } else {
        res.status(response.status).json({ error: 'Fehler beim Anfordern der Übersetzung' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
