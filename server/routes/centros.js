const express = require('express');
const app = express();
const _ = require('underscore');
const Centros = require('../models/centros');
const mongoose = require('mongoose');


app.get('/centros', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Centros.find()

		.exec((err, estudiantes) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

				res.json({
					ok: true,
					estudiantes
				});
			
		});
});




app.post('/centros', (req, res) => {
	let body = req.body;
    let id = mongoose.Types.ObjectId();
    // var myValue = body.estado;
    // var estado = myValue  == 'true';
	let centros = new  Centros({
		_id: id,
		siglas: body.siglas,
		nombre_centro: body.nombre_centro,
        codigo_centro: body.codigo_centro,
        cursos: body.cursos,
        profesores: body.profesores,
        estudiantes: body.estudiantes,
        asignaturas: body.asignaturas,
        directores: body.directores,
        regional: body.regional,
        provincial: body.provincial,
        telefono: body.telefono,
        email: body.email
	});

	centros.save((err, centrosdb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			centros: centrosdb
		});
	});
});

app.put('/centros/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ 'siglas', 'nombre_centro', 'cursos', 'profesores', 'estudiantes','asignaturas','directores','regional','provincial','telefono','email' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/centros/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
