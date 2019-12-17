
const express = require('express');
const app = express();
const _ = require('underscore');
const Calificaciones_generales = require('../models/calificaciones_generales');
const mongoose = require('mongoose');

app.get('/calificaciones_generales', (req, res) => {
	let from = req.query.desde || 0;
	let limite = req.query.limite || 5;
	// esto me permite probar el api cliente server en la misma pc
	res.setHeader('Access-Control-Allow-Origin', '*');

	Calificaciones_generales.find({ activo: true }, '_id codigo_curso codigo_maestro codigo_materia periodo tipo cantidad_estudiantes calificaciones activo')
		.skip(Number(from))
		.limit(Number(limite))
		.exec((err, calificaciones_generales) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			Calificaciones_generales.count({ activo: true }, (err, count) => {
				res.json({
                    ok: true,
                    ja:'hola',
					count,
					calificaciones_generales
				});
			});
		});
});

app.post('/calificaciones_generales', (req, res) => {
	let body = req.body;
	let id = mongoose.Types.ObjectId();
	var myValue = body.activo;
    var activo = myValue == 'true';
	let calificaciones_generales = new Calificaciones_generales({
		_id: id,
		codigo_curso: body.codigo_curso,
		codigo_maestro: body.codigo_maestro,
		codigo_materia: body.materia,
		periodo: body.periodo,
		tipo: body.tipo,
        cantidad_estudiantes: body.cantidad_estudiantes,
        calificaciones: [

             
                {
                    numero : 1,
                    ago_sept_oct : 80,
                    nov_dic_ene : 80,
                    feb_mar : 80,
                    abr_may_jun : 80,
                    cf : 80
                }, 
                {
                    numero : 2,
                    ago_sept_oct : 80,
                    nov_dic_ene : 80,
                    feb_mar : 80,
                    abr_may_jun : 80,
                    cf : 80
                }

         ],
        activo: activo

	});

	calificaciones_generales.save((err, calificaciones_generalesdb) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			calificaciones_generales: calificaciones_generalesdb
		});
	});
});

app.put('/calificaciones_generales/:id', (req, res) => {
	let id = req.params.id;

	let body = _.pick(req.body, [ '_id', 'codigo_curso', 'codigo_maestro', 'codigo_materia', 'periodo', 'tipo', 'cantidad_estudiantes', 'calificaciones', 'activo' ]);

	//new : true se asegura de enviar el objeto actualizado como respuesta
});

app.delete('/calificaciones_generales/:id', (req, res) => {
	let id = req.params.id;
});

module.exports = app;
