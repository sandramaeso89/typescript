import type { Asignatura } from "./asignatura.js";

// Matrícula en curso: lista de asignaturas que está cursando
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

// Unión discriminada: el campo "tipo" nos dice qué forma tiene el objeto
export type EstadoMatricula =
	| MatriculaActiva
	| MatriculaSuspendida
	| MatriculaFinalizada;

// Función auxiliar: el tipo "never" fuerza a que hayamos cubierto todos los casos en el switch.
// Si mañana añades otro estado y olvidas un case, TypeScript se quejará.
function analisisExhaustivoMatricula(casoNoContemplado: never): never {
	throw new Error(
		`generarReporte: estado de matrícula no contemplado (${String(casoNoContemplado)})`,
	);
}

export function generarReporte(estado: EstadoMatricula): string {
	switch (estado.tipo) {
		case "ACTIVA":
			return `Matrícula activa con ${estado.asignaturas.length} asignatura(s) cursando.`;
		case "SUSPENDIDA":
			return `Matrícula suspendida. Motivo: ${estado.motivoSuspension}`;
		case "FINALIZADA":
			return `Matrícula finalizada. Nota media: ${estado.notaMedia.toFixed(2)}`;
		default: {
			const comprobacionExhaustiva: never = estado;
			return analisisExhaustivoMatricula(comprobacionExhaustiva);
		}
	}
}
