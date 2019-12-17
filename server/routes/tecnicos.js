const express = require('express');
const app = express();
const _ = require('underscore');
const Tecnicos = require('../models/tecnicos');
const mongoose = require('mongoose');


app.get('/tecnicos', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Tecnicos.find()

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




app.post('/tecnicos', (req, res) => {
	let body = req.body;
    let id = mongoose.Types.ObjectId();
    // var myValue = body.estado;
    // var estado = myValue  == 'true';
	let tecnicos = new  Tecnicos({
		_id: id,
		denominacion: body.denominacion,
		familia_profesional: body.familia_profesional,
        nivel: body.nivel,
        codigo: body.codigo,
        modulos_formativos: body.modulos_formativos,
        modulos_comunes: body.modulos_comunes,
        asignaturas: body.asignaturas
	});

	tecnicos.save((err, tecnicosdb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			tecnicos: tecnicosdb
		});
	});
});

app.put('/tecnicos/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ 'denominacion', 'familia_profesional', 'nivel', 'codigo', 'modulos_formativos','modulos_comunes','asignaturas' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/tecnicos/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
