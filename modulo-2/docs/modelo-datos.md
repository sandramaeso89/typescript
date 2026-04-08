# Modelo de datos (módulo 2)

## Entidades de dominio

Se modelan **Estudiante** y **Asignatura** como **interfaces**. Son la forma estable de objetos en el dominio universitario (identidad con `readonly id`, campos mutables de negocio). Se eligió `interface` frente a `type` para estas entidades porque encajan con el modelo orientado a objetos y pueden extenderse o fusionarse por declaración si el proyecto crece.

## Estado de matrícula

**EstadoMatricula** es un **type alias** que une tres **interfaces** (`MatriculaActiva`, `MatriculaSuspendida`, `MatriculaFinalizada`). Aquí conviene el **type** para expresar una **unión discriminada**: la propiedad literal `tipo` actúa como discriminante y permite que `generarReporte` use `switch` con comprobación exhaustiva.

## Respuestas de red y genéricos

**`RespuestaAPI<T>`** es una **interface** genérica que parametriza el payload `datos` con `T`. Así el mismo contrato sirve para cualquier recurso (estudiante, asignatura, listas, etc.) sin perder tipado en el cliente: `obtenerRecurso<Estudiante>(...)` devuelve `Promise<RespuestaAPI<Estudiante>>`. Los genéricos abstraen la forma común de las respuestas HTTP mientras el tipo concreto de `datos` cambia según el endpoint.
