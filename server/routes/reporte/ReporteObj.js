

class ReporteObj {
	constructor(props) {
		this.curso = props.curso;
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

	crearAsignaturas(estudiante) {
		let asignatura = {
			codigo_asignatura: estudiante.codigo_asignatura,
			ago_sept_oct: estudiante.calificaciones.get('ago_sept_oct'),
			nov_dic_ene: estudiante.calificaciones.get('nov_dic_ene'),
			feb_mar: estudiante.calificaciones.get('feb_mar'),
			abr_may_jun: estudiante.calificaciones.get('abr_may_jun'),
			cf: estudiante.calificaciones.get('cf')
		};

		this.asignaturas.push(asignatura);
	}

	crearModulos(estudiante) {
		// console.log('Crear modulos en estudiantes',estudiante)
		let asignatura = {
			codigo_asignatura: estudiante.codigo_asignatura,
			acumulado: estudiante.calificaciones.get('acumulado'),
			total: estudiante.calificaciones.get('total')
		};
		this.modulos.push(asignatura);
	}
}

module.exports = ReporteObj;
