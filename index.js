const express = require('express');

const app = express();

app.get('/', (req, res) => res.send({ hello: 'World!' }));

app.get('/api', (req, res) =>
  res.send({ apiHome: 'Welcome to the API route' })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening @ ${PORT}`));
