const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const routes = require('./routes/router');

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use('/api/', routes);

app.listen(1500);
