const express = require('express');
const cors = require('cors');
const routes = require('./routes');
var porta = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(porta);
