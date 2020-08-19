const express = require('express');
const app = express();
const _ = require('underscore');
const Periodo_estudiante = require('../models/periodos_estudiantes');
const mongoose = require('mongoose');


app.get('/periodos_estudiantes', (req, res) => {
	let curso = req.query.curso ;
	let periodo = req.query.periodo;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Periodo_estudiante.find({ codigo_periodo: periodo, codigo_curso: curso}, '_id codigo_calificaciones estudiantes_inscritos')
		.exec((err, estudiantes) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

				res.json({
					ok: true,
					data: estudiantes
				});
			
		});
});




app.post('/periodo_estudiante', (req, res) => {
	let body = req.body;
    let id = mongoose.Types.ObjectId();
    // var myValue = body.estado;
    // var estado = myValue  == 'true';
	let periodos_estudiantes = new  Periodo_estudiante({
		_id: id,
		codigo_periodo: body.codigo_periodo,
		codigo_cursos: body.codigo_cursos,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin,
        estudiantes_inscritos: body.estudiantes_inscritos,
        codigo_calificaciones: body.codigo_calificaciones,
        titular: body.titular
	});

	periodo_estudiante.save((err, periodo_estudiantedb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			periodo_estudiante: periodo_estudiantedb
		});
	});
});

app.put('/periodo_estudiante/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ 'codigo_curso', 'codigo_periodo', 'fecha_inicio', 'fecha_fin', 'estudiante_inscritos','codigo_calificacion','titular' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/periodo_estudiante/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
