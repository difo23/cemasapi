require('./config');
const express = require('express');
const fileUpload = require('express-fileupload');
const boddyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;

app.use(boddyParser.urlencoded({ extended: false }));
app.use(boddyParser.json());

//configuracion goblar de rutas
app.use(require('./routes'));
app.use(fileUpload());

mongoose
	.connect(
		process.env.URLDB,
		{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
		(err, res) => {
			if (err) throw err;
			console.log('Mongo online');
		}
	)
	.then(() => console.log('DB Connected!'))
	.catch((err) => {
		console.log(Error, err.message);
	});

app.listen(PORT, () => {
	console.log('Escuchando puerto', PORT);
});
