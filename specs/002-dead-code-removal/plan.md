# Implementation Plan: Eliminación de código y dependencias sin uso

**Branch**: `002-dead-code-removal` | **Date**: 2026-11-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-dead-code-removal/spec.md`

## Summary

Eliminar lo que el repositorio declara pero no usa: dos módulos de código sin importadores, dos
dependencias sin consumidor, cinco gráficos de la plantilla inicial, trece tokens de tema con sus
alias y una rama de temporizador que ningún llamador alcanza.

No se refactoriza nada más. La regla de decisión es única y verificable: importadores reales en
código, no nombres ni apariencias. Se excluye lo que el escaneo inicial puso sobre la mesa y debió
descartarse: `NavRow` (ya unificado con variantes), `migration_v3.sql` (migración con historia y
columna leída) y `migration_v4_rls.sql`.

## Technical Context

**Language/Version**: TypeScript 5 / Next.js (versión del proyecto, ver `node_modules`), CSS con
Tailwind v4.

**Primary Dependencies**: las ya instaladas. Este cambio **quita** dos, no añade ninguna.

**Storage**: Supabase (sin cambios). Las migraciones SQL se conservan.

**Testing**: sin framework en el repositorio. La verificación es el escaneo de importadores más
`tsc`, `lint` y `build` (bloques en `quickstart.md`).

**Target Platform**: web (Next.js App Router), desarrollo en Windows.

**Project Type**: proyecto único.

**Performance Goals**: ninguno funcional. Efecto medible: menos archivos que descargar
(5 gráficos) y menos paquetes en la instalación (2).

**Constraints**: comportamiento y apariencia idénticos. Cero archivos o dependencias nuevas.

**Scale/Scope**: 2 módulos, 2 dependencias, 5 recursos públicos, 39 líneas de CSS, 1 firma de hook.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Evaluación | Estado |
|---|---|---|
| **I.** Reglas en `AGENTS.md`, memoria generada aparte | No se toca documentación normativa. El archivo de memoria se regenerará después con el generador ya corregido (spec 001). | PASS |
| **II.** Borrado antes que adición | El cambio es exclusivamente sustracción: −2 módulos, −2 dependencias, −5 recursos, −39 líneas. Sin dependencias nuevas ni framework de pruebas. | PASS |
| **III.** UTF-8 sin corrupción | Se editan `app/globals.css` y `lib/useMuscleCounts.ts` con herramientas que respetan UTF-8; se verifican los bytes al final. | PASS |
| **IV.** Límites de confianza en el servidor | No se toca `app/api/**`, ni RLS, ni credenciales. Se elimina un componente de presentación sin importadores. | PASS |
| **V.** Nada se publica sin verificarlo | `quickstart.md`: escaneo de importadores en cero, `tsc`, `lint`, `build` y arranque real de las rutas. Publicación por clon temporal. | PASS |

**Post-diseño (Fase 1)**: sin cambios en los gates.

## Project Structure

### Documentation (this feature)

```text
specs/002-dead-code-removal/
├── plan.md              # Este archivo
├── research.md          # Evidencia del escaneo (importadores, dependencias, tokens)
├── quickstart.md        # Puertas de verificación ejecutables
├── checklists/
│   └── requirements.md  # Calidad de la especificación
└── tasks.md             # Fase 2 (/speckit.tasks)
```

`data-model.md` y `contracts/` se omiten: no hay entidades persistidas ni interfaces externas. Las
"entidades" del spec son resultados del escaneo, y `research.md` los tabula.

### Source Code (repository root)

```text
components/ui/separator.tsx     # ELIMINADO
lib/macros.ts                  # ELIMINADO
public/file.svg                # ELIMINADO
public/globe.svg               # ELIMINADO
public/next.svg                # ELIMINADO
public/vercel.svg              # ELIMINADO
public/window.svg              # ELIMINADO
package.json                   # MODIFICADO: −lucide-react, −shadcn
package-lock.json              # MODIFICADO: consecuencia de lo anterior
app/globals.css                # MODIFICADO: −13 tokens ×2 bloques, −13 alias
lib/useMuscleCounts.ts         # MODIFICADO: sin parámetro refreshMs ni temporizador
```

**Structure Decision**: proyecto único; todo se elimina o se recorta en su sitio. No se crean
directorios ni archivos.

## Complexity Tracking

> Sin violaciones que justificar. Cada tarea borra o recorta; ninguna añade lógica.
