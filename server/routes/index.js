const express = require('express');
const app = express();


app.use(require('./periodos_estudiantes/periodos_estudiantes.controller'));

app.use(require('./calificaciones/calificaciones.controller'));

app.use(require('./asignaturas_modulos/asignaturas_modulos.controller'));
app.use(require('./asignaturas_academicas/asignaturas_academicas.controller'));
app.use(require('./reporte/reportes.controller'));


app.use(require('./users/users.controller'));



// TODO: Reporte service.

// app.use(require('./reporte/reportPDF'));
// app.use(require('./reporte/upload'));


module.exports = app;
