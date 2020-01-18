'use strict';

const fs = require('fs');
const PDFDocument = require('./pdftablemake');
var path = require('path');

class ReporteCreatePDF {
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
		this.count++;
		this.doc.addPage();
	}

	constructorFilas(filas) {
		let rows = [];
		filas = JSON.stringify(filas);
		filas = JSON.parse(filas);
		for (let fila of filas) {
			rows.push(Object.values(fila));
		}
		console.log('valores: Rows en constructor ', rows);
		return rows;
	}

	//curso, numero, nombre_estudiante, codigo_profesor, boletin, asignaturas, modulos, inicio
	reporte(estudiante, inicio) {
		//Ejemplo name = "example.pdf"
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth() + 1;
		var yyyy = hoy.getFullYear();
		var fecha = `${dd}-${mm}-${yyyy}`;
		console.log('Empezamos a Crear el pdf para ', estudiante, ' Pagina ', this.count, ' Div', inicio);
		let rows_asignaturas = this.constructorFilas(estudiante.asignaturas);
		let rows_modulos = this.constructorFilas(estudiante.modulos);
		let titular = estudiante.titular_codigo.split('-');

		const asignaturas_academicas = {
			headers: [ 'Asignaturas', 'Ago-Sept-oct', 'Nov-Dic-Ene', 'Feb-Mar', 'Abr-May-Jun', 'CF' ],
			rows: rows_asignaturas
		};

		const modulos_tecnicos = {
			headers: [ 'Módulos', 'Acumulado', 'Total' ],
			rows: rows_modulos
		};

		this.doc
			.fontSize(12)
			.font('Times-Bold')
			.text('CENTRO EDUCATIVO MANUEL ACEVEDO SERRANO FE Y ALEGRÍA', 70, 30 + inicio)
			.moveDown(0.5);

		this.doc.image(path.join(__dirname, '/test.jpeg'), 490, 20 + inicio, { scale: 0.15 });

		this.doc
			.fontSize(10)
			.font('Times-Roman')
			.text('RÍO VERDE ARRIBA, CUTUPÚ, LA VEGA, REP. DOM.', 70, 45 + inicio)
			.moveDown(0.5);

		this.doc
			.fontSize(8)
			.font('Times-Bold')
			.text(`BOLETÏN: ${estudiante.periodo} FECHA: ${fecha}`, 70, 60 + inicio)
			.moveDown(0.5);

		this.doc
			.fontSize(8)
			.font('Times-Roman')
			.text(
				`CURSO: ${estudiante.curso} | #: ${estudiante.numero_estudiante} | EST.: ${estudiante.nombre_estudiante.toUpperCase()} | PROF. TITULAR: ${titular[0]}`,
				70,
				85 + inicio
			)
			.moveDown(0.5);

		this.doc.table(asignaturas_academicas, 70, 100 + inicio, {});

		this.doc.moveDown().table(modulos_tecnicos, 70, 225 + inicio, { width: 300 });

		this.doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320 + inicio).moveDown(0.5);
		this.doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320 + inicio).moveDown(0.5);
	}
}

module.exports = ReporteCreatePDF;
