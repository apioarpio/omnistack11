const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const route = express.Router();

route.get('/ongs', OngController.getOngs);
route.get('/incidents', IncidentController.index);
route.get('/profile', ProfileController.index);

route.post('/ongs', OngController.create);
route.post('/incidents', IncidentController.create);
route.post('/sessions', SessionController.create)

route.delete('/incidents/:id', IncidentController.delete)

module.exports = route;
