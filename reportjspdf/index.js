// Landscape export, 2×4 inches

global.window = {
	document: {
		createElementNS: () => {
			return {};
		}
	}
};
global.navigator = {};
global.btoa = () => {};
global.atob = require('atob');

const fs = require('fs');
const jsPDF = require('jspdf/dist/jspdf.node.min');

// function to encode file data to base64 encoded string
var generateData = function(amount) {
	var result = [];
	var data = {
		Asigantura: 'Matematica',
		Primera: '85',
		Segunda: '86',
		Tercera: '28',
		Cuarta: '20',
		Final: '0'
	};
	for (var i = 0; i < amount; i += 1) {
		data.id = (i + 1).toString();
		result.push(Object.assign({}, data));
	}
	return result;
};

var generateData2 = function(amount) {
	var result = [];
	var data = {
		Modulo: 'Matematica',
		Acumulado: '85',
		Total: '86'
	};
	for (var i = 0; i < amount; i += 1) {
		data.id = (i + 1).toString();
		result.push(Object.assign({}, data));
	}
	return result;
};

function createHeaders(keys) {
	var result = [];
	for (var i = 0; i < keys.length; i += 1) {
		result.push({
			id: keys[i],
			name: keys[i],
			prompt: keys[i],
			width: 40,
			height: 10,
			align: 'center',
			padding: 0
		});
	}
	return result;
}

function createHeaders2(keys) {
	var result = [];
	for (var i = 0; i < keys.length; i += 1) {
		result.push({
			id: keys[i],
			name: keys[i],
			prompt: keys[i],
			width: 80,
			height: 10,
			align: 'center',
			padding: 0
		});
	}
	return result;
}

var headers = createHeaders([ 'Asigantura', 'Primera', 'Segunda', 'Tercera', 'Cuarta', 'Final' ]);
var headers2 = createHeaders2([ 'Modulo', 'Acumulado', 'Total' ]);
var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'p' });
doc.setFontSize(18);
doc.text('POLITECNICO MANUEL ACEVEDO SERRANO', 10, 20);

doc.setFontSize(14);
doc.text('RIO VERDE ABAJO, CUTUPU, LA VEGA, REP. DOM.  2019-20', 10, 25);
doc.setFontSize(12);
doc.text('Curso: 6B  Estudiante: Juan Antonio Perez  #: 1', 10, 35);

doc.table(10, 38, generateData(8), headers, { fontSize: 10 });

doc.table(10, 172, generateData2(4), headers2, { fontSize: 10 });

fs.writeFileSync('./output.pdf', doc.output());

// doc.save('a4.pdf')

delete global.window;
delete global.navigator;
delete global.btoa;
