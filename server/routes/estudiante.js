const express = require('express');
const app = express();
const _ = require('underscore');
const Estudiante = require('../models/estudiante');
const mongoose = require('mongoose');

app.get('/estudiante', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Estudiante.find({ estado: true }, 'nombre apellido RNE estado matricula')
		.skip(Number(from))
		.limit(Number(limite))
		.exec((err, estudiantes) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Estudiante.count({ estado: true }, (err, count) => {
				res.json({
					ok: true,
					count,
					estudiantes
				});
			});
		});
});

app.post('/estudiante', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	let estudiante = new Estudiante({
		_id: id,
		nombre: body.nombre,
		email: body.email,
		RNE: body.rne,
		matricula: body.matricula,
		apellido: body.apellido,
		img: body.img,
		sexo: body.sexo,
		fecha_nacimiento: new Date(body.fecha_nacimiento),
		telefono_tutor: body.telefono_tutor,
		nombre_tutor: body.nombre_tutor,
		codigo_curso_activo: body.codigo_curso_activo,
		edad: body.edad
	});

	estudiante.save((err, estudiantedb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			estudiante: estudiantedb
		});
	});
});

app.put('/estudiante/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ 'nombre', 'img', 'email', 'role', 'estado' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/estudiante/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
