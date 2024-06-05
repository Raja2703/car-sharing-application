const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

exports.gridStorage = () => {
	let DB = 'mongodb+srv://Raja:fivesix9@cluster0.y0xdwf8.mongodb.net/Klenty';
	const storageFs = new GridFsStorage({
		url: DB,
		file: (req, file) => {
			return {
				filename: file.originalname,
				bucketName: 'uploads',
			};
		},
	});

	let uploadGrid = multer({ storage: storageFs });
	return uploadGrid;
};
