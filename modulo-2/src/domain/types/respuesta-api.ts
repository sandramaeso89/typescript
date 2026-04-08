export interface RespuestaAPI<T> {
	codigoEstado: number;
	exito: boolean;
	datos: T;
	errores?: string[];
}
