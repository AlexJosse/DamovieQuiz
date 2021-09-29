const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const { handleError } = require('./utils/errors');

const routes = require('./routes');

const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization, Content-Length, X-Requested-With, timezone');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/api', routes);

app.use((err, _req, res, next) => {
  console.log(err);
  handleError(err, res, next);
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on production http://localhost:${port} ...`);
});
