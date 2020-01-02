'use strict';

const fs = require('fs');
const PDFDocument = require('./pdftablemake');
const doc = new PDFDocument();

let constructorFilas = function(filas) {
	let rows = [];

	for (let fila of filas) {
		let row = [];
		for (let key in fila) {
			row.push(fila[key]);
		}
		rows.push(row);
	}

	return rows;
};

let open = function(name) {
	doc.pipe(fs.createWriteStream(name));
}

let close = function() {
	doc.end();
}

let addPage= function() {
	// Add another page
	doc.addPage()
}

let reporte = function(curso, numero, nombre_estudiante, codigo_profesor, boletin, asignaturas, modulos, inicio) {
	//Ejemplo name = "example.pdf"
	
	let rows_asignaturas = constructorFilas(asignaturas);
	let rows_modulos = constructorFilas(modulos);

	const asignaturas_academicas = {
		headers: [ 'Asignaturas', 'Ago-Sept-oct', 'Nov-Dic-Ene', 'Feb-Mar', 'Abr-May-Jun', 'CF' ],
		rows: rows_asignaturas
	};

	const modulos_tecnicos = {
		headers: [ 'Modulos', 'Acumulado', 'Total' ],
		rows: rows_modulos
	};

	doc.fontSize(12).font('Times-Bold').text('POLITÉCNICO MANUEL ACEVEDO SERRANO', 70, 30 + inicio).moveDown(0.5);

	doc.image('./test.jpeg', 490, 20 + inicio { scale: 0.15 });

	doc.fontSize(10).font('Times-Roman').text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.', 70, 45 + inicio).moveDown(0.5);

	doc.fontSize(8).font('Times-Bold').text(`BOLETIN: ${boletin} FECHA: ${Date.now()}`, 70, 60 + inicio).moveDown(0.5);

	doc.fontSize(8).font('Times-Roman').text(`CURSO: ${curso}  #: ${numero}  EST.: ${nombre_estudiante} PROF.:${codigo_profesor}`, 70, 85+inicio).moveDown(0.5);

	doc.table(asignaturas_academicas, 70, 100+inicio, {});

	doc.moveDown().table(modulos_tecnicos, 70, 225+inicio, { width: 300 });

	doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320+inicio).moveDown(0.5);
	doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320+inicio).moveDown(0.5);
};


module.exports = reporte;
