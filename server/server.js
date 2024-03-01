const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app.js');

// config file location
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
	.connect(DB)
	.then(() => {
		console.log('Database connection successfull');
	})
	.catch((err) => {
		console.log('Something went wrong with establishing the database connection');
	});

app.listen(3000, () => {
	console.log('Listening to localhost 3000');
});
