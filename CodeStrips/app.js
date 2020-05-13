const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');
const app = express();
module.exports = app;

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/strips', (req, res, next) => {
  db.all('SELECT * FROM Strip', (err, rows) => {
    if(err)
    {
      res.status(500).send();
    }
    else 
    {
      res.send({strips: rows});
    }
  });
});

app.post('/strips',(req, res, next) => {
  const new_strip = req.body.strip;
  if(new_strip.head && new_strip.body && new_strip.background && new_strip.bubbleType)
  {
    db.run('INSERT INTO Stripe (head, body, background, bubbleType, bubbleText, caption) VALUES ($head, $body, $background, $bubbleType, $bubbleText, $caption)',{
    $head: new_strip.head, 
    $body: new_strip.body, 
    $background: new_strip.background, 
    $bubbleType: new_strip.bubbleType, 
    $bubbleText: new_strip.bubbleText, 
    $caption: new_strip.caption
}, function(err) {
      if(err)
      {
        return res.status(500).send();
      }
});
    res.send(new_strip);
  }
  else 
  {
      res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
