const express = require('express');
const calificacionesService = require('./calificaciones.service');
const app = express();

// routes
app.post('/calificaciones/create', register);
app.get('/calificaciones', getAll);
app.get('/calificacion/:id', getById);
app.put('/calificacion/:id', update);
app.delete('/calificacion/:id', _delete);


function register(req, res) {

    calificacionesService.create(req.body)
        .then(calificacion => res.json({
            create: true,
            calificacion,
            id: calificacion._id
        }))
        .catch(err => res.json({ create: false, err }));
}

function getAll(req, res, next) {
    calificacionesService.getAll()
        .then(calificaciones => res.json({
            count: calificaciones.length,
            calificaciones
        }))
        .catch(err => next(err));
}

function getById(req, res, next) {
    calificacionesService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res) {
    calificacionesService.update(req.params.id, req.body)
        .then(calificacion => res.json({ update: true, calificacion }))
        .catch(err => res.json({ update: false, err }));
}

function _delete(req, res, next) {
    calificacionesService._delete(req.params.id)
        .then((calificacion) => res.json({ remove: calificacion ? true : false, calificacion }))
        .catch(err => next(err));
}

module.exports = app;