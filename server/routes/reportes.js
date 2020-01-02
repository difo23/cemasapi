const express = require('express');
const app = express();
const _ = require('underscore');
const Reportes = require('../models/reportes');
const mongoose = require('mongoose');


app.get('/reportes', (req, res) => {
	console.log("Metodo get calificaciones")
	//let from = req.query.desde || 0;
	//let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

    Reportes.find({ estado: true }, '_id curso numero_estudiante nombre_estudiante boletin rne titular_codigo estado asignaturas modulos')
		//.skip(Number(from))
		//.limit(Number(limite))
		.exec((err, reportes) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Reportes.count({ estado: true }, (err, count) => {
				res.json({
					ok: true,
					count,
					reportes
				});
			});
		});
});

app.post('/reporte', (req, res) => {
	let b = "";
	for (let key in req.body){
		b=key
	}
	console.log("Metodo post reporte "+JSON.stringify(b))
	let body = JSON.parse(b);
	let id = mongoose.Types.ObjectId();
	var myValue = body["estado"];
	var estado = myValue == 'true';
	res.setHeader('Access-Control-Allow-Origin', '*');

	let reporte = new Reportes({
        curso: body["curso"],
		numero_estudiante: body["numero_estudiante"],
		nombre_estudiante: body["nombre_estudiante"],
		boletin: body["boletin"],
		estado: estado,
		rne: body["rne"],
		titular_codigo: body["titular_codigo"],
		asignaturas: body["asignaturas"],
		modulos: body["modulos"]
		});

		
/*
	calificaciones.save((err) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
	});

*/
	Reportes.findOneAndUpdate({
		boletin: body["boletin"]
	}, reporte, {upsert: true},(err)=> {
		// Deal with the response data/error
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
	});
});



module.exports = app;