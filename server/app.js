// get MongoDB client
const express = require('express');
const cors = require('cors');
const carRouter = require('./src/route/carRoutes.js');
const userRouter = require('./src/route/userRoutes.js');
const bookingRouter = require('./src/route/bookingRoutes.js');
const cookieParser = require('cookie-parser');

// const methodOverride = require('method-override');

const app = express();

app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// app.use(methodOverride('_method'));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// cross origin resource scripting
app.use(cors({ origin: true, credentials: true }));

// routes
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/booking', bookingRouter);

module.exports = app;
