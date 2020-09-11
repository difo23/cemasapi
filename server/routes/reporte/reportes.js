const express = require('express');
const app = express();
const _ = require('underscore');
const Reportes = require('../../models/reportes');
const mongoose = require('mongoose');
const ReporteObj = require('./ReporteObj');
const Calificaciones = require('../../models/calificaciones');
const Cursos = require('../../models/cursos');
const Periodo_Est = require('../../models/periodos_estudiantes');
const PromiseBlue = require('bluebird');

PromiseBlue.promisifyAll(mongoose);


app.get('/reportes/:curso/:periodo', (req, res) => {
	var curso = req.params.curso;
	var periodo = req.params.periodo;

	res.setHeader('Access-Control-Allow-Origin', '*');

	PromiseBlue.props({
		curso: Cursos.find({ codigo_curso: curso }, 'asignaturas').execAsync(),

		calificaciones: Calificaciones.find({ codigo_curso: curso, codigo_periodo: periodo },
			'codigo_asignatura calificacion_estudiantes'
		).execAsync(),

		periodo_estudiante: Periodo_Est.find(
			{ codigo_curso: curso, codigo_periodo: periodo },
			'estudiantes_inscritos titular'
		).execAsync()
	}).then((result) => {
			//codigo result.cusro, result.calificaciones y result.periodo_estudiantes
			var re = new RegExp('^MF');
			var reports_create = [];

			for (var estudiante of result.periodo_estudiante[0].estudiantes_inscritos) {
				var report = new ReporteObj({
					curso: curso,
					periodo: `${periodo}:${curso}`,
					numero: estudiante.get('numero'),
					rne: estudiante.get('rne'),
					titular: result.periodo_estudiante[0].titular,
					boletin: `${curso}:${periodo}:${estudiante.get('rne')}`,
					nombre: `${estudiante.get('nombres')} ${estudiante.get('apellidos')}`
				});

				for (var asignatura of result.curso[0].asignaturas) {
					// console.log(asignatura);
					// console.log(report);
					for (var calificacion of result.calificaciones) {
						if (asignatura == calificacion.codigo_asignatura) {
							for (var calificacion_estudiante of calificacion.calificacion_estudiantes) {
								if (calificacion_estudiante.get('rne') === estudiante.get('rne')) {
									if (re.test(asignatura)) {
										//crear modulos
										report.crearModulos({
											codigo_asignatura: asignatura,
											calificaciones: calificacion_estudiante
										});
									} else {
										// creo asiganaturas
										report.crearAsignaturas({
											codigo_asignatura: asignatura,
											calificaciones: calificacion_estudiante
										});
									}
								}
							}
						}
					}
				}

				reports_create.push(report);
			}
			//console.log(JSON.stringify(reports_create));
			//codigo para save reporte	
			try {
				let periodoCurso = `${periodo}:${curso}`

				//Reportes.updateMany({periodo: periodoCurso },reports_create, {upsert: true}).exec();
				
				Reportes.countDocuments({periodo: periodoCurso }, (err, result)=>{
					if (err) {
						console.log(err);
					  } else if(result){

						// Reportes.updateMany(reports_create);

						Reportes.deleteMany( {periodo: periodoCurso }).exec();
						Reportes.insertMany(reports_create);

					  }
				   else {
						Reportes.insertMany(reports_create);
					}
				})
				


			 } catch (e) {
				console.log(e);
			 }

			 var repotesfinal = JSON.stringify(reports_create)

			 res.json({
				ok: true,
				repotesfinal
			});
		}).catch((err) => {
			console.log('ERROR! Query a DB' + err);
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
		});
});

app.get('/reportes', (req, res) => {
	console.log('Metodo get calificaciones');
	//let from = req.query.desde || 0;
	//let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Reportes.find(
		{ estado: true },
		'_id curso numero_estudiante nombre_estudiante boletin rne titular_codigo estado asignaturas modulos'
	)
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
	let b = '';
	for (let key in req.body) {
		b = key;
	}
	console.log('Metodo post reporte ' + JSON.stringify(b));
	let body = JSON.parse(b);
	let id = mongoose.Types.ObjectId();
	var myValue = body['estado'];
	var estado = myValue == 'true';
	res.setHeader('Access-Control-Allow-Origin', '*');

	let reporte = new Reportes({
		curso: body['curso'],
		numero_estudiante: body['numero_estudiante'],
		nombre_estudiante: body['nombre_estudiante'],
		boletin: body['boletin'],
		estado: estado,
		rne: body['rne'],
		titular_codigo: body['titular_codigo'],
		asignaturas: body['asignaturas'],
		modulos: body['modulos']
	});

	Reportes.findOneAndUpdate(
		{
			boletin: body['boletin']
		},
		reporte,
		{ upsert: true },
		(err) => {
			// Deal with the response data/error
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
		}
	);
});

module.exports = app;
