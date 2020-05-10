const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

const {
    getAllFromDatabase, getFromDatabaseById,
    addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId, deleteAllFromDatabase,
    createMeeting
} = require('./db');

//Request Handling

//RETRIEVE ALL
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

//NEW INSTANCE
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

//DELETE INSTANCE
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});
