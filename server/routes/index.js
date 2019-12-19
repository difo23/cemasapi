const express = require('express');
const app = express();

app.use(require('./estudiante'));
app.use(require('./calificaciones_generales'));
// app.use(require('./calif_tecnica'));
// app.use(require('./calif_completiva'));
// app.use(require('./calif_extraordinaria'));
app.use(require('./profesor'));
app.use(require('./asignaturas_academicas'));
app.use(require('./cursos'));
app.use(require('./periodo_estudiante'));
app.use(require('./tecnicos.js'));
app.use(require('./centros.js'));

module.exports = app;
