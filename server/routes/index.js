const express = require('express');
const app = express();


app.use(require('./periodos_estudiantes/periodos_estudiantes.controller'));

app.use(require('./calificaciones/calificaciones.controller'));

app.use(require('./asignaturas_modulos_formativos/asignaturas_modulos_formativos.controller'));
app.use(require('./asignaturas_academicas/asignaturas_academicas.controller'));

app.use(require('./users/users.controller'));





app.use(require('./reportPDF'));
app.use(require('./upload'));


module.exports = app;
