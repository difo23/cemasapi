const express = require('express');
const app = express();
const _ = require('underscore');
const Calificaciones = require('../models/calificaciones');
const mongoose = require('mongoose');


app.get('/calificaciones', (req, res) => {
	//let from = req.query.desde || 0;
	//let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

    Calificaciones.find({ estado: true }, '_id codigo_periodo codigo_calificacion codigo_curso codigo_maestro codigo_asignaturas estado modalidad calificacion_estudiantes')
		//.skip(Number(from))
		//.limit(Number(limite))
		.exec((err, calificaciones) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Calificaciones.count({ estado: true }, (err, count) => {
				res.json({
					ok: true,
					count,
					calificaciones
				});
			});
		});
});


/*'_id 
codigo_periodo 
codigo_curso 
codigo_maestro 
codigo_asignaturas 
estado 
modalidad 
cantidad_estudiantes'
*/

app.post('/calificaciones', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	var myValue = body.estado;
    var estado = myValue == 'true';
	let calificaciones = new Calificaciones({
        _id: id,
        codigo_periodo: body.codigo_periodo,
		codigo_curso: body.codigo_curso,
		codigo_maestro: body.codigo_maestro,
		codigo_asignaturas: body.codigo_asignaturas,
        estado: body.estado,
		modalidad: body.modalidad
		});

	Calificaciones.save((err, calificaciones) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			calificaciones: calificaciones
		});
	});
});



module.exports = app;