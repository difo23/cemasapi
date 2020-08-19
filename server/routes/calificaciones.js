const express = require('express');
const app = express();
const _ = require('underscore');
const Calificaciones = require('../models/calificaciones');
const mongoose = require('mongoose');


app.get('/calificaciones', (req, res) => {
	console.log("Metodo get calificaciones")
	let codigo_curso = req.query.curso;
	let codigo_periodo = req.query.periodo;
	let codigo_asignatura = req.query.asignatura;

	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

    Calificaciones.find({ estado: true, codigo_curso:codigo_curso, codigo_periodo:codigo_periodo, codigo_asignatura:codigo_asignatura }, '_id codigo_periodo codigo_calificacion codigo_curso codigo_maestro codigo_asignatura estado modalidad calificacion_estudiantes').exec((err, calificaciones) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			
			return	res.json({
					ok: true,
					data: calificaciones
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
	
	console.log("Metodo post calificaciones "+JSON.stringify(req.body))
	let {body} = req;
	let id = mongoose.Types.ObjectId();
	var myValue = body["estado"];
	
	console.log("body estado "+myValue)
	var estado = myValue == 'true';
	res.setHeader('Access-Control-Allow-Origin', '*');

	let calificaciones = new Calificaciones({
        codigo_periodo: body["codigo_periodo"],
		codigo_curso: body["codigo_curso"],
		codigo_maestro: body["codigo_maestro"],
		codigo_asignatura: body["codigo_asignatura"],
		estado: estado,
		codigo_calificacion: body["codigo_calificacion"],
		calificacion_estudiantes: body["calificacion_estudiantes"],
		modalidad: body["modalidad"]
		});
		

	Calificaciones.findOneAndUpdate({
		codigo_calificacion: body["codigo_calificacion"]
	}, calificaciones, {upsert: true},(err)=> {
		// Deal with the response data/error
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		return res.json({
				ok: true,
				message: 'Calificacion Guardada'
			});

	});
});



module.exports = app;
