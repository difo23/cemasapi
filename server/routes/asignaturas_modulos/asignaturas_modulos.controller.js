const express = require('express');
const asignaturas_tecnicasService = require('./asignaturas_modulos.service');
const app = express();

// routes
app.post('/asignaturas_tecnicas/create', register);
app.get('/asignaturas_tecnicas', getAll);
app.get('/asignatura_tecnica/:id', getById);
app.get('/asignatura_tecnica/:key/:value', getByCode);
app.put('/asignatura_tecnica/:id', update);
app.delete('/asignatura_tecnica/:id', _delete);


function register(req, res) {

    asignaturas_tecnicasService.create(req.body)
        .then(asignatura_tecnica => res.json({
            create: true,
            asignatura_tecnica,
            id: asignatura_tecnica._id
        }))
        .catch(err => res.json({ create: false, err }));
}

function getAll(req, res, next) {

    console.log('Get ALL Asignatura Tecnica');
    asignaturas_tecnicasService.getAll()
        .then(asignaturas_tecnicas => res.json({
            count: asignaturas_tecnicas.length,
            data: asignaturas_tecnicas
        }))
        .catch(err => next(err));
}

function getById(req, res, next) {
    asignaturas_tecnicasService.getById(req.params.id)
        .then(asignatura_tecnica => asignatura_tecnica ? res.json(asignatura_tecnica) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByCode(req, res) {
    console.log(req.params.value);
    asignaturas_tecnicasService.getByCode(req.params.key, req.params.value)
        .then(data => data ? res.json({ data }) : res.sendStatus(404))
        .catch(err => res.json({ data: [], err }));
}

function update(req, res) {
    console.log('UPDATE ', req.params.id);
    asignaturas_tecnicasService.update(req.params.id, req.body)
        .then(asignatura_tecnica => res.json({ update: true, asignatura_tecnica }))
        .catch(err => res.json({ update: false, err }));
}

function _delete(req, res, next) {
    console.log('Delete ', req.params.id);
    asignaturas_tecnicasService._delete(req.params.id)
        .then((asignatura_tecnica) => res.json({ remove: asignatura_tecnica ? true : false, asignatura_tecnica }))
        .catch(err => next(err));
}

module.exports = app;
