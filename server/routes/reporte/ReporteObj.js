

class ReporteObj {
	constructor(props) {


		this.curso = props.curso;
		this.periodo = props.periodo;
		this.numero_estudiante = props.numero_estudiante;
		this.rne = props.rne;
		this.codigo_titular = props.codigo_titular;
		this.nombre_titular = props.nombre_titular;
		this.estado = true;
		this.boletin = `${this.curso}:${this.periodo}:${this.rne}`;
		this.asignaturas = [];
		this.modulos = [];
		this.nombre_estudiante = props.nombre_estudiante;
	}

	getNumero() {
		return this.numero_estudiante
	}

	crearAsignaturas(estudiante) {
		let asignatura = {
			codigo_asignatura: estudiante.codigo_asignatura,
			ago_sept_oct: estudiante.calificaciones.get('ago_sept_oct') || '0',
			nov_dic_ene: estudiante.calificaciones.get('nov_dic_ene') || '0',
			feb_mar: estudiante.calificaciones.get('feb_mar') || '0',
			abr_may_jun: estudiante.calificaciones.get('abr_may_jun') || '0',
			cf: estudiante.calificaciones.get('cf') || '0'
		};

		this.asignaturas.push(asignatura);
	}

	crearModulos(estudiante) {
		// console.log('Crear modulos en estudiantes',estudiante)
		let asignatura = {
			codigo_asignatura: estudiante.codigo_asignatura,
			acumulado: estudiante.calificaciones.get('cf').acumulado || '0',
			total: estudiante.calificaciones.get('cf').total || '0'
		};
		this.modulos.push(asignatura);
	}
}

module.exports = ReporteObj;
