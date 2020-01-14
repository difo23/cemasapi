const NotaAsignaturas = require("./NotaAsignaturas");
const NotaModulos = require( "./NotaModulos");

class ReporteObj{

    constructor(props) {
        this. curso = props.curso;
        this.periodo = props.periodo;
        this.numero_estudiante = props.numero;
        this.rne = props.rne;
        this.titular_codigo = props.titular;
        this.estado = true;
        this.boletin = `${this.curso}:${this.periodo}:${this.rne}`;
        this.asignaturas = [];
        this.modulos = [];
        this.nombre_estudiante = props.nombre;
    }


    crearAsignaturas(estudiante){
        let asignatura = new NotaAsignaturas({
            codigo_asignatura: estudiante.codigo_asignatura,
            ago_sept_oct: estudiante.calificaciones.ago_sept_oct,
            nov_dic_ene: estudiante.calificaciones.nov_dic_ene,
            feb_mar: estudiante.calificaciones.feb_mar,
            abr_may_jun : estudiante.calificaciones.abr_may_jun,
            cf : estudiante.calificaciones.cf
        })
        this.asignaturas.push(asignatura)

    }

    crearModulos(estudiante){
        let asignatura = new NotaModulos({
            codigo_asignatura: estudiante.codigo_asignatura,
            acumulado: estudiante.calificaciones.acumulado,
            total: estudiante.calificaciones.total
        })
        this.modulos.push(asignatura)

    }

}


module.exports = ReporteObj;