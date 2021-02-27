const express = require('express');

// const InfoController = require('./controllers/InfoController');
const ReceiptController = require('./controllers/ReceiptController');
const UserController = require('./controllers/UserController');
// const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// routes.post('/sessions', SessionController.create);

routes.get('/receipts', ReceiptController.index);
routes.post('/receipts', ReceiptController.create);
routes.delete('/receipts/:numeration', ReceiptController.delete);

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);
routes.delete('/user/:id', UserController.delete);
// routes.get('/receipts', ReceiptController.index);
// routes.post('/receipts', ReceiptController.create);
// routes.delete('/receipts/:numeration', ReceiptController.delete);

module.exports = routes;
