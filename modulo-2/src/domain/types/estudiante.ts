// Representa a una persona matriculada: el id no debería cambiar (por eso readonly).
export interface Estudiante {
	readonly id: string;
	nombreCompleto: string;
	email: string;
}
