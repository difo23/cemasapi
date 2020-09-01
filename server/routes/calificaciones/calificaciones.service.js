const ModelDB = require('../../models/calificaciones');


mongoose = require('mongoose');

async function create(params) {
    // validate
    console.log('Calificacion: ')

    const calificacion_valid = await ModelDB.findOne({
        codigo_centro: params.centro,
        codigo_curso: params.codigo_curso,
        codigo_periodo: params.codigo_periodo,
        codigo_asignatura: params.codigo_asignatura,
        estado: true

    })

    if (calificacion_valid) {

        throw new Error();
    }

    const calificacion = new ModelDB({ ...params, _id: mongoose.Types.ObjectId() });

    // save calificacion
    await calificacion.save();
    console.log('Calificacion: ', calificacion)
    return calificacion;

}

async function getAll() {
    return await ModelDB.find({ estado: true });
}

async function getByCode(key, value) {
    return await ModelDB.find({ [key]: value, estado: true }).sort([['codigo_curso', -1]]);
}


async function getById(id) {
    return await ModelDB.findById(id);
}

async function update(id, params) {
    const calificacion = await ModelDB.findById(id);

	console.log('Calificacion', params)

    // no existe lo creo
    if (!calificacion) return create(params);

    // copy params properties to calificacion
    Object.assign(calificacion, params);

	const boletin = new ModelDB(calificacion);
    await boletin.save();
	console.log('Calificacion asigancion ', boletin)
    return calificacion;
}

async function _delete(id) {
    const calificacion_valid = await getById(id);
    return await update(id, { ...calificacion_valid, estado: false });
}



module.exports = {
    create,
    update,
    getAll,
    getById,
    _delete,
    getByCode
};
