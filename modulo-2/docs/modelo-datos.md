# Modelo de datos (módulo 2)

## Entidades de dominio

**Estudiante** y **Asignatura** se definen como **interfaces** (modelo de objetos en el dominio universitario). Los identificadores usan **`readonly`**.

## Estado de matrícula

**EstadoMatricula** es un **type** que une tres **interfaces** en una **unión discriminada** por la propiedad literal **`tipo`**.

## Respuestas de red

La interfaz genérica **`RespuestaAPI<T>`** (definida en `src/services/api-client.ts`, según la teoría) parametriza el payload `datos`. El método **`obtenerRecurso<T>`** devuelve **`Promise<RespuestaAPI<T>>`**, de modo que la forma común de la respuesta HTTP se reutiliza y el tipo de `datos` depende del recurso solicitado.
