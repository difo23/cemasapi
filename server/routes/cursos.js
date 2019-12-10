const express = require('express');
const app = express();
const _ = require('underscore');
const Curso = require('../models/cursos');
const mongoose = require('mongoose');


app.get('/cursos', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Curso.find({ estado: true }, 'asignaturas estado codigo_curso grado seccion modalidad especialidad')
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

app.post('/cursos', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	var myValue = body.estado;
    var estado = myValue == 'true';
	let cursos = new Curso({
        _id: id,
		asignaturas: body.asignaturas,
		estado: estado,
		codigo_curso: body.codigo_curso,
		grado: body.grado,
		seccion: body.seccion,
		modalidad: body.modalidad,
		especialidad: body.especialidad
		});

		cursos.save((err, cursosdb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			curso: cursosdb
		});
	});
});

app.put('/curso/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ '_id','asignaturas', 'estado', 'codigo_curso', 'grado', 'seccion', 'modalidad', 'especialidad' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/cursos/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
