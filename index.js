const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Making Email model available. Don't need to assign to anything.
require('./models/Email');

// MONGOOSE CONFIG
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database Connected'));

// APP CONFIG
const app = express();

// to parse form data
app.use(bodyParser.json());

// ROUTING
// test
app.get('/api', (req, res) =>
  res.send({ apiHome: 'Welcome to the API route' })
);

// bring in emailRoutes and pass in 'app'
require('./routes/emailRoutes')(app);

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
