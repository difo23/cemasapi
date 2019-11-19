const express = require('express');
const app = express();
const _ = require('underscore');
const Asignaturas = require('../models/asignaturas_academicas');

app.get('/asignaturas_academicas', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Asignaturas.find({ estado: true }, '_id codigo nombre horas_semanales horas_anos grado cursos_profesor estado modalidad')
		.skip(Number(from))
		.limit(Number(limite))
		.exec((err, asignaturas_academicas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Asignaturas.count({ estado: true }, (err, count) => {
				res.json({
					ok: true,
					count,
					asignaturas_academicas
				});
			});
		});
});

module.exports = app;