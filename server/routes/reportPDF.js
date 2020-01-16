const express = require('express');
const fs = require('fs');
const Reportes = require('../models/reportes');
const mongoose = require('mongoose');
const ReporteCreate = require('./reporte/ReporteCreatePDF');
const PromiseBlue = require('bluebird');
var path = require('path');

PromiseBlue.promisifyAll(mongoose);
let app = express();

app.get('/pdf/:curso/:periodo', (req, res) => {
	console.log('Crear PDF:');

	let curso = req.params.curso;
	let periodo = req.params.periodo;
	let pathfile = `server/routes/reporte/pdf/${curso}${periodo}.pdf`;
	console.log('Curso:', curso);
	console.log('Periodo:', periodo);
	console.log('PathFile:', pathfile);

	res.setHeader('Access-Control-Allow-Origin', '*');

	PromiseBlue.props({
		reportes: Reportes.find(
			{ periodo: `${periodo}:${curso}` },
			'nombre_estudiante rne curso periodo numero_estudiante rne titular_codigo boletin  asignaturas modulos'
		).execAsync()
	})
		.then((result) => {
			//codigo result.cusro, result.calificaciones y result.periodo_estudiantes
			console.log('Imprimo reportes en creacion de pdf');
			//Creacion Reporte PDF:
			let count = 1;
			let pdf = new ReporteCreate(pathfile);

			for (let rep of result.reportes) {
				console.log('Reporte por estudiante', rep);
				// pdf.reporte(rep, 0);
				// break;
				// Division inicio 360
				switch (count) {
					case 1:
						console.log(1, count);
						pdf.reporte(rep, 0);
						count++;
						break;

					case 2:
						pdf.reporte(rep, 360);
						console.log(2, count);
						count++;
						break;

					case 3:
						pdf.addPage();
						pdf.reporte(rep, 0);
						console.log(3, count);
						count++;
						break;

					default:
						console.log(2, count);
						console.log('Default');
						pdf.reporte(rep, 360);
						count = 1;
						pdf.addPage();
				}
			}

			pdf.close();

			// Finaliza creacion de documento pdf
			let reportesString = JSON.stringify(result.reportes);
			res.json({
				ok: true,
				reportesString
			});
		})
		.catch((err) => {
			console.log('ERROR! PDF Query a DB', err);
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
		});
});

app.get('/file/:curso/:periodo', (req, res) => {
	let curso = req.params.curso;
    let periodo = req.params.periodo;
    res.setHeader('Access-Control-Allow-Origin', '*');

	let pathPDF = path.join(__dirname, `/reporte/pdf/${curso}${periodo}.pdf`);
	if (fs.existsSync(pathPDF)) {
		res.sendFile(pathPDF);
	} else {
		let notImagePath = path.join(__dirname, '/reporte/test.jpeg');
		res.sendFile(notImagePath);
	}
});

module.exports = app;
