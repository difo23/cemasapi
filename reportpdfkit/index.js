'use strict';

const fs = require('fs');
const PDFDocument = require('./pdftablemake');
const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('example.pdf'));

const table0 = {
	headers: [ 'Asignaturas', 'Primera', 'Segunda', 'Tercera', 'Cuarta', 'Final' ],
	rows: [
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ],
		[ 'MATE000', '90', '90', '90', '90', '80' ]
	]
};

const table1 = {
	headers: [ 'Modulos', 'Acumulado', 'Total' ],
	rows: [
		[ 'MF0542', '12%', '20%' ],
		[ 'France', '67%', '90%' ],
		[ 'England', '33%', '100%' ],
		[ 'England', '33%', '80%' ]
	]
};

// Using a standard PDF font
doc.fontSize(12).font('Times-Bold').text('POLITÉCNICO MANUEL ACEVEDO SERRANO', 70, 30).moveDown(0.5);
doc.image('./test.jpeg', 490, 20, { scale: 0.15 });
doc.fontSize(10).font('Times-Roman').text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.', 70, 45).moveDown(0.5);
doc.fontSize(8).font('Times-Bold').text('BOLETIN #1 9-10-2019', 70, 60).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text('CURSO: 5B  #: 1  NOMBRE: JUAN ANTONIO PEREZ', 70, 85).moveDown(0.5);
doc.table(table0, 70, 100, {});

doc.moveDown().table(table1, 70, 225, { width: 300 });
doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320).moveDown(0.5);

let inicio = 360;

doc.fontSize(12).font('Times-Bold').text('POLITÉCNICO MANUEL ACEVEDO SERRANO', 70, 30 +inicio).moveDown(0.5);
doc.image('./test.jpeg', 490, 20+inicio, { scale: 0.15 });
doc.fontSize(10).font('Times-Roman').text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.', 70, 45+inicio).moveDown(0.5);
doc.fontSize(8).font('Times-Bold').text('BOLETIN #1 9-10-2019', 70, 60+inicio).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text('CURSO: 5B  #: 1  NOMBRE: JUAN ANTONIO PEREZ', 70, 85+inicio).moveDown(0.5);
doc.table(table0, 70, 100+inicio, {});

doc.moveDown().table(table1, 70, 225+inicio, { width: 300 });
doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320+inicio).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320+inicio).moveDown(0.5);

// Add another page
doc.addPage()
   
// Using a standard PDF font
doc.fontSize(12).font('Times-Bold').text('POLITÉCNICO MANUEL ACEVEDO SERRANO', 70, 30).moveDown(0.5);
doc.image('./test.jpeg', 490, 20, { scale: 0.15 });
doc.fontSize(10).font('Times-Roman').text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.', 70, 45).moveDown(0.5);
doc.fontSize(8).font('Times-Bold').text('BOLETIN #1 9-10-2019', 70, 60).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text('CURSO: 5B  #: 1  NOMBRE: JUAN ANTONIO PEREZ', 70, 85).moveDown(0.5);
doc.table(table0, 70, 100, {});

doc.moveDown().table(table1, 70, 225, { width: 300 });
doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320).moveDown(0.5);



doc.fontSize(12).font('Times-Bold').text('POLITÉCNICO MANUEL ACEVEDO SERRANO', 70, 30 +inicio).moveDown(0.5);
doc.image('./test.jpeg', 490, 20+inicio, { scale: 0.15 });
doc.fontSize(10).font('Times-Roman').text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.', 70, 45+inicio).moveDown(0.5);
doc.fontSize(8).font('Times-Bold').text('BOLETIN #1 9-10-2019', 70, 60+inicio).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text('CURSO: 5B  #: 1  NOMBRE: JUAN ANTONIO PEREZ', 70, 85+inicio).moveDown(0.5);
doc.table(table0, 70, 100+inicio, {});

doc.moveDown().table(table1, 70, 225+inicio, { width: 300 });
doc.fontSize(8).font('Times-Roman').text(` Titular`, 150, 320+inicio).moveDown(0.5);
doc.fontSize(8).font('Times-Roman').text(` Director`, 250, 320+inicio).moveDown(0.5);

doc.end();
