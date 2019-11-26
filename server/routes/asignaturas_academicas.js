const express = require('express');
const app = express();
const _ = require('underscore');
const Asignaturas = require('../models/asignaturas_academicas');
const mongoose = require('mongoose');


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

app.post('/asignaturas_academicas', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	let asignaturas_academicas = new Asignaturas({
        _id: id,
        codigo: body.codigo,
		nombre: body.nombre,
		horas_semanales: body.horas_semanales,
		horas_anos: body.horas_anos,
		grado: body.grado,
		cursos_profesor: body.cursos_profesor,
		estado: body.estado,
		modalidad: body.modalidad,
		});

	asignaturas_academicas.save((err, asignaturas_academicasdb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			asignaturas_academicas: asignaturas_academicasdb
		});
	});
});

app.put('/asignaturas_academicas/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ 'nombre', '_id', 'codigo', 'nombre', 'horas_semanales', 'horas_anos', 'grado', 'cursos_profesor', 'estado', 'modalidad' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/asignaturas_academicas/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
