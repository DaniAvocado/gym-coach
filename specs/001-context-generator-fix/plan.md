# Implementation Plan: Memoria del proyecto sin auto-inclusión

**Branch**: `001-context-generator-fix` | **Date**: 2026-11-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-context-generator-fix/spec.md`

## Summary

El script que genera `PROJECT_CONTEXT.md` se incluye a sí mismo en el barrido de archivos, porque su
salida es un `.md` dentro del directorio que recorre. Cada ejecución embebe el archivo anterior
completo: 2.7 MB y ocho copias hoy, 5.5 MB mañana.

El mismo script corrompe acentos al leer y escribir. Con Windows PowerShell 5.1,
`Get-Content -Raw` decodifica como ANSI cualquier archivo UTF-8 sin marca de orden de bytes, y
`Set-Content -Encoding UTF8` escribe con marca. Ambos hechos se verificaron en esta máquina.

El plan corrige las dos causas con cambios quirúrgicos: excluir la salida del barrido, leer y
escribir UTF-8 explícito sin marca, escribir a un temporal y moverlo, y sacar el conocimiento
curado (`anime.js` v4) del archivo generado a un documento propio referenciado desde `AGENTS.md`.

## Technical Context

**Language/Version**: Windows PowerShell 5.1 (Desktop). No hay `pwsh` instalado.

**Primary Dependencies**: ninguna más allá de PowerShell y el sistema de archivos. `node` existe en
la máquina y se usa solo para verificar, no para generar.

**Storage**: sistema de archivos del repositorio. Sin base de datos.

**Testing**: verificación por ejecución real del script y comparación de tamaño, encabezados,
codificación y mojibake. Sin framework de pruebas: el proyecto no tiene uno y este cambio no
justifica introducirlo (Principio II).

**Target Platform**: Windows 10/11 con PowerShell 5.1, sobre un directorio de OneDrive.

**Project Type**: proyecto único (aplicación web Next.js + scripts de mantenimiento en `scripts/`).

**Performance Goals**: una ejecución completa del generador debe terminar en menos de 30 segundos y
en menos de 1 GB de memoria, sobre ~90 archivos.

**Constraints**: el script se invoca sin argumentos desde procesos desatendidos; no puede pedir
interacción. Debe funcionar sobre rutas con espacios y acentos. Debe mantener el archivo resultante
por debajo de 800 KB.

**Scale/Scope**: 1 script modificado, 1 documento curado nuevo, 1 archivo generado regenerado, 1
línea añadida a `AGENTS.md`. ~15 líneas de cambio efectivo en el script.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Evaluación | Estado |
|---|---|---|
| **I.** Reglas en `AGENTS.md`, memoria generada aparte | El plan mueve el conocimiento curado a `docs/anime-v4.md` y lo enlaza desde `AGENTS.md`. Refuerza el principio en vez de violarlo: hoy hay contenido normativo viviendo dentro de un archivo generado. | PASS |
| **II.** Borrado antes que adición | El cambio neto es −2.7 MB y −8 copias, +1 documento de ~90 líneas que ya existe (se mueve, no se redacta de nuevo), +1 línea en `AGENTS.md`. Se corrige en el script compartido una vez, no por llamador. Sin dependencias nuevas, sin framework de pruebas, sin reescritura. | PASS |
| **III.** UTF-8 sin corrupción | Es el núcleo del plan: el generador es la fuente del mojibake (`Stack tÃ©cnico` en la memoria actual). Se corrige en la causa. | PASS |
| **IV.** Límites de confianza en el servidor | No se toca ninguna ruta de `app/api/**`, ni credenciales, ni RLS. El generador ya no incluye `.env*` (solo barre `.md/.ts/.tsx/.js/.jsx/.mjs/.sql/.css`); se verifica que siga siendo así. | PASS (sin cambios) |
| **V.** Nada se publica sin verificarlo | Las puertas de `quickstart.md` son ejecutables: dos corridas, comparación de tamaño, conteo de encabezados, bytes del archivo, búsqueda de mojibake. Publicación por clon temporal, como manda el principio. | PASS |

**Post-diseño (Fase 1)**: se re-evaluó con los artefactos escritos; ningún gate cambia.

## Project Structure

### Documentation (this feature)

```text
specs/001-context-generator-fix/
├── plan.md              # Este archivo
├── research.md          # Fase 0: decisiones técnicas con evidencia
├── data-model.md        # Fase 1: entidades y reglas de validación
├── quickstart.md        # Fase 1: puertas de verificación ejecutables
├── checklists/
│   └── requirements.md  # Calidad de la especificación
└── tasks.md             # Fase 2 (/speckit.tasks — no lo crea este comando)
```

`contracts/` se omite deliberadamente: es un script de mantenimiento interno sin consumidores
externos. Su interfaz completa (sin argumentos, escribe un archivo, imprime una línea con el
recuento) queda descrita en `quickstart.md`; un contrato formal no aportaría nada verificable.

### Source Code (repository root)

```text
scripts/
└── generate-context.ps1     # MODIFICADO: exclusión de la salida + UTF-8 explícito + escritura atómica

docs/
└── anime-v4.md              # NUEVO: conocimiento curado rescatado de PROJECT_CONTEXT.md

AGENTS.md                    # MODIFICADO: una línea que enlaza docs/anime-v4.md

PROJECT_CONTEXT.md           # REGENERADO: sobrescrito por el script corregido
```

**Structure Decision**: proyecto único. El script ya vive en `scripts/`, que es donde el proyecto
guarda sus herramientas de mantenimiento; se queda ahí. El conocimiento curado necesita un
directorio que hoy no existe (`docs/`), así que se crea para ese único archivo. Todo lo demás se
modifica en su sitio.

## Complexity Tracking

> Sin violaciones que justificar. Las dos correcciones del script son de una línea cada una; el
> único archivo nuevo es el destino de contenido que ya existía.
