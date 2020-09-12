const Reporte = require('../../models/reportes');
const Curso = require('../../models/cursos');
const Calificacion = require('../../models/calificaciones');
const Periodo_Estudiante = require('../../models/periodos_estudiantes');
const ReporteObj = require('./ReporteObj');

mongoose = require('mongoose');

async function create(params) {
    // validate


    const calificaciones_asignaturas = await Calificacion.find(
        { codigo_curso: params.curso, codigo_periodo: params.periodo },
        'codigo_asignatura calificacion_estudiantes'
    )



    const estudiantes_titular = await Periodo_Estudiante.findOne(
        { codigo_curso: params.curso, codigo_periodo: params.periodo },
        'estudiantes_inscritos nombres_titular',
    )



    const reportes_valid = await Reporte.find({

        curso: params.curso,
        codigo_titular: params.titular,
        periodo: params.periodo,
        estado: true

    })



    if (reportes_valid.length > 0) {

        //Elimino todos los reportes existentes

        // await Reporte.deleteMany({
        //     curso: params.curso,
        //     codigo_titular: params.titular,
        //     periodo: params.periodo,
        //     estado: true
        // });


    }

    let regExp_asignatura = new RegExp('^MF');



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



    //Numero de asiganturas por estudiante inscrito (12 x 25 = 300) Refactoring luego.


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
    // _id: mongoose.Types.ObjectId()

    //await Reporte.insertMany(reportes_estudiantes);


    return reportes_estudiantes;


}

async function getAll() {
    return await Reporte.find({ estado: true });
}

async function getByCode(key, value) {
    return await Reporte.find({ [key]: value, estado: true }).sort([['codigo_curso', -1]]);
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



module.exports = {
    create,
    update,
    getAll,
    getById,
    _delete,
    getByCode
};
