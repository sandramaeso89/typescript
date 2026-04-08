# typescript

Repositorio de la asignatura para la parte de **TypeScript** (Práctica 4). Aquí van los módulos por carpetas (`modulo-1`, `modulo-2`, …), sin anidar otros repositorios dentro.

## Estructura prevista

```text
typescript/
├── modulo-1/          # Laboratorio 1
├── modulo-2/          # Laboratorio 2 (dominio, genéricos, cliente API simulado)
└── README.md          # Este archivo
```

El repositorio **react** para el módulo 3 es independiente (no va dentro de este proyecto).

## `modulo-1`

Proyecto Node con TypeScript en modo estricto (`strict: true` en `tsconfig.json`).

| Qué | Dónde |
|-----|--------|
| Código fuente | `modulo-1/src/` |
| Salida compilada | `modulo-1/dist/` (tras `tsc`) |
| Punto de entrada (prueba en consola) | `modulo-1/src/index.ts` |
| Utilidades estadísticas | `modulo-1/src/math-utils.ts` |

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm

### Instalación

```bash
cd modulo-1
npm install
```

### Ejecutar el ejemplo (sin generar `dist/`)

Usa `tsx` para ejecutar el TypeScript directamente:

```bash
cd modulo-1
npx tsx src/index.ts
```

Deberías ver en consola los datos de prueba, la media, la mediana y el array sin valores atípicos (según el método IQR / Tukey).

### Compilar a JavaScript

```bash
cd modulo-1
npx tsc
```

Los `.js` quedan en `dist/` con la misma forma que `src/`. Ahí puedes abrir el JavaScript generado y comprobar que **no quedan tipos** de TypeScript (solo JS ejecutable). Para lanzar la versión compilada con Node:

```bash
node dist/index.js
```

### Contenido de `index.ts`

Importa las funciones desde `math-utils` y define un **array de prueba** (incluye un valor extremo para ilustrar el filtrado). Los comentarios en el archivo explican la ruta con extensión `.js` y qué muestra cada `console.log`.

### Contenido de `math-utils.ts`

Funciones exportadas para práctica de tipos y estadística básica:

- **`calcularMedia(valores)`** — media aritmética; si el array está vacío devuelve `null`.
- **`calcularMediana(valores)`** — mediana; vacío → `null`.
- **`filtrarAtipicos(valores, limite)`** — elimina valores fuera de las cercas tipo **Tukey** (IQR); vacío → `[]`; si `limite <= 0` no filtra.

Los comentarios en ese archivo están pensados para estudiar el código paso a paso.

## `modulo-2`

Laboratorio 2: modelado de dominio, unión discriminada `EstadoMatricula`, `RespuestaAPI<T>` y cliente de datos genérico con `setTimeout` (simulación asíncrona).

| Qué | Dónde |
|-----|--------|
| Tipos de dominio | `modulo-2/src/domain/types/` |
| Servicio API simulado | `modulo-2/src/services/api-client.ts` |
| Documentación del modelo | `modulo-2/docs/modelo-datos.md` |
| Salida compilada | `modulo-2/dist/` (tras `tsc`) |

### Instalación

```bash
cd modulo-2
npm install
```

### Compilar

```bash
cd modulo-2
npx tsc
```

### Contenido principal

- **Interfaces** `Estudiante` y `Asignatura` (IDs `readonly`).
- **Unión discriminada** `EstadoMatricula` (`ACTIVA` / `SUSPENDIDA` / `FINALIZADA`) y función **`generarReporte(estado)`** con `switch` sobre el discriminante.
- **`RespuestaAPI<T>`** y **`obtenerRecurso<T>(endpoint)`** → `Promise<RespuestaAPI<T>>` con validaciones básicas de la respuesta.

Detalle de decisiones de diseño: **`docs/modelo-datos.md`**.

## Licencia y créditos

Según lo indique tu asignatura (rellenar si aplica).
