const express = require('express');
const app = express();
const _ = require('underscore');
const Curso = require('../models/curso');

app.get('/cursos', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Curso.find({ estado: true }, 'codigo_curso modalidad especialidad asignaturas')
		.skip(Number(from))
		.limit(Number(limite))
		.exec((err, cursos) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Curso.count({ estado: true }, (err, count) => {
				res.json({
					ok: true,
					count,
					cursos
				});
			});
		});
});

module.exports = app;
