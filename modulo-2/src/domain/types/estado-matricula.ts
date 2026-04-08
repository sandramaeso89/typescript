import type { Asignatura } from "./asignatura.js";

export interface MatriculaActiva {
	tipo: "ACTIVA";
	asignaturas: readonly Asignatura[];
}

export interface MatriculaSuspendida {
	tipo: "SUSPENDIDA";
	motivoSuspension: string;
}

export interface MatriculaFinalizada {
	tipo: "FINALIZADA";
	notaMedia: number;
}

export type EstadoMatricula =
	| MatriculaActiva
	| MatriculaSuspendida
	| MatriculaFinalizada;

export function generarReporte(estado: EstadoMatricula): string {
	switch (estado.tipo) {
		case "ACTIVA":
			return `Matrícula activa con ${estado.asignaturas.length} asignatura(s) cursando.`;
		case "SUSPENDIDA":
			return `Matrícula suspendida. Motivo: ${estado.motivoSuspension}`;
		case "FINALIZADA":
			return `Matrícula finalizada. Nota media: ${estado.notaMedia.toFixed(2)}`;
		default: {
			const exhaustivo: never = estado;
			return exhaustivo;
		}
	}
}
