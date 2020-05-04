//STARTING A SERVER
// Import the express library here
const express = require('express');
// Instantiate the app here
const app = express();

const PORT = process.env.PORT || 4001;

// Invoke the app's `.listen()` method below:
app.listen(PORT, () =>{
  console.log(`Server is listening on port ${PORT}`)
});

//WRITING A ROUTE
app.use(express.static('public'));

app.get('/expressions', (req, res, next) => {
  console.log(req);
});

//SENDING RESPONSE
app.get('/expressions', (req, res, next) => {
  res.send(expressions)
});

//GETTING SINGLE EXPRESSION
app.get('/expressions/:id', (req, res, next) => {
  res.send(getElementById(req.params.id,expressions));
});

//SETTING STATUS CODE
app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if(foundExpression)
  {
    res.status(200).send(foundExpression);
  }
  else
  {
    res.status(404).send('Expression not found');
  }
});

//OTHER HTTP METHODS / QUERY STRINGS
app.put('/expressions/:id', (req, res, next) => {
  const expressionUpdates = req.query;
  if(expressions[req.params.id])
  {
    expressions[req.params.id] = expressionUpdates;
    res.send(expressions[req.params.id]);
  }
  else
  {
    res.status(404).send('Expression not found.');
  }
});

//CREATING AN EXPRESSION
app.post('/expressions', (req, res, next) => {
  const expression = createElement('expressions', req.query);
  if(expression)
  {
    expressions.push(expression);
    res.status(201).send(expression);
  }
  else
  {
    res.status(400).send();
  }
});

//DELETING OLD EXPRESSION
app.delete('/expressions/:id', (req, res, next) => {
  if(expressions[req.params.id])
  {
    expressions.splice(getIndexById(req.params.id, expressions), 1);
    res.status(204).send();
  }
  else
  {
    res.status(404).send();
  }
});


//ALL
app.get('/animals', (req, res, next) => {
  res.send(animals);
});

app.get('/animals/:id', (req, res, next) => {
  const foundAnimal = getElementById(req.params.id, animals);
  if (foundAnimal) {
    res.send(foundAnimal);
  } else {
    res.status(404).send();
  }
});

app.put('/animals/:id', (req, res, next) => {
  const animalIndex = getIndexById(req.params.id, animals);
  if (animalIndex !== -1) {
    updateElement(req.params.id, req.query, animals);
    res.send(animals[animalIndex]);
  } else {
    res.status(404).send();
  }
});

app.post('/animals', (req, res, next) => {
  const receivedAnimal = createElement('animals', req.query);
  if (receivedAnimal) {
    animals.push(receivedAnimal);
    res.status(201).send(receivedAnimal);
  } else {
    res.status(400).send();
  }
});

app.delete('/animals/:id', (req, res, next) => {
  const animalIndex = getIndexById(req.params.id, animals);
  if (animalIndex !== -1) {
    animals.splice(animalIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
