# typescript

Repositorio de la asignatura para la parte de **TypeScript** (Práctica 4). Aquí van los módulos por carpetas (`modulo-1`, `modulo-2`, …), sin anidar otros repositorios dentro.

## Estructura prevista

```text
typescript/
├── modulo-1/          # Laboratorio 1 y ejercicios iniciales
├── modulo-2/          # Siguiente fase (cuando exista)
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

## Licencia y créditos

Según lo indique tu asignatura (rellenar si aplica).
