// Funciones de estadística básica para arrays de números.
// Si el array está vacío, media y mediana devuelven null (no inventamos un número).

export function calcularMedia(valores: readonly number[]): number | null {
	// Sin elementos no hay media definida
	if (valores.length === 0) {
		return null;
	}
	let suma = 0;
	for (const x of valores) {
		suma += x;
	}
	return suma / valores.length;
}

// Ojo: el array tiene que venir ya ordenado de menor a mayor
function medianaDeOrdenados(ordenados: readonly number[]): number {
	const n = ordenados.length;
	const mitad = Math.floor(n / 2);
	// Impar: el del centro es un solo índice
	if (n % 2 === 1) {
		const centro = ordenados[mitad];
		if (centro === undefined) {
			throw new Error("medianaDeOrdenados: índice central fuera de rango");
		}
		return centro;
	}
	// Par: hacemos la media de los dos números centrales
	const izquierda = ordenados[mitad - 1];
	const derecha = ordenados[mitad];
	if (izquierda === undefined || derecha === undefined) {
		throw new Error("medianaDeOrdenados: pares centrales fuera de rango");
	}
	return (izquierda + derecha) / 2;
}

// Primera mitad del array ordenado (sirve para Q1 en el método de Tukey)
function mitadInferior(ordenados: readonly number[]): readonly number[] {
	const mid = Math.floor(ordenados.length / 2);
	return ordenados.slice(0, mid);
}

// Segunda mitad; si la cantidad es impar, el del medio no entra en ninguna mitad
function mitadSuperior(ordenados: readonly number[]): readonly number[] {
	const n = ordenados.length;
	const mid = Math.floor(n / 2);
	return n % 2 === 1 ? ordenados.slice(mid + 1) : ordenados.slice(mid);
}

function cuartilesTukey(valores: readonly number[]): { q1: number; q3: number } {
	if (valores.length === 0) {
		throw new Error("cuartilesTukey: se requiere al menos un valor");
	}
	const ordenados = [...valores].sort((a, b) => a - b);
	const inf = mitadInferior(ordenados);
	const sup = mitadSuperior(ordenados);
	// Con muy pocos datos a veces una mitad sale vacía; en ese caso Q1 y Q3 coinciden
	if (inf.length === 0 || sup.length === 0) {
		const unico = ordenados[0];
		if (unico === undefined) {
			throw new Error("cuartilesTukey: ordenados vacío tras ordenar");
		}
		return { q1: unico, q3: unico };
	}
	return { q1: medianaDeOrdenados(inf), q3: medianaDeOrdenados(sup) };
}

export function calcularMediana(valores: readonly number[]): number | null {
	if (valores.length === 0) {
		return null;
	}
	const ordenados = [...valores].sort((a, b) => a - b);
	return medianaDeOrdenados(ordenados);
}

export function filtrarAtipicos(
	valores: readonly number[],
	limite: number,
): number[] {
	if (valores.length === 0) {
		return [];
	}
	// Si limite no es positivo, no tocamos los datos (evitamos dividir mal el IQR)
	if (limite <= 0) {
		return [...valores];
	}
	const qs = cuartilesTukey(valores);
	const iqr = qs.q3 - qs.q1;
	const inferior = qs.q1 - limite * iqr;
	const superior = qs.q3 + limite * iqr;
	// Nos quedamos solo con los que caen dentro del "corral" [inferior, superior]
	return valores.filter((x) => x >= inferior && x <= superior);
}
