const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase, getFromDatabaseById,
    addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId, deleteAllFromDatabase,
    createWork
} = require('./db');

// Middleware
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion)
    {
        req.minion = minion;
        next();
    }
    else
    {
        res.status(404).send();
    }
});

// Request Handling

//RETRIEVE ALL
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

//RETRIEVE SINGLE
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//NEW INSTANCE
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

//UPDATE INSTANCE
minionsRouter.put('/:minionId', (req, res, next) => {
    updateInstanceInDatabase('minions', req.body); //should be body in solution
    res.send(req.body);
});

//DELETE INSTANCE
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.minion.id);
    if(deleteMinion)
    {
        res.status(204).send();
    }
    else
    {
        res.status(500).send();
    }
});

// @@@@@@@@      WORK        @@@@@@@@

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if(work)
    {
        req.work = work;
        next();
    }
    else
    {
        res.status(404).send();
    }
});

//RETRIEVE ALL
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((single) => {
        return single.minionId === req.params.minionId;
    });
    res.send(work);
});

//NEW INSTANCE
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId;
    const createWork = addToDatabase('work', newWork);
    res.status(201).send(createWork);
});

//UPDATE INSTANCE
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId)
    {
        req.status(400).send();
    }
    else
    {
        updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

//DELETE INSTANCE
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if(deleted)
    {
        res.status(204).send();
    }
    else
    {
        res.status(500).send();
    }
});

