const ModelDB = require('../../models/periodos_estudiantes');
mongoose = require('mongoose');

async function create(params) {
    // validate
    console.log('Curso: ')

    const curso_valid = await ModelDB.findOne({
        codigo_centro: params.codigo_centro,
        codigo_curso: params.codigo_curso,
        codigo_periodo: params.codigo_periodo,
        estado: true

    })

    if (curso_valid) {

        throw new Error();
    }

    const curso = new ModelDB({ ...params, _id: mongoose.Types.ObjectId() });

    // save curso
    await curso.save();
    console.log('curso: ', curso);
    return curso;

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
    const curso = await ModelDB.findById(id);

    // no existe lo creo
    if (!curso) return create(params);

    // copy params properties to calificacion
    Object.assign(curso, params);
    console.log('Update curso', curso)

    const curso_update = new ModelDB(curso);

    await curso_update.save();

    return curso_update;
}

async function _delete(id) {
    const curso_valid = await getById(id);
    return await update(id, { ...curso_valid, estado: false });
}



module.exports = {
    create,
    update,
    getAll,
    getById,
    _delete,
    getByCode
};
