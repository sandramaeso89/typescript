/**
 * Punto de entrada del módulo: aquí solo importamos las funciones de estadística
 * y mostramos resultados en consola con datos de prueba.
 *
 * Nota sobre la ruta "./math-utils.js": aunque el archivo fuente es .ts, con la
 * resolución de módulos de Node/TypeScript se escribe .js porque es lo que existirá
 * en dist/ después de compilar.
 */
import {
	calcularMedia,
	calcularMediana,
	filtrarAtipicos,
} from "./math-utils.js";

// Array de ejemplo: números normales y un valor muy grande (100) para ver el filtro de atípicos
const datosPrueba = [1, 2, 3, 4, 5, 100];

console.log("Datos de prueba:", datosPrueba);
// La media se "tira" hacia arriba por el 100; la mediana es más robusta a eso
console.log("Media:", calcularMedia(datosPrueba));
console.log("Mediana:", calcularMediana(datosPrueba));
// 1.5 es el multiplicador típico del IQR (regla de Tukey); el 100 suele quedar fuera
console.log("Sin atípicos (limite 1.5):", filtrarAtipicos(datosPrueba, 1.5));
