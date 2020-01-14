const express = require('express');
const app = express();
const _ = require('underscore');
const Reportes = require('../models/reportes');
const mongoose = require('mongoose');
const ReporteObj = require("./reporte/ReṕorteObj");
const Calificaciones = require('../models/calificaciones');
const Cursos= require('../models/cursos');
const Periodo_Est = require('../models/periodo_estudiantes');
const PromiseBlue = required('bluebird');

PromiseBlue.promisifyALL(mongoose);

app.get('/reportes/:curso/:periodo', (req, res) => {
	let curso= req.params.curso;
	let periodo = req.params.periodo;
	let reporteObj = new ReporteObj();

	res.setHeader('Access-Control-Allow-Origin', '*');
	PromedioBlue.props ({
		curso: Cursos.find({codigo_curso: curso}, 'asignaturas').execAsync(),
		calificaciones: Calificaciones.find({codigo_curso: curso, codigo_periodo: periodo}, 'codigo_asignatura calificacion_estudiantes').execAsync(),
		periodo_estudiante: Periodo_Est.find({codigo_curso: curso, codigo_periodo: periodo}, 'estudiantes_inscritos titular').execAsync()
	}).then((result)=>{
		//codigo result.cusro, result.calificaciones y result.periodo_estudiantes
		var re = new RegExp('^MF');

			for (asignatura of result.curso.asignaturas){
				for(estudiante of result.periodo_estudiante.estudiantes_inscritos){
					for (calificacion of  result.calificaciones){
					
						if (asignatura === calificacion.codigo_asignatura){
							for (calificacion_estudiante of calificacion.calificacion_estudiantes){
							
								if (califcicion_estudiante.rne === estudiante.rne){
									// creo modulos
									//re.test(asignatura)
									let report = new ReporteObj({
										curso: curso,
										periodo: periodo,
										numero_estudiante: estudiante.numero,
										rne: estudiante.rne,
										titular_codigo: result.periodo_estudiante.titular,
										boletin: `${curso}:${periodo}:${estudiante.rne}`,
										nombre_estudiante: `${estudiante.nombres} ${estudiante.apellidos}`
									});


									if (re.test(asignatura)){
										// creo modulos
										//re.test(asignatura
										report.crearModulos({
											codigo_asignatura: asignatura,
											calificaciones: califcicion_estudiante

										});


									}else{
										// creo asiganaturas
										report.crearAsignaturas({
											codigo_asignatura: asignatura,
											calificaciones: califcicion_estudiante

										});
	
									}
							
		
						
							

								}

					
						
							}
						}
				
					}

				}
			}
		}).catch((err)=>{
		console.log("ERROR! Query a DB")
	})
		

});



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