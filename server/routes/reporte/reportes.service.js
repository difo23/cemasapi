const Reporte = require('../../models/reportes');
const Calificacion = require('../../models/calificaciones');
const Periodo_Estudiante = require('../../models/periodos_estudiantes');
const ReporteObj = require('./ReporteObj');
const ReporteCreate = require('./ReporteCreatePDF');
const fs = require('fs');
var path = require('path');


mongoose = require('mongoose');

async function create(params) {

    //Los reportes debende de las calificaciones y los estudiantes inscritros
    await clean(params);
    const reportes_estudiantes = await createReport(params);
    const reportes = await setCalificaciones(params, reportes_estudiantes);

    await Reporte.insertMany(reportes);
    return reportes_estudiantes;

}


async function pdf(id) {

    console.log(id);

    //_id es el mismo del curso al cual pertenece el reporte.
    const pathPDF = path.join(__dirname, `/pdf/${id}.pdf`);
    const notImagePath = path.join(__dirname, '/pdf/test.webp');

    console.log(pathPDF)

    if (fs.existsSync(pathPDF)) return pathPDF;

    const periodo_estudiante = await Periodo_Estudiante.findById(id)

    const reportes = await Reporte.find({

        curso: periodo_estudiante.codigo_curso,
        codigo_titular: periodo_estudiante.codigo_titular,
        periodo: periodo_estudiante.codigo_periodo,
        estado: true

    })

    if (reportes.length <= 0) return notImagePath;


    const pdf = new ReporteCreate(pathPDF);

    // Hasta  aqui el error

    reportes.forEach((reporte, i) => {

        switch (i % 2) {
            case 0:
                pdf.reporte(reporte, 0);
                break;

            case 1:
                pdf.reporte(reporte, 360);
                pdf.addPage();
                break;

            default:
                break

        }

    })




    pdf.close();


    if (fs.existsSync(pathPDF)) {
        //res.sendFile(pathPDF);
        return pathPDF;

    } else {

        //res.sendFile(notImagePath);
        return notImagePath;
    }

}





async function getAll() {
    return await Reporte.find({ estado: true });
}

async function getByCode(key, value) {

    let [curso, periodo] = value.split(':');

    if(curso == 'todo'){
        key = `periodo`;
        value = `${periodo}`
    }

    return await Reporte.find({ [key]: { $regex: `${value}*` }, estado: true }).sort([['codigo_curso', -1]]);
}


async function getById(id) {
    return await Reporte.findById(id);
}

async function update(id, params) {
    const reporte = await Reporte.findById(id);

    console.log('reporte', params)

    // no existe lo creo
    if (!reporte) return create(params);

    // copy params properties to reporte
    Object.assign(reporte, params);

    const boletin = new Reporte(reporte);
    await boletin.save();
    console.log('reporte asigancion ', boletin)
    return reporte;
}

async function _delete(id) {
    const reporte_valid = await getById(id);
    return await update(id, { ...reporte_valid, estado: false });
}


async function clean(params) {

    const pathPDF = path.join(__dirname, `/pdf/${params._id}.pdf`);

    if (fs.existsSync(pathPDF)) fs.unlinkSync(pathPDF);


    const reportes_valid = await Reporte.find({

        curso: params.curso,
        codigo_titular: params.titular,
        periodo: params.periodo,
        estado: true

    })

    if (reportes_valid.length > 0) {
        //Elimino todos los reportes existentes
        await Reporte.deleteMany({
            curso: params.curso,
            codigo_titular: params.titular,
            periodo: params.periodo,
            estado: true
        });
    }


}


async function createReport(params) {

    const estudiantes_titular = await Periodo_Estudiante.findOne(
        { codigo_curso: params.curso, codigo_periodo: params.periodo, estado: true, codigo_titular: params.titular },
        'estudiantes_inscritos nombre_titular',
    )

    const reportes_estudiantes = []
    estudiantes_titular.estudiantes_inscritos.forEach((estudiante) => {


        const reporte = new ReporteObj({
            curso: params.curso,
            periodo: `${params.periodo}`,
            numero_estudiante: estudiante.get('numero'),
            rne: estudiante.get('rne'),
            codigo_titular: params.titular,
            nombre_titular: estudiantes_titular.nombre_titular,
            boletin: `${params.curso}:${params.periodo}:${estudiante.get('rne')}`,
            nombre_estudiante: `${estudiante.get('nombres')} ${estudiante.get('apellidos')}`
        })

        reportes_estudiantes.push(reporte)

    })

    return reportes_estudiantes;

}


async function setCalificaciones(params, reportes_estudiantes) {

    const calificaciones_asignaturas = await Calificacion.find(
        { codigo_curso: params.curso, codigo_periodo: params.periodo, estado: true, codigo_centro: params.centro },
        'codigo_asignatura calificacion_estudiantes'
    )

    let regExp_asignatura = new RegExp('^MF');

    calificaciones_asignaturas.forEach((calificaciones_asignatura) => {

        const asignatura = calificaciones_asignatura.codigo_asignatura;

        calificaciones_asignatura.calificacion_estudiantes.forEach((calificacion, i) => {

            if (calificacion.get('numero') * 1 === reportes_estudiantes[i].getNumero() * 1) {
                if (regExp_asignatura.test(asignatura)) {
                    //crear modulos
                    reportes_estudiantes[i].crearModulos({
                        codigo_asignatura: asignatura,
                        calificaciones: calificacion
                    });
                } else {
                    // creo asiganaturas
                    reportes_estudiantes[i].crearAsignaturas({
                        codigo_asignatura: asignatura,
                        calificaciones: calificacion
                    });
                }
            }

        })

    })

    return reportes_estudiantes;

}


module.exports = {
    create,
    update,
    getAll,
    getById,
    _delete,
    getByCode,
    pdf
};
