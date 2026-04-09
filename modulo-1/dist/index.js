"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_utils_js_1 = require("./math-utils.js");
const datosPrueba = [1, 2, 3, 4, 5, 100];
console.log("Datos de prueba:", datosPrueba);
console.log("Media:", (0, math_utils_js_1.calcularMedia)(datosPrueba));
console.log("Mediana:", (0, math_utils_js_1.calcularMediana)(datosPrueba));
console.log("Sin atípicos (limite 1.5):", (0, math_utils_js_1.filtrarAtipicos)(datosPrueba, 1.5));
