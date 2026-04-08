import type { RespuestaAPI } from "../domain/types/respuesta-api.js";

function validarRespuestaAPI<T>(respuesta: RespuestaAPI<T>): void {
	if (typeof respuesta.codigoEstado !== "number") {
		throw new Error("Respuesta inválida: codigoEstado debe ser número.");
	}
	if (typeof respuesta.exito !== "boolean") {
		throw new Error("Respuesta inválida: exito debe ser booleano.");
	}
	if (respuesta.exito && (respuesta.codigoEstado < 200 || respuesta.codigoEstado >= 300)) {
		throw new Error("Respuesta inválida: exito true requiere código 2xx.");
	}
	if (!respuesta.exito && respuesta.codigoEstado >= 200 && respuesta.codigoEstado < 300) {
		throw new Error("Respuesta inválida: exito false no debe usar código 2xx.");
	}
}

const demoraMs = 80;

export function obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				if (endpoint.trim() === "") {
					const err: RespuestaAPI<T> = {
						codigoEstado: 400,
						exito: false,
						datos: undefined as T,
						errores: ["El endpoint no puede estar vacío."],
					};
					validarRespuestaAPI(err);
					resolve(err);
					return;
				}

				const ok: RespuestaAPI<T> = {
					codigoEstado: 200,
					exito: true,
					datos: {} as T,
				};
				validarRespuestaAPI(ok);
				resolve(ok);
			} catch (e) {
				reject(e);
			}
		}, demoraMs);
	});
}
