const express = require('express');
const cors = require('cors');
const carRouter = require('./src/route/carRoutes.js');
const userRouter = require('./src/route/userRoutes.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// cross origin resource scripting
app.use(cors({ origin: true, credentials: true }));

// routes
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
