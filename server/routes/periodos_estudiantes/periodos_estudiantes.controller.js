const express = require('express');
const cursosService = require('./periodos_estudiantes.service');
const app = express();

// routes
app.post('/curso/create', register);
app.get('/cursos', getAll);
app.get('/curso/:id', getById);
app.get('/curso/:key/:value', getByCode);
app.put('/curso/:id', update);
app.delete('/curso/:id', _delete);

// functions
function register(req, res) {

    cursosService.create(req.body)
        .then(curso => res.status(201).json({
            curso,
            id: curso._id
        }))
        .catch(err => res.json({ curso: null, err }));
}

function getAll(req, res, next) {
    cursosService.getAll()
        .then(cursos => res.json({
            count: cursoes.length,
            cursos
        }))
        .catch(err => next(err));
}

function getById(req, res, next) {
    cursosService.getById(req.params.id)
        .then(curso => curso ? res.json(curso) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByCode(req, res) {
    console.log(req.params.value, req.params.key);
    cursosService.getByCode(req.params.key, req.params.value)
        .then(data => data ? res.json({ data }) : res.sendStatus(404))
        .catch(err => res.json({ data: [], err }));
}

function update(req, res) {
    console.log('Update curso')
    cursosService.update(req.params.id, req.body)
        .then(curso => res.status(200).json({ update: true, curso }))
        .catch(err => { console.log(err)/*{res.status(204).json({ update: false, err }))}*/ });
}

function _delete(req, res, next) {
    cursosService._delete(req.params.id)
        .then((curso) => res.json({ remove: curso ? true : false, curso }))
        .catch(err => next(err));
}

module.exports = app;
