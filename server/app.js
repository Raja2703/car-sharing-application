const express = require('express');
const cors = require('cors');
const carRouter = require('./src/route/carRoutes.js');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// cross origin resource scripting
app.use(cors({ origin: true, credentials: true }));

// routes
app.use('/api/v1/cars', carRouter);

module.exports = app;
