// Una asignatura de la universidad; el id es fijo una vez creado (readonly).
export interface Asignatura {
	readonly id: string;
	nombre: string;
	creditos: number;
}
