const express = require('express');
const app = express();
const _ = require('underscore');
const Asignaturas_modulos_comunes = require('../models/asignaturas_modulos_comunes');
const mongoose = require('mongoose');

app.get('/asignaturas_modulos_comunes', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Asignaturas_modulos_comunes.find({ estado: true }, 'nombre horas_semanales horas_anos grado cursos_profesor estado modalidad nivel undidad_comperencia ra ra_porcentaje')
		.skip(Number(from))
		.limit(Number(limite))
		.exec((err, asignaturas_modulos_comunes) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Asignaturas_modulos_comunes.count({ estado: true }, (err, count) => {
				res.json({
					ok: true,
					count,
					asignaturas_modulos_comunes
				});
			});
		});
});

app.post('/asignaturas_modulos_comunes', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	var myValue = body.estado;
    var estado = myValue == 'true';
	let asignaturas_modulos_comunes = new Asignaturas_modulos_comunes({
        _id: id,
        codigo: body.codigo,
		nombre: body.nombre,
		horas_semanales: body.horas_semanales,
		horas_anos: body.horas_anos,
		grado: body.grado,
		cursos_profesor: body.cursos_profesor,
		estado: estado,
		modalidad: body.modalidad,
		nivel: body.nivel,
		unidad_competencia: body.unidad_competencia,
		ra: body.ra,
		ra_porcentaje: body.ra_porcentaje
	});

	asignaturas_modulos_comunes.save((err, asignaturas_modulos_comunesdb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			asignaturas_modulos_comunes: asignaturas_modulos_comunesdb
		});
	});
});

app.put('/asignaturas_modulos_comunes/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ 'nombre', 'horas_semanales', 'horas_anos', 'grado', 'cursos_profesor', 'estado', 'modalidad', 'nivel', 'undidad_comperencia', 'ra', 'ra_porcentaje', ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/asignaturas_modulos_comunes/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;