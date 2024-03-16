const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/daten', (req, res) => {
  console.log(req.body);
  res.json({ nachricht: 'Daten erfolgreich empfangen!' });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});