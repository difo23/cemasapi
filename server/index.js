require('./config');
﻿require('rootpath')();

const express = require('express');
const fileUpload = require('express-fileupload');
const boddyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const URLDB = process.env.URLDB;
const cors = require('cors');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

app.use(boddyParser.urlencoded({ extended: false }));
app.use(boddyParser.json());
app.use(cors());

//configuracion goblar de rutas
app.use(require('./routes'));
app.use(fileUpload());

// use JWT auth to secure the api
app.use(jwt());

// api routes
//app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);


console.log(URLDB, PORT)
mongoose
	.connect(
		URLDB,
		{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
		(err, res) => {
			if (err) throw err;
			console.log('Mongo online');
		}
	)
	.then(() => console.log('DB Connected!'))
	.catch((err) => {
		console.log(Error, 'No sirve');
	});

app.listen(PORT, () => {
	console.log('Escuchando puerto', PORT);
});
