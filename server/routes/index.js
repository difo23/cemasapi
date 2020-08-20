const express = require('express');
const app = express();

app.use(require('./estudiante'));
app.use(require('./profesor'));
app.use(require('./asignaturas_academicas'));
app.use(require('./cursos'));
app.use(require('./periodo_estudiante'));
app.use(require('./tecnicos'));
app.use(require('./reportes'));
app.use(require('./calificaciones/calificaciones.controller'));
app.use(require('./reportPDF'));
app.use(require('./upload'));
app.use(require('./users/users.controller'));


module.exports = app;
