const express = require('express');
const app = express();

app.use(require('./estudiante'));
// app.use(require('./calif_general'));
// app.use(require('./calif_tecnica'));
// app.use(require('./calif_completiva'));
// app.use(require('./calif_extraordinaria'));
app.use(require('./profesor'));
app.use(require('./asignatura'));
app.use(require('./curso'));
app.use(require('./periodo_estudiante'));
app.use(require('./tecnicos.js'));
app.use(require('./centros.js'));

module.exports = app;
