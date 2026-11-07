# Fase 1 — Modelo de datos

No hay base de datos involucrada. Las entidades son artefactos del sistema de archivos y valores que
el script deriva de ellos.

## Archivo de memoria del proyecto

`PROJECT_CONTEXT.md` en la raíz del repositorio.

| Campo | Origen | Regla |
|---|---|---|
| Encabezado y fecha de generación | instante de la ejecución | formato `yyyy-MM-dd HH:mm:ss` |
| Inventario de rutas | barrido recursivo, excluyendo dependencias, compilación, control de versiones, carpetas de agente y el propio archivo de salida | exactamente **una** sección por archivo |
| Dependencias declaradas | `package.json` | se incluyen las de ejecución; las de desarrollo no |
| Volcado de código fuente | archivos `*.md`, `*.ts`, `*.tsx`, `*.js`, `*.jsx`, `*.mjs`, `*.sql`, `*.css` | cada archivo bajo un encabezado `### <ruta relativa>` |
| Pie | constante | cierre único del documento |

**Invariantes** (verificables):

1. Contiene exactamente un encabezado `## Archivos del proyecto`.
2. Contiene exactamente un encabezado `## Dependencias (package.json)`.
3. Contiene exactamente un encabezado `## Codigo fuente`.
4. Es UTF-8 sin marca de orden de bytes.
5. Ningún archivo listado en el inventario es `PROJECT_CONTEXT.md`.
6. No contiene valores de `.env*` (el barrido por extensión ya los excluye; se verifica).
7. Su tamaño es estable: dos corridas consecutivas difieren en menos del 5 %.

**Restricción**: es de solo lectura para agentes. Su contenido no establece reglas.

## Documento de reglas de trabajo

`AGENTS.md` en la raíz.

Reglas que lo rigen: es normativo, se edita a mano, y es mucho más pequeño que la memoria. Tras
este cambio gana **una** línea que enlaza `docs/anime-v4.md` como lectura previa a tocar animaciones.

**Invariante**: su tamaño sigue por debajo de 4 KB.

## Conocimiento curado

`docs/anime-v4.md` — documento nuevo, contenido movido desde el final de `PROJECT_CONTEXT.md`.

| Campo | Regla |
|---|---|
| Origen | sección de `anime.js` v4 escrita en una sesión anterior; se traslada íntegra, no se redacta de nuevo |
| Formato | Markdown, UTF-8 sin marca |
| Propiedad | no lo genera ninguna herramienta; no se regenera |
| Alcance | trampas de migración v3→v4, limpieza en React, método de verificación empírica |

## Ejecución del generador

Instancia de la regeneración. No se persiste como archivo; existe como comportamiento observable.

| Campo | Regla |
|---|---|
| Momento | marca de tiempo escrita en el encabezado |
| Archivos incluidos | recuento impreso en la salida estándar (FR-010) |
| Resultado | éxito (deja el archivo y avisa) o fallo (no deja el archivo a medias) |
| Concurrencia | dos ejecuciones simultáneas no producen un archivo truncado; gana una de las dos |

**Transiciones de estado del archivo de memoria**:

```text
ausente ──ejecuta──▶ escrito completo
escrito ──ejecuta──▶ escrito completo (sobrescrito, mismo orden de magnitud)
escrito ──ejecuta (en paralelo)──▶ escrito completo (uno de los dos resultados)
```

Nunca existe el estado "escrito a medias": la escritura va a un temporal y se mueve sobre el
destino.

## Relaciones

```text
AGENTS.md ──enlaza──▶ docs/anime-v4.md
AGENTS.md ──señala──▶ PROJECT_CONTEXT.md   (lectura obligatoria, no normativo)
generador ──produce──▶ PROJECT_CONTEXT.md
generador ──excluye──▶ PROJECT_CONTEXT.md  (no se incluye a sí mismo)
generador ──no toca──▶ AGENTS.md, docs/anime-v4.md
```
