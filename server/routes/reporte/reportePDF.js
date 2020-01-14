'use strict';

const fs = require('fs');
const PDFDocument = require('./pdftablemake');

 class ReportePDF {
	constructor(nombre_file) {
		this.doc = new PDFDocument();
		this.count = 0;
		this.open(nombre_file);
	}

	open(name) {
		this.doc.pipe(fs.createWriteStream(name));
	}

	close() {
		this.doc.end();
	}

	addPage() {
		// Add another page
		this.doc.addPage()
	}
	

	constructorFilas(filas) {
		let rows = [];
	
		for (let fila of filas) {
			rows.push(Object.values(fila));
		}
	
		return rows;
	};

	//curso, numero, nombre_estudiante, codigo_profesor, boletin, asignaturas, modulos, inicio
	reporte(estudiante, inicio) {
		//Ejemplo name = "example.pdf"
		
		let rows_asignaturas = constructorFilas(estudiante.asignaturas);
		let rows_modulos = constructorFilas(estudiante.modulos);
	
		const asignaturas_academicas = {
			headers: [ 'Asignaturas', 'Ago-Sept-oct', 'Nov-Dic-Ene', 'Feb-Mar', 'Abr-May-Jun', 'CF' ],
			rows: rows_asignaturas
		};
	
		const modulos_tecnicos = {
			headers: [ 'Modulos', 'Acumulado', 'Total' ],
			rows: rows_modulos
		};
	
		doc.fontSize(12).font('Times-Bold').text('POLITÉCNICO MANUEL ACEVEDO SERRANO', 70, 30 + inicio).moveDown(0.5);
	
		doc.image('./test.jpeg', 490, 20 + inicio, { scale: 0.15 });
	
		doc.fontSize(10).font('Times-Roman').text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.', 70, 45 + inicio).moveDown(0.5);
	
		doc.fontSize(8).font('Times-Bold').text(`BOLETIN: ${estudiante.boletin} FECHA: ${Date.now()}`, 70, 60 + inicio).moveDown(0.5);
	
		doc.fontSize(8).font('Times-Roman').text(`CURSO: ${estudiante.curso}  #: ${estudiante.numero}  EST.: ${estudiante.nombre_estudiante} PROF.:${estudiante.codigo_profesor}`, 70, 85+inicio).moveDown(0.5);
	
		doc.table(estudiante.asignaturas_academicas, 70, 100+inicio, {});
	
		doc.moveDown().table(estudiante.modulos_tecnicos, 70, 225+inicio, { width: 300 });
	
		doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320+inicio).moveDown(0.5);
		doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320+inicio).moveDown(0.5);
	};
	

 }

 


module.exports = ReportePDF;
