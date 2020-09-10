const express = require('express');
const asignaturas_academicasService = require('./asignaturas_academicas.service');
const app = express();

// routes
app.post('/asignaturas_academicas/create', register);
app.get('/asignaturas_academicas', getAll);
app.get('/asignatura_academica/:id', getById);
app.get('/asignatura_academica/:key/:value', getByCode);
app.put('/asignatura_academica/:id', update);
app.delete('/asignatura_academica/:id', _delete);


function register(req, res) {

    asignaturas_academicasService.create(req.body)
        .then(asignatura_academica => res.json({
            create: true,
            asignatura_academica,
            id: asignatura_academica._id
        }))
        .catch(err => res.json({ create: false, err }));
}

function getAll(req, res, next) {

    console.log('Get ALL Asignatura academica');
    asignaturas_academicasService.getAll()
        .then(asignaturas_academicas => res.json({
            count: asignaturas_academicas.length,
            data: asignaturas_academicas
        }))
        .catch(err => next(err));
}

function getById(req, res, next) {
    asignaturas_academicasService.getById(req.params.id)
        .then(asignatura_academica => asignatura_academica ? res.json(asignatura_academica) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByCode(req, res) {
    console.log(req.params.value);
    asignaturas_academicasService.getByCode(req.params.key, req.params.value)
        .then(data => data ? res.json({ data }) : res.sendStatus(404))
        .catch(err => res.json({ data: [], err }));
}

function update(req, res) {
    console.log('UPDATE ', req.params.id);
    asignaturas_academicasService.update(req.params.id, req.body)
        .then(asignatura_academica => res.json({ update: true, asignatura_academica }))
        .catch(err => res.json({ update: false, err }));
}

function _delete(req, res, next) {
    console.log('Delete ', req.params.id);
    asignaturas_academicasService._delete(req.params.id)
        .then((asignatura_academica) => res.json({ remove: asignatura_academica ? true : false, asignatura_academica }))
        .catch(err => next(err));
}

module.exports = app;
