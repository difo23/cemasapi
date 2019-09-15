const express = require('express');
const app = express();
const _ = require('underscore');
const Curso = require('../models/curso');
const mongoose = require('mongoose');

app.post('/curso', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	let id_profesor = body.profesores.split(',');

	let curso = new Curso({
		_id: id,
		codigo_curso: body.codigo_curso,
		periodo_escolar: body.periodo_escolar,
		modalidad: body.modalidad,
		profesores: id_profesor
	});

	curso.save((err, cursodb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			curso: cursodb
		});
	});
});

module.exports = app;
