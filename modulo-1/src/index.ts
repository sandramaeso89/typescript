// Archivo de entrada: aquí probamos las funciones de math-utils con datos inventados.
// Importamos con ".js" porque TypeScript compila a JS y Node resuelve el fichero final.
import {
	calcularMedia,
	calcularMediana,
	filtrarAtipicos,
} from "./math-utils.js";

// Array de prueba: el 100 es un valor muy grande respecto al resto (para ver el filtro de atípicos)
const datosPrueba = [1, 2, 3, 4, 5, 100];

console.log("Datos de prueba:", datosPrueba);
console.log("Media:", calcularMedia(datosPrueba));
console.log("Mediana:", calcularMediana(datosPrueba));
// 1.5 es el factor típico en la regla de Tukey (IQR); lo dejamos fijo para el ejemplo
console.log("Sin atípicos (limite 1.5):", filtrarAtipicos(datosPrueba, 1.5));
