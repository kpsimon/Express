const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase, getFromDatabaseById,
    addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId, deleteAllFromDatabase
} = require('./db');

// Middleware

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea)
    {
        req.idea = idea;
        next();
    }
    else
    {
        res.status(404).send();
    }
});

// Request Handling

//RETRIEVE ALL
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

//RETRIEVE SINGLE
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

//NEW INSTANCE
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newidea = addToDatabase('ideas', req.body);
    res.status(201).send(newidea);
});

//UPDATE INSTANCE
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const idea = updateInstanceInDatabase('ideas', req.body); //should be body in solution
    res.send(idea);
});

//DELETE INSTANCE
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteidea = deleteFromDatabasebyId('ideas', req.idea.id);
    if(deleteidea)
    {
        res.status(204).send();
    }
    else
    {
        res.status(500).send();
    }
});



