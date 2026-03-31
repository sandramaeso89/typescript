/**
 * Archivo: math-utils.ts
 * Propósito: funciones sueltas para hacer cosas de estadística con arrays de números.
 * Nota: si el array viene vacío, en media y mediana devolvemos null porque no tiene sentido
 *       dar un número (evitamos inventar un resultado).
 */

/**
 * calcularMedia
 * Qué hace: suma todos los números y divide entre cuántos hay (la media que todos conocemos).
 * Por qué puede devolver null: si no hay elementos, no hay "media" definida, así que null.
 * El tipo number | null es para que TypeScript nos obligue a comprobar el null después si hace falta.
 */
export function calcularMedia(valores: readonly number[]): number | null {
	// Caso límite: array vacío → no hay nada que promediar
	if (valores.length === 0) {
		return null;
	}

	// Voy acumulando la suma en esta variable (empieza en 0)
	let suma = 0;
	// Recorro uno a uno; "const x" es cada número del array
	for (const x of valores) {
		suma += x;
	}
	// Al final divido entre el total de elementos para obtener la media
	return suma / valores.length;
}

/**
 * medianaDeOrdenados (función interna, no se exporta)
 * IMPORTANTE: el array que entra aquí tiene que estar YA ORDENADO de menor a mayor.
 * Si la cantidad de números es impar, la mediana es el del medio.
 * Si es par, la mediana es el promedio de los dos del centro (por eso hago (a+b)/2).
 */
function medianaDeOrdenados(ordenados: readonly number[]): number {
	// n = cuántos números tengo
	const n = ordenados.length;
	// mitad me sirve para saber qué índice es "el centro" (o los dos centros si es par)
	const mitad = Math.floor(n / 2);

	// Longitud impar: hay un solo número en el medio
	if (n % 2 === 1) {
		const centro = ordenados[mitad];
		// Esto no debería pasar si n >= 1, pero TypeScript y yo nos aseguramos por si acaso
		if (centro === undefined) {
			throw new Error("medianaDeOrdenados: índice central fuera de rango");
		}
		return centro;
	}

	// Longitud par: cojo el de la izquierda del centro y el de la derecha y hago la media
	const izquierda = ordenados[mitad - 1];
	const derecha = ordenados[mitad];
	if (izquierda === undefined || derecha === undefined) {
		throw new Error("medianaDeOrdenados: pares centrales fuera de rango");
	}
	return (izquierda + derecha) / 2;
}

/**
 * mitadInferior
 * Parte de un array ordenado: me quedo con la "mitad de abajo" (la primera mitad).
 * Lo uso para calcular Q1 en el método de Tukey (no hace falta que lo sepas de memoria:
 * es una forma estándar de sacar cuartiles para detectar outliers).
 */
function mitadInferior(ordenados: readonly number[]): readonly number[] {
	// mid = hasta dónde corto (la mitad redondeada hacia abajo)
	const mid = Math.floor(ordenados.length / 2);
	// slice(0, mid) copia desde el índice 0 hasta antes de mid (no incluye mid)
	return ordenados.slice(0, mid);
}

/**
 * mitadSuperior
 * Igual que la inferior pero con la mitad de arriba; depende de si la cantidad total
 * es par o impar porque el "medio" se calcula distinto (por eso el if con % 2).
 */
function mitadSuperior(ordenados: readonly number[]): readonly number[] {
	const n = ordenados.length;
	const mid = Math.floor(n / 2);
	// Si es impar, el elemento del medio no entra ni en la mitad de abajo ni en la de arriba
	// Si es par, corto desde mid hasta el final
	return n % 2 === 1 ? ordenados.slice(mid + 1) : ordenados.slice(mid);
}

/**
 * cuartilesTukey
 * Devuelve Q1 y Q3 (primer y tercer cuartil) usando el método de bisagras de Tukey.
 * Necesito al menos un número; si no, lanzo error porque es un fallo de programación si me llaman mal.
 * Si solo hay un valor raro, inf o sup pueden quedar vacíos y entonces Q1 y Q3 son ese mismo número.
 */
function cuartilesTukey(valores: readonly number[]): { q1: number; q3: number } {
	if (valores.length === 0) {
		throw new Error("cuartilesTukey: se requiere al menos un valor");
	}

	// Copio el array y lo ordeno para no modificar el original del usuario ([...valores] es copia superficial)
	const ordenados = [...valores].sort((a, b) => a - b);

	const inf = mitadInferior(ordenados);
	const sup = mitadSuperior(ordenados);

	// Caso raro: con muy pocos datos una de las mitades puede salir vacía; uso el único valor que hay
	if (inf.length === 0 || sup.length === 0) {
		const unico = ordenados[0];
		if (unico === undefined) {
			throw new Error("cuartilesTukey: ordenados vacío tras ordenar");
		}
		return { q1: unico, q3: unico };
	}

	// Lo normal: la mediana de la mitad inferior es Q1 y la de la superior es Q3
	return { q1: medianaDeOrdenados(inf), q3: medianaDeOrdenados(sup) };
}

/**
 * calcularMediana
 * Igual idea que la media: si no hay datos, null.
 * Primero ordeno una copia del array (porque la mediana va sobre datos ordenados).
 */
export function calcularMediana(valores: readonly number[]): number | null {
	if (valores.length === 0) {
		return null;
	}
	const ordenados = [...valores].sort((a, b) => a - b);
	return medianaDeOrdenados(ordenados);
}

/**
 * filtrarAtipicos
 * Quita números que se consideran "fuera de lo normal" usando IQR (rango intercuartílico).
 * Fórmula resumida: me quedo con los que están entre
 *   Q1 - limite * IQR  y  Q3 + limite * IQR
 * donde IQR = Q3 - Q1. El limite suele ser 1.5 en muchos libros (como en clase).
 *
 * Si limite es 0 o negativo, no filtro nada (devuelvo todos los números copiados en un array nuevo).
 * Si el array está vacío, devuelvo [] porque no hay nada que filtrar.
 */
export function filtrarAtipicos(
	valores: readonly number[],
	limite: number,
): number[] {
	if (valores.length === 0) {
		return [];
	}
	// Si el límite no tiene sentido, no elimino nada (mejor no romper datos sin criterio claro)
	if (limite <= 0) {
		return [...valores];
	}

	const qs = cuartilesTukey(valores);
	// IQR mide "qué tan dispersos están el bloque central de los datos"
	const iqr = qs.q3 - qs.q1;
	// Cercas: por debajo de inferior o por encima de superior = lo trato como atípico y lo quito
	const inferior = qs.q1 - limite * iqr;
	const superior = qs.q3 + limite * iqr;

	// filter deja solo los que cumplen la condición (dentro del intervalo, inclusive)
	return valores.filter((x) => x >= inferior && x <= superior);
}
