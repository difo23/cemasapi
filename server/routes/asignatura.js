const express = require('express');
const app = express();
const _ = require('underscore');
const Asignatura = require('../models/asignatura');
const mongoose = require('mongoose');

app.post('/asignatura', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	let asignatura = new Asignatura({
		_id: id,
		codigo_asignatura: body.codigo_asignatura,
		modalidad: body.modalidad,
		horas_semanales: body.horas_semanales,
		ras: body.ras
	});

	asignatura.save((err, asignaturadb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			asignatura: asignaturadb
		});
	});
});

module.exports = app;
