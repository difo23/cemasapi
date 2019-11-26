const express = require('express');
const app = express();
const _ = require('underscore');
const Profesor = require('../models/profesor');
const mongoose = require('mongoose');

app.post('/profesor', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	let profesor = new Profesor({
		_id: id,
		codigo_maestro: body.codigo_maestro,
		nombre: body.nombre,
		apellido: body.apellido,
		email: body.email,
		telefono: body.telefono,
		edad: body.edad
	});

	profesor.save((err, profesordb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			profesor: profesordb
		});
	});
});

module.exports = app;
