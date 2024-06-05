const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app.js');
const { GridFSBucket } = require('mongodb');

// config file location
dotenv.config({ path: './config.env' });

let gridBucket;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
	.connect(DB)
	.then(() => {
		console.log('Database connection successful');
		let db = mongoose.connection.db;
		gridBucket = new GridFSBucket(db, {
			bucketName: 'uploads',
		});

		// const result = gridBucket.find({ filename: 'astro.jpg' }).toArray();
		return gridBucket;
	})
	.then((gridBucket) => {
		// console.log(result);
		module.exports = gridBucket;
	})
	.catch((err) => {
		console.log('Something went wrong with establishing the database connection');
	});

app.listen(3000, () => {
	console.log('Listening to localhost 3000');
});
// Export the gridBucket after it's initialized
