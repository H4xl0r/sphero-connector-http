const express = require('express');
const colorConvert = require('color-convert');
const bodyParser = require('body-parser');

const getRandomColorValue = () => Math.floor(Math.random() * Math.floor(255));

const startServer = (connector, port) => {
  const app = express();

  app.use(bodyParser.json());

  app.post('/wake', (req, res) => {
    console.log(`[sphero-http-connector] /wake`);
    connector.wake();
    res.sendStatus(200);
  });

  app.post('/sleep', (req, res) => {
    console.log(`[sphero-http-connector] /sleep`);
    connector.sleep();
    res.sendStatus(200);
  });

  app.post('/main-led-color/random', (req, res) => {
    console.log(`[sphero-http-connector] /main-led-color/random`);
    const red = getRandomColorValue();
    const green = getRandomColorValue();
    const blue = getRandomColorValue();
    const hexColor = colorConvert.rgb.hex(red, green, blue);

    connector.setMainLedColor(hexColor);
    res.sendStatus(200);
  });

  app.post('/main-led-color/hex', (req, res) => {
    console.log(`[sphero-http-connector] /main-led-color/hex (${req.body.color})`);
    connector.setMainLedColor(req.body.color);
    res.sendStatus(200);
  });

  app.listen(port);
  console.log(`[sphero-http-connector] running on port ${port}`);
};

module.exports = {
  startServer
};