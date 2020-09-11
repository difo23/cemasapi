const ModelDB = require('../../models/reportes');


mongoose = require('mongoose');

async function create(params) {
    // validate
    console.log('reporte: ')

    const reporte_valid = await ModelDB.findOne({
        codigo_centro: params.centro,
        codigo_curso: params.codigo_curso,
        codigo_periodo: params.codigo_periodo,
        codigo_asignatura: params.codigo_asignatura,
        estado: true

    })

    if (reporte_valid) {

        throw new Error();
    }

    const reporte = new ModelDB({ ...params, _id: mongoose.Types.ObjectId() });

    // save reporte
    await reporte.save();
    console.log('reporte: ', reporte)
    return reporte;

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
    const reporte = await ModelDB.findById(id);

	console.log('reporte', params)

    // no existe lo creo
    if (!reporte) return create(params);

    // copy params properties to reporte
    Object.assign(reporte, params);

	const boletin = new ModelDB(reporte);
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
