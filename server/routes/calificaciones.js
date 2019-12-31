const express = require('express');
const app = express();
const _ = require('underscore');
const Calificaciones = require('../models/calificaciones');
const mongoose = require('mongoose');


app.get('/calificaciones', (req, res) => {
	console.log("Metodo get calificaciones")
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

app.post('/calificacion', (req, res) => {
	let b = "";
	for (let key in req.body){
		b=key
	}
	console.log("Metodo post calificaciones "+JSON.stringify(b))
	let body = JSON.parse(b);
	let id = mongoose.Types.ObjectId();
	var myValue = body["estado"];
	console.log("body estado "+myValue)
	var estado = myValue == 'true';
	res.setHeader('Access-Control-Allow-Origin', '*');

	let calificaciones = new Calificaciones({
        _id: id,
        codigo_periodo: body["codigo_periodo"],
		codigo_curso: body["codigo_curso"],
		codigo_maestro: body["codigo_maestro"],
		codigo_asignatura: body["codigo_asignatura"],
		estado: estado,
		codigo_calificaciones: body["codigo_calificacion"],
		calificaciones_estudiantes: body["calificacion_estudiantes"],
		modalidad: body["modalidad"]
		});

	calificaciones.save((err) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
	});
});



module.exports = app;