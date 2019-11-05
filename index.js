const express = require('express');

const app = express();

app.get('/api', (req, res) =>
  res.send({ apiHome: 'Welcome to the API route' })
);

// make express behave correctly in production environment
if (process.env.NODE_ENV === 'production') {
  // serve static files from the React app
  app.use(express.static('client/build'));

  // tell express to serve up 'index.html' if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening @ ${PORT}`));
