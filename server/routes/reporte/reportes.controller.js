const express = require('express');
const reportesService = require('./reportes.service');
const app = express();
var fs = require('fs-extra');
// routes
app.post('/reportes/create', register);
app.get('/reporte/pdf/:_id', createPDF);
app.get('/reportes/:key/:value', getByCode);


// app.get('/reportes/all', getAll);
// app.get('/reporte/:id', getById);
// app.put('/reporte/:id', update);
// app.delete('/reporte/:id', _delete);


function register(req, res) {

    reportesService.create(req.body)
        .then(reportes => res.json({
            create: true,
            reportes
        }))
        .catch(err => res.json({ create: false, err }));
}

function createPDF(req, res) {
    reportesService.pdf(req.params._id)
        .then(path => {
            res.status(200).sendFile(path);
        })

}



// function getAll(req, res, next) {
//     reportesService.getAll()
//         .then(reportes => res.json({
//             count: reportes.length,
//             reportes
//         }))
//         .catch(err => next(err));
// }

// function getById(req, res, next) {
//     reportesService.getById(req.params.id)
//         .then(reporte => reporte ? res.json(reporte) : res.sendStatus(404))
//         .catch(err => next(err));
// }

function getByCode(req, res) {
    console.log(req.params.value);
    reportesService.getByCode(req.params.key, req.params.value)
        .then(data => data ? res.json({ data }) : res.sendStatus(404))
        .catch(err => res.json({ data: [], err }));
}

// function update(req, res) {
//     console.log('UPDATE ', req.params.id);
//     reportesService.update(req.params.id, req.body)
//         .then(reporte => res.json({ update: true, reporte }))
//         .catch(err => res.json({ update: false, err }));
// }

// function _delete(req, res, next) {
//     console.log('Delete ', req.params.id);
//     reportesService._delete(req.params.id)
//         .then((reporte) => res.json({ remove: reporte ? true : false, reporte }))
//         .catch(err => next(err));
// }

module.exports = app;
