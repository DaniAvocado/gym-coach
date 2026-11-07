# gym-coach - Contexto del proyecto

**Auto-generado:** 2026-11-06 22:09:29

## Archivos del proyecto
```
.archify\architecture-gymcoach-20261004-120639\architecture-gym-coach.browser-check.json
.archify\architecture-gymcoach-20261004-120639\architecture-gym-coach.delivery.json
.archify\architecture-gymcoach-20261004-120639\architecture-gym-coach.finalize.json
.archify\architecture-gymcoach-20261004-120639\architecture-gym-coach.finalize-summary.json
.archify\architecture-gymcoach-20261004-120639\architecture-gym-coach.html
.archify\architecture-gymcoach-20261004-120639\candidate.json
.env.local
.env.local.example
.gstack\browse-daemon.log
.specify\feature.json
.specify\init-options.json
.specify\integration.json
.specify\integrations\opencode.manifest.json
.specify\integrations\speckit.manifest.json
.specify\memory\.constitution-template.json
.specify\memory\constitution.md
.specify\scripts\powershell\check-prerequisites.ps1
.specify\scripts\powershell\common.ps1
.specify\scripts\powershell\create-new-feature.ps1
.specify\scripts\powershell\resolve-template.ps1
.specify\scripts\powershell\setup-plan.ps1
.specify\scripts\powershell\setup-tasks.ps1
.specify\templates\checklist-template.md
.specify\templates\constitution-template.md
.specify\templates\plan-template.md
.specify\templates\spec-template.md
.specify\templates\tasks-template.md
.specify\workflows\speckit\workflow.yml
.specify\workflows\workflow-registry.json
AGENTS.md
app\api\coach\route.ts
app\auth\page.tsx
app\dashboard\page.tsx
app\favicon.ico
app\globals.css
app\layout.tsx
app\page.tsx
CHANGELOG.md
CLAUDE.md
components.json
components\AnimatedBackground.tsx
components\anime-demo.tsx
components\BodyMapVisual.tsx
components\CoachRecommendations.tsx
components\Dashboard.tsx
components\DashboardOverview.tsx
components\ExerciseCatalog.tsx
components\ExerciseDetailModal.tsx
components\intro-reveal.tsx
components\logo-3d.tsx
components\MealTracker.tsx
components\MuscleMap.tsx
components\page-transition.tsx
components\PointsDisplay.tsx
components\ProgressiveOverload.tsx
components\RecoveryZone.tsx
components\Routines.tsx
components\scramble-text.tsx
components\SetDetail.tsx
components\SpotifyWidget.tsx
components\ui\badge.tsx
components\ui\button.tsx
components\ui\card.tsx
components\ui\input.tsx
components\ui\label.tsx
components\UserProfile.tsx
components\WorkoutHistory.tsx
components\WorkoutTimer.tsx
components\WorkoutTracker.tsx
docs\anime-v4.md
eslint.config.mjs
lib\exercises.ts
lib\exercises_seed.sql
lib\exercise-utils.ts
lib\migration_profile.sql
lib\migration_v2.sql
lib\migration_v3.sql
lib\migration_v4_rls.sql
lib\migrations\005_add_workout_guide_fields.sql
lib\muscle-map.ts
lib\muscle-meta.ts
lib\names_es.ts
lib\nutrition.ts
lib\rls.sql
lib\schema.sql
lib\supabase.ts
lib\translate.ts
lib\useMuscleCounts.ts
lib\utils.ts
next.config.ts
next-env.d.ts
opencode.json
package.json
PONYTAIL_AGENTS.md
postcss.config.mjs
PROJECT_CONTEXT_animejs_resumen.md
README.md
scripts\generate-context.ps1
scripts\import_free_exercise_db.js
scripts\translate_free_db.js
specs\001-context-generator-fix\checklists\requirements.md
specs\001-context-generator-fix\data-model.md
specs\001-context-generator-fix\plan.md
specs\001-context-generator-fix\quickstart.md
specs\001-context-generator-fix\research.md
specs\001-context-generator-fix\spec.md
specs\001-context-generator-fix\tasks.md
specs\002-dead-code-removal\checklists\requirements.md
specs\002-dead-code-removal\plan.md
specs\002-dead-code-removal\quickstart.md
specs\002-dead-code-removal\research.md
specs\002-dead-code-removal\spec.md
specs\002-dead-code-removal\tasks.md
tsconfig.json
tsconfig.tsbuildinfo
workflows\changelog-app.json
workflows\monitor-carpeta.json
```

## Dependencias (package.json)
```json
{
    "@base-ui/react":  "^1.8.0",
    "@bryllim/workout-guide":  "^1.0.0",
    "@supabase/supabase-js":  "^2.110.9",
    "animejs":  "^4.5.0",
    "class-variance-authority":  "^0.7.1",
    "cn":  "^0.4.0",
    "next":  "16.2.12",
    "react":  "19.2.4",
    "react-dom":  "19.2.4",
    "shadcn":  "^4.21.1",
    "three":  "^0.184.0",
    "tw-animate-css":  "^1.4.0"
}
```

## Codigo fuente

### .specify\memory\constitution.md

```
<!--
Sync Impact Report
- Version change: template (sin ratificar) → 1.0.0
- Modified principles: n/a (ratificación inicial)
- Added sections: Principios Fundamentales (5), Restricciones Técnicas y de Entorno,
  Flujo de Desarrollo, Governance
- Removed sections: ninguna
- Follow-up TODOs: ninguno
-->
# Constitución de gym-coach

## Principios Fundamentales

### I. Reglas en AGENTS.md, memoria generada aparte

`AGENTS.md` es la única fuente de verdad de las reglas operativas del proyecto. Toda sesión MUST
leerlo antes de tocar código. `PROJECT_CONTEXT.md` es **memoria generada** por
`scripts/generate-context.ps1`, no un documento curado: MUST NOT editarse a mano, y su contenido
no establece reglas. Cuando una decisión de arquitectura, una fórmula o una convención nueva
importe, MUST escribirse en `AGENTS.md` y en el código que la aplica, no solo en la conversación.

**Rationale**: el archivo generado ha acumulado copias duplicadas de sí mismo y ya contiene texto
corrupto; tratarlo como normativo propaga errores. Las reglas viven en un archivo pequeño, legible
y versionado.

### II. Borrado antes que adición

Ninguna línea se escribe sin justificar que debe existir. En orden, MUST agotarse: (1) no
construirlo si nadie lo pidió; (2) reutilizar el helper, hook o componente que ya está en el repo;
(3) la biblioteca estándar; (4) la plataforma; (5) una dependencia ya instalada; (6) una línea.
Solo entonces se escribe lo mínimo que funciona.

Concretamente:

- MUST NOT añadirse dependencias nuevas si el stack instalado lo cubre.
- MUST NOT añadirse abstracciones, capas, tipos de conversión ni opciones que nadie pidió.
- Código muerto, assets sin referencias y exports sin consumidores MUST eliminarse, no comentarse.
- Lógica duplicada MUST corregirse una vez, en el punto compartido, no parchearse por llamador.
- Toda simplificación con un techo conocido MUST llevar un comentario `shortcut:` que nombre el
  techo y la vía de actualización.

**Rationale**: el proyecto nació rápido y ya arrastra código sin uso; cada adición sin justificar
encarece el siguiente cambio.

### III. UTF-8 sin corrupción

Todos los archivos de código y documentación MUST estar en UTF-8 sin BOM, con los acentos y
símbolos intactos. Las ediciones MUST hacerse con herramientas que respeten UTF-8; MUST NOT usarse
`Get-Content` / `WriteAllText` de PowerShell sobre código fuente, porque reinterpreta la codificación
y corrompe los caracteres no ASCII.

Verificación obligatoria antes de cerrar un cambio que toque texto: buscar `Ã`, `Â`, `ǭ` y el carácter de reemplazo U+FFFD en
`app/`, `components/` y `lib/` y no encontrar nada nuevo. Si un archivo ya trae texto corrupto y el
cambio lo toca, MUST corregirse en ese cambio.

**Rationale**: ya existen cadenas corruptas en producción (`'Body invǭlido'` en
`app/api/coach/route.ts`) y pérdidas de acentos al editar por shell. Es un defecto visible para el
usuario y trivial de prevenir.

### IV. Los límites de confianza se validan en el servidor

- `SUPABASE_SERVICE_ROLE_KEY` MUST usarse únicamente en `app/api/**`. El cliente MUST NOT recibirla.
- Toda ruta de `app/api/**` MUST validar la forma del cuerpo antes de usarlo, MUST aplicar límite de
  tasa por origen y MUST devolver errores tipados, nunca stack traces.
- El acceso al cliente MUST apoyarse en Row Level Security. Las políticas MUST estar versionadas en
  `lib/*.sql` junto al esquema que las necesita.
- Datos del cliente (perfil, entrenamientos, comidas) MUST considerarse no confiables hasta
  validarse en el servidor.
- Entradas de usuario que se renderizan MUST escapar por defecto; `dangerouslySetInnerHTML` MUST
  justificarse en un comentario junto a la línea.

**Rationale**: el backend es Supabase sin capa propia de autorización; toda la seguridad depende de
la anon key del cliente y de RLS. Una sola ruta sin validar expone datos de todos los usuarios.

### V. Nada se publica sin verificarlo

Antes de publicar, en orden y sin saltos:

1. `npx tsc --noEmit` sin errores.
2. `npm run lint` sin errores nuevos.
3. `npm run build` verde en todas las rutas.
4. Verificación en runtime de lo que cambió de comportamiento: la animación se mueve con la
   amplitud esperada, la ruta responde, el estado persiste. Leer el código no es verificar.

Publicar MUST hacerse por un clon de trabajo limpio, nunca reescribiendo el historial local. Sobre
OneDrive, `git push` desde el directorio del proyecto falla con `fatal: mmap failed:
Invalid argument`; MUST clonarse el remoto a un directorio temporal, aplicar el diff ahí y hacer
push desde el clon. MUST NOT resetearse un historial local divergente para "arreglarlo".

**Rationale**: el repo vive en OneDrive, donde git falla de formas no obvias, y el historial local
ha divergido del remoto más de una vez. Un force-push destruiría commits que sí existen.

## Restricciones Técnicas y de Entorno

**Stack fijado**: Next.js 16 (App Router), React 19, Tailwind 4, anime.js v4, Supabase
(Postgres + Auth), Vercel. Sustituir cualquiera de estas piezas es una decisión de arquitectura y
requiere enmienda a esta constitución.

**Next.js 16 no es Next.js 15**: la API, las convenciones y la estructura de archivos difieren de
las versiones anteriores. Antes de escribir código de framework MUST consultarse la guía
correspondiente en `node_modules/next/dist/docs/`. El conocimiento previo no es evidencia.

**anime.js v4 no es v3**: una ease inválida no lanza error, cae silenciosamente a `linear`; los
easings van sin prefijo `ease`; `direction` fue reemplazado por `alternate` / `reversed`; `loop: 1`
son dos iteraciones. Todo efecto MUST devolver cleanup (`return () => { utils.remove(el) }`).

**Idioma**: la interfaz y los documentos del proyecto están en español. Identificadores de código
en inglés; las cadenas visibles, en español.

**Sin backend propio**: no hay servidor de aplicación más allá de las rutas de `app/api/**`.
Cualquier necesidad de proceso persistente MUST resolverse con Supabase o con `workflows/` de n8n.

## Flujo de Desarrollo

El trabajo sobre el repositorio sigue el ciclo de Spec Kit:

1. `/speckit.specify` — qué se quiere y por qué. Sin decisiones de implementación.
2. `/speckit.clarify` — resolver ambigüedades antes de planificar.
3. `/speckit.plan` — cómo se construye, contra esta constitución.
4. `/speckit.tasks` — descomposición ejecutable.
5. `/speckit.implement` — ejecución.

Cada spec MUST declarar qué criterio de esta constitución toca y cómo se verifica. Un cambio que
viole un principio MUST rechazarse o MUST tramitarse como enmienda, no como excepción silenciosa.

**Puertas de calidad** (obligatorias, en este orden): tipos → lint → build → verificación en
runtime → revisión del diff → publicación por clon temporal → verificación en producción.

**Alcance**: un spec hace una cosa. Si durante `/speckit.implement` aparece trabajo no especificado,
MUST anotarse para un spec aparte en vez de colarse en el diff.

## Governance

Esta constitución prevalece sobre cualquier otra práctica, guía o preferencia, incluido el archivo
de memoria generado.

**Enmiendas**: cualquier cambio MUST proponerse por escrito con el principio afectado, la razón y el
impacto sobre el código existente. MUST aprobarlo el mantenedor del repositorio y MUST registrarse
con un incremento de versión semántica y la fecha de enmienda actualizada.

**Versionado**:

- MAJOR: se elimina o se redefine un principio de forma incompatible.
- MINOR: se añade un principio o una sección, o se amplía materialmente una guía existente.
- PATCH: aclaraciones, redacción y correcciones que no cambian el significado.

**Cumplimiento**: toda revisión de un cambio MUST verificar los cinco principios. La complejidad
añadida MUST justificarse contra el Principio II. Un incumplimiento detectado después de publicar
MUST abrirse como spec de corrección, no como nota al margen.

**Version**: 1.0.0 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-06

```

### .specify\templates\checklist-template.md

```
# [CHECKLIST TYPE] Checklist: [FEATURE NAME]

**Purpose**: [Brief description of what this checklist covers]
**Created**: [DATE]
**Feature**: [Link to spec.md or relevant documentation]

**Note**: This custom checklist is generated by the `/speckit.checklist` command based on feature context and requirements.
**Review Ownership**: This checklist is a reviewer-owned requirements-quality review artifact. Mark an item `[x]` only when the reviewer determines the requirements-quality criterion is satisfied.
**Marker Semantics**: `[x]` means the criterion has been reviewed and satisfied for requirements quality. It does not mean implementation work is complete.

<!--
  ============================================================================
  IMPORTANT: The checklist items below are SAMPLE ITEMS for illustration only.

  The /speckit.checklist command MUST replace these with actual items based on:
  - User's specific checklist request
  - Feature requirements from spec.md
  - Technical context from plan.md
  - Implementation details from tasks.md

  DO NOT keep these sample items in the generated checklist file.
  ============================================================================
-->

## [Category 1]

- [ ] CHK001 First checklist item with clear action
- [ ] CHK002 Second checklist item
- [ ] CHK003 Third checklist item

## [Category 2]

- [ ] CHK004 Another category item
- [ ] CHK005 Item with specific criteria
- [ ] CHK006 Final item in this category

## Notes

- Mark items `[x]` only after review confirms the requirement-quality criterion is satisfied
- Leave items unchecked when they still require clarification, correction, or reviewer evaluation
- `/speckit.implement` reads checklist checkbox state as a gate and must not modify markers
- `checklists/requirements.md` has a separate built-in lifecycle maintained by `/speckit.specify` and `/speckit.clarify`
- Add comments or findings inline
- Link to relevant resources or documentation
- Items are numbered sequentially for easy reference

```

### .specify\templates\constitution-template.md

```
# [PROJECT_NAME] Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### [PRINCIPLE_1_NAME]
<!-- Example: I. Library-First -->
[PRINCIPLE_1_DESCRIPTION]
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### [PRINCIPLE_2_NAME]
<!-- Example: II. CLI Interface -->
[PRINCIPLE_2_DESCRIPTION]
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### [PRINCIPLE_3_NAME]
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
[PRINCIPLE_3_DESCRIPTION]
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Integration Testing -->
[PRINCIPLE_4_DESCRIPTION]
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## [SECTION_2_NAME]
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->

```

### .specify\templates\plan-template.md

```
# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command; its definition describes the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

```

### .specify\templates\spec-template.md

```
# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`

**Created**: [DATE]

**Status**: Draft

**Input**: User description: "$ARGUMENTS"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]

## Assumptions

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right assumptions based on reasonable defaults
  chosen when the feature description did not specify certain details.
-->

- [Assumption about target users, e.g., "Users have stable internet connectivity"]
- [Assumption about scope boundaries, e.g., "Mobile support is out of scope for v1"]
- [Assumption about data/environment, e.g., "Existing authentication system will be reused"]
- [Dependency on existing system/service, e.g., "Requires access to the existing user profile API"]

```

### .specify\templates\tasks-template.md

```
---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Setup database schema and migrations framework
- [ ] T005 [P] Implement authentication/authorization framework
- [ ] T006 [P] Setup API routing and middleware structure
- [ ] T007 Create base models/entities that all stories depend on
- [ ] T008 Configure error handling and logging infrastructure
- [ ] T009 Setup environment configuration management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T011 [P] [US1] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create [Entity1] model in src/models/[entity1].py
- [ ] T013 [P] [US1] Create [Entity2] model in src/models/[entity2].py
- [ ] T014 [US1] Implement [Service] in src/services/[service].py (depends on T012, T013)
- [ ] T015 [US1] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T016 [US1] Add validation and error handling
- [ ] T017 [US1] Add logging for user story 1 operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

```

### AGENTS.md

```
# Gym Coach — Guía para Agentes IA

## Ruta del proyecto
`C:\Users\DANIEL\OneDrive - mail.uniatlantico.edu.co\Documentos\PROYECTOS\gym-coach`

## MEMORIA OBLIGATORIA
Antes de tocar código, lee `PROJECT_CONTEXT.md` (arquitectura, fórmulas, historial, decisiones).
Ese archivo es la fuente de verdad del proyecto — no releer conversaciones antiguas.
Antes de tocar animaciones, lee `docs/anime-v4.md` (trampas de anime.js v4; es curado, no se regenera).

## Rutas de trabajo
- App local: `npm run dev` en la raíz → http://localhost:3000
- Deploy: Vercel → https://gym-coach-acme-de5d.vercel.app
- Repo: https://github.com/DaniAvocado/gym-coach
- n8n: http://localhost:5678 (API key en env `N8N_API_KEY`)
- Workflows n8n exportados: `workflows/*.json`

## Encodings
Los archivos deben guardarse en UTF-8. NO usar PowerShell `Get-Content`/`WriteAllText`
para editar (corrompe acentos). Usar herramientas de edición que respeten UTF-8.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

```

### app\api\coach\route.ts

```
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { calculateTDEE } from '@/lib/nutrition'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const rateLimit = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 30) return false
  entry.count++
  return true
}

interface Profile {
  weight_kg?: number
  height_cm?: number
  age?: number
  gender?: string
  activity_level?: string
  metabolic_rate?: string
  goal?: string
  experience_level?: string
}

function validateInput(body: any) {
  if (!body || typeof body !== 'object') return { ok: false as const, error: 'Body inválido' }
  const { workouts, meals, profile, message, history } = body
  if (workouts && !Array.isArray(workouts)) return { ok: false as const, error: 'workouts debe ser array' }
  if (meals && !Array.isArray(meals)) return { ok: false as const, error: 'meals debe ser array' }
  if (profile && typeof profile !== 'object') return { ok: false as const, error: 'profile debe ser object' }
  if (message && typeof message !== 'string') return { ok: false as const, error: 'message debe ser string' }
  if (history && !Array.isArray(history)) return { ok: false as const, error: 'history debe ser array' }
  return { ok: true as const, workouts: workouts || [], meals: meals || [], profile: profile || {}, message: message || '', history: history || [] }
}

function computeStats(workouts: any[], meals: any[], profile: Profile) {
  const w = profile.weight_kg || 75
  const h = profile.height_cm || 175
  const a = profile.age || 25
  const g = profile.gender || 'male'
  const act = profile.activity_level || 'moderate'
  const meta = profile.metabolic_rate || 'normal'
  const goal = profile.goal || 'hypertrophy'
  const exp = profile.experience_level || 'beginner'

  const tdee = calculateTDEE(w, h, a, g, act, meta)
  const calTarget = goal === 'hypertrophy' ? tdee + 300 : goal === 'strength' ? tdee + 200 : goal === 'weight_loss' ? tdee - 400 : tdee
  const proteinTarget = Math.round(w * (goal === 'weight_loss' ? 2.4 : goal === 'hypertrophy' ? 2.2 : 2.0))
  const fatTarget = Math.round(w * (goal === 'endurance' ? 1.0 : goal === 'strength' ? 0.9 : goal === 'weight_loss' ? 0.7 : 0.8))
  const carbsTarget = Math.round((calTarget - (proteinTarget * 4 + fatTarget * 9)) / 4)

  const totalSets = workouts.reduce((sum: number, wk: any) => sum + (wk.workout_sets?.length || 0), 0)
  const totalCalories = meals.reduce((sum: number, m: any) => sum + (m.calories || 0), 0)
  const avgCals = meals.length ? Math.round(totalCalories / 7) : 0
  const totalProtein = meals.reduce((sum: number, m: any) => sum + (m.protein || 0), 0)
  const avgProtein = meals.length ? Math.round(totalProtein / 7) : 0
  const sessions = workouts.length

  const exerciseBreakdown: Record<string, { sets: number; weight: number; reps: number }> = {}
  workouts.forEach((wk: any) => {
    wk.workout_sets?.forEach((s: any) => {
      const name = s.exercises?.name || s.exercise_id
      if (!exerciseBreakdown[name]) exerciseBreakdown[name] = { sets: 0, weight: 0, reps: 0 }
      exerciseBreakdown[name].sets++
      exerciseBreakdown[name].weight += s.weight || 0
      exerciseBreakdown[name].reps += s.reps || 0
    })
  })

  const topExercises = Object.entries(exerciseBreakdown)
    .sort((a, b) => b[1].sets - a[1].sets)
    .slice(0, 10)
    .map(([name, data]) => ({
      name,
      total_sets: data.sets,
      avg_weight: data.weight > 0 ? Math.round(data.weight / data.sets * 10) / 10 : 0,
      avg_reps: Math.round(data.reps / data.sets),
    }))

  return { w, goal, exp, tdee, calTarget, proteinTarget, fatTarget, carbsTarget, totalSets, avgCals, avgProtein, sessions, topExercises }
}

function statsToContext(stats: ReturnType<typeof computeStats>): string {
  return `CONTEXTO DEL USUARIO:
- Objetivo: ${stats.goal}
- Experiencia: ${stats.exp}
- TDEE: ${stats.tdee} kcal/día
- Meta calórica: ${stats.calTarget} kcal
- Meta macros: P${stats.proteinTarget}g / G${stats.fatTarget}g / C${stats.carbsTarget}g
- Sesiones esta semana: ${stats.sessions}
- Sets totales: ${stats.totalSets}
- Promedio kcal/día: ${stats.avgCals || 'sin datos'}
- Promedio proteína/día: ${stats.avgProtein || 'sin datos'}g
- Top ejercicios: ${stats.topExercises.map(e => `${e.name} (${e.total_sets} sets, ~${e.avg_weight}kg × ${e.avg_reps} reps)`).join(', ') || 'sin datos'}`
}

function fallbackRecommendations(stats: ReturnType<typeof computeStats>): string[] {
  const { calTarget, avgCals, avgProtein, proteinTarget, sessions, totalSets, goal, exp, w } = stats
  const recs: string[] = []

  if (avgCals > 0) {
    const diff = avgCals - calTarget
    if (Math.abs(diff) < 200) recs.push(`[OK] **Nutrición en punto** — Tu ingesta promedio (${avgCals} kcal) está alineada con tu objetivo de ${calTarget} kcal.`)
    else if (diff > 0 && (goal === 'weight_loss' || goal === 'definition'))
      recs.push(`[!] **Superávit no deseado** — Estás consumiendo ${diff} kcal sobre tu objetivo. Reduce ~${Math.abs(diff)} kcal/día o aumenta el NEAT.`)
    else if (diff < 0 && (goal === 'hypertrophy' || goal === 'strength'))
      recs.push(`[!] **Déficit involuntario** — Estás ${Math.abs(diff)} kcal bajo tu objetivo de ${calTarget} kcal. Añade una comida extra o aumenta porciones.`)
    else recs.push(`[D] **Ingesta actual:** ${avgCals} kcal/día. Objetivo: ~${calTarget} kcal.`)
  }

  if (avgProtein > 0) {
    const pct = Math.round((avgProtein / proteinTarget) * 100)
    if (pct >= 90) recs.push(`[OK] **Proteína en rango** — Consumes ~${avgProtein}g/día (${pct}% de tu meta de ${proteinTarget}g).`)
    else recs.push(`[!] **Aumenta proteína** — Consumes ${avgProtein}g/día, necesitas ~${proteinTarget}g.`)
  } else {
    recs.push(`[i] **Proteína objetivo:** ${proteinTarget}g/día (${(proteinTarget / w).toFixed(1)} g/kg).`)
  }

  if (sessions >= 5) recs.push(`[OK] **Frecuencia:** ${sessions} sesiones/semana. Excelente.`)
  else if (sessions >= 3) recs.push(`[^] **Frecuencia:** ${sessions} sesiones. Bien, pero apunta a 5-6.`)
  else recs.push(`[!] **Frecuencia baja:** ${sessions} sesiones. Mínimo: 4-5/semana.`)

  if (totalSets >= 40) recs.push(`[OK] **Volumen:** ${totalSets} sets/semana. Rango óptimo.`)
  else if (totalSets >= 20) recs.push(`[D] **Volumen:** ${totalSets} sets/semana. Intenta llegar a 40+.`)
  else recs.push(`[G] **Volumen bajo:** ${totalSets} sets. Apunta a 10-20 por grupo.`)

  if (exp === 'beginner') recs.push(`[>] **Principiante** — Sobrecarga progresiva lineal: sube 2.5kg o 1 rep por sesión.`)
  else if (exp === 'intermediate') recs.push(`[>] **Intermedio** — Periodización: 3-4 semanas progresión + 1 descarga al 60-70%.`)

  recs.push(`[>] **Sobrecarga** — Sube 2.5kg en compuestos cuando completes todas las reps.`)
  if (totalSets > 60) recs.push(`[!] **Volumen muy alto** — Más de 60 sets/semana puede causar sobreentrenamiento.`)
  recs.push(`[>] **RIR** — Deja 1-2 reps en reserve. Fallo solo en última serie del último ejercicio.`)
  recs.push(`[T] **Distribución** — ${calTarget} kcal en 4-5 comidas.`)
  recs.push(`[Z] **Sueño** — 7-9h. Crecimiento muscular ocurre fuera del gym.`)
  recs.push(`[W] **Agua** — ${Math.round(w * 0.04)}L/día (${w}kg × 40ml).`)

  return recs
}

async function llmChat(stats: ReturnType<typeof computeStats>, message: string, history: { role: string; content: string }[]): Promise<string | null> {
  const baseUrl = process.env.COACH_LLM_BASE_URL
  const apiKey = process.env.COACH_LLM_API_KEY
  if (!baseUrl || !apiKey) return null

  const systemMsg = `Eres un coach de fitness y nutrición certificado, directo y práctico. Hablas en español.
Usas evidencia científica. Respondes corto (2-4 oraciones máximo salvo que te pidan más.
El usuario tiene estos datos:
${statsToContext(stats)}

Si te preguntan algo que no puedes responder con los datos, di que no tienes esa información.
NO inventes datos que no estén en el contexto.
NO des recomendaciones médicas.`

  const messages = [
    { role: 'system', content: systemMsg },
    ...history.slice(-10),
    { role: 'user', content: message },
  ]

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30_000),
    })

    if (!res.ok) return null
    const data = await res.json()
    return data.choices?.[0]?.message?.content || null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Demasiadas peticiones. Espera 1 min.' }, { status: 429 })
    }

    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const validated = validateInput(body)
    if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 })

    const { workouts, meals, profile, message, history } = validated
    const stats = computeStats(workouts, meals, profile)

    // No message = initial analysis
    if (!message) {
      const llmRecs = await llmChat(stats, 'Analiza mi progreso y dame recomendaciones personalizadas.', [])
      if (llmRecs) {
        return NextResponse.json({ reply: llmRecs, source: 'llm' })
      }
      return NextResponse.json({ recommendations: fallbackRecommendations(stats), source: 'fallback' })
    }

    // Chat message
    const reply = await llmChat(stats, message, history)
    if (reply) {
      return NextResponse.json({ reply, source: 'llm' })
    }
    return NextResponse.json({ reply: 'No pude procesar tu pregunta. Intenta de nuevo.', source: 'fallback' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al analizar progreso' }, { status: 500 })
  }
}

```

### app\auth\page.tsx

```
'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { animate, createTimeline } from 'animejs'
import AnimatedBackground from '@/components/AnimatedBackground'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [mode, setMode] = useState<'auth' | 'forgot' | 'reset'>('auth')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const mounted = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('reset')) setMode('reset')
  }, [])

  useEffect(() => {
    if (reducedMotion()) return
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
      .add('.auth-card', { opacity: [0, 1], translateY: [26, 0], duration: 650 })
      .add('.auth-title', { opacity: [0, 1], translateY: [12, 0], duration: 500 }, 0.2)
      .add('.auth-form', { opacity: [0, 1], translateY: [14, 0], duration: 550 }, 0.35)
    tl.play()
  }, [])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const el = formRef.current
    if (!el || reducedMotion()) return
    animate(el, { opacity: [0, 1], translateY: [10, 0], duration: 350, ease: 'outCubic' })
  }, [mode, isSignUp])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.user) {
          await supabase.from('user_profiles').insert({
            id: data.user.id,
            username: email.split('@')[0],
          })
          await supabase.from('user_points').insert({
            user_id: data.user.id,
            total_points: 0,
          })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError('Ingresa tu email'); return }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=1`,
      })
      if (error) throw error
      setMessage('Te enviamos un link para restablecer tu contraseña. Revisa tu email.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); return }
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('Contraseña actualizada. Inicia sesión con tu nueva contraseña.')
      setMode('auth')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[var(--ink)] px-4 py-10 font-[var(--font-mono)]">
      <AnimatedBackground />

      <Card className="auth-card relative z-10 w-full max-w-[420px] border-white/15 bg-white/[0.07] shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl ring-white/10">
        <CardContent className="!p-8 sm:!p-10">
          <div className="auth-title flex flex-col items-center gap-3 text-center">
            <Badge
              variant="outline"
              className="h-9 rounded-xl border-white/15 bg-white/[0.06] px-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            >
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                Tu entrenador personal
              </span>
            </Badge>
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-[var(--text)]">
              Gym <span className="italic text-[var(--pink)]">Coach</span>
            </h1>
            <CardDescription className="text-[13px] text-[var(--text-muted)]">
              {mode === 'auth'
                ? (isSignUp ? 'Crea tu cuenta y empieza hoy' : 'Accede a tu plan de entrenamiento')
                : mode === 'forgot'
                  ? 'Recupera el acceso a tu cuenta'
                  : 'Define una nueva contraseña'}
            </CardDescription>
          </div>

          <form
            ref={formRef}
            onSubmit={mode === 'auth' ? handleAuth : mode === 'forgot' ? handleForgot : handleReset}
            className="auth-form mt-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={mode !== 'reset'}
                disabled={mode === 'reset'}
                className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
              />
            </div>

            {mode === 'auth' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
                />
              </div>
            )}

            {mode === 'reset' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="new-password" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm-password" className="text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
                    Confirmar contraseña
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Repite la contraseña"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="!h-11 !rounded-lg border-white/15 bg-[var(--ink)]/60 !px-3.5 !text-sm placeholder:text-[var(--text-faint)]/60"
                  />
                </div>
              </>
            )}

            {error && (
              <p className="rounded-lg border border-[var(--red)]/30 bg-[var(--red)]/10 px-3 py-2 text-xs text-[var(--red)]">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-lg border border-[var(--green)]/30 bg-[var(--green)]/10 px-3 py-2 text-xs text-[var(--green)]">
                {message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="!h-11 w-full bg-gradient-to-r from-[var(--pink)] to-[var(--blue)] font-bold text-[#0b0b12] shadow-[0_8px_28px_rgba(255,107,157,0.3)] hover:opacity-90"
            >
              {loading
                ? 'Cargando...'
                : mode === 'auth'
                  ? (isSignUp ? 'Registrarse' : 'Iniciar Sesión')
                  : mode === 'forgot'
                    ? 'Enviar link de recuperación'
                    : 'Guardar nueva contraseña'}
            </Button>
          </form>

          {mode === 'auth' && !isSignUp && (
            <p className="mt-5 text-center font-[var(--font-mono)] text-xs">
              <button
                onClick={() => setMode('forgot')}
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="mt-5 text-center font-[var(--font-mono)] text-xs">
              <button
                onClick={() => setMode('auth')}
                className="text-[var(--blue)] transition-colors hover:underline"
              >
                Volver al inicio de sesión
              </button>
            </p>
          )}

          {mode === 'auth' && (
            <p className="mt-6 border-t border-white/10 pt-5 text-center font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
              {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 font-bold text-[var(--blue)] transition-colors hover:underline"
              >
                {isSignUp ? 'Inicia sesión' : 'Regístrate'}
              </button>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

### app\dashboard\page.tsx

```
'use client'

import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  return <Dashboard />
}

```

### app\globals.css

```
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

:root {
  --ink: #0b0b12;
  --ink-panel: #14141f;
  --border: oklch(0.922 0 0);
  --border2: #3d3d5c;
  --pink: #ff6b9d;
  --pink-light: #ff85b3;
  --blue: #5b8def;
  --blue-light: #6fa0ff;
  --purple: #a78bfa;
  --text: #f0f4ff;
  --text-muted: #b6bdd4;
  --text-faint: #7a81a0;
  --green: #4ade80;
  --orange: #ffa94d;
  --red: #ff6b6b;
  --yellow: #ffd43b;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

html {
  overflow-x: hidden;
  width: 100%;
}

body {
  background: var(--ink);
  color: var(--text);
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

img, video, canvas, svg {
  max-width: 100%;
  height: auto;
}

input, select, textarea, button {
  max-width: 100%;
}

/* Panel base — glassmorphism */
.panel {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.panel-title {
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.02em;
  margin-bottom: 0.75rem;
}

.kpi-label {
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 2px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.9rem;
  margin-top: 0.5rem;
  background: linear-gradient(90deg, rgba(255,107,157,0.10), rgba(91,141,239,0.06), rgba(167,139,250,0.02));
  border-left: 3px solid var(--pink);
  border-radius: 0 8px 8px 0;
  width: 100%;
}

.section-num {
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: #0b0b12;
  background: linear-gradient(135deg, var(--pink), var(--blue));
  border-radius: 4px;
  padding: 3px 9px;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.callout {
  background: linear-gradient(90deg, rgba(255,107,157,0.07), rgba(91,141,239,0.04));
  border-left: 3px solid var(--purple);
  border-radius: 0 6px 6px 0;
  padding: 10px 14px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
}

/* Sidebar responsive */
@media (max-width: 768px) {
  .sidebar-desktop {
    display: none !important;
  }

  .sidebar-mobile-toggle {
    display: flex !important;
  }

  .hide-mobile {
    display: none !important;
  }

  .section-header {
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .section-sub {
    display: none !important;
  }

  input, select, textarea {
    font-size: 16px !important;
  }

  /* Space for mobile top bar */
  .dashboard-main {
    padding-top: 52px !important;
  }

  .panel {
    overflow-wrap: break-word;
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }
}

/* Input/Select dark */
input, select, textarea {
  background: var(--ink) !important;
  color: var(--text) !important;
  border-color: var(--border2) !important;
  max-width: 100% !important;
}

input::placeholder, textarea::placeholder {
  color: var(--text-faint) !important;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--blue) !important;
  box-shadow: 0 0 0 1px var(--blue) !important;
  outline: none !important;
}

option {
  background: var(--ink) !important;
  color: var(--text) !important;
}

/* Overrides */
.text-gray-800, .text-gray-900, .text-gray-700 { color: var(--text) !important; }
.text-gray-600, .text-gray-500 { color: var(--text-muted) !important; }
.text-gray-400 { color: var(--text-faint) !important; }
.bg-white { background: var(--ink-panel) !important; }
.bg-gray-50, .bg-gray-100 { background: var(--ink-panel) !important; }
.border-gray-300 { border-color: var(--border) !important; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-faint); }

/* Nav item desktop */
.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  margin: 4px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(111, 160, 255, 0.2);
  transform: translateX(2px);
}

.nav-item.active {
  background: rgba(111, 160, 255, 0.12);
  border-color: var(--blue);
  box-shadow: 0 2px 8px rgba(91, 141, 239, 0.15);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bgShift {
  0% { background-position: 0% 0%, 100% 100%, 50% 50%; }
  100% { background-position: 100% 100%, 0% 0%, 50% 50%; }
}

@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes riseUp { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { opacity: 0; transform: scale(.92); } to { opacity: 1; transform: scale(1); } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

.fx { transition: transform .12s ease; }
.fx:hover { transform: scale(1.03); }
.fx:active { transform: scale(.97); }
.fx-lift { transition: transform .15s ease; }
.fx-lift:hover { transform: translateY(-2px) scale(1.02); }

/* Reassert brand dark borders (shadcn theme) */
:root, .dark {
  --border: #2a2a42;
  --input: oklch(1 0 0 / 14%);
}

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
```

### app\layout.tsx

```
import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/page-transition";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const condensed = Barlow_Condensed({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gym Coach — Tu Entrenador Personal",
  description: "Trackea tus entrenamientos, nutrición y progreso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("dark", "h-full", "antialiased", condensed.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-mono">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

```

### app\page.tsx

```
'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { animate, createTimeline, stagger, utils } from 'animejs'
import { cn } from 'cn'
import AnimatedBackground from '@/components/AnimatedBackground'
import AnimeDemo from '@/components/anime-demo'
import IntroReveal from '@/components/intro-reveal'
import Logo3D from '@/components/logo-3d'
import ScrambleText from '@/components/scramble-text'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

const features = [
  {
    title: 'Catálogo de Ejercicios',
    desc: '302 ejercicios con ilustraciones SVG, búsqueda y filtros por músculo, equipo y tipo.',
    accent: 'var(--pink)',
    num: '01',
  },
  {
    title: 'Entrenamientos',
    desc: 'Registra series, pesos y repeticiones. Sobrecarga progresiva automática.',
    accent: 'var(--blue)',
    num: '02',
  },
  {
    title: 'Nutrición',
    desc: 'Macros calculados con Mifflin-St Jeor y comidas rápidas predefinidas.',
    accent: 'var(--purple)',
    num: '03',
  },
  {
    title: 'Coach IA',
    desc: 'Recomendaciones basadas en tus datos reales de entrenamiento y dieta.',
    accent: 'var(--blue-light)',
    num: '04',
  },
]

const stats = [
  { value: 302, suffix: '', label: 'ejercicios ilustrados' },
  { value: 4, suffix: '', label: 'módulos integrados' },
  { value: 24, suffix: '/7', label: 'coach disponible' },
]

const scramblePhrases = [
  'Fuerza, hipertrofia y progreso',
  'Metas que se cumplen',
  'Tu coach de IA 24/7',
]

const blobs = [
  { top: '-10%', left: '-10%', size: 500, color: 'rgba(255,107,157,0.25)' },
  { top: '20%', right: '-10%', size: 600, color: 'rgba(91,141,239,0.22)' },
  { bottom: '-15%', left: '30%', size: 500, color: 'rgba(167,139,250,0.20)' },
]

export default function Home() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
      .add('.enter-hero', { opacity: [0, 1], translateY: [26, 0], duration: 900, delay: stagger(90) }, 0)
      .add('.enter-fade', { opacity: [0, 1], translateY: [14, 0], duration: 800, delay: stagger(110) }, 0.25)
      .add('.enter-cards', { opacity: [0, 1], translateY: [22, 0], duration: 700, delay: stagger(120) }, 0.45)

    animate('.logo-float', {
      translateY: [0, -6], duration: 3800, loop: true, ease: 'inOutSine', alternate: true,
    })

    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count)
      const obj = { v: 0 }
      animate(obj, {
        v: [0, target],
        duration: 1800,
        ease: 'outQuart',
        delay: 500,
        modifier: utils.round(0),
        onUpdate: () => { el.textContent = String(obj.v) },
      })
    })

    tl.play()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--ink)] font-[var(--font-mono)]">
      <AnimatedBackground />

      <IntroReveal />

      {blobs.map((b, i) => (
        <div
          key={i}
          className="pointer-events-none fixed z-0 rounded-full blur-[40px]"
          style={{
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            width: b.size, height: b.size,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          }}
        />
      ))}

      <div className="relative z-1 mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 py-20 text-center">
        <Logo3D className="logo-float enter-hero h-24 w-48 sm:h-28 sm:w-64" />

        <h1 className="enter-hero mt-8 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text)]">
          Tu <span className="text-[var(--pink)]">entrenador</span> personal
          <br />
          en el <span className="text-[var(--blue)]">bolsillo</span>
        </h1>

        <p className="enter-hero mt-4 font-[var(--font-mono)] text-sm tracking-[0.08em] text-[var(--blue-light)]">
          <ScrambleText phrases={scramblePhrases} />
        </p>

        <p className="enter-hero mt-5 max-w-[560px] text-base leading-relaxed text-[var(--text-muted)]">
          302 ejercicios con ilustraciones, tracking de entrenamientos, nutrición y
          recuperación. El coach IA te dice cuánto peso subir, qué comer y cuándo descansar.
        </p>

        <div className="enter-hero mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth"
            className={cn(
              buttonVariants({ size: 'lg' }),
              '!h-11 !px-7 bg-gradient-to-r from-[var(--pink)] to-[var(--blue)] font-bold text-[#0b0b12] shadow-[0_8px_32px_rgba(255,107,157,0.35)] hover:opacity-90'
            )}
          >
            Empezar ahora
          </Link>
          <Link
            href="/auth"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              '!h-11 !px-7 border-white/15 bg-white/[0.06] font-bold text-[var(--text)] backdrop-blur-xl hover:bg-white/[0.1]'
            )}
          >
            Iniciar sesión
          </Link>
        </div>

        <div className="enter-fade mt-14 grid w-full grid-cols-3 gap-4 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-6 backdrop-blur-md sm:px-4">
              <span className="text-3xl font-bold text-[var(--text)] sm:text-4xl">
                <span data-count={s.value}>0</span>
                {s.suffix}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)] sm:text-xs">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="enter-cards mt-12 grid w-full gap-6 sm:grid-cols-2 sm:gap-x-10">
          {features.map((f) => (
            <Card
              key={f.num}
              className="group/card border border-white/10 bg-white/[0.06] backdrop-blur-xl hover:-translate-y-1 hover:bg-white/[0.09] transition-all duration-200 ring-white/10"
            >
              <CardContent className="flex items-start gap-4 !p-6">
                <span
                  className="shrink-0 rounded-md px-2 py-1 text-xs font-bold text-[#0b0b12]"
                  style={{ background: `linear-gradient(135deg, ${f.accent}, var(--blue))` }}
                >
                  {f.num}
                </span>
                <div className="text-left">
                  <h3 className="text-sm font-bold" style={{ color: f.accent }}>{f.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AnimeDemo />

        <p className="enter-fade mt-14 text-[11px] text-[var(--text-faint)]">
          Hecho con rosa, azul y morado. React + Supabase + Next.js
        </p>
      </div>
    </div>
  )
}
```

### CHANGELOG.md

```
# Changelog - Gym Coach

Generado: 2026-07-31 22:49

Total: 17 commits

## Historial de cambios

- 91f3f2a fix: remove corrupted BOM artifact from encoding fix
- 436a7c3 fix: restore UTF-8 accents corrupted by encoding round-trip
- ea9ed3a feat: glassmorphism landing page + glass panels across app
- bdfe9b6 feat: pink/blue/purple palette across app
- e19c1bb feat: Spotify playlist widget, grouped quick-add foods by meal type
- bc98720 feat: quick-add foods, predefined set defaults, suggested placeholders
- 463bf31 feat: cursor-reactive animated background, better contrast colors, glass panels
- d6e7605 feat: coach IA with science-based recommendations
- a78d44a fix: consistent monospace font for Gym logo
- 064beb9 fix: mobile responsive, week activity scroll, top bar padding, overflow
- eeaee96 fix: mobile nav vertical with icons, overflow in panels
- 7c2a2f1 fix: responsive layout, mobile nav, overflow
- ca24f36 fix: TypeScript errors in CoachRecommendations
- 658005d force vercel redeploy
- 4496bc7 vercel: trigger redeploy
- dc4b5b5 first commit
- d49676b fix: remove Georgia font import (not available in Google Fonts)

```

### CLAUDE.md

```
@AGENTS.md

```

### components\AnimatedBackground.tsx

```
'use client'

export default function AnimatedBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: `
        radial-gradient(ellipse 600px 400px at 20% 30%, rgba(91,141,239,0.08), transparent),
        radial-gradient(ellipse 500px 350px at 80% 70%, rgba(255,107,157,0.06), transparent),
        radial-gradient(ellipse 400px 300px at 50% 50%, rgba(167,139,250,0.05), transparent)
      `,
      animation: 'bgShift 20s ease-in-out infinite alternate',
    }} />
  )
}

```

### components\anime-demo.tsx

```
'use client'

import { useRef, useState } from 'react'
import { animate, createTimer, stagger } from 'animejs'
import { Button } from '@/components/ui/button'

const DURATION = 1500
const EASES = ['linear', 'inOutCubic', 'outExpo', 'outBack', 'outElastic', 'outBounce'] as const
const DOTS = Array.from({ length: 25 }, (_, i) => i)

export default function AnimeDemo() {
  const [ease, setEase] = useState<(typeof EASES)[number]>('outExpo')
  const [loop, setLoop] = useState(false)
  const [state, setState] = useState<'idle' | 'running'>('idle')
  const timeRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<ReturnType<typeof animate> | null>(null)
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null)

  const stop = () => {
    animRef.current?.cancel()
    timerRef.current?.cancel()
    animRef.current = null
    timerRef.current = null
  }

  const run = () => {
    stop()
    setState('running')
    animRef.current = animate('.demo-dot', {
      translateY: [0, -30],
      rotate: [0, 180],
      scale: [1, 1.3],
      duration: DURATION,
      delay: stagger(22),
      ease,
      onComplete: () => {
        if (loop) run()
      },
    })
    if (timeRef.current) timeRef.current.textContent = '0 ms'
    if (barRef.current) barRef.current.style.width = '0%'
    timerRef.current = createTimer({
      duration: DURATION,
      autoplay: false,
      onUpdate: (t) => {
        if (timeRef.current) timeRef.current.textContent = `${Math.round(t.currentTime)} ms`
        if (barRef.current) barRef.current.style.width = `${t.progress * 100}%`
      },
      onComplete: () => setState('idle'),
    })
    timerRef.current.play()
  }

  return (
    <div className="enter-cards mt-12 w-full rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
        <div className="flex w-full flex-col sm:w-56">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">timer</p>
          <span ref={timeRef} className="mt-2 font-[var(--font-mono)] text-4xl font-bold text-[var(--text)] sm:text-5xl">
            0 ms
          </span>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div ref={barRef} className="h-full rounded-full bg-gradient-to-r from-[var(--pink)] to-[var(--blue)]" style={{ width: '0%' }} />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="ease" className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">ease</label>
            <select
              id="ease"
              value={ease}
              onChange={(e) => setEase(e.target.value as (typeof EASES)[number])}
              className="h-9 rounded-lg border border-white/15 bg-[var(--ink)] px-2 text-xs text-[var(--text)] outline-none"
            >
              {EASES.map((e) => (
                <option key={e} value={e} className="bg-[var(--ink)]">{e}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
            {DOTS.map((i) => (
              <div
                key={i}
                className="demo-dot h-6 w-6 rounded-md sm:h-7 sm:w-7"
                style={{
                  background:
                    i % 7 === 0 ? 'var(--pink)' : i % 7 === 2 ? 'var(--blue)' : i % 7 === 4 ? 'var(--purple)' : 'var(--text-muted)',
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={run}
              className="!h-10 bg-gradient-to-r from-[var(--pink)] to-[var(--blue)] font-bold text-[#0b0b12] hover:opacity-90"
            >
              {state === 'running' ? 'Repetir' : 'Jugar'}
            </Button>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
                className="h-3.5 w-3.5 accent-[var(--pink)]"
              />
              loop
            </label>
          </div>
        </div>

        <div className="hidden w-full rounded-xl border border-white/10 bg-black/30 p-4 lg:block lg:w-72">
          <pre className="overflow-x-auto font-[var(--font-mono)] text-[11px] leading-relaxed text-[var(--text-muted)]">
{`animate('.demo-dot', {
  translateY: [0, -30],
  rotate: [0, 180],
  scale: [1, 1.3],
  duration: 1500,
  delay: stagger(22),
  ease: '${ease}',
})`}
          </pre>
        </div>
      </div>
    </div>
  )
}
```

### components\BodyMapVisual.tsx

```
'use client'

import { useState } from 'react'
import { useMuscleCounts } from '@/lib/useMuscleCounts'
import { MUSCLE_META } from '@/lib/muscle-meta'

interface BodyMapVisualProps {
  userId: string
}

export default function BodyMapVisual({ userId }: BodyMapVisualProps) {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const { counts: muscleData, loading } = useMuscleCounts(userId)

  const getIntensityColor = (count: number) => {
    if (count === 0) return { bg: '#4a4e68', text: 'Sin entrenar', bar: '0%' }
    if (count <= 2) return { bg: '#4ade80', text: 'Poco', bar: '25%' }
    if (count <= 5) return { bg: '#fbbf24', text: 'Moderado', bar: '50%' }
    if (count <= 10) return { bg: '#fb923c', text: 'Intenso', bar: '75%' }
    return { bg: '#f87171', text: 'Muy intenso', bar: '100%' }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>Cargando mapa muscular...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Muscle grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '10px' }}>
        {Object.entries(muscleData).map(([muscle, count], idx) => {
          const colors = getIntensityColor(count)
          const meta = MUSCLE_META[muscle]
          const isSelected = selectedMuscle === muscle

          return (
            <div
              key={muscle}
              className="fx-lift"
              onClick={() => setSelectedMuscle(isSelected ? null : muscle)}
              style={{
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${isSelected ? 'var(--blue)' : 'var(--border)'}`,
                borderRadius: '6px',
                padding: '14px 16px',
                transition: 'border-color 0.15s',
                animation: 'rise .3s ease backwards',
                animationDelay: `${idx * 0.06}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
                      {meta?.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: colors.bg }}>
                      {count}
                    </div>
                  </div>
                  {/* Bar */}
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: Math.min(count / 10 * 100, 100) + '%', background: colors.bg, borderRadius: '2px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                      {colors.text}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                      {meta?.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail panel when selected */}
      {selectedMuscle && MUSCLE_META[selectedMuscle] && (
        <div
          className="panel"
          style={{ borderLeft: '3px solid var(--blue)', animation: 'rise .3s ease backwards' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
                {MUSCLE_META[selectedMuscle].label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {MUSCLE_META[selectedMuscle].desc}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div className="kpi-label">Sets esta semana</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700, color: getIntensityColor(muscleData[selectedMuscle] || 0).bg }}>
                {muscleData[selectedMuscle] || 0}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px' }}>
              <div className="kpi-label">Estado</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: getIntensityColor(muscleData[selectedMuscle] || 0).bg, marginTop: '4px' }}>
                {getIntensityColor(muscleData[selectedMuscle] || 0).text}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px' }}>
              <div className="kpi-label">Recomendación</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', marginTop: '4px', lineHeight: 1.4 }}>
                {(muscleData[selectedMuscle] || 0) === 0 && 'Considera añadir ejercicios a tu rutina.'}
                {(muscleData[selectedMuscle] || 0) > 0 && (muscleData[selectedMuscle] || 0) <= 2 && 'Aumenta el volumen de entrenamiento.'}
                {(muscleData[selectedMuscle] || 0) > 2 && (muscleData[selectedMuscle] || 0) <= 5 && 'Buen balance. Mantén este nivel.'}
                {(muscleData[selectedMuscle] || 0) > 5 && 'Excelente volumen. Asegura recuperación.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

```

### components\CoachRecommendations.tsx

```
'use client'

import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface CoachRecommendationsProps {
  userId: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function CoachRecommendations({ userId }: CoachRecommendationsProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getContext = async () => {
    const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
    const { data: workouts } = await supabase.from('workouts').select('*, workout_sets(*)').eq('user_id', userId).order('date', { ascending: false }).limit(10)
    const { data: meals } = await supabase.from('meals').select('*').eq('user_id', userId).gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const { data: { session } } = await supabase.auth.getSession()
    return { workouts: workouts || [], meals: meals || [], profile: profile || {}, token: session?.access_token || '' }
  }

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')
    setError('')

    const userMsg: ChatMessage = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const ctx = await getContext()
      const history = messages.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.token}` },
        body: JSON.stringify({ ...ctx, message: msg, history }),
      })

      if (!res.ok) throw new Error('Error')
      const data = await res.json()

      if (data.recommendations) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.recommendations.join('\n') }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sin respuesta' }])
      }
      setInitialized(true)
    } catch {
      setError('Error al responder. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestions = [
    '¿Cómo va mi nutrición?',
    '¿Estoy entrenando suficiente?',
    'Dame un plan de comidas',
    '¿Necesito descansar?',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px' }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.length === 0 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', padding: '32px' }}>
            <div style={{ fontSize: '2rem' }}>🏋️</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--text)', textAlign: 'center', fontWeight: 700 }}>
              Tu coach IA personal
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '360px', lineHeight: 1.6 }}>
              Analiza tus entrenamientos, comidas y perfil para darte recomendaciones basadas en ciencia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
              {suggestions.map((s, i) => (
                <button key={i} className="fx"
                  onClick={() => sendMessage(s)}
                  style={{ padding: '10px 16px', background: 'rgba(111,160,255,0.1)', border: '1px solid rgba(111,160,255,0.3)', color: 'var(--blue-light)', borderRadius: '6px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.role === 'user' ? 'var(--blue)' : 'rgba(255,255,255,0.06)',
              color: msg.role === 'user' ? '#0b0b12' : 'var(--text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              border: msg.role === 'assistant' ? '1px solid var(--border2)' : 'none',
              animation: 'rise .3s ease backwards',
            }}>
            {msg.content}
          </div>
        ))}

        {loading && (
          <div
            style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border2)', animation: 'fadeIn .3s ease backwards' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map(i => (
                <div key={i}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'bob .6s ease-in-out infinite backwards', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div style={{ padding: '8px 12px', background: 'rgba(248,113,113,0.1)', border: '1px solid var(--red)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--red)', marginBottom: '8px' }}>
          {error}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', borderTop: '1px solid var(--border2)', paddingTop: '12px' }}>
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Pregúntale a tu coach..."
          rows={1}
          style={{
            flex: 1, padding: '12px 14px', background: 'var(--ink)', color: 'var(--text)',
            border: '1px solid var(--border2)', borderRadius: '8px', fontFamily: 'var(--font-mono)',
            fontSize: '15px', outline: 'none', resize: 'none', minHeight: '48px', maxHeight: '120px',
          }} />
        <button className="fx" onClick={() => sendMessage()} disabled={loading || !input.trim()}
          style={{
            padding: '12px 16px', background: 'var(--blue)', color: '#0b0b12', border: 'none',
            borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)',
            fontSize: '16px', opacity: loading || !input.trim() ? 0.4 : 1, flexShrink: 0,
          }}>
          →
        </button>
      </div>
    </div>
  )
}

```

### components\Dashboard.tsx

```
'use client'

import { useState, useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import WorkoutTracker from '@/components/WorkoutTracker'
import MealTracker from '@/components/MealTracker'
import PointsDisplay from '@/components/PointsDisplay'
import CoachRecommendations from '@/components/CoachRecommendations'
import Routines from '@/components/Routines'
import RecoveryZone from '@/components/RecoveryZone'
import DashboardOverview from '@/components/DashboardOverview'
import BodyMapVisual from '@/components/BodyMapVisual'
import UserProfile from '@/components/UserProfile'
import ProgressiveOverload from '@/components/ProgressiveOverload'
import AnimatedBackground from '@/components/AnimatedBackground'
import SpotifyWidget from '@/components/SpotifyWidget'
import ExerciseCatalog from '@/components/ExerciseCatalog'
import WorkoutHistory from '@/components/WorkoutHistory'

const navItems = [
  { id: 'overview', abbr: 'RE', label: 'Resumen', sub: 'Tu progreso' },
  { id: 'profile', abbr: 'PE', label: 'Mi Perfil', sub: 'Datos personales' },
  { id: 'workout', abbr: 'TR', label: 'Entrenamientos', sub: 'Registra tu rutina' },
  { id: 'history', abbr: 'HI', label: 'Historial', sub: 'Entrenos pasados' },
  { id: 'routines', abbr: 'RU', label: 'Rutinas', sub: 'Plan de entrenamiento' },
  { id: 'exercises', abbr: 'EJ', label: 'Ejercicios', sub: 'Catálogo 302+' },
  { id: 'recovery', abbr: 'RC', label: 'Recuperación', sub: 'Estado muscular' },
  { id: 'body', abbr: 'BM', label: 'Mapa Corporal', sub: 'Visualización' },
  { id: 'meals', abbr: 'CM', label: 'Nutrición', sub: 'Tracker de comidas' },
  { id: 'overload', abbr: 'SO', label: 'Sobrecarga', sub: 'Progresión' },
  { id: 'coach', abbr: 'IA', label: 'Coach IA', sub: 'Recomendaciones' },
]

function NavRow({ item, active, open, onClick, variant }: { item: (typeof navItems)[number]; active: boolean; open?: boolean; onClick: () => void; variant: 'desktop' | 'mobile' }) {
  if (variant === 'mobile') {
    return (
      <div onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 20px',
          margin: '4px 12px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: active ? '1px solid var(--blue)' : '1px solid rgba(255,255,255,0.06)',
          background: active ? 'rgba(111,160,255,0.12)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.2s ease',
          boxShadow: active ? '0 2px 8px rgba(91,141,239,0.15)' : 'none',
        }}>
        <span style={{ fontSize: '1.3rem', width: '28px', textAlign: 'center' }}>{item.abbr}</span>
        <div>
          <div style={{ fontFamily: 'monospace', fontWeight: active ? 700 : 400, fontSize: '14px', color: active ? 'var(--text)' : 'var(--text-muted)' }}>
            {item.label}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-faint)' }}>
            {item.sub}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div onClick={onClick} className={`nav-item ${active ? 'active' : ''}`}>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: active ? 'var(--blue)' : 'var(--text-faint)',
        flexShrink: 0,
        width: '20px',
        textAlign: 'center',
      }}>
        {item.abbr}
      </span>
      {open && (
        <div style={{ marginLeft: '10px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            fontWeight: active ? 700 : 400,
            color: active ? 'var(--text)' : 'var(--text-muted)',
            letterSpacing: '0.03em',
          }}>
            {item.label}
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'var(--text-faint)',
            letterSpacing: '0.06em',
          }}>
            {item.sub}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [points, setPoints] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // entrada escalonada de la nav, igual que el hero de la landing
  useEffect(() => {
    const rows = navRef.current?.querySelectorAll('.nav-item')
    if (!rows?.length || reduced()) return
    animate(rows, {
      opacity: [0, 1],
      translateX: [-12, 0],
      duration: 550,
      delay: stagger(30),
      ease: 'outExpo',
    })
    return () => { utils.remove(rows) }
  }, [user])

  // cambio de pestaña: se re-anima la cabecera y el panel
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || reduced()) return
    const spans = headerRef.current?.querySelectorAll('.section-header > span') ?? []
    animate(panel, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 420,
      ease: 'outCubic',
    })
    if (spans.length) {
      animate(spans, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 380,
        delay: stagger(45),
        ease: 'outCubic',
      })
    }
    return () => { utils.remove([panel, ...spans]) }
  }, [activeTab, user])

  useEffect(() => { setSidebarOpen(window.innerWidth > 768) }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      setUser(session.user)
      const { data } = await supabase.from('user_points').select('*').eq('user_id', session.user.id).single()
      setPoints(data)
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--ink)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        CARGANDO...
      </div>
    )
  }

  const currentNav = navItems.find(n => n.id === activeTab)

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview userId={user.id} />
      case 'profile': return <UserProfile userId={user.id} />
      case 'workout': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SpotifyWidget userId={user.id} />
          <WorkoutTracker userId={user.id} />
        </div>
      )
      case 'routines': return <Routines userId={user.id} />
      case 'history': return <WorkoutHistory userId={user.id} />
      case 'exercises': return <ExerciseCatalog />
      case 'recovery': return <RecoveryZone userId={user.id} />
      case 'body': return <BodyMapVisual userId={user.id} />
      case 'meals': return <MealTracker userId={user.id} />
      case 'overload': return <ProgressiveOverload userId={user.id} />
      case 'coach': return <CoachRecommendations userId={user.id} />
      default: return null
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--ink)', width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '100vh' }}>
      {/* Mobile top bar */}
      <div style={{
        display: 'none',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: 'rgba(10,10,16,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '10px 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }} className="sidebar-mobile-toggle" id="mobile-topbar">
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px' }}>
          <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Gym</span>
        </span>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)}
          style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px' }}>
          {mobileNavOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile nav dropdown - vertical */}
      {mobileNavOpen && (
        <div style={{
          position: 'fixed',
          top: '44px', left: 0, right: 0, bottom: 0,
          zIndex: 199,
          background: 'rgba(10,10,16,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflowY: 'auto',
          padding: '8px 0',
          display: 'flex',
          flexDirection: 'column',
        }} className="sidebar-mobile-toggle">
          {navItems.map(item => (
            <NavRow key={item.id} variant="mobile" item={item} active={activeTab === item.id} onClick={() => { setActiveTab(item.id); setMobileNavOpen(false) }} />
          ))}
          <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', cursor: 'pointer', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            <span style={{ fontSize: '1.3rem', width: '28px', textAlign: 'center' }}>→</span>
            <span style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--red)' }}>Cerrar sesión</span>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="sidebar-desktop" style={{
        width: sidebarOpen ? 220 : 60,
        flexShrink: 0,
        background: 'rgba(10,10,16,0.75)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        transition: 'width 0.2s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '15px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Gym <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Coach</span>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: '3px' }}>
                v1.0
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-faint)',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontFamily: 'monospace',
              borderRadius: '4px',
            }}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        {/* Nav */}
        <nav ref={navRef} style={{ flex: 1, padding: '12px 0', overflowY: 'auto', overflowX: 'hidden' }}>
          {navItems.map((item) => (
            <NavRow key={item.id} variant="desktop" item={item} active={activeTab === item.id} open={sidebarOpen} onClick={() => setActiveTab(item.id)} />
          ))}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
          {sidebarOpen && (
            <>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
                @{user.email?.split('@')[0]}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Usuario
              </div>
            </>
          )}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.06em',
              background: 'none',
              border: '1px solid var(--border2)',
              color: 'var(--text-muted)',
              padding: '7px 0',
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            {sidebarOpen ? 'Cerrar sesión' : '⏻'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ flex: 1, overflow: 'auto', minWidth: 0, width: '100%' }}>
        {/* Header */}
        <header className="hide-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1 }}>
              <span style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Gym</span> Coach
            </span>
            <span style={{ color: 'var(--border2)', fontSize: '0.9rem' }}>·</span>
            <div>
              <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.2 }}>
                Tu Dashboard Personal
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px' }}>
                Entrenamiento · Nutrición · Progreso
              </div>
            </div>
          </div>

          {/* Points + live indicator */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {points && (
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: 'var(--blue)',
                background: 'rgba(111,160,255,0.08)',
                padding: '3px 10px',
                borderRadius: '2px',
                border: '1px solid rgba(111,160,255,0.25)',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}>
                {points.total_points || 0} pts
              </span>
            )}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              color: 'var(--green)',
              background: 'rgba(124,240,192,0.08)',
              padding: '3px 10px',
              borderRadius: '2px',
              border: '1px solid rgba(124,240,192,0.25)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }}></span>
              Activo
            </span>
          </div>
        </header>

        {/* Section Header */}
        <div ref={headerRef} style={{ padding: '0.75rem 1rem 0 1rem' }} className="hide-mobile">
          <div className="section-header">
            <span className="section-num">{currentNav?.abbr}</span>
            <span className="section-title">{currentNav?.label}</span>
            <span className="section-sub">{currentNav?.sub}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '100%' }}>
          <PointsDisplay points={points} />
          <div ref={panelRef} className="panel" style={{ width: '100%' }}>
            {renderContent()}
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

```

### components\DashboardOverview.tsx

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardOverviewProps {
  userId: string
}

export default function DashboardOverview({ userId }: DashboardOverviewProps) {
  const [stats, setStats] = useState<any>(null)
  const [weekData, setWeekData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [userId])

  const fetchStats = async () => {
    setLoading(true)
    try {
      const { data: points } = await supabase.from('user_points').select('*').eq('user_id', userId).single()

      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: workouts } = await supabase.from('workouts').select('*, workout_sets(*)').eq('user_id', userId).gte('date', sevenDaysAgo.toISOString()).order('date', { ascending: true })
      const { data: meals } = await supabase.from('meals').select('*').eq('user_id', userId).gte('date', sevenDaysAgo.toISOString().split('T')[0])

      const totalWorkouts = workouts?.length || 0
      const totalSets = workouts?.reduce((sum: number, w: any) => sum + (w.workout_sets?.length || 0), 0) || 0
      const totalCalories = meals?.reduce((sum: number, m: any) => sum + (m.calories || 0), 0) || 0
      const avgCaloriesPerDay = meals?.length ? Math.round(totalCalories / 7) : 0

      const weekBreakdown = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        const dateStr = date.toISOString().split('T')[0]
        const dayWorkouts = workouts?.filter(w => w.date.split('T')[0] === dateStr) || []
        return {
          day: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'][date.getDay()],
          workouts: dayWorkouts.length,
          sets: dayWorkouts.reduce((sum: number, w: any) => sum + (w.workout_sets?.length || 0), 0),
        }
      })

      setStats({ points: points?.total_points || 0, streak: points?.streak_days || 0, totalWorkouts, totalSets, totalCalories, avgCaloriesPerDay })
      setWeekData(weekBreakdown)
    } finally { setLoading(false) }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>Cargando estadísticas...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Stats KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {[
          { label: 'Entrenamientos (7d)', value: stats?.totalWorkouts || 0, border: 'var(--blue)' },
          { label: 'Sets Completados', value: stats?.totalSets || 0, border: 'var(--purple)' },
          { label: 'Calorías (7d)', value: stats?.totalCalories || 0, sub: `${stats?.avgCaloriesPerDay}/día`, border: 'var(--orange)' },
          { label: 'Puntos Totales', value: stats?.points || 0, border: 'var(--green)' },
        ].map((card, idx) => (
          <div key={idx}
            style={{ borderTop: `2px solid ${card.border}`, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px 18px', animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.08}s` }}>
            <div className="kpi-label">{card.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginTop: '4px' }}>
              {card.value}
            </div>
            {card.sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '3px' }}>{card.sub}</div>}
          </div>
        ))}
      </div>

      {/* Week Activity - scrollable on mobile */}
      <div className="panel" style={{ overflowX: 'auto' }}>
        <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', minWidth: '500px' }}>
          <span>Actividad de esta Semana</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>7 días</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', minWidth: '500px' }}>
          {weekData.map((day, idx) => (
            <div key={idx} className="fx"
              style={{
                padding: '12px 8px',
                borderRadius: '6px',
                textAlign: 'center',
                transition: 'all 0.15s',
                background: day.workouts > 0 ? 'rgba(111,160,255,0.15)' : 'rgba(255,255,255,0.03)',
                border: day.workouts > 0 ? '1px solid var(--blue)' : '1px solid var(--border)',
              }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>{day.day}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: '4px' }}>{day.workouts}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>{day.sets} sets</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="callout" style={{ borderLeftColor: 'var(--green)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
          {stats?.totalWorkouts >= 5
            ? `¡Excelente consistencia! Has entrenado ${stats.totalWorkouts} veces esta semana`
            : 'Intenta entrenar al menos 4-5 veces por semana para mejores resultados'}
        </div>
      </div>
    </div>
  )
}

```

### components\ExerciseCatalog.tsx

```
'use client'

import { useState, useEffect, useMemo } from 'react'
import { translateName } from '@/lib/translate'
import { fetchAllExercises } from '@/lib/exercises'
import { searchExercises as wgSearch, exercises as wgExercises, getAssetUrl } from '@bryllim/workout-guide'
import ExerciseDetailModal from './ExerciseDetailModal'

interface UnifiedExercise {
  id: string
  name: string
  category: string
  gif_url?: string
  image_url?: string
  equipment?: string
  target_muscle?: string
  secondary_muscles?: string[]
  instruction_steps_es?: string[]
  description?: string
  _source: 'supabase' | 'workout-guide'
  _svgSlug?: string
}

export default function ExerciseCatalog() {
  const [dbExercises, setDbExercises] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState<'all' | 'supabase' | 'workout-guide'>('all')
  const [detailExercise, setDetailExercise] = useState<UnifiedExercise | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    const db = await fetchAllExercises()
    setDbExercises(db)
    setLoading(false)
  }

  const allExercises = useMemo(() => {
    const supabase: UnifiedExercise[] = dbExercises.map(ex => ({
      ...ex,
      _source: 'supabase' as const,
    }))

    const wg: UnifiedExercise[] = wgExercises.map(ex => ({
      id: `wg-${ex.slug}`,
      name: ex.name,
      category: ex.primaryMuscle,
      equipment: ex.equipment,
      target_muscle: ex.primaryMuscle,
      secondary_muscles: ex.secondaryMuscles,
      _source: 'workout-guide' as const,
      _svgSlug: ex.slug,
    }))

    return [...supabase, ...wg]
  }, [dbExercises])

  const categories = useMemo(() => Array.from(new Set(allExercises.map(e => e.category))).sort(), [allExercises])

  const filtered = useMemo(() => {
    return allExercises.filter(ex => {
      const matchesSearch = !searchTerm ||
        translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.equipment?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      const matchesSource = sourceFilter === 'all' || ex._source === sourceFilter
      return matchesSearch && matchesCategory && matchesSource
    })
  }, [allExercises, searchTerm, categoryFilter, sourceFilter])

  const supabaseCount = allExercises.filter(e => e._source === 'supabase').length
  const wgCount = allExercises.filter(e => e._source === 'workout-guide').length

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', width: '100%' }

  const btnStyle = (active: boolean) => ({
    fontFamily: 'var(--font-mono)' as const,
    fontSize: '13px',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer' as const,
    border: active ? '1px solid var(--blue)' : '1px solid var(--border)',
    background: active ? 'rgba(91,141,239,0.15)' : 'transparent',
    color: active ? 'var(--blue-light)' : 'var(--text-muted)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem', letterSpacing: '0.06em' }}>
          CATÁLOGO DE EJERCICIOS ({filtered.length} de {allExercises.length})
        </div>

        <input type="text" placeholder="Buscar ejercicio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />

        {/* Source filter */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
          <button onClick={() => setSourceFilter('all')} style={btnStyle(sourceFilter === 'all')}>Todos ({allExercises.length})</button>
          <button onClick={() => setSourceFilter('supabase')} style={btnStyle(sourceFilter === 'supabase')}>Del catálogo ({supabaseCount})</button>
          <button onClick={() => setSourceFilter('workout-guide')} style={btnStyle(sourceFilter === 'workout-guide')}>Con SVG ({wgCount})</button>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
          <button onClick={() => setCategoryFilter('')} style={btnStyle(categoryFilter === '')}>Todos</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={btnStyle(categoryFilter === cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)' }}>Cargando ejercicios...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
          {filtered.map((ex, idx) => (
            <div key={ex.id} onClick={() => setDetailExercise(ex)} style={{ cursor: 'pointer', animation: 'rise .3s ease backwards', animationDelay: `${Math.min(idx * 0.03, 0.5)}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '6px', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(111,160,255,0.08)'; e.currentTarget.style.borderColor = 'var(--blue)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--border)' }}>

                {/* Thumbnail: GIF, static image, or SVG frame 1 */}
                {ex._source === 'supabase' && ex.gif_url ? (
                  <img src={ex.gif_url} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, background: '#0b0b12' }} />
                ) : ex._source === 'supabase' && ex.image_url ? (
                  <img src={ex.image_url} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, background: '#0b0b12' }} />
                ) : ex._svgSlug ? (
                  <img src={getAssetUrl(ex._svgSlug, 1) || ''} alt={translateName(ex.name)} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0, background: 'rgba(255,255,255,0.03)' }} />
                ) : null}

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {translateName(ex.name)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>
                    {ex.category}{ex.equipment ? ` · ${ex.equipment}` : ''}
                  </div>
                </div>

                {/* Source badge */}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 6px', borderRadius: '3px', flexShrink: 0,
                  background: ex._source === 'supabase' ? 'rgba(255,107,157,0.12)' : 'rgba(74,222,128,0.12)',
                  color: ex._source === 'supabase' ? 'var(--pink-light)' : 'var(--green)',
                  border: `1px solid ${ex._source === 'supabase' ? 'rgba(255,107,157,0.3)' : 'rgba(74,222,128,0.3)'}`,
                }}>
                  {ex._source === 'supabase' ? (ex.gif_url ? 'GIF' : 'FOTO') : 'SVG'}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)' }}>
              Sin resultados para &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      )}

      <ExerciseDetailModal exercise={detailExercise} onClose={() => setDetailExercise(null)} />
    </div>
  )
}

```

### components\ExerciseDetailModal.tsx

```
'use client'

import { useEffect, useState } from 'react'
import { translateName, translateMuscle, translateEquipment } from '@/lib/translate'
import { getAssetUrl } from '@bryllim/workout-guide'
import { getExerciseMuscles } from '@/lib/exercise-utils'
import MuscleMap from './MuscleMap'

interface ExerciseDetailModalProps {
  exercise: any
  onClose: () => void
}

export default function ExerciseDetailModal({ exercise, onClose }: ExerciseDetailModalProps) {
  const [frameIdx, setFrameIdx] = useState<1 | 2 | 3>(1)

  useEffect(() => {
    if (!exercise?._svgSlug) return
    for (let i = 1; i <= 3; i++) {
      const img = new window.Image()
      img.src = getAssetUrl(exercise._svgSlug, i as 1 | 2 | 3) || ''
    }
    setFrameIdx(1)
    const iv = setInterval(() => {
      setFrameIdx(prev => (prev === 3 ? 1 : (prev + 1) as 1 | 2 | 3))
    }, 1200)
    return () => clearInterval(iv)
  }, [exercise?.id])

  useEffect(() => {
    if (!exercise) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [exercise, onClose])

  if (!exercise) return null
  const steps = exercise.instruction_steps_es || []
  const isSvg = !!exercise._svgSlug
  const workoutMuscles = getExerciseMuscles(exercise.name)
  const mapMuscles = workoutMuscles || (exercise.target_muscle ? { primary: exercise.target_muscle, secondary: exercise.secondary_muscles || [] } : null)

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: 'var(--ink-panel)', border: '1px solid var(--border2)', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '85vh', overflowY: 'auto', padding: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', animation: 'popIn .25s ease backwards' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', lineHeight: 1.2 }}>{translateName(exercise.name)}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {exercise.category} {exercise.equipment ? `· ${translateEquipment(exercise.equipment)}` : ''}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', padding: '2px' }}>✕</button>
        </div>

        {/* Visual: GIF or auto-cycling SVG frames */}
        {isSvg ? (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '12px', background: '#0b0b12', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={getAssetUrl(exercise._svgSlug, frameIdx) || ''}
              alt={translateName(exercise.name)}
              style={{ maxHeight: '240px', objectFit: 'contain', display: 'block', transition: 'opacity 0.15s ease' }}
            />
            <div style={{ display: 'flex', gap: '6px', padding: '8px' }}>
              {([1, 2, 3] as const).map(i => (
                <button key={i} onClick={() => setFrameIdx(i)} style={{
                  width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: frameIdx === i ? 'var(--blue)' : 'var(--border2)',
                }} />
              ))}
            </div>
          </div>
        ) : exercise.gif_url ? (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '12px', background: '#0b0b12', display: 'flex', justifyContent: 'center' }}>
            <img src={exercise.gif_url} alt={translateName(exercise.name)} style={{ maxHeight: '240px', objectFit: 'contain', display: 'block' }} />
          </div>
        ) : exercise.image_url ? (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '12px', background: '#0b0b12', display: 'flex', justifyContent: 'center' }}>
            <img src={exercise.image_url} alt={translateName(exercise.name)} style={{ maxHeight: '240px', objectFit: 'contain', display: 'block' }} />
          </div>
        ) : null}

        {exercise.target_muscle && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '3px 8px', borderRadius: '3px', background: 'rgba(255,107,157,0.12)', color: 'var(--pink-light)', border: '1px solid rgba(255,107,157,0.3)' }}>
              Foco: {translateMuscle(exercise.target_muscle)}
            </span>
            {(exercise.secondary_muscles || []).map((m: string, i: number) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '3px 8px', borderRadius: '3px', background: 'rgba(91,141,239,0.1)', color: 'var(--blue-light)', border: '1px solid rgba(91,141,239,0.25)' }}>
                {translateMuscle(m)}
              </span>
            ))}
          </div>
        )}

        {mapMuscles && (
          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <MuscleMap primary={mapMuscles.primary} secondary={mapMuscles.secondary} />
          </div>
        )}

        <div className="kpi-label" style={{ marginBottom: '8px', fontSize: '0.65rem' }}>CÓMO EJECUTARLO</div>
        {steps.length > 0 ? (
          <ol style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {steps.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ol>
        ) : (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {exercise.description || 'Sin instrucciones disponibles.'}
          </p>
        )}
      </div>
    </div>
  )
}

```

### components\intro-reveal.tsx

```
'use client'

import { useEffect, useRef, useState } from 'react'
import { createTimeline, scrambleText, stagger } from 'animejs'

const WORD = 'Coach'

const introRows = [2, 3, 4, 5, 4, 3, 2]

const featureRows: { word: string; color: string }[][] = [
  [{ word: 'Entrenamientos', color: 'var(--pink)' }, { word: 'Nutrición', color: 'var(--blue)' }],
  [
    { word: 'Recuperación', color: 'var(--purple)' },
    { word: 'Coach IA', color: 'var(--blue-light)' },
    { word: 'Macros', color: 'var(--pink)' },
  ],
  [
    { word: '302 ejercicios', color: 'var(--blue)' },
    { word: 'Sobrecarga progresiva', color: 'var(--purple)' },
    { word: 'Cards de progreso', color: 'var(--pink)' },
    { word: 'Body Map', color: 'var(--blue-light)' },
  ],
  [{ word: 'Workout Timer', color: 'var(--pink)' }, { word: 'Recovery Zone', color: 'var(--blue)' }],
]

export default function IntroReveal() {
  const [gone, setGone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }

    const tl = createTimeline({ defaults: { ease: 'out(3)' } })

    tl.add('.intro-slide-1', {
      opacity: { to: 1, duration: 250, ease: 'linear' },
      scale: { from: 0.75, to: 1, duration: 1500, ease: 'inOut(3)' },
      ease: 'inOut(3)',
    })
    tl.add(
      '.intro-slide-1 p.center',
      {
        scale: { from: 3 },
        color: { from: 'var(--text-faint)', to: 'var(--pink)' },
        innerHTML: scrambleText({ override: ' ', ease: 'inQuad', duration: 500, from: 'center', cursor: '░▒▓█' }),
      },
      '<<'
    )
    tl.add(
      '.intro-slide-1 p:not(.center)',
      {
        scale: { from: 0.75 },
        color: { to: 'var(--text-muted)' },
        innerHTML: scrambleText({ override: ' ', from: 'center', duration: 500, revealDelay: 250, cursor: '░▒▓', perturbation: 0.25 }),
      },
      stagger([250, 750], { grid: true, from: 'center', ease: 'out(3)', start: '<<' })
    )
    tl.add(
      '.intro-slide-1 p:not(.center)',
      { innerHTML: scrambleText({ text: '', override: false, from: 'center', ease: 'outQuad', reversed: true, duration: 200, cursor: '░▒▓' }) },
      '<+=150'
    )
    tl.add(
      '.intro-slide-1 p.center',
      {
        scale: 1.35,
        color: { to: 'var(--blue)' },
        ease: 'inOutExpo',
        duration: 900,
        innerHTML: scrambleText({ text: 'Tu coach en el bolsillo', ease: 'inQuad', override: false, from: 'center', duration: 700, perturbation: 0.25 }),
      },
      '<<'
    )

    tl.set('.intro-slide-2', { opacity: 1 }, '<<')
    tl.add(
      '.intro-slide-2 p',
      { innerHTML: scrambleText({ override: ' ', from: 'center', duration: 500, revealDelay: 250, cursor: '░▒▓', perturbation: 0.5 }) },
      stagger([0, 600], { grid: true, from: 'center', ease: 'out(3)', start: '<<+=200', reversed: true })
    )
    tl.add(
      '.intro-slide-2 p',
      { scale: [0.8, 1] },
      stagger([0, 120], { grid: true, from: 'center', ease: 'out(3)', start: '<<', reversed: true })
    )

    tl.set('.intro-slide-3', { opacity: 1 }, '<<')
    tl.add(
      '.intro-slide-3 p.brand',
      {
        color: { to: 'var(--text)' },
        scale: 1.25,
        ease: 'inOutExpo',
        innerHTML: scrambleText({ override: ' ', from: 'center', settleDuration: 500, revealRate: 33, perturbation: 0.2 }),
      },
      '-=250'
    )
    tl.add(
      '.intro-slide-3 p.brand',
      {
        color: { to: 'var(--text)' },
        duration: 1250,
        innerHTML: scrambleText({ text: 'Tu entrenador personal en el bolsillo', override: false, from: 'center', cursor: '░▒▓', duration: 750, ease: 'inOut' }),
      },
      '<+=750'
    )
    tl.add('.intro-slide-3 p.tag', {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 500,
      ease: 'outExpo',
    })
    tl.add(
      overlay,
      {
        opacity: 0,
        ease: 'outExpo',
        duration: 600,
        onComplete: () => setGone(true),
      },
      '<+=600'
    )

    tl.init()
    return () => {
      tl.cancel()
    }
  }, [])

  if (gone) return null

  return (
    <div ref={overlayRef} aria-hidden className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[var(--ink)] select-none">
      <div className="relative aspect-video flex w-full max-w-[1000px] flex-col items-center justify-center">
        <div className="intro-slide intro-slide-1 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          {introRows.map((count, r) => (
            <div className="flex flex-row flex-nowrap justify-center" key={r}>
              {Array.from({ length: count }, (_, c) => (
                <p
                  key={c}
                  className={`font-[var(--font-mono)] text-[clamp(1rem,3vw,2rem)] leading-none text-[var(--text-faint)] m-[1ch] shrink-0 whitespace-nowrap ${r === 3 && c === 2 ? 'center' : ''}`}
                >
                  {WORD}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="intro-slide intro-slide-2 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          {featureRows.map((row, r) => (
            <div className="flex flex-row flex-nowrap justify-center" key={r}>
              {row.map(({ word, color }) => (
                <p
                  key={word}
                  style={{ color }}
                  className="font-[var(--font-mono)] text-[clamp(1rem,3vw,2rem)] leading-none m-[1ch] shrink-0 whitespace-nowrap"
                >
                  {word}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="intro-slide intro-slide-3 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <p className="brand font-[var(--font-mono)] text-[clamp(1.4rem,4.5vw,3rem)] font-bold leading-tight text-[var(--text)] text-center m-[1ch] whitespace-nowrap">
            Gym Coach
          </p>
          <p className="tag mt-4 text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">Hecho con anime.js</p>
        </div>
      </div>
    </div>
  )
}
```

### components\logo-3d.tsx

```
'use client'

import { useEffect, useRef } from 'react'
import { animate, createTimeline } from 'animejs'
import 'animejs/adapters/three'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json'

const PINK = 0xff6b9d
const BLUE = 0x5b8def
const WHITE = 0xf0f4ff

export default function Logo3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = Math.max(mount.clientWidth, 160)
    const height = Math.max(mount.clientHeight, 90)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.35, 5.2)
    camera.lookAt(0, -0.1, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(1.5, 2.6, 3)
    scene.add(key)
    const pinkLight = new THREE.PointLight(PINK, 60, 25)
    pinkLight.position.set(-2.4, 1.2, 2.4)
    scene.add(pinkLight)
    const blueLight = new THREE.PointLight(BLUE, 45, 25)
    blueLight.position.set(2.4, -1, 2.4)
    scene.add(blueLight)

    const font = new FontLoader().parse(helvetikerBold)
    const textOpts = {
      font,
      size: 0.34,
      height: 0.12,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.014,
      bevelSegments: 3,
    }
    const gymGeo = new TextGeometry('Gym', textOpts)
    const coachGeo = new TextGeometry('Coach', textOpts)
    gymGeo.computeBoundingBox()
    coachGeo.computeBoundingBox()
    gymGeo.center()
    coachGeo.center()
    const gymSize = new THREE.Vector3()
    const coachSize = new THREE.Vector3()
    gymGeo.boundingBox!.getSize(gymSize)
    coachGeo.boundingBox!.getSize(coachSize)
    const gap = 0.09
    const total = gymSize.x + gap + coachSize.x

    const gym = new THREE.Mesh(
      gymGeo,
      new THREE.MeshStandardMaterial({ color: WHITE, metalness: 0.35, roughness: 0.22 })
    )
    gym.position.x = -total / 2 + gymSize.x / 2
    const coach = new THREE.Mesh(
      coachGeo,
      new THREE.MeshStandardMaterial({ color: PINK, metalness: 0.2, roughness: 0.28 })
    )
    coach.position.x = total / 2 - coachSize.x / 2

    const group = new THREE.Group()
    group.add(gym, coach)
    scene.add(group)

    renderer.setAnimationLoop(() => renderer.render(scene, camera))
    const resize = () => {
      const w = Math.max(mount.clientWidth, 160)
      const h = Math.max(mount.clientHeight, 90)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let idle: ReturnType<typeof createTimeline> | null = null
    let burst: ReturnType<typeof createTimeline> | null = null
    let entrance: ReturnType<typeof animate> | null = null

    if (reduced) {
      group.scale.setScalar(1)
    } else {
      group.scale.setScalar(0)
      entrance = animate(group, {
        scale: { from: 0, to: 1 },
        rotateY: { from: -120, to: 0 },
        duration: 1500,
        ease: 'outExpo',
        onComplete: () => {
          idle = createTimeline({ loop: true, alternate: true, defaults: { ease: 'inOutSine' } })
            .add(group, { rotateY: [-18, 18], duration: 7000 }, 0)
            .add(group, { y: [0, 0.09], duration: 2800 }, 0)
          idle.play()
        },
      })

      burst = createTimeline({
        onComplete: () => idle?.play(),
      })
        .add(group, { rotateY: '+=180', duration: 1500, ease: 'out(3)' }, 0)
        .add(group, { scale: 1.18, duration: 600, ease: 'outBack(2)' }, 0)
        .add(group, { scale: 1, duration: 700, ease: 'out(3)' }, 600)
      const fireBurst = () => {
        idle?.cancel()
        burst?.play()
      }
      mount.addEventListener('pointerenter', fireBurst)
      mount.addEventListener('pointerdown', fireBurst)
      mount.dataset.burst = 'true'
    }

    return () => {
      entrance?.cancel()
      burst?.cancel()
      idle?.cancel()
      renderer.setAnimationLoop(null)
      ro.disconnect()
      gymGeo.dispose()
      coachGeo.dispose()
      ;(gym.material as THREE.Material).dispose()
      ;(coach.material as THREE.Material).dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-label="Gym Coach logo 3D" />
}
```

### components\MealTracker.tsx

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { calculateMacros } from '@/lib/nutrition'

interface MealTrackerProps {
  userId: string
}

const quickFoods: Record<string, { name: string; kcal: number; pro: number; carb: number; fat: number }[]> = {
  breakfast: [
    { name: 'Avena (50g)', kcal: 190, pro: 7, carb: 33, fat: 4 },
    { name: 'Huevos revueltos (3)', kcal: 210, pro: 18, carb: 1, fat: 15 },
    { name: 'Yogur griego (200g)', kcal: 150, pro: 20, carb: 7, fat: 5 },
    { name: 'Pan integral (2 rebanadas)', kcal: 160, pro: 8, carb: 30, fat: 2 },
    { name: 'Plátano (1)', kcal: 105, pro: 1, carb: 27, fat: 0 },
  ],
  lunch: [
    { name: 'Pollo a la plancha (150g)', kcal: 250, pro: 45, carb: 0, fat: 7 },
    { name: 'Arroz blanco (150g)', kcal: 200, pro: 4, carb: 44, fat: 0 },
    { name: 'Pescado al horno (150g)', kcal: 220, pro: 35, carb: 0, fat: 8 },
    { name: 'Lentejas (200g)', kcal: 230, pro: 18, carb: 40, fat: 1 },
    { name: 'Camote (200g)', kcal: 180, pro: 4, carb: 41, fat: 0 },
    { name: 'Ensalada de atún', kcal: 280, pro: 28, carb: 12, fat: 14 },
  ],
  dinner: [
    { name: 'Pollo al horno (150g)', kcal: 230, pro: 40, carb: 0, fat: 6 },
    { name: 'Carne magra (150g)', kcal: 280, pro: 42, carb: 0, fat: 12 },
    { name: 'Salmón (150g)', kcal: 310, pro: 30, carb: 0, fat: 21 },
    { name: 'Ensalada de pollo', kcal: 250, pro: 32, carb: 10, fat: 10 },
    { name: 'Camarones (150g)', kcal: 160, pro: 30, carb: 2, fat: 3 },
    { name: 'Tortilla de verduras', kcal: 200, pro: 12, carb: 10, fat: 12 },
  ],
  snack: [
    { name: 'Batido de proteína', kcal: 150, pro: 25, carb: 5, fat: 3 },
    { name: 'Almendras (30g)', kcal: 170, pro: 6, carb: 6, fat: 15 },
    { name: 'Manzana (1)', kcal: 95, pro: 0, carb: 25, fat: 0 },
    { name: 'Palta (1/2)', kcal: 160, pro: 2, carb: 8, fat: 15 },
    { name: 'Requesón (100g)', kcal: 100, pro: 11, carb: 4, fat: 4 },
    { name: 'Huevo duro (1)', kcal: 78, pro: 6, carb: 1, fat: 5 },
    { name: 'Cacahuetes (30g)', kcal: 170, pro: 8, carb: 5, fat: 14 },
  ],
}

export default function MealTracker({ userId }: MealTrackerProps) {
  const [mealType, setMealType] = useState('breakfast')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fats, setFats] = useState('')
  const [loading, setLoading] = useState(false)
  const [todayMeals, setTodayMeals] = useState<any[]>([])
  const [macroGoals, setMacroGoals] = useState<{ calories: number; protein: number; fat: number; carbs: number } | null>(null)

  const mealTypes: Record<string, { label: string; border: string }> = {
    breakfast: { label: 'Desayuno', border: 'var(--orange)' },
    lunch: { label: 'Almuerzo', border: 'var(--green)' },
    dinner: { label: 'Cena', border: 'var(--purple)' },
    snack: { label: 'Snack', border: 'var(--pink-light)' },
  }

  useEffect(() => {
    fetchTodayMeals()
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
    if (profile?.weight_kg && profile?.height_cm && profile?.age) {
      const w = profile.weight_kg
      const h = profile.height_cm
      const a = profile.age
      const gender = profile.gender || 'male'
      const activityLevel = profile.activity_level || 'moderate'
      const metabolicRate = profile.metabolic_rate || 'normal'
      const goal = profile.goal || 'hypertrophy'

      const bmr = calculateMacros(w, h, a, gender, activityLevel, metabolicRate, goal)
      setMacroGoals({ calories: bmr.calories, protein: bmr.protein, carbs: bmr.carbs, fat: bmr.fat })
    }
  }

  const fetchTodayMeals = async () => {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase.from('meals').select('*').eq('date', today).order('created_at', { ascending: false })
    setTodayMeals(data || [])
  }

  const saveMeal = async () => {
    if (!foodName || !calories) { alert('Completa al menos Alimento y Calorías'); return }
    setLoading(true)
    const today = new Date().toISOString().split('T')[0]
    await supabase.from('meals').insert({
      user_id: userId, date: today, meal_type: mealType, food_name: foodName,
      calories: parseInt(calories), protein: protein ? parseFloat(protein) : 0,
      carbs: carbs ? parseFloat(carbs) : 0, fats: fats ? parseFloat(fats) : 0,
    })
    setFoodName(''); setCalories(''); setProtein(''); setCarbs(''); setFats('')
    fetchTodayMeals()
    setLoading(false)
  }

  const deleteMeal = async (id: string) => { await supabase.from('meals').delete().eq('id', id); fetchTodayMeals() }

  const quickAdd = async (food: { name: string; kcal: number; pro: number; carb: number; fat: number }) => {
    const today = new Date().toISOString().split('T')[0]
    await supabase.from('meals').insert({
      user_id: userId, date: today, meal_type: mealType, food_name: food.name,
      calories: food.kcal, protein: food.pro, carbs: food.carb, fats: food.fat,
    })
    fetchTodayMeals()
  }

  const totals = todayMeals.reduce((acc, m) => ({
    calories: acc.calories + (m.calories || 0),
    protein: acc.protein + (m.protein || 0),
    carbs: acc.carbs + (m.carbs || 0),
    fats: acc.fats + (m.fats || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

  const getProgressBar = (current: number, goal: number, color: string) => {
    const pct = goal > 0 ? Math.min((current / goal) * 100, 100) : 0
    return (
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 0.3s' }} />
      </div>
    )
  }

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Macro progress bars */}
      <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="kpi-label" style={{ marginBottom: '8px' }}>PROGRESO DIARIO</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Calorías', current: totals.calories, goal: macroGoals?.calories || 2500, color: 'var(--red)', unit: 'kcal' },
            { label: 'Proteína', current: totals.protein, goal: macroGoals?.protein || 150, color: 'var(--blue)', unit: 'g' },
            { label: 'Carbos', current: totals.carbs, goal: macroGoals?.carbs || 300, color: 'var(--orange)', unit: 'g' },
            { label: 'Grasas', current: totals.fats, goal: macroGoals?.fat || 60, color: 'var(--pink-light)', unit: 'g' },
          ].map((card, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '2px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{card.label}</span>
                <span style={{ color: 'var(--text)', fontWeight: 700 }}>
                  {Math.round(card.current)} <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>/ {card.goal}</span>
                </span>
              </div>
              {getProgressBar(card.current, card.goal, card.color)}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', marginTop: '2px', textAlign: 'right' }}>
                {Math.round((card.current / (card.goal || 1)) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick add */}
      <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="kpi-label" style={{ marginBottom: '8px' }}>
          AÑADIDO RÁPIDO — {mealTypes[mealType].label.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(quickFoods[mealType] || []).map((food, idx) => (
            <button key={idx} className="fx"
              onClick={() => quickAdd(food)}
              title={`${food.kcal} kcal · P:${food.pro} C:${food.carb} G:${food.fat}`}
              style={{ padding: '7px 10px', background: 'rgba(111,160,255,0.08)', border: '1px solid rgba(111,160,255,0.3)', color: 'var(--text)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              {food.name}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', marginTop: '8px' }}>
          Las comidas rápidas se añaden al tipo de comida seleccionado arriba. Cambia Desayuno/Almuerzo/Cena/Snack para ver más opciones.
        </div>
      </div>

      {/* Form */}
      <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px' }}>REGISTRAR COMIDA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '16px' }}>
          <select value={mealType} onChange={e => setMealType(e.target.value)} style={{ ...inputStyle, width: '100%' }}>
            {Object.entries(mealTypes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <input type="text" placeholder="Nombre del alimento" value={foodName} onChange={e => setFoodName(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input type="number" placeholder="Calorías" value={calories} onChange={e => setCalories(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Proteína (g)" value={protein} onChange={e => setProtein(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Carbos (g)" value={carbs} onChange={e => setCarbs(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Grasas (g)" value={fats} onChange={e => setFats(e.target.value)} style={inputStyle} />
        </div>
        <button className="fx" onClick={saveMeal} disabled={loading}
          style={{ width: '100%', padding: '12px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px', opacity: loading ? 0.5 : 1 }}>
          {loading ? 'Guardando...' : 'Registrar Comida'}
        </button>
      </div>

      {/* Today's meals */}
      {todayMeals.length > 0 && (
        <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px' }}>COMIDAS DE HOY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {todayMeals.map((meal, idx) => {
              const info = mealTypes[meal.meal_type]
              return (
                <div key={meal.id}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: `3px solid ${info?.border || 'var(--border)'}`, animation: 'slideIn .3s ease backwards', animationDelay: `${idx * 0.05}s` }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{meal.food_name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {meal.calories} kcal · P:{meal.protein}g · C:{meal.carbs}g · G:{meal.fats}g
                    </div>
                  </div>
                  <button onClick={() => deleteMeal(meal.id)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

```

### components\MuscleMap.tsx

```
'use client'

import type { MuscleKey } from '@/lib/muscle-map'
import { MUSCLE_LABELS, resolveMuscleKeys } from '@/lib/muscle-map'

interface Region { key: MuscleKey; d: string }

const FRONT: Region[] = [
  { key: 'traps', d: 'M82 58 H118 L130 84 H70 Z' },
  { key: 'shoulders', d: 'M70 84 C60 84 50 92 50 106 C50 120 62 128 70 128 C75 116 76 96 70 84 Z M130 84 C140 84 150 92 150 106 C150 120 138 128 130 128 C125 116 124 96 130 84 Z' },
  { key: 'chest', d: 'M88 92 C78 104 80 124 90 128 L100 124 V96 Z M112 92 C122 104 120 124 110 128 L100 124 V96 Z' },
  { key: 'biceps', d: 'M52 112 C44 112 40 120 40 136 C40 150 46 156 54 156 C58 146 58 122 52 112 Z M148 112 C156 112 160 120 160 136 C160 150 154 156 146 156 C142 146 142 122 148 112 Z' },
  { key: 'forearms', d: 'M42 162 C34 162 32 176 34 194 C36 210 44 216 52 214 C54 200 54 172 42 162 Z M158 162 C166 162 168 176 166 194 C164 210 156 216 148 214 C146 200 146 172 158 162 Z' },
  { key: 'abs', d: 'M78 132 L122 132 L118 176 L82 176 Z' },
  { key: 'quads', d: 'M80 184 C68 190 62 204 62 224 C62 240 74 246 86 247 C90 234 88 196 80 184 Z M120 184 C132 190 138 204 138 224 C138 240 126 246 114 247 C110 234 112 196 120 184 Z' },
  { key: 'calves', d: 'M66 256 C58 262 56 278 58 296 C60 306 68 310 76 308 C78 296 76 264 66 256 Z M134 256 C142 262 144 278 142 296 C140 306 132 310 124 308 C122 296 124 264 134 256 Z' },
]

const BACK: Region[] = [
  { key: 'traps', d: 'M82 58 H118 L130 84 H70 Z' },
  { key: 'rearDelts', d: 'M66 84 C54 88 48 100 52 114 C56 124 64 128 72 126 C74 112 72 94 66 84 Z M134 84 C146 88 152 100 148 114 C144 124 136 128 128 126 C126 112 128 94 134 84 Z' },
  { key: 'triceps', d: 'M54 116 C46 120 44 134 48 150 C52 160 58 162 64 158 C64 144 62 124 54 116 Z M146 116 C154 120 156 134 152 150 C148 160 142 162 136 158 C136 144 138 124 146 116 Z' },
  { key: 'lats', d: 'M78 86 C64 104 62 124 70 140 L84 166 L92 140 C86 118 84 100 78 86 Z M122 86 C136 104 138 124 130 140 L116 166 L108 140 C114 118 116 100 122 86 Z' },
  { key: 'lowerBack', d: 'M78 156 L122 156 L118 186 L82 186 Z' },
  { key: 'glutes', d: 'M70 190 C62 200 64 216 74 226 C86 230 114 230 126 226 C136 216 138 200 130 190 C116 200 84 200 70 190 Z' },
  { key: 'hamstrings', d: 'M80 236 C70 240 64 252 64 268 C64 282 74 288 84 288 C88 276 88 248 80 236 Z M120 236 C130 240 136 252 136 268 C136 282 126 288 116 288 C112 276 112 248 120 236 Z' },
  { key: 'calves', d: 'M66 256 C58 262 56 278 58 296 C60 306 68 310 76 308 C78 296 76 264 66 256 Z M134 256 C142 262 144 278 142 296 C140 306 132 310 124 308 C122 296 124 264 134 256 Z' },
]

function Figure({ regions, active, primary }: {
  regions: Region[]
  active: Set<MuscleKey>
  primary: MuscleKey | null
}) {
  return (
    <svg viewBox="0 0 200 320" width="100%" style={{ maxWidth: 220, display: 'block' }}>
      {regions.map(r => {
        const isActive = active.has(r.key)
        const isPrimary = primary === r.key
        return (
          <path
            key={r.key}
            d={r.d}
            fill={isActive ? (isPrimary ? 'var(--blue)' : 'rgba(91,141,239,0.45)') : 'rgba(255,255,255,0.03)'}
            stroke={isActive ? (isPrimary ? 'var(--blue-light)' : 'rgba(111,160,255,0.6)') : 'var(--border2)'}
            strokeWidth={2}
            strokeLinejoin="round"
            style={isPrimary ? { animation: 'pulse 2s ease-in-out infinite', filter: 'drop-shadow(0 0 6px var(--blue))' } : undefined}
          />
        )
      })}
    </svg>
  )
}

export default function MuscleMap({ primary, secondary }: { primary: string; secondary: string[] }) {
  const { primaryKey, secondaryKeys, allKeys } = resolveMuscleKeys(primary, secondary)
  const active = new Set(allKeys)
  const labels = allKeys.map(k => MUSCLE_LABELS[k])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', justifyContent: 'center' }}>
      <Figure regions={FRONT} active={active} primary={primaryKey} />
      <Figure regions={BACK} active={active} primary={primaryKey} />
      <div style={{ alignSelf: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Músculos trabajados</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
          {labels.map(l => (
            <span key={l} className="muscle-chip" style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', border: '1px solid var(--border2)', color: 'var(--text)', background: 'rgba(91,141,239,0.08)' }}>{l}</span>
          ))}
          {labels.length === 0 && <span style={{ color: 'var(--text-faint)' }}>—</span>}
        </div>
      </div>
    </div>
  )
}
```

### components\page-transition.tsx

```
'use client'

import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const node = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = node.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    animate(el, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 420,
      ease: 'outCubic',
    })
    return () => { utils.remove(el) }
  }, [pathname])

  return <div ref={node}>{children}</div>
}
```

### components\PointsDisplay.tsx

```
'use client'

interface PointsDisplayProps {
  points: any
}

export default function PointsDisplay({ points }: PointsDisplayProps) {
  const cards = [
    { label: 'Puntos Totales', value: points?.total_points || 0, border: 'var(--blue)' },
    { label: 'Racha de Consistencia', value: points?.streak_days || 0, subtitle: 'días seguidos', border: 'var(--orange)' },
    { label: 'Última Actividad', value: points?.last_activity ? new Date(points.last_activity).toLocaleDateString('es-ES') : 'Sin registros', border: 'var(--green)' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', width: '100%' }}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{ borderTop: `2px solid ${card.border}`, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px 18px', overflow: 'hidden', animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.08}s` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="kpi-label">{card.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 1,
                  marginTop: '4px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  animation: 'popIn .4s ease backwards',
                  animationDelay: `${idx * 0.08 + 0.15}s`,
                }}
              >
                {card.value}
              </div>
              {card.subtitle && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '3px' }}>
                  {card.subtitle}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

```

### components\ProgressiveOverload.tsx

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ProgressiveOverloadProps {
  userId: string
}

interface ExerciseRecommendation {
  exercise_id: string
  exercise_name: string
  category: string
  last_weight: number
  last_reps: number
  last_sets: number
  suggested_weight: number
  suggested_reps: number
  suggestion_type: 'increase_weight' | 'increase_reps' | 'maintain'
  reason: string
  confidence: 'high' | 'medium' | 'low'
}

export default function ProgressiveOverload({ userId }: ProgressiveOverloadProps) {
  const [recommendations, setRecommendations] = useState<ExerciseRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)

  const analyzeProgress = async () => {
    setLoading(true)
    try {
      // Get last 3 workouts for each exercise
      const { data: workoutSets } = await supabase
        .from('workout_sets')
        .select('*, workouts(date, user_id), exercises(name, category)')
        .eq('workouts.user_id', userId)
        .order('workouts.date', { ascending: false })
        .limit(100)

      if (!workoutSets || workoutSets.length === 0) {
        setRecommendations([])
        setLoading(false)
        return
      }

      // Group by exercise
      const exerciseMap: Record<string, any[]> = {}
      workoutSets.forEach((set: any) => {
        const exId = set.exercise_id
        if (!exerciseMap[exId]) exerciseMap[exId] = []
        exerciseMap[exId].push(set)
      })

      // Generate recommendations using progressive overload principles
      const recs: ExerciseRecommendation[] = []

      Object.entries(exerciseMap).forEach(([exId, sets]) => {
        if (sets.length < 2) return // Need at least 2 sessions

        const latestSet = sets[0]
        const previousSet = sets[1]

        const exerciseName = latestSet.exercises?.name || 'Ejercicio'
        const category = latestSet.exercises?.category || ''
        const lastWeight = latestSet.weight || 0
        const lastReps = latestSet.reps || 0
        const lastSets = latestSet.sets || 1

        // Progressive overload logic based on Stronger by Science research:
        // 1. If user completed target reps (>10) at current weight → increase weight
        // 2. If user hit target reps (8-12) consistently → increase weight by 2.5-5%
        // 3. If user struggling (failed reps) → maintain weight, increase reps

        let suggestedWeight = lastWeight
        let suggestedReps = lastReps
        let suggestionType: ExerciseRecommendation['suggestion_type'] = 'maintain'
        let reason = ''
        let confidence: ExerciseRecommendation['confidence'] = 'medium'

        // Primary recommendation: weight increase for hypertrophy
        if (lastReps >= 12) {
          // User exceeded target rep range → increase weight
          const increment = category === 'Pierna' ? 2.5 : 1.25
          suggestedWeight = Math.round((lastWeight + increment) * 4) / 4
          suggestedReps = 8 // Reset to lower rep range with new weight
          suggestionType = 'increase_weight'
          reason = `Pudiste hacer ${lastReps} reps. Sube ${increment}kg y empieza con 8 reps.`
          confidence = 'high'
        } else if (lastReps >= 8 && lastReps <= 11) {
          // In the sweet spot → try to increase reps first
          suggestedReps = lastReps + 1
          suggestionType = 'increase_reps'
          reason = `Estás en el rango ideal (8-12). Intenta ${lastReps + 1} reps antes de subir peso.`
          confidence = 'medium'
        } else if (lastReps < 8) {
          // Below target → maintain weight, focus on form
          suggestionType = 'maintain'
          reason = `Estás por debajo del rango objetivo. Mantén ${lastWeight}kg y enfócate en técnica.`
          confidence = 'medium'
        }

        // If we can compare with previous session
        if (previousSet) {
          const prevWeight = previousSet.weight || 0
          const prevReps = previousSet.reps || 0

          if (lastWeight > prevWeight && lastReps >= 8) {
            // Successfully progressed in weight
            reason = `¡Progresión exitosa! Subiste ${lastWeight - prevWeight}kg. Intenta otra subida o más reps.`
            confidence = 'high'
          }
        }

        recs.push({
          exercise_id: exId,
          exercise_name: exerciseName,
          category,
          last_weight: lastWeight,
          last_reps: lastReps,
          last_sets: lastSets,
          suggested_weight: suggestedWeight,
          suggested_reps: suggestedReps,
          suggestion_type: suggestionType,
          reason,
          confidence,
        })
      })

      // Sort by confidence
      recs.sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.confidence] - order[b.confidence]
      })

      setRecommendations(recs)
      setLastAnalysis(new Date())
    } finally {
      setLoading(false)
    }
  }

  const getSuggestionIcon = (type: ExerciseRecommendation['suggestion_type']) => {
    switch (type) {
      case 'increase_weight': return '↑'
      case 'increase_reps': return '+'
      case 'maintain': return '→'
    }
  }

  const getSuggestionLabel = (type: ExerciseRecommendation['suggestion_type']) => {
    switch (type) {
      case 'increase_weight': return 'Subir peso'
      case 'increase_reps': return 'Subir reps'
      case 'maintain': return 'Mantener'
    }
  }

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header */}
      <button className="fx" onClick={analyzeProgress} disabled={loading}
        style={{ width: '100%', padding: '16px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: loading ? 0.5 : 1 }}>
        {loading ? 'Analizando progreso...' : 'Analizar Sobrecarga Progresiva'}
      </button>

      {lastAnalysis && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)' }}>Último análisis: {lastAnalysis.toLocaleString('es-ES')}</p>}

      {/* Info callout */}
      <div className="callout" style={{ borderLeftColor: 'var(--purple)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
          <strong>Basado en investigación:</strong> Chaves et al (2024) y Plotkin et al (2022) demostraron que tanto la progresión de peso como de reps producen ganancias similares en fuerza e hipertrofia. Para hipertrofia, tienes flexibilidad; para fuerza, subir peso es esencial.
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="kpi-label">RECOMENDACIONES PARA TU PRÓXIMA SESIÓN</div>
          {recommendations.map((rec, idx) => (
            <div key={idx}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', borderLeft: `3px solid ${rec.confidence === 'high' ? 'var(--green)' : rec.confidence === 'medium' ? 'var(--orange)' : 'var(--red)'}`, animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.08}s` }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{getSuggestionIcon(rec.suggestion_type)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{rec.exercise_name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '3px' }}>{rec.category}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Último: {rec.last_weight}kg × {rec.last_reps} reps ({rec.last_sets} sets)
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>
                  {rec.reason}
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                  {getSuggestionLabel(rec.suggestion_type)}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green)' }}>
                  {rec.suggested_weight}kg × {rec.suggested_reps}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {recommendations.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
            Registra más entrenamientos para obtener recomendaciones de sobrecarga progresiva
          </p>
        </div>
      )}
    </div>
  )
}

```

### components\RecoveryZone.tsx

```
'use client'

import { useMuscleCounts } from '@/lib/useMuscleCounts'
import { MUSCLE_META } from '@/lib/muscle-meta'

interface RecoveryZoneProps {
  userId: string
}

export default function RecoveryZone({ userId }: RecoveryZoneProps) {
  const { counts: muscleData } = useMuscleCounts(userId)

  const getColor = (count: number) => {
    if (count === 0) return { fill: '#4a4e68', label: 'Sin entrenar', dot: 'var(--text-faint)' }
    if (count <= 2) return { fill: '#4ade80', label: 'Fresco', dot: 'var(--green)' }
    if (count <= 5) return { fill: '#fbbf24', label: 'Moderado', dot: 'var(--orange)' }
    return { fill: '#f87171', label: 'Fatigado', dot: 'var(--red)' }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Legend */}
      <div className="panel">
        <div className="kpi-label" style={{ marginBottom: '10px' }}>LEYENDA DE RECUPERACIÓN</div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { color: '#4ade80', label: 'Fresco (48h+)', desc: 'Listo para entrenar' },
            { color: '#fbbf24', label: 'Moderado (24-48h)', desc: 'Entrenar con precaución' },
            { color: '#f87171', label: 'Fatigado (<24h)', desc: 'Necesita descanso' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: item.color, flexShrink: 0 }}></div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Muscle Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {Object.entries(muscleData).map(([muscle, count], idx) => {
          const colors = getColor(count)
          return (
            <div key={muscle} className="fx-lift"
              style={{ background: 'rgba(255,255,255,0.05)', border: `2px solid ${colors.fill}`, borderRadius: '6px', padding: '14px', textAlign: 'center', cursor: 'default', animation: 'popIn .3s ease backwards', animationDelay: `${idx * 0.08}s` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>
                {MUSCLE_META[muscle]?.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: colors.fill, marginTop: '8px' }}>
                {count} sets
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', marginTop: '4px' }}>
                {colors.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', marginTop: '8px', lineHeight: 1.4 }}>
                {MUSCLE_META[muscle] && `Ejercicios: ${MUSCLE_META[muscle].desc}`}
              </div>
            </div>
          )
        })}
      </div>

      {/* Auto-refresh indicator */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-faint)', textAlign: 'center' }}>
        Se actualiza automáticamente cada 30 segundos
      </div>
    </div>
  )
}

```

### components\Routines.tsx

```
'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchAllExercises } from '@/lib/exercises'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'
import { translateName } from '@/lib/translate'

interface RoutinesProps {
  userId: string
}

const TEMPLATES: { id: string; name: string; description: string; icon: string; exercises: { name: string; sets: number; reps: number }[] }[] = [
  {
    id: 'push', name: 'Empuje (Push)', icon: '═', description: 'Pecho · Hombros · Tríceps',
    exercises: [
      { name: 'Press de banca plano', sets: 4, reps: 8 },
      { name: 'Press militar (hombro)', sets: 3, reps: 10 },
      { name: 'Aperturas con mancuernas', sets: 3, reps: 12 },
      { name: 'Flexiones de pecho', sets: 3, reps: 15 },
      { name: 'Press francés', sets: 3, reps: 10 },
      { name: 'Extensión de tríceps en polea', sets: 3, reps: 12 },
    ],
  },
  {
    id: 'pull', name: 'Tirón (Pull)', icon: '∥', description: 'Espalda · Bíceps',
    exercises: [
      { name: 'Dominadas (Pull-ups)', sets: 4, reps: 8 },
      { name: 'Remo con barra', sets: 4, reps: 10 },
      { name: 'Jalón al pecho', sets: 3, reps: 12 },
      { name: 'Remo en polea baja', sets: 3, reps: 12 },
      { name: 'Curl de bíceps con barra', sets: 3, reps: 10 },
      { name: 'Curl de bíceps con mancuernas', sets: 3, reps: 12 },
    ],
  },
  {
    id: 'legs', name: 'Pierna', icon: '▽', description: 'Cuádriceps · Isquios · Glúteos',
    exercises: [
      { name: 'Sentadilla (Squat)', sets: 4, reps: 10 },
      { name: 'Peso muerto (Deadlift)', sets: 4, reps: 8 },
      { name: 'Prensa de piernas', sets: 3, reps: 12 },
      { name: 'Extensión de piernas', sets: 3, reps: 12 },
      { name: 'Curl de pierna sentado', sets: 3, reps: 12 },
      { name: 'Elevación de talones (Calf raise)', sets: 4, reps: 15 },
    ],
  },
  {
    id: 'fullbody', name: 'Cuerpo Completo', icon: '□', description: 'Todo el cuerpo · 2-3x/semana',
    exercises: [
      { name: 'Sentadilla (Squat)', sets: 3, reps: 10 },
      { name: 'Press de banca plano', sets: 3, reps: 10 },
      { name: 'Remo con barra', sets: 3, reps: 10 },
      { name: 'Press militar (hombro)', sets: 3, reps: 10 },
      { name: 'Curl de bíceps con barra', sets: 2, reps: 12 },
      { name: 'Plancha abdominal', sets: 3, reps: 30 },
    ],
  },
]

export default function Routines({ userId }: RoutinesProps) {
  const [routines, setRoutines] = useState<any[]>([])
  const [exercises, setExercises] = useState<any[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [routineName, setRoutineName] = useState('')
  const [routineDescription, setRoutineDescription] = useState('')
  const [selectedExercises, setSelectedExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(100)

  useEffect(() => { fetchRoutines(); fetchExercises() }, [])

  const fetchRoutines = async () => {
    const { data } = await supabase.from('routines').select('*, routine_exercises(*, exercises(*))').eq('user_id', userId)
    setRoutines(data || [])
  }

  const fetchExercises = async () => {
    const data = await fetchAllExercises()
    setExercises(data || [])
  }

  const categories = useMemo(() => {
    return Array.from(new Set(exercises.map(e => e.category))).sort()
  }, [exercises])

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch = !searchTerm ||
        translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      return matchesSearch && matchesCategory
    }).sort((a, b) => translateName(a.name).localeCompare(translateName(b.name)))
  }, [exercises, searchTerm, categoryFilter])

  const addExercise = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId)
    if (!exercise) return
    setSelectedExercises([...selectedExercises, { exercise_id: exerciseId, exercise, sets: 3, reps: 10, rest_seconds: 90 }])
  }

  const createRoutine = async () => {
    if (!routineName || selectedExercises.length === 0) { alert('Completa el nombre y añade ejercicios'); return }
    setLoading(true)
    const { data: routine } = await supabase.from('routines').insert({ user_id: userId, name: routineName, description: routineDescription }).select()
    if (routine?.[0]) {
      await supabase.from('routine_exercises').insert(selectedExercises.map((ex, idx) => ({
        routine_id: routine[0].id, exercise_id: ex.exercise_id, sets: ex.sets, reps: ex.reps, rest_seconds: ex.rest_seconds, order_index: idx,
      })))
      alert('Rutina creada')
      setShowCreateForm(false)
      setRoutineName('')
      setRoutineDescription('')
      setSelectedExercises([])
      fetchRoutines()
    }
    setLoading(false)
  }

  const deleteRoutine = async (id: string) => {
    await supabase.from('routines').delete().eq('id', id)
    fetchRoutines()
  }

  const matchExercise = (name: string) => {
    const q = name.toLowerCase().trim()
    return exercises.find(e => e.name.toLowerCase().trim() === q)
      || exercises.find(e => e.name.toLowerCase().includes(q))
      || exercises.find(e => q.includes(e.name.toLowerCase()))
  }

  const useTemplate = async (template: typeof TEMPLATES[number]) => {
    const resolved = template.exercises
      .map(ex => ({ ...ex, exercise: matchExercise(ex.name) }))
      .filter(x => x.exercise)
    if (resolved.length === 0) { alert('No se encontraron ejercicios en el catálogo'); return }
    setLoading(true)
    const { data: routine } = await supabase.from('routines').insert({
      user_id: userId, name: template.name, description: template.description,
    }).select()
    if (routine?.[0]) {
      await supabase.from('routine_exercises').insert(resolved.map((r, idx) => ({
        routine_id: routine[0].id, exercise_id: r.exercise.id, sets: r.sets, reps: r.reps, rest_seconds: 90, order_index: idx,
      })))
      alert(`Rutina "${template.name}" creada`)
      fetchRoutines()
    }
    setLoading(false)
  }

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', width: '100%' }

  const btnStyle = (active: boolean) => ({
    fontFamily: 'var(--font-mono)' as const,
    fontSize: '13px',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer' as const,
    border: active ? '1px solid var(--blue)' : '1px solid var(--border)',
    background: active ? 'rgba(91,141,239,0.15)' : 'transparent',
    color: active ? 'var(--blue-light)' : 'var(--text-muted)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Action */}
      <button className="fx"
        onClick={() => setShowCreateForm(!showCreateForm)}
        style={{ padding: '12px', background: showCreateForm ? 'transparent' : 'var(--blue)', color: showCreateForm ? 'var(--blue)' : '#0b0b12', border: `1px solid ${showCreateForm ? 'var(--blue)' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
        {showCreateForm ? '✕ Cancelar' : '+ Nueva Rutina'}
      </button>

      {/* Create form */}
      {showCreateForm && (
        <div className="panel" style={{ borderLeft: '3px solid var(--blue)', animation: 'riseUp .3s ease backwards' }}>
          <div className="kpi-label" style={{ marginBottom: '12px' }}>NUEVA RUTINA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Nombre de la rutina" value={routineName} onChange={e => setRoutineName(e.target.value)} style={inputStyle} />
            <textarea placeholder="Descripción (opcional)" value={routineDescription} onChange={e => setRoutineDescription(e.target.value)} rows={2} style={inputStyle} />
            <input type="text" placeholder="Buscar ejercicio por nombre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />
            {categories.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                <button onClick={() => setCategoryFilter('')} style={btnStyle(categoryFilter === '')}>Todos</button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={btnStyle(categoryFilter === cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '12px' }}>
              {filteredExercises.slice(0, visibleCount).map(ex => (
                <div key={ex.id} onClick={() => addExercise(ex.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
                  {(() => { const svg = getExerciseSvgUrl(ex.name); return svg ? <img src={svg} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} /> : null })()}
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{translateName(ex.name)}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-faint)', flexShrink: 0 }}>{ex.category}</span>
                </div>
              ))}
              {filteredExercises.length === 0 && (
                <div style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
                  Sin resultados para &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
            {visibleCount < filteredExercises.length && (
              <button onClick={() => setVisibleCount(v => v + 100)} style={{ ...btnStyle(false), width: '100%', marginBottom: '12px' }}>
                Cargar más ({filteredExercises.length - visibleCount} restantes)
              </button>
            )}

            {selectedExercises.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedExercises.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--text)' }}>{translateName(item.exercise.name)}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        <input type="number" value={item.sets} onChange={e => { const u = [...selectedExercises]; u[idx].sets = parseInt(e.target.value); setSelectedExercises(u) }} style={{ ...inputStyle, width: '60px', fontSize: '13px', padding: '6px 8px' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-faint)', alignSelf: 'center' }}>×</span>
                        <input type="number" value={item.reps} onChange={e => { const u = [...selectedExercises]; u[idx].reps = parseInt(e.target.value); setSelectedExercises(u) }} style={{ ...inputStyle, width: '60px', fontSize: '13px', padding: '6px 8px' }} />
                        <input type="number" value={item.rest_seconds} onChange={e => { const u = [...selectedExercises]; u[idx].rest_seconds = parseInt(e.target.value); setSelectedExercises(u) }} style={{ ...inputStyle, width: '80px', fontSize: '13px', padding: '6px 8px' }} placeholder="desc(s)" />
                      </div>
                    </div>
                    <button onClick={() => setSelectedExercises(selectedExercises.filter((_, i) => i !== idx))} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <button className="fx" onClick={createRoutine} disabled={loading}
              style={{ width: '100%', padding: '12px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: loading ? 0.5 : 1 }}>
              {loading ? 'Creando...' : 'Guardar Rutina'}
            </button>
          </div>
        </div>
      )}

      {/* Pre-built templates */}
      <div className="panel" style={{ borderLeft: '3px solid var(--pink)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px' }}>PLANTILLAS PRE-DISEÑADAS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
          {TEMPLATES.map(t => (
            <div key={t.id}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px', animation: 'rise .3s ease backwards' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px', color: 'var(--pink)' }}>{t.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>{t.description}</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                {t.exercises.length} ejercicios
              </div>
              <button className="fx" onClick={() => useTemplate(t)} disabled={loading}
                style={{ width: '100%', padding: '8px', background: 'rgba(255,107,157,0.15)', color: 'var(--pink-light)', border: '1px solid var(--pink)', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: loading ? 0.5 : 1 }}>
Usar plantilla
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Routine list */}
      {routines.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
          {routines.map((routine, idx) => (
            <div key={routine.id}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', borderLeft: '3px solid var(--purple)', animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.08}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>{routine.name}</div>
                  {routine.description && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{routine.description}</div>}
                </div>
                <button onClick={() => deleteRoutine(routine.id)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '2px' }}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {routine.routine_exercises?.map((re: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {(() => { const svg = getExerciseSvgUrl(re.exercises?.name || ''); return svg ? <img src={svg} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>{translateName(re.exercises?.name)}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{re.sets}×{re.reps} · {re.rest_seconds}s</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showCreateForm && (
          <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>No tienes rutinas creadas. Haz clic en "Nueva Rutina".</p>
          </div>
        )
      )}
    </div>
  )
}

```

### components\scramble-text.tsx

```
'use client'

import { useEffect, useRef } from 'react'
import { animate, scrambleText } from 'animejs'

export default function ScrambleText({
  phrases,
  className,
}: {
  phrases: string[]
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const index = useRef(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const replay = () => {
      const text = phrases[index.current % phrases.length]
      index.current += 1
      animate(el, {
        innerHTML: scrambleText({
          text: text || phrases[0],
          cursor: '░▒▓█',
          from: 'left',
          duration: 750,
          settleDuration: 250,
        }),
      })
    }

    animate(el, {
      innerHTML: scrambleText({
        text: phrases[0],
        override: '',
        cursor: '░▒▓█',
        from: 'left',
        duration: 900,
        settleDuration: 300,
      }),
      delay: 600,
    })

    el.addEventListener('pointerenter', replay)
    el.addEventListener('pointerdown', replay)

    return () => {
      el.removeEventListener('pointerenter', replay)
      el.removeEventListener('pointerdown', replay)
    }
  }, [phrases])

  return <span ref={ref} className={className} aria-live="polite" />
}
```

### components\SetDetail.tsx

```
'use client'

import { useState } from 'react'

interface SetDetailProps {
  setNumber: number
  onUpdate: (weight: number, reps: number) => void
  onRemove: () => void
  initialWeight?: number
  initialReps?: number
}

export default function SetDetail({ setNumber, onUpdate, onRemove, initialWeight = 0, initialReps = 0 }: SetDetailProps) {
  const [weight, setWeight] = useState(initialWeight.toString())
  const [reps, setReps] = useState(initialReps.toString())
  const commit = () => onUpdate(parseFloat(weight) || 0, parseInt(reps) || 0)

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '8px 10px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
    width: '80px',
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)', flexWrap: 'wrap', animation: 'slideIn .25s ease backwards' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--blue)', minWidth: '52px', flexShrink: 0 }}>
        Serie {setNumber}
      </span>
      <input type="number" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)} onBlur={commit} step="0.5" style={{ ...inputStyle, width: '70px', flexGrow: 1, minWidth: '60px' }} />
      <span style={{ color: 'var(--text-faint)', flexShrink: 0 }}>×</span>
      <input type="number" placeholder="reps" value={reps} onChange={(e) => setReps(e.target.value)} onBlur={commit} style={{ ...inputStyle, width: '70px', flexGrow: 1, minWidth: '60px' }} />
      <button className="fx" onClick={onRemove} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px', marginLeft: 'auto', flexShrink: 0 }}>✕</button>
    </div>
  )
}

```

### components\SpotifyWidget.tsx

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface SpotifyWidgetProps {
  userId: string
}

function extractPlaylistId(input: string): string | null {
  const trimmed = input.trim()
  // https://open.spotify.com/playlist/ID?si=...
  const urlMatch = trimmed.match(/spotify\.com\/playlist\/([a-zA-Z0-9]+)/)
  if (urlMatch) return urlMatch[1]
  // spotify:playlist:ID
  const uriMatch = trimmed.match(/spotify:playlist:([a-zA-Z0-9]+)/)
  if (uriMatch) return uriMatch[1]
  // raw ID
  if (/^[a-zA-Z0-9]{20,}$/.test(trimmed)) return trimmed
  return null
}

const defaultPlaylistId = '37i9dQZF1DX76Wlfdnj7AP' // Gym & Workout

export default function SpotifyWidget({ userId }: SpotifyWidgetProps) {
  const [playlistId, setPlaylistId] = useState<string>(defaultPlaylistId)
  const [editing, setEditing] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('user_profiles').select('spotify_playlist').eq('id', userId).single()
      const id = data?.spotify_playlist ? extractPlaylistId(data.spotify_playlist) : null
      if (id) setPlaylistId(id)
    }
    load()
  }, [userId])

  const save = async () => {
    const id = extractPlaylistId(url)
    if (!id) { setError('Pega un link de playlist de Spotify válido'); return }
    setPlaylistId(id)
    setError('')
    await supabase.from('user_profiles').update({ spotify_playlist: url }).eq('id', userId)
    setEditing(false)
    setUrl('')
  }

  return (
    <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <div className="kpi-label">PLAYLIST DE ENTRENO</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>Spotify</div>
        </div>
        <button onClick={() => setEditing(!editing)}
          style={{ padding: '6px 12px', background: editing ? 'transparent' : 'var(--green)', color: editing ? 'var(--green)' : '#0b0b12', border: `1px solid ${editing ? 'var(--green)' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
          {editing ? 'Cancelar' : 'Cambiar playlist'}
        </button>
      </div>

      {editing && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Pega el link de tu playlist de Spotify"
            style={{ flex: 1, background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }} />
          <button onClick={save} style={{ padding: '10px 16px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>Guardar</button>
        </div>
      )}
      {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--red)', marginBottom: '8px' }}>{error}</div>}

      <div style={{ position: 'relative', paddingBottom: '28%', height: 0, overflow: 'hidden', borderRadius: '6px' }}>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width="100%"
          height="100%"
          style={{ position: 'absolute', left: 0, top: 0, border: 0 }}
          allow="encrypted-media; clipboard-write; picture-in-picture"
          title="Spotify Playlist"
        />
      </div>
    </div>
  )
}

```

### components\ui\badge.tsx

```
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }

```

### components\ui\button.tsx

```
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

### components\ui\card.tsx

```
import * as React from "react"
import { cn } from "cn"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

### components\ui\input.tsx

```
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

### components\ui\label.tsx

```
"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

### components\UserProfile.tsx

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { calculateBMR, calculateMacros, ACTIVITY_MULTIPLIERS, META_ADJUSTMENTS } from '@/lib/nutrition'

interface UserProfileProps {
  userId: string
}

const activityLabels: Record<string, string> = {
  sedentary: 'Sedentario (poco o nada)',
  light: 'Ligero (1-3 días/sem)',
  moderate: 'Moderado (3-5 días/sem)',
  active: 'Activo (6-7 días/sem)',
  very_active: 'Muy activo (2x/día)',
}

const metaLabels: Record<string, string> = {
  slow: 'Lento (subo de peso fácil)',
  normal: 'Normal',
  fast: 'Rápido (como mucho y no subo)',
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [profile, setProfile] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [metabolicRate, setMetabolicRate] = useState('normal')
  const [bodyFat, setBodyFat] = useState('')
  const [goal, setGoal] = useState('hypertrophy')
  const [experience, setExperience] = useState('beginner')

  useEffect(() => { fetchProfile() }, [userId])

  const fetchProfile = async () => {
    setLoading(true)
    const { data } = await supabase.from('user_profiles').select('*').eq('id', userId).single()
    if (data) {
      setProfile(data)
      setWeight(data.weight_kg?.toString() || '')
      setHeight(data.height_cm?.toString() || '')
      setAge(data.age?.toString() || '')
      setGender(data.gender || 'male')
      setActivityLevel(data.activity_level || 'moderate')
      setMetabolicRate(data.metabolic_rate || 'normal')
      setBodyFat(data.body_fat_percentage?.toString() || '')
      setGoal(data.goal || 'hypertrophy')
      setExperience(data.experience_level || 'beginner')
    }
    setLoading(false)
  }

  const saveProfile = async () => {
    await supabase.from('user_profiles').update({
      weight_kg: parseFloat(weight), height_cm: parseInt(height), age: parseInt(age),
      gender, activity_level: activityLevel, metabolic_rate: metabolicRate,
      body_fat_percentage: bodyFat ? parseFloat(bodyFat) : null,
      goal, experience_level: experience, updated_at: new Date().toISOString(),
    }).eq('id', userId)
    await fetchProfile()
    setEditing(false)
    alert('Perfil actualizado')
  }

  const calculateStats = () => {
    if (!weight || !height || !age) return null

    const w = parseFloat(weight)
    const h = parseInt(height)
    const a = parseInt(age)
    const hM = h / 100

    // IMC
    const imc = w / (hM * hM)

    const bmr = calculateBMR(w, h, a, gender)
    const { tdee, calories, protein, fat, carbs } = calculateMacros(w, h, a, gender, activityLevel, metabolicRate, goal)

    return { imc, bmr, tdee, calories, protein, fat, carbs }
  }

  const stats = calculateStats()
  const imcCategory = stats
    ? stats.imc < 18.5 ? { label: 'Bajo peso', color: 'var(--blue)' }
      : stats.imc < 25 ? { label: 'Peso normal', color: 'var(--green)' }
        : stats.imc < 30 ? { label: 'Sobrepeso', color: 'var(--orange)' }
          : { label: 'Obeso', color: 'var(--red)' }
    : null

  const inputStyle = { background: 'var(--ink)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none', width: '100%' }
  const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)' }}>Cargando perfil...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button className="fx"
        onClick={() => setEditing(!editing)}
        style={{ padding: '12px', background: editing ? 'transparent' : 'var(--blue)', color: editing ? 'var(--blue)' : '#0b0b12', border: `1px solid ${editing ? 'var(--blue)' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        {editing ? '✕ Cancelar' : 'Editar Perfil'}
      </button>

      {editing ? (
        <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px' }}>EDITAR INFORMACIÓN</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>Peso (kg)</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} step="0.5" placeholder="ej: 75" style={inputStyle} /></div>
            <div><label style={labelStyle}>Estatura (cm)</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="ej: 175" style={inputStyle} /></div>
            <div><label style={labelStyle}>Edad</label><input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="ej: 25" style={inputStyle} /></div>
            <div><label style={labelStyle}>Sexo</label>
              <select value={gender} onChange={e => setGender(e.target.value)} style={inputStyle}>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select></div>
            <div><label style={labelStyle}>Nivel de actividad</label>
              <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)} style={inputStyle}>
                {Object.entries(activityLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
            <div><label style={labelStyle}>Metabolismo</label>
              <select value={metabolicRate} onChange={e => setMetabolicRate(e.target.value)} style={inputStyle}>
                {Object.entries(metaLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
            <div><label style={labelStyle}>% Grasa corporal (opcional)</label><input type="number" value={bodyFat} onChange={e => setBodyFat(e.target.value)} step="0.1" style={inputStyle} /></div>
            <div><label style={labelStyle}>Experiencia</label>
              <select value={experience} onChange={e => setExperience(e.target.value)} style={inputStyle}>
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select></div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Objetivo</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={inputStyle}>
              <option value="hypertrophy">Hipertrofia (ganar músculo)</option>
              <option value="strength">Fuerza</option>
              <option value="endurance">Resistencia</option>
              <option value="weight_loss">Pérdida de peso</option>
            </select>
          </div>
          <button className="fx" onClick={saveProfile}
            style={{ width: '100%', padding: '12px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            Guardar Cambios
          </button>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {[
              { label: 'Peso', value: weight ? `${weight} kg` : '-', border: 'var(--blue)' },
              { label: 'Estatura', value: height ? `${height} cm` : '-', border: 'var(--purple)' },
              { label: 'Edad', value: age ? `${age} años` : '-', border: 'var(--pink-light)' },
              { label: 'Actividad', value: activityLabels[activityLevel]?.split(' ')[0] || '-', border: 'var(--green)' },
              { label: 'Metabolismo', value: metaLabels[metabolicRate]?.split(' ')[0] || '-', border: 'var(--orange)' },
              { label: 'Objetivo', value: goal === 'hypertrophy' ? 'Hipertrofia' : goal === 'strength' ? 'Fuerza' : goal === 'endurance' ? 'Resistencia' : 'Perdida', border: 'var(--green)' },
            ].map((card, idx) => (
              <div key={idx}
                style={{ borderTop: `2px solid ${card.border}`, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 12px', animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.05}s` }}>
                <div className="kpi-label">{card.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginTop: '4px' }}>{card.value}</div>
              </div>
            ))}
          </div>

          {stats && (
            <>
              {/* IMC + BMR + TDEE */}
              <div className="panel" style={{ borderLeft: `3px solid ${imcCategory?.color || 'var(--border)'}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <div className="kpi-label">IMC</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: imcCategory?.color || 'var(--text)', marginTop: '4px' }}>{stats.imc.toFixed(1)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: imcCategory?.color }}>{imcCategory?.label}</div>
                  </div>
                  <div>
                    <div className="kpi-label">Tasa Metabólica Basal</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--blue)', marginTop: '4px' }}>{stats.bmr}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>kcal/día</div>
                  </div>
                  <div>
                    <div className="kpi-label">Gasto Diario (TDEE)</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--orange)', marginTop: '4px' }}>{stats.tdee}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>kcal/día</div>
                  </div>
                </div>
              </div>

              {/* Macros */}
              <div className="panel" style={{ borderLeft: '3px solid var(--green)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <div className="kpi-label" style={{ fontSize: '0.7rem' }}>MACROS OBJETIVO</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>{stats.calories} kcal/día</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px', textAlign: 'center' }}>
                    <div className="kpi-label">Proteína</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue)', marginTop: '4px' }}>{stats.protein}g</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)' }}>{Math.round(stats.protein * 4)} kcal</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px', textAlign: 'center' }}>
                    <div className="kpi-label">Carbos</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)', marginTop: '4px' }}>{stats.carbs}g</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)' }}>{Math.round(stats.carbs * 4)} kcal</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '10px', textAlign: 'center' }}>
                    <div className="kpi-label">Grasas</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--pink-light)', marginTop: '4px' }}>{stats.fat}g</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)' }}>{Math.round(stats.fat * 9)} kcal</div>
                  </div>
                </div>
                <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', lineHeight: 1.5 }}>
                  Mifflin-St Jeor · Actividad: {activityLabels[activityLevel]} · Metabolismo: {metaLabels[metabolicRate]}
                </div>
              </div>

              {/* Tips */}
              <div className="callout" style={{ borderLeftColor: 'var(--purple)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
                  {goal === 'hypertrophy' && `Superávit de 300 kcal/día. Proteína: ${stats.protein}g/día (2.2g/kg). Entrena 5-6 veces/semana, 10-15 series por grupo.`}
                  {goal === 'strength' && `Superávit leve de 200 kcal/día. Entrena en rangos de 3-6 reps al 85-90% 1RM. Descansa 3-5 min entre series.`}
                  {goal === 'weight_loss' && `Déficit de 400 kcal/día. Proteína alta (${stats.protein}g/día) para preservar músculo. Añade cardio 3-4 veces/semana.`}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

```

### components\WorkoutHistory.tsx

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'
import { translateName } from '@/lib/translate'

const CATEGORY_LABELS: Record<string, string> = {
  Pierna: 'Pierna', Pecho: 'Pecho', Espalda: 'Espalda',
  Hombro: 'Hombros', Brazos: 'Brazos', Core: 'Core', Cardio: 'Cardio',
}

export default function WorkoutHistory({ userId }: { userId: string }) {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchHistory() }, [userId])

  const fetchHistory = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('workouts')
      .select('*, workout_sets(*, exercises(name, category))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)
    setWorkouts(data || [])
    setLoading(false)
  }

  const dateLabel = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' }) +
      ' · ' + d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="section-header">
        <div className="section-num">HX</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Historial de Entrenamientos</div>
          <div className="section-sub" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>Últimos {workouts.length} registros</div>
        </div>
      </div>

      {loading && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', padding: '2rem', textAlign: 'center' }}>CARGANDO...</div>}

      {!loading && workouts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)' }}>Aún no tienes entrenamientos registrados.</p>
        </div>
      )}

      {workouts.map((w, idx) => {
        const totalSets = w.workout_sets?.length || 0
        const totalWeight = w.workout_sets?.reduce((s: number, x: any) => s + (x.weight || 0), 0) || 0
        return (
          <div key={w.id}
            className="panel" style={{ borderLeft: '3px solid var(--blue)', animation: 'rise .3s ease backwards', animationDelay: `${idx * 0.05}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)', textTransform: 'capitalize' }}>{dateLabel(w.created_at)}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>
                  {w.workout_sets?.length || 0} series · {(w.workout_sets || []).filter((s: any, i: number, a: any[]) => a.findIndex(x => x.exercise_id === s.exercise_id) === i).length} ejercicios
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--blue-light)' }}>
                {totalWeight ? `${totalWeight} kg levantados` : `${totalSets} sets`}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {w.workout_sets?.map((s: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                  {(() => { const svg = getExerciseSvgUrl(s.exercises?.name || ''); return svg ? <img src={svg} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {translateName(s.exercises?.name || '')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
                    {s.weight}kg × {s.reps}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

### components\WorkoutTimer.tsx

```
'use client'

import { useState, useEffect, useRef } from 'react'

const STORAGE_KEY = 'workout-timer'

function load() {
  if (typeof window === 'undefined') return { startTime: null as number | null, elapsed: 0, running: false }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { startTime: null, elapsed: 0, running: false }
    return JSON.parse(raw)
  } catch {
    return { startTime: null, elapsed: 0, running: false }
  }
}

export default function WorkoutTimer() {
  const init = load()
  const [startTime, setStartTime] = useState<number | null>(init.startTime)
  const [elapsedBase, setElapsedBase] = useState(init.elapsed)
  const [isRunning, setIsRunning] = useState(init.running)
  const [now, setNow] = useState(Date.now())
  const mountRef = useRef(true)

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTime, elapsed: elapsedBase, running: isRunning })) } catch {}
  }, [startTime, elapsedBase, isRunning])

  // Tick while running
  useEffect(() => {
    if (!isRunning || startTime === null) return
    const iv = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(iv)
  }, [isRunning, startTime])

  const elapsedSeconds = isRunning && startTime !== null
    ? Math.floor((Date.now() - startTime) / 1000) + elapsedBase
    : elapsedBase

  const toggle = () => {
    if (isRunning) {
      // pause: freeze accumulated time
      setElapsedBase(elapsedSeconds)
      setStartTime(null)
      setIsRunning(false)
    } else {
      setStartTime(Date.now())
      setIsRunning(true)
    }
  }

  const reset = () => { setElapsedBase(0); setStartTime(null); setIsRunning(false); setNow(Date.now()) }

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--purple)',
        borderRadius: '6px',
        flexWrap: 'wrap',
        gap: '8px',
        animation: 'riseUp .3s ease backwards',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '4px' }}>
          Tiempo de Entrenamiento
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em' }}>
          {formatTime(elapsedSeconds)}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="fx" onClick={toggle}
          style={{ padding: '10px 24px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem', background: 'var(--blue)', color: '#0b0b12' }}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="fx" onClick={reset}
          style={{ padding: '10px 24px', borderRadius: '4px', border: '1px solid var(--red)', background: 'transparent', color: 'var(--red)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem' }}>
          Reset
        </button>
      </div>
    </div>
  )
}

```

### components\WorkoutTracker.tsx

```
'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchAllExercises } from '@/lib/exercises'
import WorkoutTimer from './WorkoutTimer'
import SetDetail from './SetDetail'
import { getExerciseSvgUrl } from '@/lib/exercise-utils'
import { translateName } from '@/lib/translate'

interface WorkoutTrackerProps {
  userId: string
}

interface ExerciseSet {
  setNumber: number
  weight: number
  reps: number
}

interface WorkoutItem {
  exercise_id: string
  exercise_name: string
  category: string
  exercise: any
  sets: ExerciseSet[]
}

const CATEGORY_LABELS: Record<string, string> = {
  chest: 'Pecho',
  back: 'Espalda',
  legs: 'Piernas',
  shoulders: 'Hombros',
  arms: 'Brazos',
  core: 'Core',
}

export default function WorkoutTracker({ userId }: WorkoutTrackerProps) {
  const [exercises, setExercises] = useState<any[]>([])
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [numSets, setNumSets] = useState('3')
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutItem[]>([])
  const [loading, setLoading] = useState(false)
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(100)

  useEffect(() => { fetchExercises() }, [])

  const fetchExercises = async () => {
    const data = await fetchAllExercises()
    setExercises(data || [])
  }

  const categories = useMemo(() => {
    return Array.from(new Set(exercises.map(e => e.category))).sort()
  }, [exercises])

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch = !searchTerm ||
        translateName(ex.name).toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || ex.category === categoryFilter
      return matchesSearch && matchesCategory
    }).sort((a, b) => translateName(a.name).localeCompare(translateName(b.name)))
  }, [exercises, searchTerm, categoryFilter])

  const initializeSets = () => {
    const sets = Array.from({ length: parseInt(numSets) || 3 }, (_, i) => ({
      setNumber: i + 1, weight: 20, reps: 10,
    }))
    setExerciseSets(sets)
  }

  const updateSet = (index: number, weight: number, reps: number) => {
    const updated = [...exerciseSets]
    updated[index] = { ...updated[index], weight, reps }
    setExerciseSets(updated)
  }

  const removeSet = (index: number) => {
    setExerciseSets(exerciseSets.filter((_, i) => i !== index))
  }

  const addExerciseToWorkout = () => {
    if (!selectedExercise || exerciseSets.length === 0) return
    setCurrentWorkout([...currentWorkout, {
      exercise_id: selectedExercise.id,
      exercise_name: selectedExercise.name,
      category: selectedExercise.category,
      exercise: selectedExercise,
      sets: exerciseSets,
    }])
    setSelectedExercise(null)
    setExerciseSets([])
    setNumSets('3')
    setSearchTerm('')
    setCategoryFilter('')
    setVisibleCount(100)
  }

  const saveWorkout = async () => {
    if (currentWorkout.length === 0) return
    setLoading(true)
    try {
      const { data: workout } = await supabase.from('workouts').insert({ user_id: userId }).select()
      const workoutId = workout?.[0].id
      if (workoutId) {
        const setsToInsert: any[] = []
        currentWorkout.forEach(item => {
          item.sets.forEach((set: ExerciseSet) => {
            setsToInsert.push({
              workout_id: workoutId, exercise_id: item.exercise_id,
              weight: set.weight, reps: set.reps, sets: 1,
            })
          })
        })
        await supabase.from('workout_sets').insert(setsToInsert)
        const points = currentWorkout.length * 10
        const { data: userPoints } = await supabase.from('user_points').select('total_points').eq('user_id', userId).single()
        await supabase.from('user_points').update({
          total_points: (userPoints?.total_points || 0) + points,
          last_activity: new Date().toISOString().split('T')[0],
        }).eq('user_id', userId)
        alert('Entrenamiento guardado! +' + points + ' puntos')
        setCurrentWorkout([])
      }
    } finally { setLoading(false) }
  }

  const inputStyle = {
    background: 'var(--ink)',
    color: 'var(--text)',
    border: '1px solid var(--border2)',
    borderRadius: '4px',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    outline: 'none',
  }

  const btnStyle = (active: boolean) => ({
    fontFamily: 'var(--font-mono)' as const,
    fontSize: '13px',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer' as const,
    border: active ? '1px solid var(--blue)' : '1px solid var(--border)',
    background: active ? 'rgba(91,141,239,0.15)' : 'transparent',
    color: active ? 'var(--blue-light)' : 'var(--text-muted)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <WorkoutTimer />

      {/* Selector */}
      <div className="panel" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem', letterSpacing: '0.06em' }}>AGREGAR EJERCICIO</div>

        {/* Selected exercise display */}
        {selectedExercise && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(111,160,255,0.08)', border: '1px solid var(--blue)', borderRadius: '6px', marginBottom: '12px' }}>
            {(() => { const svg = getExerciseSvgUrl(selectedExercise.name); return svg ? <img src={svg} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{translateName(selectedExercise.name)}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-faint)' }}>{CATEGORY_LABELS[selectedExercise.category] || selectedExercise.category}</div>
            </div>
            <button onClick={() => setSelectedExercise(null)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✕</button>
          </div>
        )}

        {/* Search + category filters */}
        {!selectedExercise && (
          <>
            <input type="text" placeholder="Buscar ejercicio por nombre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ ...inputStyle, width: '100%', marginBottom: '8px' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              <button onClick={() => setCategoryFilter('')} style={btnStyle(categoryFilter === '')}>Todos</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)} style={btnStyle(categoryFilter === cat)}>
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '12px' }}>
              {filtered.slice(0, visibleCount).map(ex => (
                <div key={ex.id} onClick={() => setSelectedExercise(ex)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
                  {(() => { const svg = getExerciseSvgUrl(ex.name); return svg ? <img src={svg} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} /> : null })()}
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{translateName(ex.name)}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-faint)', flexShrink: 0 }}>{CATEGORY_LABELS[ex.category] || ex.category}</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
                  Sin resultados para &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
            {visibleCount < filtered.length && (
              <button onClick={() => setVisibleCount(v => v + 100)} style={{ ...btnStyle(false), width: '100%', marginBottom: '12px' }}>
                Cargar más ({filtered.length - visibleCount} restantes)
              </button>
            )}
          </>
        )}

        {/* Sets config */}
        {selectedExercise && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input type="number" value={numSets} onChange={(e) => setNumSets(e.target.value)} min="1" max="10" placeholder="# Series" style={inputStyle} />
            <button className="fx" onClick={initializeSets} style={{ padding: '10px 20px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              Crear
            </button>
          </div>
        )}

        {exerciseSets.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {exerciseSets.map((set, idx) => (
              <SetDetail key={idx} setNumber={set.setNumber} initialWeight={set.weight} initialReps={set.reps}
                onUpdate={(w, r) => updateSet(idx, w, r)} onRemove={() => removeSet(idx)} />
            ))}
          </div>
        )}

        <button className="fx" onClick={addExerciseToWorkout}
          disabled={!selectedExercise || exerciseSets.length === 0}
          style={{ width: '100%', padding: '12px', background: 'var(--blue)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: (!selectedExercise || exerciseSets.length === 0) ? 0.4 : 1 }}>
          + Añadir a Entrenamiento
        </button>
      </div>

      {/* Workout summary */}
      {currentWorkout.length > 0 && (
        <div className="panel" style={{ borderLeft: '3px solid var(--purple)' }}>
          <div className="kpi-label" style={{ marginBottom: '12px', fontSize: '0.7rem' }}>ENTRENAMIENTO ACTUAL ({currentWorkout.length} ejercicios)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {currentWorkout.map((item, idx) => (
              <div key={idx}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(111,160,255,0.06)', borderRadius: '4px', borderLeft: '3px solid var(--blue)', animation: 'slideIn .3s ease backwards' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  {(() => { const svg = getExerciseSvgUrl(item.exercise_name); return svg ? <img src={svg} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} /> : null })()}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{translateName(item.exercise_name)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.sets.map((s: ExerciseSet) => `${s.setNumber}: ${s.weight}kg × ${s.reps}`).join(' | ')}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCurrentWorkout(currentWorkout.filter((_, i) => i !== idx))} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>✕</button>
              </div>
            ))}
          </div>

          <button className="fx" onClick={saveWorkout} disabled={loading}
            style={{ width: '100%', padding: '14px', background: 'var(--green)', color: '#0b0b12', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Guardando...' : 'Guardar Entrenamiento'}
          </button>
        </div>
      )}
    </div>
  )
}
```

### docs\anime-v4.md

```
## anime.js v4 — reglas que NO son negociables

Instalado: `animejs@^4.5.0`. Instalar anime.js NO es compatible con la v3. Estas
ease strings estaban mal en el repo y caian **en silencio a `linear`** (sin error,
sin warning): la animacion corria pero se veia mecanica.

### Las trampas

| v3 (NO existe en v4) | v4 (correcto) |
|---|---|
| `ease: 'easeOutExpo'` | `ease: 'outExpo'` |
| `ease: 'easeOutCubic'` | `ease: 'outCubic'` |
| `easing: '...'` | `ease: '...'` |
| `direction: 'alternate'` | `alternate: true` |
| `direction: 'reverse'` | `reversed: true` |
| `endDelay: 100` | `loopDelay: 100` |
| `anime({ targets })` | `animate(targets, {})` |
| `animation.remove(t)` / `.get()` / `.set()` | `utils.remove(t)` / `utils.get()` / `utils.set()` |
| `easing: () => t => ...` | `ease: t => ...` (funcion directa) |
| `easing: 'spring(1,80,10,0)'` | `ease: createSpring({ mass, stiffness, damping, velocity })` |
| `anime.setDashoffset` | `svg.createDrawable(el)` + `draw: '0 1'` |
| `update:` / `complete:` / `begin:` | `onUpdate:` / `onComplete:` / `onBegin:` |
| `animation.finished.then = fn` | `animate(...).then(fn)` |

Otros datos:
- **Default de ease = `out(2)`**, no lineal.
- Easings con parametro de potencia: `out(3)`, `inOut(3)`, `outBack(2)`. Validos.
- `loop: 1` en v4 significa **2 iteraciones** (en v3 significaba 1). No es 1:1.
- Bundle modular: importa solo lo que uses. `stagger` 0.48 KB, `createScope` 0.22 KB.
- `engine.pauseOnDocumentHidden = true` reemplaza `anime.suspendWhenDocumentHidden`.

### Limpieza en React

Toda animacion en un `useEffect` necesita cleanup, si no sigue corriendo sobre
nodos desmontados. La forma idiomatica en v4:

```tsx
useEffect(() => {
  animate(el, { /* ... */ })
  return () => { utils.remove(el) }   // con BLOQUE: utils.remove() devuelve un array
}, [dep])
```

Ojo: `return () => utils.remove(el)` **no compila** — React exige que el cleanup
devuelva `void` y `utils.remove()` devuelve `TargetsArray`.

Guard de reduced motion, siempre:

```tsx
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
```

### Verificar, no suponer

Una ease invalida no lanza error: cae a `linear`. Para comprobarlo de verdad,
midiendo `opacity` en el frame a mitad de un tween de 1000ms:

| ease | valor a mitad de tween |
|---|---|
| (fallback linear) | 0.500 |
| `outCubic` | 0.878 |
| `outExpo` | 0.970 |
| default `out(2)` | 0.754 |

Un valor de **0.50 exacto = ease invalida**. Es el sintoma de que algo esta mal.

Referencia: <https://github.com/juliangarnier/anime> y la guia de migracion
<https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4>.

```

### eslint.config.mjs

```
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

### lib\exercises.ts

```
import { supabase } from './supabase'

// Supabase limita a 1000 filas por request; se pagina en bloques de 1000.
export async function fetchAllExercises(): Promise<any[]> {
  let all: any[] = []
  const PAGE = 1000
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase.from('exercises').select('*').order('name').range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all = all.concat(data)
    if (data.length < PAGE) break
  }
  return all
}

```

### lib\exercises_seed.sql

```
INSERT INTO public.exercises (name, category, target_muscle) VALUES
('Sentadilla (Squat)', 'Pierna', 'Cuádriceps'),
('Prensa de piernas', 'Pierna', 'Cuádriceps'),
('Extensión de piernas', 'Pierna', 'Cuádriceps'),
('Peso muerto (Deadlift)', 'Pierna', 'Isquiotibiales'),
('Curl de pierna sentado', 'Pierna', 'Isquiotibiales'),
('Elevación de talones (Calf raise)', 'Pierna', 'Pantorrillas'),
('Press de banca plano', 'Pecho', 'Pectoral mayor'),
('Press de banca inclinado', 'Pecho', 'Pectoral mayor'),
('Aperturas con mancuernas', 'Pecho', 'Pectoral mayor'),
('Flexiones de pecho', 'Pecho', 'Pectoral mayor'),
('Dominadas (Pull-ups)', 'Espalda', 'Dorsales'),
('Jalón al pecho', 'Espalda', 'Dorsales'),
('Remo con barra', 'Espalda', 'Dorsales'),
('Remo en polea baja', 'Espalda', 'Dorsales'),
('Press militar (hombro)', 'Hombro', 'Deltoides'),
('Elevaciones laterales', 'Hombro', 'Deltoides'),
('Pájaro (Elevación posterior)', 'Hombro', 'Deltoides'),
('Curl de bíceps con barra', 'Brazos', 'Bíceps'),
('Curl de bíceps con mancuernas', 'Brazos', 'Bíceps'),
('Press francés', 'Brazos', 'Tríceps'),
('Extensión de tríceps en polea', 'Brazos', 'Tríceps'),
('Plancha abdominal', 'Core', 'Abdominales'),
('Crunch abdominal', 'Core', 'Abdominales'),
('Elevación de piernas', 'Core', 'Abdominales');

```

### lib\exercise-utils.ts

```
import { searchExercises, getAssetUrl } from '@bryllim/workout-guide'

export function getExerciseSvgUrl(exerciseName: string): string | null {
  const results = searchExercises(exerciseName)
  if (results.length > 0) return getAssetUrl(results[0].slug, 1)
  return null
}

export function getExerciseMuscles(exerciseName: string): { primary: string; secondary: string[] } | null {
  const results = searchExercises(exerciseName)
  if (results.length === 0) return null
  return { primary: results[0].primaryMuscle, secondary: results[0].secondaryMuscles }
}

```

### lib\migration_profile.sql

```
-- Actualizar tabla user_profiles con datos biométricos
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,2);
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS height_cm INTEGER;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS goal TEXT; -- 'hypertrophy', 'strength', 'endurance', 'weight_loss'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS experience_level TEXT; -- 'beginner', 'intermediate', 'advanced'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

```

### lib\migration_v2.sql

```
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS gender TEXT; -- 'male' or 'female'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS activity_level TEXT; -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS metabolic_rate TEXT; -- 'slow', 'normal', 'fast'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS body_fat_percentage DECIMAL(4,1); -- optional

```

### lib\migration_v3.sql

```
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS spotify_playlist TEXT;

```

### lib\migration_v4_rls.sql

```
-- ============================================================
-- MIGRACIÓN v4 — SEGURIDAD: RLS + reparación de tablas faltantes
--
-- Ejecutar completa en Supabase SQL Editor. Es idempotente:
-- se puede re-ejecutar sin romper nada.
-- ============================================================

-- 1) Crear tablas que falten (según schema.sql)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  muscle_group TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workout_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  weight DECIMAL(5,2),
  reps INTEGER,
  sets INTEGER,
  rest_seconds INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL,
  food_name TEXT NOT NULL,
  calories INTEGER,
  protein DECIMAL(5,1),
  carbs DECIMAL(5,1),
  fats DECIMAL(5,1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS points_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points_earned INTEGER,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routine_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  sets INTEGER,
  reps INTEGER,
  rest_seconds INTEGER,
  order_index INTEGER
);

-- 2) Habilitar RLS en las que existan
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['user_profiles','workouts','workout_sets','meals',
                           'user_points','points_log','routines',
                           'routine_exercises','exercises']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;

-- 3) Policies (borrar y recrear para ser idempotente)
DROP POLICY IF EXISTS "perfil propio" ON user_profiles;
CREATE POLICY "perfil propio" ON user_profiles
  FOR ALL USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "dueño workouts" ON workouts;
CREATE POLICY "dueño workouts" ON workouts
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "series via workout" ON workout_sets;
CREATE POLICY "series via workout" ON workout_sets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM workouts w WHERE w.id = workout_id AND w.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM workouts w WHERE w.id = workout_id AND w.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "dueño meals" ON meals;
CREATE POLICY "dueño meals" ON meals
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "dueño user_points" ON user_points;
CREATE POLICY "dueño user_points" ON user_points
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "dueño points_log" ON points_log;
CREATE POLICY "dueño points_log" ON points_log
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "dueño routines" ON routines;
CREATE POLICY "dueño routines" ON routines
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "ejercicios via rutina" ON routine_exercises;
CREATE POLICY "ejercicios via rutina" ON routine_exercises
  FOR ALL USING (
    EXISTS (SELECT 1 FROM routines r WHERE r.id = routine_id AND r.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM routines r WHERE r.id = routine_id AND r.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "ejercicios lectura" ON exercises;
CREATE POLICY "ejercicios lectura" ON exercises
  FOR SELECT TO authenticated USING (true);

-- 4) Índices
CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON workouts(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, date);
CREATE INDEX IF NOT EXISTS idx_points_log_user ON points_log(user_id, created_at DESC);

```

### lib\migrations\005_add_workout_guide_fields.sql

```
-- Add workout-guide fields to exercises table
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS exercise_type TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS equipment TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS primary_muscle TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS secondary_muscles TEXT[];
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS is_stretch BOOLEAN DEFAULT FALSE;

```

### lib\muscle-map.ts

```
export type MuscleKey =
  | 'traps' | 'shoulders' | 'chest' | 'biceps' | 'forearms' | 'abs'
  | 'quads' | 'calves' | 'rearDelts' | 'triceps' | 'lats' | 'lowerBack'
  | 'glutes' | 'hamstrings'

export const MUSCLE_LABELS: Record<MuscleKey, string> = {
  traps: 'Trapecios',
  shoulders: 'Hombros',
  chest: 'Pectorales',
  biceps: 'Bíceps',
  forearms: 'Antebrazos',
  abs: 'Abdominales',
  quads: 'Cuádriceps',
  calves: 'Pantorrillas',
  rearDelts: 'Hombros posteriores',
  triceps: 'Tríceps',
  lats: 'Dorsales',
  lowerBack: 'Zona lumbar',
  glutes: 'Glúteos',
  hamstrings: 'Isquiotibiales',
}

const NAME_TO_KEY: Record<string, MuscleKey> = {
  'chest': 'chest', 'pectorals': 'chest', 'upper chest': 'chest',
  'shoulders': 'shoulders', 'delts': 'shoulders', 'deltoids': 'shoulders',
  'rear delts': 'rearDelts', 'rear deltoids': 'rearDelts',
  'biceps': 'biceps', 'forearms': 'forearms', 'triceps': 'triceps',
  'abs': 'abs', 'abdominals': 'abs', 'core': 'abs', 'obliques': 'abs', 'serratus anterior': 'abs',
  'quads': 'quads', 'quadriceps': 'quads',
  'hamstrings': 'hamstrings',
  'glutes': 'glutes', 'gluteus': 'glutes',
  'calves': 'calves',
  'lower back': 'lowerBack',
  'lats': 'lats', 'latissimus dorsi': 'lats',
  'upper back': 'lats', 'back': 'lats', 'middle back': 'lats',
  'traps': 'traps', 'trapezius': 'traps', 'neck': 'traps', 'levator scapulae': 'traps',
  'abductors': 'glutes', 'adductors': 'glutes',
}

export function resolveMuscleKeys(primary: string, secondary: string[]): {
  primaryKey: MuscleKey | null
  secondaryKeys: MuscleKey[]
  allKeys: MuscleKey[]
} {
  if (primary.toLowerCase() === 'full body') {
    return { primaryKey: null, secondaryKeys: [], allKeys: Object.keys(MUSCLE_LABELS) as MuscleKey[] }
  }
  const primaryKey = NAME_TO_KEY[primary.trim().toLowerCase()] ?? null
  const secondaryKeys = Array.from(new Set(
    secondary.map(s => NAME_TO_KEY[s.trim().toLowerCase()]).filter((k): k is MuscleKey => !!k)
  ))
  const allKeys = primaryKey ? [primaryKey, ...secondaryKeys] : secondaryKeys
  return { primaryKey, secondaryKeys, allKeys }
}
```

### lib\muscle-meta.ts

```
export const MUSCLE_META: Record<string, { label: string; desc: string }> = {
  pecho: { label: 'Pecho', desc: 'Press banca, Aperturas, Flexiones' },
  espalda: { label: 'Espalda', desc: 'Dominadas, Remo, Jalón al pecho' },
  piernas: { label: 'Piernas', desc: 'Sentadilla, Peso muerto, Prensa' },
  hombros: { label: 'Hombros', desc: 'Press militar, Elevaciones laterales' },
  brazos: { label: 'Brazos', desc: 'Curl bíceps, Press francés' },
  core: { label: 'Core', desc: 'Plancha, Crunch, Elevación piernas' },
}
```

### lib\names_es.ts

```
// Mapa de traducciones de ejercicios al espa?ol (generado desde exercises-dataset).
// Traducciones curadas por algoritmo con reordenamiento natural.
export const EXERCISE_NAMES_ES: Record<string, string> = {
  "3/4 sit-up": "Abdominal 3/4",
  "45° side bend": "Flexión lateral a 45°",
  "90/90 hamstring": "Isquiotibial 90/90",
  "ab crunch machine": "Máquina de crunch",
  "ab roller": "Rueda abdominal",
  "adductor": "Aductor",
  "adductor/groin": "Aductor/ingle",
  "advanced kettlebell windmill": "Molino con pesa rusa avanzado",
  "air bike": "Bicicleta en el aire",
  "all fours quad stretch": "Estiramiento cuádriceps cuatro apoyos",
  "all fours squad stretch": "Estiramiento de sentadilla en cuatro apoyos",
  "alternate hammer curl": "Curl martillo alternado",
  "alternate heel touchers": "Toques de talones alternos",
  "alternate incline dumbbell curl": "Curl inclinado con mancuerna alternado",
  "alternate lateral pulldown": "Jalón lateral alterno",
  "alternate leg diagonal bound": "Brinco diagonal alternado",
  "alternating cable shoulder press": "Press de hombro en cable alternado",
  "alternating deltoid raise": "Elevación deltoides alternada",
  "alternating floor press": "Press de suelo alternado",
  "alternating hang clean": "Clean colgado alternado",
  "alternating kettlebell press": "Press con kettlebell alternado",
  "alternating kettlebell row": "Remo con kettlebell alternado",
  "alternating renegade row": "Remo renegado alternado",
  "ankle circles": "Círculos de tobillo",
  "ankle on the knee": "tobillo sobre la rodilla",
  "anterior tibialis-smr": "masaje tibial anterior",
  "anti-gravity press": "press anti‑gravedad",
  "archer pull up": "Dominada arquera",
  "archer push up": "Flexión arquera",
  "arm circles": "círculos de brazo",
  "arm slingers hanging bent knee legs": "Lanzamiento de brazos colgado con rodillas flexionadas",
  "arm slingers hanging straight legs": "Lanzamiento de brazos colgado con piernas rectas",
  "arms apart circular toe touch (male)": "Toque de puntas circular con brazos separados",
  "arms overhead full sit-up (male)": "Abdominal completo con brazos arriba",
  "arnold dumbbell press": "press Arnold con mancuernas",
  "around the worlds": "circuito alrededor",
  "assisted chest dip (kneeling)": "Fondo de pecho de rodillas",
  "assisted hanging knee raise": "Elevación de rodillas colgado",
  "assisted hanging knee raise with throw down": "Elevación de rodillas colgado con descenso",
  "assisted lying calves stretch": "Estiramiento de pantorrillas acostado",
  "assisted lying glutes stretch": "Estiramiento de glúteos acostado",
  "assisted lying gluteus and piriformis stretch": "Estiramiento de piriforme asistido acostado gluteus",
  "assisted lying leg raise with lateral throw down": "Elevación de piernas acostado con descenso lateral",
  "assisted lying leg raise with throw down": "Elevación de piernas acostado con descenso",
  "assisted motion russian twist": "Giro ruso asistido",
  "assisted parallel close grip pull-up": "Dominada agarre cerrado paralelo",
  "assisted prone hamstring": "Isquiotibial boca abajo",
  "assisted prone lying quads stretch": "Estiramiento de cuádriceps boca abajo",
  "assisted prone rectus femoris stretch": "Estiramiento de recto femoral asistido boca abajo",
  "assisted pull-up": "Dominada asistida",
  "assisted seated pectoralis major stretch with stability ball": "Estiramiento de pectoral mayor sentado con balón suizo",
  "assisted side lying adductor stretch": "Estiramiento de aductores acostado de lado",
  "assisted sit-up": "Abdominal asistido",
  "assisted standing chin-up": "Dominada supina de pie",
  "assisted standing pull-up": "Dominada de pie",
  "assisted standing triceps extension (with towel)": "Extensión de tríceps de pie (con toalla)",
  "assisted triceps dip (kneeling)": "Fondo de tríceps de rodillas",
  "assisted wide-grip chest dip (kneeling)": "Fondo de pecho agarre amplio de rodillas",
  "astride jumps (male)": "Saltos con piernas abiertas",
  "atlas stone trainer": "entrenador de piedras Atlas",
  "atlas stones": "piedras Atlas",
  "axle deadlift": "peso muerto con eje",
  "back and forth step": "Paso adelante y atrás",
  "back extension on exercise ball": "Extensión de espalda sobre balón suizo",
  "back flyes - with bands": "aperturas de espalda con bandas",
  "back lever": "Palanca de espalda",
  "back pec stretch": "Estiramiento de pecho y espalda",
  "backward drag": "arrastre hacia atrás",
  "backward jump": "Salto hacia atrás",
  "backward medicine ball throw": "lanzamiento de balón medicinal atrás",
  "balance board": "Tabla de equilibrio",
  "ball leg curl": "curl de piernas con pelota",
  "band alternating biceps curl": "Curl de bíceps alterno con banda",
  "band alternating v-up": "V-up alterno con banda elástica",
  "band assisted pull-up": "Dominada asistida con banda",
  "band assisted wheel rollerout": "Rodamiento con rueda asistido con banda",
  "band bench press": "Press de banca con banda",
  "band bent-over hip extension": "Extensión de cadera inclinado con banda",
  "band bicycle crunch": "Crunch de bicicleta con banda",
  "band close-grip pulldown": "Jalón agarre cerrado con banda",
  "band close-grip push-up": "Flexión agarre cerrado con banda",
  "band concentration curl": "Curl concentrado con banda",
  "band fixed back close grip pulldown": "Jalón agarre cerrado con banda",
  "band fixed back underhand pulldown": "Jalón agarre supino con banda",
  "band front lateral raise": "Elevación lateral frontal con banda",
  "band front raise": "Elevación frontal con banda",
  "band good morning": "buenos días con banda",
  "band good morning (pull through)": "buenos días con banda tirón",
  "band hip adductions": "aducciones de cadera con banda",
  "band hip lift": "Elevación de cadera con banda",
  "band horizontal pallof press": "Press pallof horizontal con banda",
  "band jack knife sit-up": "Abdominal navaja con banda",
  "band kneeling one arm pulldown": "Jalón a un brazo de rodillas con banda",
  "band kneeling twisting crunch": "Crunch con giro de rodillas con banda",
  "band lying hip internal rotation": "Rotación interna de cadera acostado con banda",
  "band lying straight leg raise": "Elevación de pierna recta acostado con banda",
  "band one arm overhead biceps curl": "Curl de bíceps a un brazo con banda",
  "band one arm single leg split squat": "Sentadilla búlgara a una pierna con banda",
  "band one arm standing low row": "Remo bajo a un brazo de pie con banda",
  "band one arm twisting chest press": "Press de pecho con giro a un brazo con banda",
  "band one arm twisting seated row": "Remo sentado con giro a un brazo con banda",
  "band pull apart": "separación de banda",
  "band pull through": "Jalón entre piernas con banda",
  "band push sit-up": "Abdominal con empuje con banda",
  "band reverse fly": "Apertura posterior con banda",
  "band reverse wrist curl": "Curl de muñeca invertido con banda",
  "band seated hip internal rotation": "Rotación interna de cadera sentado con banda",
  "band seated twist": "Giro sentado con banda",
  "band shoulder press": "Press de hombros con banda",
  "band shrug": "Encogimiento con banda",
  "band side triceps extension": "Extensión de tríceps lateral con banda",
  "band single leg calf raise": "Elevación de pantorrillas a una pierna con banda",
  "band single leg reverse calf raise": "Elevación de pantorrillas invertido a una pierna con banda",
  "band single leg split squat": "Sentadilla búlgara a una pierna con banda",
  "band skull crusher": "rompecráneos con banda",
  "band squat": "Sentadilla con banda",
  "band squat row": "Sentadilla remo con banda elástica",
  "band standing crunch": "Crunch de pie con banda",
  "band standing rear delt row": "Remo de pie deltoides posterior con banda elástica",
  "band standing twisting crunch": "Crunch de pie con giro con banda elástica",
  "band step-up": "Subida a cajón con banda elástica",
  "band stiff leg deadlift": "Peso muerto piernas rígidas con banda",
  "band straight back stiff leg deadlift": "Peso muerto piernas rígidas con banda",
  "band straight leg deadlift": "Peso muerto piernas rectas con banda",
  "band twisting overhead press": "Press con giro sobre la cabeza con banda elástica",
  "band two legs calf raise - (band under both legs) v. 2": "Elevación de pantorrillas dos piernas - v. 2 con banda elástica (Band under both piernas)",
  "band underhand pulldown": "Jalón agarre supino con banda elástica",
  "band v-up": "V-up con banda elástica",
  "band vertical pallof press": "Press vertical pallof con banda elástica",
  "band wrist curl": "Curl de muñeca con banda elástica",
  "band y-raise": "Elevación en Y con banda elástica",
  "barbell ab rollout": "rollout abdominal con barra",
  "barbell ab rollout - on knees": "rollout abdominal con barra en rodillas",
  "barbell alternate biceps curl": "Curl de bíceps alterno con barra",
  "barbell bench front squat": "Sentadilla bench frontal con barra",
  "barbell bench press": "Press de banca con barra",
  "barbell bench press - medium grip": "press banca barra agarre medio",
  "barbell bench squat": "Sentadilla bench con barra",
  "barbell bent arm pullover": "Pullover con brazos flexionados con barra",
  "barbell bent over row": "Remo con barra",
  "barbell biceps curl (with arm blaster)": "Curl de bíceps con barra (Brazo blaster)",
  "barbell clean and press": "Press cargada con barra",
  "barbell clean-grip front squat": "Sentadilla clean-grip frontal con barra",
  "barbell close-grip bench press": "Press de banca agarre cerrado",
  "barbell curl": "Curl con barra",
  "barbell curls lying against an incline": "curl barra en banco inclinado",
  "barbell deadlift": "Peso muerto con barra",
  "barbell decline bench press": "Press de banca declinado con barra",
  "barbell decline bent arm pullover": "Pullover declinado con brazos flexionados con barra",
  "barbell decline close grip to skull press": "Press declinado agarre cerrado skull con barra",
  "barbell decline pullover": "Pullover declinado con barra",
  "barbell decline wide-grip press": "Press declinado agarre amplio con barra",
  "barbell decline wide-grip pullover": "Pullover declinado agarre amplio con barra",
  "barbell drag curl": "Curl drag con barra",
  "barbell floor calf raise": "Elevación de pantorrillas floor con barra",
  "barbell front chest squat": "Sentadilla frontal pecho con barra",
  "barbell front raise": "Elevación frontal con barra",
  "barbell front raise and pullover": "Elevación frontal pullover con barra",
  "barbell front squat": "Sentadilla frontal con barra",
  "barbell full squat": "Sentadilla completa con barra",
  "barbell full squat (back pov)": "Sentadilla completa con barra",
  "barbell full squat (side pov)": "Sentadilla completa con barra",
  "barbell full zercher squat": "Sentadilla completa zercher con barra",
  "barbell glute bridge": "Puente de glúteos con barra",
  "barbell glute bridge two legs on bench (male)": "Puente de glúteos dos piernas bench con barra (Hombre)",
  "barbell good morning": "Buenos días con barra",
  "barbell guillotine bench press": "Press de banca guillotine con barra",
  "barbell hack squat": "Sentadilla hack con barra",
  "barbell high bar squat": "Sentadilla alta bar con barra",
  "barbell hip thrust": "hip thrust barra",
  "barbell incline bench press": "Press de banca inclinado con barra",
  "barbell incline bench press - medium grip": "press banca inclinado barra agarre medio",
  "barbell incline close grip bench press": "Press de banca inclinado agarre cerrado con barra",
  "barbell incline reverse-grip press": "Press inclinado agarre inverso con barra",
  "barbell incline row": "Remo inclinado con barra",
  "barbell incline shoulder raise": "Elevación de hombros inclinado con barra",
  "barbell jefferson squat": "Sentadilla jefferson con barra",
  "barbell jm bench press": "Press de banca jm con barra",
  "barbell jump squat": "Sentadilla jump con barra",
  "barbell lateral lunge": "Zancada lateral con barra",
  "barbell low bar squat": "Sentadilla bajo bar con barra",
  "barbell lunge": "Zancada con barra",
  "barbell lying back of the head tricep extension": "Extensión de tríceps acostado espalda head con barra",
  "barbell lying close-grip press": "Press acostado agarre cerrado con barra",
  "barbell lying close-grip triceps extension": "Extensión de tríceps acostado agarre cerrado con barra",
  "barbell lying extension": "Extensión acostado con barra",
  "barbell lying lifting (on hip)": "Levantamiento acostado en cadera con barra",
  "barbell lying preacher curl": "Curl acostado preacher con barra",
  "barbell lying triceps extension": "Extensión de tríceps acostado con barra",
  "barbell lying triceps extension skull crusher": "Extensión de tríceps acostado skull crusher con barra",
  "barbell narrow stance squat": "Sentadilla narrow stance con barra",
  "barbell one arm bent over row": "Remo inclinado un brazo con barra",
  "barbell one arm floor press": "Press un brazo floor con barra",
  "barbell one arm side deadlift": "Peso muerto un brazo lateral con barra",
  "barbell one arm snatch": "Arranque un brazo con barra",
  "barbell one leg squat": "Sentadilla una pierna con barra",
  "barbell overhead squat": "Sentadilla sobre la cabeza con barra",
  "barbell palms down wrist curl over a bench": "Curl de muñeca palms down over bench con barra",
  "barbell palms up wrist curl over a bench": "Curl de muñeca palms up over bench con barra",
  "barbell pendlay row": "Remo pendlay con barra",
  "barbell pin presses": "Press con pasadores con barra",
  "barbell preacher curl": "Curl predicador con barra",
  "barbell press sit-up": "Abdominal press con barra",
  "barbell prone incline curl": "Curl boca abajo inclinado con barra",
  "barbell pullover": "Pullover con barra",
  "barbell pullover to press": "Press pullover con barra",
  "barbell rack pull": "Jalón rack con barra",
  "barbell rear delt raise": "Elevación deltoides posterior con barra",
  "barbell rear delt row": "Remo deltoides posterior con barra",
  "barbell rear lunge": "Zancada hacia atrás con barra",
  "barbell rear lunge v. 2": "Zancada rear v. 2 con barra",
  "barbell revers wrist curl v. 2": "Curl de muñeca revers v. 2 con barra",
  "barbell reverse close-grip bench press": "Press de banca invertido agarre cerrado con barra",
  "barbell reverse curl": "Curl invertido con barra",
  "barbell reverse grip bent over row": "Remo inclinado agarre inverso con barra",
  "barbell reverse grip decline bench press": "Press de banca agarre inverso declinado con barra",
  "barbell reverse grip incline bench press": "Press de banca agarre inverso inclinado con barra",
  "barbell reverse grip incline bench row": "Remo agarre inverso inclinado bench con barra",
  "barbell reverse grip skullcrusher": "Rompecráneos agarre inverso con barra",
  "barbell reverse preacher curl": "Curl invertido preacher con barra",
  "barbell reverse wrist curl": "Curl de muñeca invertido con barra",
  "barbell rollerout": "Rodamiento abdominal con barra",
  "barbell rollerout from bench": "Rodamiento abdominal desde banco con barra",
  "barbell rollout from bench": "rollout barra desde banco",
  "barbell romanian deadlift": "Peso muerto romanian con barra",
  "barbell seated behind head military press": "Press sentado por detrás head military con barra",
  "barbell seated bradford rocky press": "Press sentado bradford rocky con barra",
  "barbell seated calf raise": "Elevación de pantorrillas sentado con barra",
  "barbell seated close grip behind neck triceps extension": "Extensión de tríceps sentado agarre cerrado por detrás cuello con barra",
  "barbell seated close-grip concentration curl": "Curl sentado agarre cerrado concentration con barra",
  "barbell seated good morning": "Buenos días sentado con barra",
  "barbell seated overhead press": "Press sentado sobre la cabeza con barra",
  "barbell seated overhead triceps extension": "Extensión de tríceps sentado sobre la cabeza con barra",
  "barbell seated twist": "Giro sentado con barra",
  "barbell shoulder press": "press hombro barra",
  "barbell shrug": "Encogimiento de hombros con barra",
  "barbell shrug behind the back": "encogimiento con barra detrás",
  "barbell side bend": "flexión lateral con barra",
  "barbell side bent v. 2": "Flexión lateral v. 2 con barra",
  "barbell side split squat": "Sentadilla lateral búlgara con barra",
  "barbell side split squat v. 2": "Sentadilla lateral búlgara v. 2 con barra",
  "barbell single leg deadlift": "Peso muerto una pierna con barra",
  "barbell single leg split squat": "Sentadilla una pierna búlgara con barra",
  "barbell sitted alternate leg raise": "Elevación de piernas sitted alterno con barra",
  "barbell sitted alternate leg raise (female)": "Elevación de piernas alterna sentado",
  "barbell skier": "Esquiador con barra",
  "barbell speed squat": "Sentadilla speed con barra",
  "barbell split squat v. 2": "Sentadilla búlgara v. 2 con barra",
  "barbell squat": "sentadilla con barra",
  "barbell squat (on knees)": "Sentadilla con barra",
  "barbell squat jump step rear lunge": "Sentadilla jump step rear zancada con barra",
  "barbell squat to a bench": "sentadilla con barra a banco",
  "barbell standing ab rollerout": "Rodamiento abdominal de pie con barra",
  "barbell standing back wrist curl": "Curl de muñeca de pie espalda con barra",
  "barbell standing bradford press": "Press de pie bradford con barra",
  "barbell standing calf raise": "Elevación de pantorrillas de pie con barra",
  "barbell standing close grip curl": "Curl de pie agarre cerrado con barra",
  "barbell standing close grip military press": "Press de pie agarre cerrado military con barra",
  "barbell standing concentration curl": "Curl de pie concentration con barra",
  "barbell standing front raise over head": "Elevación de pie frontal over head con barra",
  "barbell standing leg calf raise": "Elevación de pantorrillas de pie pierna con barra",
  "barbell standing overhead triceps extension": "Extensión de tríceps de pie sobre la cabeza con barra",
  "barbell standing reverse grip curl": "Curl de pie agarre inverso con barra",
  "barbell standing rocking leg calf raise": "Elevación de pantorrillas de pie rocking pierna con barra",
  "barbell standing twist": "Giro de pie con barra",
  "barbell standing wide grip biceps curl": "Curl de bíceps de pie agarre amplio con barra",
  "barbell standing wide military press": "Press de pie amplio military con barra",
  "barbell standing wide-grip curl": "Curl de pie agarre amplio con barra",
  "barbell step ups": "subidas al banco con barra",
  "barbell step-up": "Subida a cajón con barra",
  "barbell stiff leg good morning": "Buenos días piernas rígidas con barra",
  "barbell straight leg deadlift": "Peso muerto piernas rectas con barra",
  "barbell sumo deadlift": "Peso muerto sumo con barra",
  "barbell thruster": "Thruster con barra",
  "barbell upright row": "Remo upright con barra",
  "barbell upright row v. 2": "Remo upright v. 2 con barra",
  "barbell upright row v. 3": "Remo upright v. 3 con barra",
  "barbell walking lunge": "zancada caminando con barra",
  "barbell wide bench press": "Press de banca amplio con barra",
  "barbell wide reverse grip bench press": "Press de banca amplio agarre inverso con barra",
  "barbell wide squat": "Sentadilla amplio con barra",
  "barbell wide-grip upright row": "Remo agarre amplio upright con barra",
  "barbell wrist curl": "Curl de muñeca con barra",
  "barbell wrist curl v. 2": "Curl de muñeca v. 2 con barra",
  "barbell zercher squat": "Sentadilla zercher con barra",
  "basic toe touch (male)": "Toque de puntas basic (Hombre)",
  "battling ropes": "Cuerdas de batalla",
  "bear crawl": "Caminata de oso",
  "bear crawl sled drags": "gateo de oso con trineo",
  "behind head chest stretch": "Estiramiento de pecho por detrás head",
  "bench dip (knees bent)": "Fondo en banco",
  "bench dip on floor": "Fondo floor con banco",
  "bench dips": "fondos en banco",
  "bench hip extension": "Extensión de cadera con banco",
  "bench jump": "salto al banco",
  "bench press - powerlifting": "press de banca powerlifting",
  "bench press - with bands": "press de banca con bandas",
  "bench press with chains": "press de banca con cadenas",
  "bench pull-ups": "Dominadas con banco",
  "bench sprint": "sprint en banco",
  "bent knee lying twist (male)": "Giro rodilla flexionada acostado (Hombre)",
  "bent over barbell row": "remo con barra inclinado",
  "bent over dumbbell rear delt raise with head on bench": "elevación posterior de deltoides con mancuerna",
  "bent over low-pulley side lateral": "elevación lateral con polea baja inclinado",
  "bent over one-arm long bar row": "remo con barra larga a una mano inclinado",
  "bent over two-arm long bar row": "remo con barra larga a dos manos inclinado",
  "bent over two-dumbbell row": "remo con mancuernas inclinado",
  "bent over two-dumbbell row with palms in": "remo con mancuernas inclinado con palmas hacia adentro",
  "bent press": "press inclinado",
  "bent-arm barbell pullover": "pullover con barra brazos flex",
  "bent-arm dumbbell pullover": "pullover con mancuerna brazos flex",
  "bent-knee hip raise": "elevación de cadera rodilla flex",
  "biceps leg concentration curl": "Curl bíceps pierna concentration",
  "biceps narrow pull-ups": "Dominadas bíceps narrow",
  "biceps pull-up": "Dominada bíceps",
  "bicycling": "ciclismo",
  "bicycling, stationary": "ciclismo estático",
  "board press": "press con tabla",
  "body tricep press": "press de tríceps corporal",
  "body-up": "Elevación corporal",
  "bodyweight drop jump squat": "Sentadilla con salto",
  "bodyweight flyes": "aperturas con peso corporal",
  "bodyweight incline side plank": "Plancha lateral inclinada",
  "bodyweight kneeling triceps extension": "Extensión de tríceps bodyweight de rodillas",
  "bodyweight mid row": "remo medio con peso corporal",
  "bodyweight side lying biceps curl": "Curl de bíceps bodyweight lateral acostado",
  "bodyweight squat": "sentadilla con peso corporal",
  "bodyweight squatting row": "Remo bodyweight squatting",
  "bodyweight squatting row (with towel)": "Remo bodyweight squatting (Towel)",
  "bodyweight standing calf raise": "Elevación de pantorrillas bodyweight de pie",
  "bodyweight standing close-grip one arm row": "Remo bodyweight de pie agarre cerrado un brazo",
  "bodyweight standing close-grip row": "Remo bodyweight de pie agarre cerrado",
  "bodyweight standing one arm row": "Remo bodyweight de pie un brazo",
  "bodyweight standing one arm row (with towel)": "Remo bodyweight de pie un brazo (Towel)",
  "bodyweight standing row": "Remo bodyweight de pie",
  "bodyweight standing row (with towel)": "Remo bodyweight de pie (Towel)",
  "bodyweight walking lunge": "zancada caminando con peso corporal",
  "bosu ball cable crunch with side bends": "crunch con cable y bosu y flexión lateral",
  "bottoms up": "clean invertido",
  "bottoms-up": "Invertido",
  "bottoms-up clean from the hang position": "clean invertido desde posición colgante",
  "box jump (multiple response)": "salto al cajón",
  "box jump down with one leg stabilization": "Salto de cajón con estabilización a una pierna",
  "box skip": "salto al cajón",
  "box squat": "sentadilla en cajón",
  "box squat with bands": "sentadilla en cajón con bandas",
  "box squat with chains": "sentadilla en cajón con cadenas",
  "brachialis-smr": "masaje braquial",
  "bradford/rocky presses": "press Bradford/Rocky",
  "bridge - mountain climber (cross body)": "Puente - mountain climber (Cruzado)",
  "burpee": "Burpee",
  "butt lift (bridge)": "puente de glúteos",
  "butt-ups": "Elevación de glúteos",
  "butterfly": "apertura de pecho",
  "butterfly yoga pose": "Postura de mariposa de yoga",
  "cable alternate shoulder press": "Press de hombros alterno con polea",
  "cable alternate triceps extension": "Extensión de tríceps alterno con polea",
  "cable assisted inverse leg curl": "Curl de piernas asistido inverse con polea",
  "cable bar lateral pulldown": "Jalón bar lateral con polea",
  "cable bench press": "Press de banca con polea",
  "cable chest press": "press de pecho con cable",
  "cable close grip curl": "Curl agarre cerrado con polea",
  "cable concentration curl": "Curl concentration con polea",
  "cable concentration extension (on knee)": "Extensión concentration con polea (Knee)",
  "cable cross-over lateral pulldown": "Jalón cross-over lateral con polea",
  "cable cross-over revers fly": "Apertura posterior cruzada en polea",
  "cable cross-over variation": "Cruces en polea variación",
  "cable crossover": "cruce de cables",
  "cable crunch": "crunch con cable",
  "cable curl": "Curl con polea",
  "cable deadlift": "Peso muerto con polea",
  "cable deadlifts": "peso muerto con cable",
  "cable decline fly": "Apertura declinado con polea",
  "cable decline one arm press": "Press declinado un brazo con polea",
  "cable decline press": "Press declinado con polea",
  "cable decline seated wide-grip row": "Remo declinado sentado agarre amplio con polea",
  "cable drag curl": "Curl drag con polea",
  "cable floor seated wide-grip row": "Remo floor sentado agarre amplio con polea",
  "cable forward raise": "Elevación forward con polea",
  "cable front raise": "Elevación frontal en polea",
  "cable front shoulder raise": "Elevación de hombros frontal con polea",
  "cable hammer curl (with rope)": "Curl martillo en polea",
  "cable hammer curls - rope attachment": "curl martillo con cuerda",
  "cable high pulley overhead tricep extension": "Extensión de tríceps alta pulley sobre la cabeza con polea",
  "cable high row (kneeling)": "Remo alta con polea (De rodillas)",
  "cable hip adduction": "Adducción de cadera en polea",
  "cable incline bench press": "Press de banca inclinado con polea",
  "cable incline bench row": "Remo inclinado bench con polea",
  "cable incline fly": "Apertura inclinado con polea",
  "cable incline fly (on stability ball)": "Apertura inclinado con polea (Stability ball)",
  "cable incline pushdown": "Empuje inclinado en polea",
  "cable incline triceps extension": "Extensión de tríceps inclinado en polea",
  "cable internal rotation": "rotación interna con cable",
  "cable iron cross": "cruz de hierro con cable",
  "cable judo flip": "Volteo de judo en polea",
  "cable kickback": "Patada en polea",
  "cable kneeling crunch": "Crunch de rodillas con polea",
  "cable kneeling rear delt row (with rope) (male)": "Remo de rodillas deltoides posterior con polea (Rope, Hombre)",
  "cable kneeling triceps extension": "Extensión de tríceps de rodillas con polea",
  "cable lat pulldown full range of motion": "Jalón de dorsales completa range motion con polea",
  "cable lateral pulldown (with rope attachment)": "Jalón lateral con polea (Rope attachment)",
  "cable lateral pulldown with v-bar": "Jalón lateral v-bar con polea",
  "cable lateral raise": "Elevación lateral en polea",
  "cable low fly": "Apertura bajo con polea",
  "cable low seated row": "Remo bajo sentado con polea",
  "cable lying bicep curl": "Curl acostado bicep con polea",
  "cable lying close-grip curl": "Curl acostado agarre cerrado con polea",
  "cable lying extension pullover (with rope attachment)": "Extensión acostado pullover con polea (Rope attachment)",
  "cable lying fly": "Apertura acostado con polea",
  "cable lying triceps extension": "extensión de tríceps acostado con cable",
  "cable lying triceps extension v. 2": "Extensión de tríceps acostado v. 2 con polea",
  "cable middle fly": "Apertura middle con polea",
  "cable one arm bent over row": "Remo inclinado un brazo con polea",
  "cable one arm curl": "Curl un brazo con polea",
  "cable one arm decline chest fly": "Apertura de pecho un brazo declinado con polea",
  "cable one arm fly on exercise ball": "Apertura un brazo exercise ball con polea",
  "cable one arm incline fly on exercise ball": "Apertura un brazo inclinado exercise ball con polea",
  "cable one arm incline press": "Press un brazo inclinado con polea",
  "cable one arm incline press on exercise ball": "Press un brazo inclinado exercise ball con polea",
  "cable one arm lateral bent-over": "Elevación lateral inclinada a un brazo en polea",
  "cable one arm lateral raise": "Elevación un brazo lateral con polea",
  "cable one arm preacher curl": "Curl un brazo preacher con polea",
  "cable one arm press on exercise ball": "Press un brazo exercise ball con polea",
  "cable one arm pulldown": "Jalón un brazo con polea",
  "cable one arm reverse preacher curl": "Curl un brazo invertido preacher con polea",
  "cable one arm straight back high row (kneeling)": "Remo un brazo recto espalda alta con polea (De rodillas)",
  "cable one arm tricep extension": "extensión de tríceps a un brazo con cable",
  "cable one arm tricep pushdown": "Empuje de tríceps a un brazo en polea",
  "cable overhead curl": "Curl sobre la cabeza con polea",
  "cable overhead curl on exercise ball": "Curl sobre la cabeza exercise ball con polea",
  "cable overhead triceps extension (rope attachment)": "Extensión de tríceps sobre la cabeza con polea (Rope attachment)",
  "cable palm rotational row": "Remo palm rotational con polea",
  "cable preacher curl": "Curl preacher con polea",
  "cable press on exercise ball": "Press exercise ball con polea",
  "cable pull through (with rope)": "Jalón through con polea (Rope)",
  "cable pulldown": "Jalón en polea",
  "cable pulldown (pro lat bar)": "Jalón en polea",
  "cable pulldown bicep curl": "Jalón bicep curl con polea",
  "cable pushdown": "Empuje en polea",
  "cable pushdown (straight arm) v. 2": "Empuje en polea con brazo recto v. 2",
  "cable pushdown (with rope attachment)": "Empuje en polea con soga",
  "cable rear delt fly": "apertura posterior de deltoides con cable",
  "cable rear delt row (stirrups)": "Remo deltoides posterior con polea (Stirrups)",
  "cable rear delt row (with rope)": "Remo deltoides posterior con polea (Rope)",
  "cable rear drive": "Empuje posterior en polea",
  "cable rear pulldown": "Jalón rear con polea",
  "cable reverse crunch": "Crunch invertido en polea",
  "cable reverse curl": "Curl invertido con polea",
  "cable reverse grip triceps pushdown (sz-bar) (with arm blaster)": "Empuje de tríceps agarre inverso en polea con barra SZ y arm blaster",
  "cable reverse one arm curl": "Curl invertido un brazo con polea",
  "cable reverse preacher curl": "Curl invertido preacher con polea",
  "cable reverse wrist curl": "Curl de muñeca invertido con polea",
  "cable reverse-grip pushdown": "Empuje agarre inverso en polea",
  "cable reverse-grip straight back seated high row": "Remo agarre inverso recto espalda sentado alta con polea",
  "cable rope crossover seated row": "Remo rope cruzado sentado con polea",
  "cable rope elevated seated row": "Remo rope elevated sentado con polea",
  "cable rope extension incline bench row": "Extensión rope inclinado bench remo con polea",
  "cable rope hammer preacher curl": "Curl rope hammer preacher con polea",
  "cable rope high pulley overhead tricep extension": "Extensión de tríceps rope alta pulley sobre la cabeza con polea",
  "cable rope incline tricep extension": "Extensión de tríceps rope inclinado con polea",
  "cable rope lying on floor tricep extension": "Extensión de tríceps rope acostado floor con polea",
  "cable rope one arm hammer preacher curl": "Curl rope un brazo hammer preacher con polea",
  "cable rope overhead triceps extension": "extensión de tríceps alta con cuerda y cable",
  "cable rope rear-delt rows": "remo posterior de deltoides con cuerda y cable",
  "cable rope seated row": "Remo rope sentado con polea",
  "cable russian twists": "giros rusos con cable",
  "cable russian twists (on stability ball)": "Giros russian con polea (Stability ball)",
  "cable seated chest press": "Press sentado pecho con polea",
  "cable seated crunch": "Crunch sentado con polea",
  "cable seated curl": "Curl sentado con polea",
  "cable seated high row (v-bar)": "Remo sentado alta con polea (V-bar)",
  "cable seated lateral raise": "elevación lateral sentado con cable",
  "cable seated one arm alternate row": "Remo sentado un brazo alterno con polea",
  "cable seated one arm concentration curl": "Curl sentado un brazo concentration con polea",
  "cable seated overhead curl": "Curl sentado sobre la cabeza con polea",
  "cable seated rear lateral raise": "Elevación sentado rear lateral con polea",
  "cable seated row": "Remo sentado con polea",
  "cable seated shoulder internal rotation": "Rotación sentado hombro internal con polea",
  "cable seated twist": "Giro sentado con polea",
  "cable seated wide-grip row": "Remo sentado agarre amplio con polea",
  "cable shoulder press": "Press de hombros con polea",
  "cable shrug": "Encogimiento de hombros en polea",
  "cable shrugs": "encogimientos con cable",
  "cable side bend": "Flexión lateral en polea",
  "cable side bend crunch (bosu ball)": "Crunch lateral bend con polea (Bosu ball)",
  "cable side crunch": "Crunch lateral con polea",
  "cable squat row (with rope attachment)": "Sentadilla remo con polea (Rope attachment)",
  "cable squatting curl": "Curl squatting con polea",
  "cable standing back wrist curl": "Curl de muñeca de pie espalda con polea",
  "cable standing calf raise": "Elevación de pantorrillas de pie con polea",
  "cable standing cross-over high reverse fly": "Apertura de pie cross-over alta invertido con polea",
  "cable standing crunch": "Crunch de pie con polea",
  "cable standing crunch (with rope attachment)": "Crunch de pie con polea (Rope attachment)",
  "cable standing fly": "Apertura de pie con polea",
  "cable standing hip extension": "Extensión de cadera de pie con polea",
  "cable standing inner curl": "Curl de pie inner con polea",
  "cable standing lift": "Levantamiento de pie en polea",
  "cable standing one arm triceps extension": "Extensión de tríceps de pie un brazo con polea",
  "cable standing one leg calf raise": "Elevación de pantorrillas de pie una pierna con polea",
  "cable standing pulldown (with rope)": "Jalón de pie con polea (Rope)",
  "cable standing rear delt row (with rope)": "Remo de pie deltoides posterior con polea (Rope)",
  "cable standing reverse grip one arm overhead tricep extension": "Extensión de tríceps por encima de la cabeza a un brazo en polea",
  "cable standing row (v-bar)": "Remo de pie con polea (V-bar)",
  "cable standing shoulder external rotation": "Rotación de pie hombro external con polea",
  "cable standing twist row (v-bar)": "Giro de pie remo con polea (V-bar)",
  "cable standing up straight crossovers": "Cruces de pie en polea",
  "cable straight arm pulldown": "Jalón recto brazo con polea",
  "cable straight arm pulldown (with rope)": "Jalón recto brazo con polea (Rope)",
  "cable straight back seated row": "Remo recto espalda sentado con polea",
  "cable supine reverse fly": "Apertura boca arriba invertido con polea",
  "cable thibaudeau kayak row": "Remo thibaudeau kayak con polea",
  "cable triceps pushdown (v-bar)": "Empuje de tríceps en polea con barra V",
  "cable triceps pushdown (v-bar) (with arm blaster)": "Empuje de tríceps en polea con barra V y arm blaster",
  "cable tuck reverse crunch": "Crunch tuck invertido con polea",
  "cable twist": "Giro con polea",
  "cable twist (up-down)": "Giro con polea (Up-down)",
  "cable twisting pull": "Jalón con giro con polea",
  "cable two arm curl on incline bench": "Curl dos brazo inclinado bench con polea",
  "cable two arm tricep kickback": "Patada de tríceps a dos brazos en polea",
  "cable underhand pulldown": "Jalón agarre supino con polea",
  "cable upper chest crossovers": "Cruces superiores de pecho en polea",
  "cable upper row": "Remo superior con polea",
  "cable upright row": "Remo upright con polea",
  "cable wide grip rear pulldown behind neck": "Jalón agarre amplio rear por detrás cuello con polea",
  "cable wrist curl": "Curl de muñeca con polea",
  "calf press": "press de gemelos",
  "calf press on the leg press machine": "press de gemelos en máquina de prensa de piernas",
  "calf push stretch with hands against wall": "Estiramiento pantorrilla empuje hands wall",
  "calf raise on a dumbbell": "elevación de gemelos con mancuerna",
  "calf raises - with bands": "elevaciones de gemelos con bandas",
  "calf stretch elbows against wall": "estiramiento de gemelos con codos contra la pared",
  "calf stretch hands against wall": "estiramiento de gemelos con manos contra la pared",
  "calf stretch with hands against wall": "Estiramiento pantorrilla hands wall",
  "calf stretch with rope": "Estiramiento pantorrilla rope",
  "calf-machine shoulder shrug": "encogimiento de hombros en máquina de gemelos",
  "calves-smr": "pantorrillas-smr",
  "cambered bar lying row": "Remo cambered bar acostado",
  "captains chair straight leg raise": "Elevación de piernas captains chair recto",
  "car deadlift": "peso muerto con coche",
  "car drivers": "conductores de coche",
  "carioca quick step": "carioca paso rápido",
  "cat stretch": "estiramiento gato",
  "catch and overhead throw": "captura y lanzamiento sobre cabeza",
  "chain handle extension": "extensión cadena mango",
  "chain press": "press cadena",
  "chair leg extended stretch": "Estiramiento chair pierna extended",
  "chair lower back stretch": "estiramiento lumbar silla",
  "chair squat": "sentadilla silla",
  "chair upper body stretch": "estiramiento parte superior silla",
  "chest and front of shoulder stretch": "Estiramiento de hombros pecho frontal",
  "chest dip": "Fondo de pecho",
  "chest dip (on dip-pull-up cage)": "Fondo de pecho",
  "chest dip on straight bar": "Fondo de pecho recto bar",
  "chest push (multiple response)": "empuje pecho múltiple",
  "chest push (single response)": "empuje pecho simple",
  "chest push from 3 point stance": "empuje pecho 3 puntos",
  "chest push with run release": "empuje pecho corrida",
  "chest stretch on stability ball": "estiramiento pecho pelota estabilidad",
  "chest stretch with exercise ball": "Estiramiento de pecho exercise ball",
  "chest tap push-up (male)": "Flexión pecho tap (Hombre)",
  "child's pose": "postura niño",
  "chin to chest stretch": "estiramiento mentón‑pecho",
  "chin-up": "Dominada supina",
  "chin-ups (narrow parallel grip)": "Dominadas supinas",
  "circles knee stretch": "Estiramiento circles knee",
  "circus bell": "campana de circo",
  "clap push up": "Empuje clap up",
  "clean": "arranque",
  "clean and jerk": "arranque y envión",
  "clean and press": "arranque y press",
  "clean deadlift": "peso muerto arranque",
  "clean from blocks": "arranque desde bloques",
  "clean pull": "tirón de arranque",
  "clean shrug": "encogimiento arranque",
  "clock push-up": "Flexión clock",
  "close grip chin-up": "Dominada supina agarre cerrado",
  "close-grip barbell bench press": "press de banca barra agarre cerrado",
  "close-grip dumbbell press": "press con mancuernas agarre cerrado",
  "close-grip ez bar curl": "curl barra EZ agarre cerrado",
  "close-grip ez-bar curl with band": "curl barra EZ agarre cerrado con banda",
  "close-grip ez-bar press": "press barra EZ agarre cerrado",
  "close-grip front lat pulldown": "jalón frontal agarre cerrado",
  "close-grip push-up": "Flexión agarre cerrado",
  "close-grip push-up (on knees)": "Flexión agarre cerrado (Knees)",
  "close-grip push-up off of a dumbbell": "flexión agarre cerrado con mancuerna",
  "close-grip standing barbell curl": "curl de pie barra agarre cerrado",
  "cocoons": "Capullos",
  "conan's wheel": "rueda de Conan",
  "concentration curls": "curl concentrado",
  "crab twist toe touch": "Toque de puntas crab giro",
  "cross body crunch": "Crunch cruzado",
  "cross body hammer curl": "curl martillo cruzado",
  "cross over - with bands": "cruce con bandas",
  "cross-body crunch": "crunch cruzado",
  "crossover reverse lunge": "zancada cruzada inversa",
  "crucifix": "crucifijo",
  "crunch - hands overhead": "crunch manos arriba",
  "crunch - legs on exercise ball": "crunch piernas en pelota",
  "crunch (hands overhead)": "Crunch",
  "crunch (on stability ball, arms straight)": "Crunch",
  "crunch (on stability ball)": "Crunch",
  "crunch floor": "Crunch en el suelo",
  "crunches": "abdominales",
  "cuban press": "press cubano",
  "curl-up": "Curl up",
  "curtsey squat": "Sentadilla curtsey",
  "cycle cross trainer": "Elíptica",
  "dancer's stretch": "estiramiento de bailarín",
  "dead bug": "Bicho muerto",
  "deadlift with bands": "peso muerto con bandas",
  "deadlift with chains": "peso muerto con cadenas",
  "decline barbell bench press": "press de banca declinado",
  "decline close-grip bench to skull crusher": "press declinado agarre estrecho y rompecráneos",
  "decline crunch": "Crunch declinado",
  "decline dumbbell bench press": "press de banca declinado con mancuernas",
  "decline dumbbell flyes": "aperturas declinadas con mancuernas",
  "decline dumbbell triceps extension": "extensión de tríceps declinada con mancuernas",
  "decline ez bar triceps extension": "extensión de tríceps declinado con barra EZ",
  "decline oblique crunch": "crunch oblicuo declinado",
  "decline push-up": "Flexión declinada",
  "decline reverse crunch": "crunch inverso declinado",
  "decline sit-up": "Abdominal declinado",
  "decline smith press": "press Smith declinado",
  "deep push up": "Empuje deep up",
  "deficit deadlift": "peso muerto déficit",
  "depth jump leap": "salto de profundidad",
  "diamond push-up": "Flexión de diamante",
  "dip machine": "máquina de fondos",
  "dips - chest version": "fondos pecho",
  "dips - triceps version": "fondos tríceps",
  "donkey calf raise": "Elevación de pantorrillas donkey",
  "donkey calf raises": "elevación de gemelos en burro",
  "double kettlebell alternating hang clean": "clean colgante alternado con kettlebells",
  "double kettlebell jerk": "jerk con kettlebells",
  "double kettlebell push press": "push press con kettlebells",
  "double kettlebell snatch": "snatch con kettlebells",
  "double kettlebell windmill": "windmill con kettlebells",
  "double leg butt kick": "patada de glúteos doble",
  "downward facing balance": "balance invertido",
  "drag curl": "curl arrastre",
  "drop push": "push de caída",
  "drop push up": "Empuje drop up",
  "dumbbell alternate bicep curl": "curl alternado con mancuerna",
  "dumbbell alternate biceps curl": "Curl de bíceps alterno con mancuernas",
  "dumbbell alternate biceps curl (with arm blaster)": "Curl de bíceps alterno con mancuernas (Brazo blaster)",
  "dumbbell alternate hammer preacher curl": "Curl alterno hammer preacher con mancuernas",
  "dumbbell alternate preacher curl": "Curl alterno preacher con mancuernas",
  "dumbbell alternate seated hammer curl": "Curl alterno sentado hammer con mancuernas",
  "dumbbell alternate side press": "Press alterno lateral con mancuernas",
  "dumbbell alternating bicep curl with leg raised on exercise ball": "Curl alterno bicep pierna raised exercise ball con mancuernas",
  "dumbbell alternating seated bicep curl on exercise ball": "Curl alterno sentado bicep exercise ball con mancuernas",
  "dumbbell arnold press": "Press Arnold con mancuernas",
  "dumbbell arnold press v. 2": "Press arnold v. 2 con mancuernas",
  "dumbbell around pullover": "Pullover circular con mancuernas",
  "dumbbell bench press": "Press de banca con mancuernas",
  "dumbbell bench press with neutral grip": "press de banca con agarre neutro",
  "dumbbell bench seated press": "Press bench sentado con mancuernas",
  "dumbbell bench squat": "Sentadilla bench con mancuernas",
  "dumbbell bent over row": "Remo inclinado con mancuernas",
  "dumbbell bicep curl": "curl de bíceps con mancuerna",
  "dumbbell bicep curl lunge with bowling motion": "Zancada bicep curl bowling motion con mancuernas",
  "dumbbell bicep curl on exercise ball with leg raised": "Curl bicep exercise ball pierna raised con mancuernas",
  "dumbbell bicep curl with stork stance": "Curl bicep stork stance con mancuernas",
  "dumbbell biceps curl": "Curl de bíceps con mancuernas",
  "dumbbell biceps curl (with arm blaster)": "Curl de bíceps con mancuernas (Brazo blaster)",
  "dumbbell biceps curl reverse": "Curl de bíceps invertido con mancuernas",
  "dumbbell biceps curl squat": "Curl de bíceps sentadilla con mancuernas",
  "dumbbell biceps curl v sit on bosu ball": "Curl de bíceps sit bosu ball con mancuernas",
  "dumbbell burpee": "Burpee con mancuernas",
  "dumbbell clean": "Cargada con mancuernas",
  "dumbbell close grip press": "Press agarre cerrado con mancuernas",
  "dumbbell close-grip press": "Press agarre cerrado con mancuernas",
  "dumbbell concentration curl": "Curl concentration con mancuernas",
  "dumbbell contralateral forward lunge": "Zancada contralateral forward con mancuernas",
  "dumbbell cross body hammer curl": "Curl cruzado hammer con mancuernas",
  "dumbbell cross body hammer curl v. 2": "Curl cruzado hammer v. 2 con mancuernas",
  "dumbbell cuban press": "Press cuban con mancuernas",
  "dumbbell cuban press v. 2": "Press cuban v. 2 con mancuernas",
  "dumbbell deadlift": "Peso muerto con mancuernas",
  "dumbbell decline bench press": "Press de banca declinado con mancuernas",
  "dumbbell decline fly": "Apertura declinado con mancuernas",
  "dumbbell decline hammer press": "Press declinado hammer con mancuernas",
  "dumbbell decline one arm fly": "Apertura declinado un brazo con mancuernas",
  "dumbbell decline one arm hammer press": "Press martillo declinado a un brazo con mancuernas",
  "dumbbell decline shrug": "Encogimiento declinado con mancuernas",
  "dumbbell decline shrug v. 2": "Encogimiento declinado v. 2 con mancuernas",
  "dumbbell decline triceps extension": "Extensión de tríceps declinado con mancuernas",
  "dumbbell decline twist fly": "Giro declinado apertura con mancuernas",
  "dumbbell finger curls": "Curl de dedos con mancuernas",
  "dumbbell floor press": "press de suelo con mancuerna",
  "dumbbell fly": "Apertura con mancuernas",
  "dumbbell fly on exercise ball": "Apertura exercise ball con mancuernas",
  "dumbbell flyes": "aperturas con mancuerna",
  "dumbbell forward lunge triceps extension": "Extensión de tríceps forward zancada con mancuernas",
  "dumbbell front raise": "Elevación frontal con mancuernas",
  "dumbbell front raise v. 2": "Elevación frontal v. 2 con mancuernas",
  "dumbbell full can lateral raise": "Elevación completa can lateral con mancuernas",
  "dumbbell goblet squat": "Sentadilla goblet con mancuernas",
  "dumbbell hammer curl": "Curl martillo con mancuernas",
  "dumbbell hammer curl on exercise ball": "Curl hammer exercise ball con mancuernas",
  "dumbbell hammer curl v. 2": "Curl hammer v. 2 con mancuernas",
  "dumbbell hammer curls (with arm blaster)": "Curls martillo con mancuernas (arm blaster)",
  "dumbbell high curl": "Curl alta con mancuernas",
  "dumbbell incline alternate press": "Press inclinado alterno con mancuernas",
  "dumbbell incline bench press": "Press de banca inclinado con mancuernas",
  "dumbbell incline biceps curl": "Curl de bíceps inclinado con mancuernas",
  "dumbbell incline breeding": "Apertura inclinada con mancuernas",
  "dumbbell incline curl": "Curl inclinado con mancuernas",
  "dumbbell incline curl v. 2": "Curl inclinado v. 2 con mancuernas",
  "dumbbell incline fly": "Apertura inclinado con mancuernas",
  "dumbbell incline fly on exercise ball": "Apertura inclinado exercise ball con mancuernas",
  "dumbbell incline hammer curl": "Curl inclinado hammer con mancuernas",
  "dumbbell incline hammer press": "Press inclinado hammer con mancuernas",
  "dumbbell incline hammer press on exercise ball": "Press inclinado hammer exercise ball con mancuernas",
  "dumbbell incline inner biceps curl": "Curl de bíceps inclinado inner con mancuernas",
  "dumbbell incline one arm fly": "Apertura inclinado un brazo con mancuernas",
  "dumbbell incline one arm fly on exercise ball": "Apertura inclinado un brazo exercise ball con mancuernas",
  "dumbbell incline one arm hammer press": "Press inclinado un brazo hammer con mancuernas",
  "dumbbell incline one arm hammer press on exercise ball": "Press inclinado un brazo hammer exercise ball con mancuernas",
  "dumbbell incline one arm lateral raise": "Elevación inclinado un brazo lateral con mancuernas",
  "dumbbell incline one arm press": "Press inclinado un brazo con mancuernas",
  "dumbbell incline one arm press on exercise ball": "Press inclinado un brazo exercise ball con mancuernas",
  "dumbbell incline palm-in press": "Press inclinado palm-in con mancuernas",
  "dumbbell incline press on exercise ball": "Press inclinado exercise ball con mancuernas",
  "dumbbell incline raise": "Elevación inclinado con mancuernas",
  "dumbbell incline rear lateral raise": "Elevación inclinado rear lateral con mancuernas",
  "dumbbell incline row": "Remo inclinado con mancuernas",
  "dumbbell incline shoulder raise": "Elevación de hombros inclinado con mancuernas",
  "dumbbell incline shrug": "Encogimiento inclinado con mancuernas",
  "dumbbell incline t-raise": "Elevación en T inclinada con mancuernas",
  "dumbbell incline triceps extension": "Extensión de tríceps inclinado con mancuernas",
  "dumbbell incline twisted flyes": "Aperturas con giro inclinadas con mancuernas",
  "dumbbell incline two arm extension": "Extensión inclinado dos brazo con mancuernas",
  "dumbbell incline y-raise": "Elevación en Y inclinada con mancuernas",
  "dumbbell iron cross": "Cruz de hierro con mancuernas",
  "dumbbell kickback": "Patada con mancuernas",
  "dumbbell kickbacks on exercise ball": "Patadas exercise ball con mancuernas",
  "dumbbell kneeling bicep curl exercise ball": "Curl de rodillas bicep exercise ball con mancuernas",
  "dumbbell lateral raise": "Elevación lateral con mancuernas",
  "dumbbell lateral to front raise": "Elevación lateral frontal con mancuernas",
  "dumbbell lunge": "Zancada con mancuernas",
  "dumbbell lunge with bicep curl": "Zancada bicep curl con mancuernas",
  "dumbbell lunges": "zancadas con mancuerna",
  "dumbbell lying alternate extension": "Extensión acostado alterno con mancuernas",
  "dumbbell lying elbow press": "Press acostado elbow con mancuernas",
  "dumbbell lying extension (across face)": "Extensión acostado con mancuernas (Across face)",
  "dumbbell lying external shoulder rotation": "Rotación acostado external hombro con mancuernas",
  "dumbbell lying femoral": "Femoral acostado con mancuernas",
  "dumbbell lying hammer press": "Press acostado hammer con mancuernas",
  "dumbbell lying on floor rear delt raise": "Elevación acostado floor deltoides posterior con mancuernas",
  "dumbbell lying one arm deltoid rear": "Deltoides posterior acostado a un brazo con mancuernas",
  "dumbbell lying one arm press": "Press acostado un brazo con mancuernas",
  "dumbbell lying one arm press v. 2": "Press acostado un brazo v. 2 con mancuernas",
  "dumbbell lying one arm pronated triceps extension": "Extensión de tríceps acostado un brazo pronated con mancuernas",
  "dumbbell lying one arm rear lateral raise": "Elevación acostado un brazo rear lateral con mancuernas",
  "dumbbell lying one arm supinated triceps extension": "Extensión de tríceps acostado un brazo supinated con mancuernas",
  "dumbbell lying one-arm rear lateral raise": "elevación lateral posterior tumbado con mancuerna",
  "dumbbell lying pronation": "Pronación acostada con mancuernas",
  "dumbbell lying pronation on floor": "Pronación acostada en el suelo con mancuernas",
  "dumbbell lying pullover on exercise ball": "Pullover acostado en balón suizo con mancuernas",
  "dumbbell lying rear delt row": "Remo acostado deltoides posterior con mancuernas",
  "dumbbell lying rear lateral raise": "Elevación acostado rear lateral con mancuernas",
  "dumbbell lying single extension": "Extensión acostado una con mancuernas",
  "dumbbell lying supination": "Supinación acostada con mancuernas",
  "dumbbell lying supination on floor": "Supinación acostada en el suelo con mancuernas",
  "dumbbell lying supine biceps curl": "Curl de bíceps acostado boca arriba con mancuernas",
  "dumbbell lying supine curl": "Curl acostado boca arriba con mancuernas",
  "dumbbell lying triceps extension": "Extensión de tríceps acostado con mancuernas",
  "dumbbell lying wide curl": "Curl acostado amplio con mancuernas",
  "dumbbell neutral grip bench press": "Press de banca agarre neutro grip con mancuernas",
  "dumbbell one arm bench fly": "Apertura un brazo bench con mancuernas",
  "dumbbell one arm bent-over row": "Remo inclinado un brazo con mancuernas",
  "dumbbell one arm chest fly on exercise ball": "Apertura de pecho un brazo exercise ball con mancuernas",
  "dumbbell one arm concentration curl (on stability ball)": "Curl un brazo concentration con mancuernas (Stability ball)",
  "dumbbell one arm decline chest press": "Press un brazo declinado pecho con mancuernas",
  "dumbbell one arm fly on exercise ball": "Apertura un brazo exercise ball con mancuernas",
  "dumbbell one arm french press on exercise ball": "Press un brazo french exercise ball con mancuernas",
  "dumbbell one arm hammer preacher curl": "Curl un brazo hammer preacher con mancuernas",
  "dumbbell one arm hammer press on exercise ball": "Press un brazo hammer exercise ball con mancuernas",
  "dumbbell one arm incline chest press": "Press un brazo inclinado pecho con mancuernas",
  "dumbbell one arm kickback": "Patada un brazo con mancuernas",
  "dumbbell one arm lateral raise": "Elevación un brazo lateral con mancuernas",
  "dumbbell one arm lateral raise with support": "Elevación un brazo lateral support con mancuernas",
  "dumbbell one arm press on exercise ball": "Press un brazo exercise ball con mancuernas",
  "dumbbell one arm prone curl": "Curl un brazo boca abajo con mancuernas",
  "dumbbell one arm prone hammer curl": "Curl un brazo boca abajo hammer con mancuernas",
  "dumbbell one arm pullover on exercise ball": "Pullover a un brazo en balón suizo con mancuernas",
  "dumbbell one arm reverse fly (with support)": "Apertura un brazo invertido con mancuernas (Support)",
  "dumbbell one arm reverse grip press": "Press un brazo agarre inverso con mancuernas",
  "dumbbell one arm reverse preacher curl": "Curl un brazo invertido preacher con mancuernas",
  "dumbbell one arm reverse spider curl": "Curl un brazo invertido spider con mancuernas",
  "dumbbell one arm reverse wrist curl": "Curl de muñeca invertido a un brazo con mancuernas",
  "dumbbell one arm seated bicep curl on exercise ball": "Curl un brazo sentado bicep exercise ball con mancuernas",
  "dumbbell one arm seated hammer curl": "Curl un brazo sentado hammer con mancuernas",
  "dumbbell one arm seated neutral wrist curl": "Curl de muñeca un brazo sentado agarre neutro con mancuernas",
  "dumbbell one arm shoulder press": "Press de hombros un brazo con mancuernas",
  "dumbbell one arm shoulder press v. 2": "Press de hombros un brazo v. 2 con mancuernas",
  "dumbbell one arm snatch": "Arranque un brazo con mancuernas",
  "dumbbell one arm standing curl": "Curl un brazo de pie con mancuernas",
  "dumbbell one arm standing hammer curl": "Curl un brazo de pie hammer con mancuernas",
  "dumbbell one arm triceps extension (on bench)": "Extensión de tríceps un brazo con mancuernas (Bench)",
  "dumbbell one arm upright row": "Remo un brazo upright con mancuernas",
  "dumbbell one arm wrist curl": "Curl de muñeca un brazo con mancuernas",
  "dumbbell one arm zottman preacher curl": "Curl un brazo zottman preacher con mancuernas",
  "dumbbell one leg fly on exercise ball": "Apertura una pierna exercise ball con mancuernas",
  "dumbbell one-arm shoulder press": "press de hombro unilateral con mancuerna",
  "dumbbell one-arm triceps extension": "extensión de tríceps unilateral con mancuerna",
  "dumbbell one-arm upright row": "remo vertical unilateral con mancuerna",
  "dumbbell over bench neutral wrist curl": "Curl de muñeca over bench agarre neutro con mancuernas",
  "dumbbell over bench one arm neutral wrist curl": "Curl de muñeca over bench un brazo agarre neutro con mancuernas",
  "dumbbell over bench one arm reverse wrist curl": "Curl de muñeca over bench un brazo invertido con mancuernas",
  "dumbbell over bench one arm wrist curl": "Curl de muñeca over bench un brazo con mancuernas",
  "dumbbell over bench revers wrist curl": "Curl de muñeca over bench revers con mancuernas",
  "dumbbell over bench wrist curl": "Curl de muñeca over bench con mancuernas",
  "dumbbell palm rotational bent over row": "Remo inclinado palm rotational con mancuernas",
  "dumbbell palms in incline bench press": "Press de banca palms inclinado con mancuernas",
  "dumbbell peacher hammer curl": "Curl peacher hammer con mancuernas",
  "dumbbell plyo squat": "Sentadilla explosiva con mancuernas",
  "dumbbell preacher curl": "Curl preacher con mancuernas",
  "dumbbell preacher curl over exercise ball": "Curl preacher over exercise ball con mancuernas",
  "dumbbell press on exercise ball": "Press exercise ball con mancuernas",
  "dumbbell pronate-grip triceps extension": "Extensión de tríceps pronate-grip con mancuernas",
  "dumbbell prone incline curl": "Curl boca abajo inclinado con mancuernas",
  "dumbbell prone incline hammer curl": "Curl boca abajo inclinado hammer con mancuernas",
  "dumbbell pullover": "Pullover con mancuernas",
  "dumbbell pullover hip extension on exercise ball": "Extensión de cadera pullover exercise ball con mancuernas",
  "dumbbell pullover on exercise ball": "Pullover en balón suizo con mancuernas",
  "dumbbell push press": "Press empuje con mancuernas",
  "dumbbell raise": "Elevación con mancuernas",
  "dumbbell rear delt raise": "Elevación deltoides posterior con mancuernas",
  "dumbbell rear delt row_shoulder": "Remo de deltoides posterior con mancuernas",
  "dumbbell rear fly": "Apertura rear con mancuernas",
  "dumbbell rear lateral raise": "Elevación rear lateral con mancuernas",
  "dumbbell rear lateral raise (support head)": "Elevación rear lateral con mancuernas (Support head)",
  "dumbbell rear lunge": "Zancada rear con mancuernas",
  "dumbbell revers grip biceps curl": "Curl de bíceps revers grip con mancuernas",
  "dumbbell reverse bench press": "Press de banca invertido con mancuernas",
  "dumbbell reverse fly": "Apertura posterior con mancuernas",
  "dumbbell reverse grip incline bench one arm row": "Remo agarre inverso inclinado bench un brazo con mancuernas",
  "dumbbell reverse grip incline bench two arm row": "Remo agarre inverso inclinado bench dos brazo con mancuernas",
  "dumbbell reverse grip row (female)": "Remo agarre inverso con mancuernas",
  "dumbbell reverse preacher curl": "Curl invertido preacher con mancuernas",
  "dumbbell reverse spider curl": "Curl invertido spider con mancuernas",
  "dumbbell reverse wrist curl": "Curl de muñeca invertido con mancuernas",
  "dumbbell romanian deadlift": "Peso muerto romanian con mancuernas",
  "dumbbell rotation reverse fly": "Rotación invertido apertura con mancuernas",
  "dumbbell scaption": "elevación frontal con mancuerna",
  "dumbbell scott press": "Press scott con mancuernas",
  "dumbbell seated alternate front raise": "Elevación sentado alterno frontal con mancuernas",
  "dumbbell seated alternate hammer curl on exercise ball": "Curl sentado alterno hammer exercise ball con mancuernas",
  "dumbbell seated alternate press": "Press sentado alterno con mancuernas",
  "dumbbell seated alternate shoulder": "Hombros alternos sentado con mancuernas",
  "dumbbell seated bench extension": "Extensión sentado bench con mancuernas",
  "dumbbell seated bent arm lateral raise": "Elevación sentado flexionado brazo lateral con mancuernas",
  "dumbbell seated bent over alternate kickback": "Patada sentado flexionado over alterno con mancuernas",
  "dumbbell seated bent over triceps extension": "Extensión de tríceps sentado flexionado over con mancuernas",
  "dumbbell seated bicep curl": "Curl sentado bicep con mancuernas",
  "dumbbell seated biceps curl (on stability ball)": "Curl de bíceps sentado con mancuernas (Stability ball)",
  "dumbbell seated biceps curl to shoulder press": "Press de hombros sentado bíceps curl con mancuernas",
  "dumbbell seated box jump": "salto al cajón con mancuerna",
  "dumbbell seated calf raise": "Elevación de pantorrillas sentado con mancuernas",
  "dumbbell seated curl": "Curl sentado con mancuernas",
  "dumbbell seated front raise": "Elevación sentado frontal con mancuernas",
  "dumbbell seated hammer curl": "Curl sentado hammer con mancuernas",
  "dumbbell seated inner biceps curl": "Curl de bíceps sentado inner con mancuernas",
  "dumbbell seated kickback": "Patada sentado con mancuernas",
  "dumbbell seated lateral raise": "Elevación sentado lateral con mancuernas",
  "dumbbell seated lateral raise v. 2": "Elevación sentado lateral v. 2 con mancuernas",
  "dumbbell seated neutral wrist curl": "Curl de muñeca sentado agarre neutro con mancuernas",
  "dumbbell seated one arm bicep curl on exercise ball with leg raised": "Curl sentado un brazo bicep exercise ball pierna raised con mancuernas",
  "dumbbell seated one arm kickback": "Patada sentado un brazo con mancuernas",
  "dumbbell seated one arm rotate": "Rotación sentada a un brazo con mancuernas",
  "dumbbell seated one leg calf raise": "Elevación de pantorrillas sentado una pierna con mancuernas",
  "dumbbell seated one leg calf raise - hammer grip": "Elevación de pantorrillas sentado una pierna - hammer grip con mancuernas",
  "dumbbell seated one leg calf raise - palm up": "Elevación de pantorrillas sentado una pierna - palm up con mancuernas",
  "dumbbell seated one-leg calf raise": "elevación de gemelos a una pierna sentado",
  "dumbbell seated palms up wrist curl": "Curl de muñeca sentado palms up con mancuernas",
  "dumbbell seated preacher curl": "Curl sentado preacher con mancuernas",
  "dumbbell seated revers grip concentration curl": "Curl sentado revers grip concentration con mancuernas",
  "dumbbell seated reverse grip one arm overhead tricep extension": "Extensión de tríceps sentado agarre inverso un brazo sobre la cabeza con mancuernas",
  "dumbbell seated shoulder press": "Press de hombros sentado con mancuernas",
  "dumbbell seated shoulder press (parallel grip)": "Press de hombros sentado con mancuernas (Parallel grip)",
  "dumbbell seated triceps extension": "Extensión de tríceps sentado con mancuernas",
  "dumbbell shoulder press": "press de hombro con mancuerna",
  "dumbbell shrug": "Encogimiento de hombros con mancuernas",
  "dumbbell side bend": "Flexión lateral con mancuernas",
  "dumbbell side lying one hand raise": "Elevación lateral acostado one hand con mancuernas",
  "dumbbell side plank with rear fly": "Plancha lateral con apertura posterior",
  "dumbbell single arm overhead carry": "Cargada sobre la cabeza a un brazo con mancuernas",
  "dumbbell single leg calf raise": "Elevación de pantorrillas una pierna con mancuernas",
  "dumbbell single leg deadlift": "Peso muerto una pierna con mancuernas",
  "dumbbell single leg deadlift with stepbox support": "Peso muerto una pierna stepbox support con mancuernas",
  "dumbbell single leg split squat": "Sentadilla una pierna búlgara con mancuernas",
  "dumbbell single leg squat": "Sentadilla una pierna con mancuernas",
  "dumbbell squat": "Sentadilla con mancuernas",
  "dumbbell squat to a bench": "sentadilla con mancuerna al banco",
  "dumbbell standing alternate hammer curl and press": "Press de pie alterno hammer curl con mancuernas",
  "dumbbell standing alternate overhead press": "Press de pie alterno sobre la cabeza con mancuernas",
  "dumbbell standing alternate raise": "Elevación de pie alterno con mancuernas",
  "dumbbell standing alternating tricep kickback": "Patada de pie alterno tríceps con mancuernas",
  "dumbbell standing around world": "Círculo de pie con mancuernas",
  "dumbbell standing bent over one arm triceps extension": "Extensión de tríceps de pie flexionado over un brazo con mancuernas",
  "dumbbell standing bent over two arm triceps extension": "Extensión de tríceps de pie flexionado over dos brazo con mancuernas",
  "dumbbell standing biceps curl": "Curl de bíceps de pie con mancuernas",
  "dumbbell standing calf raise": "Elevación de pantorrillas de pie con mancuernas",
  "dumbbell standing concentration curl": "Curl de pie concentration con mancuernas",
  "dumbbell standing front raise above head": "Elevación de pie frontal above head con mancuernas",
  "dumbbell standing inner biceps curl v. 2": "Curl de bíceps de pie inner v. 2 con mancuernas",
  "dumbbell standing kickback": "Patada de pie con mancuernas",
  "dumbbell standing one arm concentration curl": "Curl de pie un brazo concentration con mancuernas",
  "dumbbell standing one arm curl (over incline bench)": "Curl de pie un brazo con mancuernas (Over inclinado bench)",
  "dumbbell standing one arm curl over incline bench": "Curl de pie un brazo over inclinado bench con mancuernas",
  "dumbbell standing one arm extension": "Extensión de pie un brazo con mancuernas",
  "dumbbell standing one arm palm in press": "Press de pie un brazo palm con mancuernas",
  "dumbbell standing one arm reverse curl": "Curl de pie un brazo invertido con mancuernas",
  "dumbbell standing overhead press": "Press de pie sobre la cabeza con mancuernas",
  "dumbbell standing palms in press": "Press de pie palms con mancuernas",
  "dumbbell standing preacher curl": "Curl de pie preacher con mancuernas",
  "dumbbell standing reverse curl": "Curl de pie invertido con mancuernas",
  "dumbbell standing triceps extension": "Extensión de tríceps de pie con mancuernas",
  "dumbbell standing zottman preacher curl": "Curl de pie zottman preacher con mancuernas",
  "dumbbell step up single leg balance with bicep curl": "Curl step up una pierna balance bicep con mancuernas",
  "dumbbell step ups": "subidas al banco con mancuerna",
  "dumbbell step-up": "Subida a cajón con mancuernas",
  "dumbbell step-up lunge": "Subida a cajón zancada con mancuernas",
  "dumbbell step-up split squat": "Subida a cajón búlgara sentadilla con mancuernas",
  "dumbbell stiff leg deadlift": "Peso muerto stiff pierna con mancuernas",
  "dumbbell straight arm pullover": "Pullover con brazos rectos con mancuernas",
  "dumbbell straight leg deadlift": "Peso muerto piernas rectas con mancuernas",
  "dumbbell sumo pull through": "Jalón sumo through con mancuernas",
  "dumbbell supported squat": "Sentadilla supported con mancuernas",
  "dumbbell tate press": "Press tate con mancuernas",
  "dumbbell tricep extension -pronated grip": "extensión de tríceps con mancuerna",
  "dumbbell tricep kickback with stork stance": "Patada tríceps stork stance con mancuernas",
  "dumbbell twisting bench press": "Press de banca con giro con mancuernas",
  "dumbbell upright row": "Remo upright con mancuernas",
  "dumbbell upright row (back pov)": "Remo upright con mancuernas (Espalda pov)",
  "dumbbell upright shoulder external rotation": "Rotación upright hombro external con mancuernas",
  "dumbbell w-press": "Press en W con mancuernas",
  "dumbbell waiter biceps curl": "Curl de bíceps waiter con mancuernas",
  "dumbbell zottman curl": "Curl zottman con mancuernas",
  "dumbbell zottman preacher curl": "Curl zottman preacher con mancuernas",
  "dumbbells seated triceps extension": "Extensión de tríceps sentado con mancuernas",
  "dynamic back stretch": "estiramiento dinámico de espalda",
  "dynamic chest stretch": "estiramiento dinámico de pecho",
  "dynamic chest stretch (male)": "Estiramiento de pecho dynamic (Hombre)",
  "elbow circles": "círculos de codo",
  "elbow dips": "Fondos elbow",
  "elbow lift - reverse push-up": "Flexión elbow lift - invertido",
  "elbow to knee": "codo a rodilla",
  "elbow-to-knee": "Codo a rodilla",
  "elbows back": "codos hacia atrás",
  "elevated back lunge": "zancada trasera elevada",
  "elevated cable rows": "remo en polea elevado",
  "elevator": "Elevador",
  "elliptical trainer": "elíptica",
  "exercise ball alternating arm ups": "Elevaciones alternas de brazos con balón suizo",
  "exercise ball back extension with arms extended": "Extensión de espalda brazos extended con balón suizo",
  "exercise ball back extension with hands behind head": "Extensión de espalda hands por detrás head con balón suizo",
  "exercise ball back extension with knees off ground": "Extensión de espalda knees off ground con balón suizo",
  "exercise ball back extension with rotation": "Extensión de espalda rotación con balón suizo",
  "exercise ball crunch": "crunch con pelota",
  "exercise ball dip": "Fondo con balón suizo",
  "exercise ball hip flexor stretch": "Estiramiento cadera flexor con balón suizo",
  "exercise ball hug": "Abrazo con balón suizo",
  "exercise ball lat stretch": "Estiramiento dorsal con balón suizo",
  "exercise ball lower back stretch (pyramid)": "Estiramiento de espalda inferior con balón suizo (Pyramid)",
  "exercise ball lying side lat stretch": "Estiramiento acostado lateral dorsal con balón suizo",
  "exercise ball on the wall calf raise": "Elevación de pantorrillas wall con balón suizo",
  "exercise ball on the wall calf raise (tennis ball between ankles)": "Elevación de pantorrillas wall con balón suizo (Tennis ball ankles)",
  "exercise ball on the wall calf raise (tennis ball between knees)": "Elevación de pantorrillas wall con balón suizo (Tennis ball knees)",
  "exercise ball one leg prone lower body rotation": "Rotación una pierna boca abajo inferior body con balón suizo",
  "exercise ball one legged diagonal kick hamstring curl": "Curl de isquiotibiales one legged diagonal kick con balón suizo",
  "exercise ball pike push up": "Empuje pike up con balón suizo",
  "exercise ball prone leg raise": "Elevación de piernas boca abajo con balón suizo",
  "exercise ball pull-in": "encogimiento con pelota",
  "exercise ball seated hamstring stretch": "Estiramiento de isquiotibiales sentado con balón suizo",
  "exercise ball seated triceps stretch": "Estiramiento de tríceps sentado con balón suizo",
  "exercise ball supine triceps extension": "Extensión de tríceps boca arriba con balón suizo",
  "extended range one-arm kettlebell floor press": "press suelo kettlebell unilateral amplio",
  "external rotation": "rotación externa",
  "external rotation with band": "rotación externa con banda",
  "external rotation with cable": "rotación externa con cable",
  "ez bar french press on exercise ball": "Press ez bar french exercise ball",
  "ez bar lying bent arms pullover": "Pullover con brazos flexionados con barra EZ",
  "ez bar lying close grip triceps extension behind head": "Extensión de tríceps ez bar acostado agarre cerrado por detrás head",
  "ez bar reverse grip bent over row": "Remo inclinado ez bar agarre inverso",
  "ez bar seated close grip concentration curl": "Curl ez bar sentado agarre cerrado concentration",
  "ez bar standing french press": "Press ez bar de pie french",
  "ez barbell anti gravity press": "Press anti gravity con barra EZ",
  "ez barbell close grip preacher curl": "Curl agarre cerrado preacher con barra EZ",
  "ez barbell close-grip curl": "Curl agarre cerrado con barra EZ",
  "ez barbell curl": "Curl con barra EZ",
  "ez barbell decline close grip face press": "Press declinado agarre cerrado face con barra EZ",
  "ez barbell decline triceps extension": "Extensión de tríceps declinado con barra EZ",
  "ez barbell incline triceps extension": "Extensión de tríceps inclinado con barra EZ",
  "ez barbell jm bench press": "Press de banca jm con barra EZ",
  "ez barbell reverse grip curl": "Curl agarre inverso con barra EZ",
  "ez barbell reverse grip preacher curl": "Curl agarre inverso preacher con barra EZ",
  "ez barbell seated curls": "Curls sentados con barra EZ",
  "ez barbell seated triceps extension": "Extensión de tríceps sentado con barra EZ",
  "ez barbell spider curl": "Curl spider con barra EZ",
  "ez-bar biceps curl (with arm blaster)": "Curl de bíceps con barra EZ (Brazo blaster)",
  "ez-bar close-grip bench press": "Press de banca agarre cerrado con barra EZ",
  "ez-bar curl": "curl con barra EZ",
  "ez-bar skullcrusher": "rompecráneos con barra EZ",
  "ez-barbell standing wide grip biceps curl": "Curl de bíceps ez-barbell de pie agarre amplio",
  "face pull": "jalón cara",
  "farmer's walk": "caminata del granjero",
  "farmers walk": "Caminata del granjero",
  "fast skipping": "cuerda rápida",
  "finger curls": "Curl de dedos",
  "flag": "Bandera humana",
  "flat bench cable flyes": "apertura cable banco plano",
  "flat bench leg pull-in": "encogimiento piernas banco plano",
  "flat bench lying leg raise": "elevación piernas banco plano",
  "flexion leg sit up (bent knee)": "Abdominal con pierna flexionada",
  "flexion leg sit up (straight arm)": "Abdominal con brazos rectos",
  "flexor incline dumbbell curls": "curl inclinado mancuernas",
  "floor fly (with barbell)": "Apertura en el suelo (con barra)",
  "floor glute-ham raise": "elevación glúteo ham suelo",
  "floor press": "press suelo",
  "floor press with chains": "press suelo con cadenas",
  "flutter kicks": "Patadas alternas",
  "foot-smr": "SMR pie",
  "forward drag with press": "arrastre frontal con press",
  "forward jump": "Salto hacia adelante",
  "forward lunge (male)": "Zancada forward (Hombre)",
  "frankenstein squat": "Sentadilla frankenstein",
  "freehand jump squat": "sentadilla salto libre",
  "frog crunch": "Crunch frog",
  "frog hops": "saltos rana",
  "frog planche": "Plancha de rana",
  "frog sit-ups": "abdominales rana",
  "front barbell squat": "sentadilla frontal barra",
  "front barbell squat to a bench": "sentadilla frontal barra a banco",
  "front box jump": "salto frontal al cajón",
  "front cable raise": "elevación frontal cable",
  "front cone hops (or hurdle hops)": "saltos cono frontal",
  "front dumbbell raise": "elevación frontal mancuerna",
  "front incline dumbbell raise": "elevación frontal inclinada mancuerna",
  "front leg raises": "elevaciones de pierna frontal",
  "front lever": "Palanca frontal",
  "front lever reps": "Repeticiones de palanca frontal",
  "front plank with twist": "Plancha frontal con giro",
  "front plate raise": "elevación frontal placa",
  "front raise and pullover": "elevación frontal y jalón",
  "front squat (clean grip)": "sentadilla frontal agarre limpio",
  "front squats with two kettlebells": "sentadilla frontal con dos kettlebells",
  "front two-dumbbell raise": "elevación frontal dos mancuernas",
  "full maltese": "Maltés completo",
  "full planche": "Plancha completa",
  "full planche push-up": "Flexión completa planche",
  "full range-of-motion lat pulldown": "jalón dorsal rango completo",
  "gironda sternum chin": "Dominada Gironda al esternón",
  "gironda sternum chins": "dominadas gironda esternón",
  "glute bridge march": "Puente de glúteos march",
  "glute bridge two legs on bench (male)": "Puente de glúteos dos piernas bench (Hombre)",
  "glute ham raise": "elevación glúteo ham",
  "glute kickback": "patada de glúteo",
  "glute-ham raise": "Elevación glute-ham",
  "goblet squat": "sentadilla copa",
  "good morning": "buenos días",
  "good morning off pins": "buenos días sin soporte",
  "gorilla chin": "Dominada de gorila",
  "gorilla chin/crunch": "chin gorila",
  "groin and back stretch": "estiramiento ingle y espalda",
  "groin crunch": "Crunch groin",
  "groiners": "desplantes de cangrejo",
  "hack calf raise": "Elevación de pantorrillas hack",
  "hack one leg calf raise": "Elevación de pantorrillas hack una pierna",
  "hack squat": "sentadilla hack",
  "half knee bends (male)": "Semiflexiones de rodillas",
  "half sit-up (male)": "Abdominal half (Hombre)",
  "hammer curls": "curl martillo",
  "hammer grip incline db bench press": "press inclinado agarre martillo",
  "hamstring stretch": "Estiramiento de isquiotibiales",
  "hamstring-smr": "masaje isquiotibial",
  "hands bike": "Bicicleta de manos",
  "hands clasped circular toe touch (male)": "Toque de puntas hands clasped circular (Hombre)",
  "hands reversed clasped circular toe touch (male)": "Toque de puntas hands reversed clasped circular (Hombre)",
  "handstand": "Parada de manos",
  "handstand push-up": "Flexión de pino",
  "handstand push-ups": "flexiones en pino",
  "hang clean": "clean colgado",
  "hang clean - below the knees": "clean colgado bajo rodillas",
  "hang snatch": "snatch colgado",
  "hang snatch - below knees": "snatch colgado bajo rodillas",
  "hanging bar good morning": "buenos días barra",
  "hanging leg hip raise": "Elevación de cadera colgado pierna",
  "hanging leg raise": "Elevación de piernas colgado",
  "hanging oblique knee raise": "Elevación de rodillas colgado oblicuos",
  "hanging pike": "Pike colgado",
  "hanging straight leg hip raise": "Elevación de cadera colgado piernas rectas",
  "hanging straight leg raise": "Elevación de piernas colgado recto",
  "hanging straight twisting leg hip raise": "Elevación de cadera colgado recto con giro pierna",
  "heaving snatch balance": "balance de arranque",
  "heavy bag thrust": "empuje con saco pesado",
  "high cable curls": "curl en polea alta",
  "high knee against wall": "Rodillas altas contra la pared",
  "hip circles (prone)": "círculos de cadera prono",
  "hip extension with bands": "extensión de cadera con bandas",
  "hip flexion with band": "flexión de cadera con banda",
  "hip lift with band": "elevación de cadera con banda",
  "hip raise (bent knee)": "Elevación de cadera (Rodilla flexionada)",
  "hug a ball": "abrazo de pelota",
  "hug keens to chest": "Abrazo de rodillas al pecho",
  "hug knees to chest": "rodillas al pecho",
  "hurdle hops": "saltos de valla",
  "hyght dumbbell fly": "Apertura hyght dumbbell",
  "hyperextension": "Hiperextensión",
  "hyperextension (on bench)": "Hiperextensión",
  "hyperextensions (back extensions)": "hiperextensiones",
  "hyperextensions with no hyperextension bench": "hiperextensiones sin banco",
  "iliotibial tract-smr": "masaje del tracto iliotibial",
  "impossible dips": "Fondos impossible",
  "inchworm": "Oruga",
  "inchworm v. 2": "Oruga v. 2",
  "incline barbell triceps extension": "extensión de tríceps con barra inclinado",
  "incline bench pull": "remo en banco inclinado",
  "incline cable chest press": "press de pecho en polea inclinado",
  "incline cable flye": "apertura en polea inclinado",
  "incline close-grip push-up": "Flexión inclinado agarre cerrado",
  "incline dumbbell bench with palms facing in": "press con mancuernas inclinado palmas adentro",
  "incline dumbbell curl": "curl inclinado con mancuerna",
  "incline dumbbell flyes": "apertura inclinado con mancuerna",
  "incline dumbbell flyes - with a twist": "apertura inclinado con mancuerna y giro",
  "incline dumbbell press": "press inclinado con mancuerna",
  "incline hammer curls": "curl martillo inclinado con mancuerna",
  "incline inner biceps curl": "curl interno de bíceps inclinado",
  "incline leg hip raise (leg straight)": "Elevación de cadera inclinado pierna (Pierna recto)",
  "incline push up depth jump": "Empuje inclinado up depth jump",
  "incline push-up": "Flexión inclinada",
  "incline push-up (on box)": "Flexión inclinada",
  "incline push-up close-grip": "flexión inclinada agarre estrecho",
  "incline push-up depth jump": "flexión inclinada salto profundo",
  "incline push-up medium": "flexión inclinada intermedia",
  "incline push-up reverse grip": "flexión inclinada agarre inverso",
  "incline push-up wide": "flexión inclinada agarre amplio",
  "incline reverse grip push-up": "Flexión inclinada agarre inverso",
  "incline scapula push up": "Empuje inclinado scapula up",
  "incline twisting sit-up": "Abdominal inclinado con giro",
  "intermediate groin stretch": "estiramiento intermedio de ingle",
  "intermediate hip flexor and quad stretch": "Estiramiento intermediate cadera flexor quad",
  "internal rotation with band": "rotación interna con banda",
  "inverse leg curl (bench support)": "Curl de piernas inverse (Bench support)",
  "inverse leg curl (on pull-up cable machine)": "Curl de piernas inverse (Dominada cable machine)",
  "inverted row": "Remo invertido",
  "inverted row bent knees": "Remo inverted flexionado knees",
  "inverted row on bench": "Remo inverted bench",
  "inverted row v. 2": "Remo inverted v. 2",
  "inverted row with straps": "Remo inverted straps",
  "iron cross": "cruz de hierro",
  "iron cross stretch": "Estiramiento iron cross",
  "iron crosses (stretch)": "estiramiento cruz de hierro",
  "isometric chest squeeze": "Contracción isométrica de pecho",
  "isometric chest squeezes": "compresiones isométricas de pecho",
  "isometric neck exercise - front and back": "ejercicio isométrico de cuello frontal y posterior",
  "isometric neck exercise - sides": "ejercicio isométrico de cuello lateral",
  "isometric wipers": "Limpiaparabrisas isométricos",
  "it band and glute stretch": "estiramiento de banda IT y glúteos",
  "jack burpee": "Burpee saltando",
  "jack jump (male)": "Salto de tijera",
  "jackknife sit-up": "Navaja abdominal",
  "janda sit-up": "Abdominal janda",
  "jefferson squats": "sentadilla Jefferson",
  "jerk balance": "equilibrio de jerk",
  "jerk dip squat": "sentadilla dip‑jerk",
  "jm press": "press JM",
  "jogging, treadmill": "trote en cinta",
  "jump rope": "Salto de cuerda",
  "jump squat": "Sentadilla jump",
  "jump squat v. 2": "Sentadilla jump v. 2",
  "keg load": "carga de barril",
  "kettlebell advanced windmill": "Molino avanzado con kettlebell",
  "kettlebell alternating hang clean": "Cargada alterno hang con kettlebell",
  "kettlebell alternating press": "Press alterno con kettlebell",
  "kettlebell alternating press on floor": "Press alterno floor con kettlebell",
  "kettlebell alternating renegade row": "Remo alterno renegade con kettlebell",
  "kettlebell alternating row": "Remo alterno con kettlebell",
  "kettlebell arnold press": "Press arnold con kettlebell",
  "kettlebell bent press": "Press flexionado con kettlebell",
  "kettlebell bottoms up clean from the hang position": "Cargada bottoms up hang position con kettlebell",
  "kettlebell dead clean": "clean muerto con pesa rusa",
  "kettlebell double alternating hang clean": "Cargada doble alterno hang con kettlebell",
  "kettlebell double jerk": "Jerk doble con kettlebell",
  "kettlebell double push press": "Press doble empuje con kettlebell",
  "kettlebell double snatch": "Arranque doble con kettlebell",
  "kettlebell double windmill": "Molino doble con kettlebell",
  "kettlebell extended range one arm press on floor": "Press extended range un brazo floor con kettlebell",
  "kettlebell figure 8": "Figura de 8 con kettlebell",
  "kettlebell front squat": "Sentadilla frontal con kettlebell",
  "kettlebell goblet squat": "Sentadilla goblet con kettlebell",
  "kettlebell hang clean": "Cargada hang con kettlebell",
  "kettlebell lunge pass through": "Zancada pass through con kettlebell",
  "kettlebell one arm clean and jerk": "Cargada un brazo jerk con kettlebell",
  "kettlebell one arm floor press": "Press un brazo floor con kettlebell",
  "kettlebell one arm jerk": "Jerkeo a un brazo con kettlebell",
  "kettlebell one arm military press to the side": "Press un brazo military lateral con kettlebell",
  "kettlebell one arm push press": "Press un brazo empuje con kettlebell",
  "kettlebell one arm row": "Remo un brazo con kettlebell",
  "kettlebell one arm snatch": "Arranque un brazo con kettlebell",
  "kettlebell one-legged deadlift": "peso muerto unilateral con pesa rusa",
  "kettlebell pass between the legs": "pase entre piernas con pesa rusa",
  "kettlebell pirate ships": "piratas con pesa rusa",
  "kettlebell pirate supper legs": "Kettlebell pirata de piernas",
  "kettlebell pistol squat": "Sentadilla pistol con kettlebell",
  "kettlebell plyo push-up": "Flexión explosiva con kettlebell",
  "kettlebell seated press": "Press sentado con kettlebell",
  "kettlebell seated two arm military press": "Press sentado dos brazo military con kettlebell",
  "kettlebell seesaw press": "Press seesaw con kettlebell",
  "kettlebell sumo high pull": "Jalón sumo alta con kettlebell",
  "kettlebell swing": "Balanceo de kettlebell",
  "kettlebell thruster": "Thruster con kettlebell",
  "kettlebell turkish get up (squat style)": "Levantamiento turco con kettlebell (estilo sentadilla)",
  "kettlebell turkish get-up (lunge style)": "levantamiento turco zancada",
  "kettlebell turkish get-up (squat style)": "levantamiento turco sentadilla",
  "kettlebell two arm clean": "Cargada dos brazo con kettlebell",
  "kettlebell two arm military press": "Press dos brazo military con kettlebell",
  "kettlebell two arm row": "Remo dos brazo con kettlebell",
  "kettlebell windmill": "Molino con kettlebell",
  "kick out sit": "Abdominal con patada",
  "kipping muscle up": "Muscle up con impulso",
  "knee across the body": "rodilla cruzada al cuerpo",
  "knee circles": "círculos de rodilla",
  "knee touch crunch": "Crunch knee touch",
  "knee tuck jump": "salto con rodilla al pecho",
  "knee/hip raise on parallel bars": "elevación rodilla/cadera en paralelas",
  "kneeling arm drill": "ejercicio de brazos en rodillas",
  "kneeling cable crunch with alternating oblique twists": "crunch en polea con giros oblicuos",
  "kneeling cable triceps extension": "extensión de tríceps en polea en rodillas",
  "kneeling forearm stretch": "estiramiento de antebrazo en rodillas",
  "kneeling high pulley row": "remo alto en polea en rodillas",
  "kneeling hip flexor": "flexor de cadera en rodillas",
  "kneeling jump squat": "Sentadilla de rodillas jump",
  "kneeling lat stretch": "Estiramiento de rodillas dorsal",
  "kneeling plank tap shoulder (male)": "Plancha de rodillas tap hombro (Hombre)",
  "kneeling push-up (male)": "Flexión de rodillas (Hombre)",
  "kneeling single-arm high pulley row": "remo alto unilateral en polea en rodillas",
  "kneeling squat": "sentadilla en rodillas",
  "korean dips": "Fondos korean",
  "l-pull-up": "Dominada en L",
  "l-sit on floor": "Sostén en L en el suelo",
  "landmine 180": "Landmine 180",
  "landmine 180's": "180 barra tierra",
  "landmine lateral raise": "Elevación landmine lateral",
  "landmine linear jammer": "Jammer lineal barra tierra",
  "lateral bound": "Salto lateral",
  "lateral box jump": "Salto lateral caja",
  "lateral cone hops": "Saltos laterales conos",
  "lateral raise - with bands": "Elevación lateral bandas",
  "latissimus dorsi-smr": "SMR dorsal",
  "lean planche": "Planche inclinado",
  "left hook. boxing": "Gancho izquierdo (boxeo)",
  "leg extensions": "Extensiones de pierna",
  "leg lift": "Elevación de pierna",
  "leg press": "Press de pierna",
  "leg pull in flat bench": "Jalón pierna flat bench",
  "leg pull-in": "Jalón de pierna",
  "leg up hamstring stretch": "Estiramiento de isquiotibiales pierna up",
  "leg-over floor press": "Press pierna suelo",
  "leg-up hamstring stretch": "Isquiotibiales pierna arriba",
  "lever alternate leg press": "Prensa de piernas alterno con palanca",
  "lever alternating narrow grip seated row": "Remo sentado agarre estrecho alterno con palanca",
  "lever assisted chin-up": "Dominada supina asistida con palanca",
  "lever back extension": "Extensión de espalda con palanca",
  "lever bent over row": "Remo inclinado con palanca",
  "lever bent-over row with v-bar": "Remo inclinado v-bar con palanca",
  "lever bicep curl": "Curl bicep con palanca",
  "lever calf press": "Press pantorrilla con palanca",
  "lever chest press": "Press pecho con palanca",
  "lever deadlift": "Peso muerto con palanca",
  "lever decline chest press": "Press declinado pecho con palanca",
  "lever donkey calf raise": "Elevación de pantorrillas donkey con palanca",
  "lever front pulldown": "Jalón frontal con palanca",
  "lever gripless shrug": "Encogimiento sin agarre con palanca",
  "lever gripless shrug v. 2": "Encogimiento sin agarre v. 2 con palanca",
  "lever gripper hands": "Gripper de manos con palanca",
  "lever hammer grip preacher curl": "Curl hammer grip preacher con palanca",
  "lever high row": "Remo alta con palanca",
  "lever hip extension v. 2": "Extensión de cadera v. 2 con palanca",
  "lever horizontal one leg press": "Prensa de piernas horizontal one con palanca",
  "lever incline chest press": "Press inclinado pecho con palanca",
  "lever incline chest press v. 2": "Press de pecho inclinado en palanca",
  "lever kneeling leg curl": "Curl de piernas de rodillas con palanca",
  "lever kneeling twist": "Giro de rodillas con palanca",
  "lever lateral raise": "Elevación lateral con palanca",
  "lever leg extension": "Extensión de piernas con palanca",
  "lever lying leg curl": "Curl de piernas acostado con palanca",
  "lever lying two-one leg curl": "Curl de piernas acostado two-one con palanca",
  "lever military press": "Press military con palanca",
  "lever narrow grip seated row": "Remo sentado agarre estrecho con palanca",
  "lever one arm bent over row": "Remo inclinado un brazo con palanca",
  "lever one arm lateral high row": "Remo un brazo lateral alta con palanca",
  "lever one arm lateral wide pulldown": "Jalón un brazo lateral amplio con palanca",
  "lever one arm shoulder press": "Press de hombros un brazo con palanca",
  "lever overhand triceps dip": "Fondo de tríceps agarre prono con palanca",
  "lever preacher curl": "Curl preacher con palanca",
  "lever preacher curl v. 2": "Curl preacher v. 2 con palanca",
  "lever pullover": "Pullover con palanca",
  "lever reverse grip lateral pulldown": "Jalón agarre inverso lateral con palanca",
  "lever reverse grip preacher curl": "Curl agarre inverso preacher con palanca",
  "lever reverse grip vertical row": "Remo agarre inverso vertical con palanca",
  "lever reverse hyperextension": "Hiperextensión inversa con palanca",
  "lever reverse t-bar row": "Remo invertido en T con palanca",
  "lever rotary calf": "Pantorrilla rotatoria con palanca",
  "lever seated calf press": "Press sentado pantorrilla con palanca",
  "lever seated calf raise": "Elevación de pantorrillas sentado con palanca",
  "lever seated crunch": "Crunch sentado con palanca",
  "lever seated crunch (chest pad)": "Crunch sentado con palanca (Pecho pad)",
  "lever seated crunch v. 2": "Crunch sentado v. 2 con palanca",
  "lever seated dip": "Fondo sentado con palanca",
  "lever seated fly": "Apertura sentado con palanca",
  "lever seated good morning": "Buenos días sentado con palanca",
  "lever seated hip abduction": "Abducción de cadera sentado con palanca",
  "lever seated hip adduction": "Adducción de cadera sentado con palanca",
  "lever seated leg curl": "Curl de piernas sentado con palanca",
  "lever seated leg raise crunch": "Elevación de piernas sentado crunch con palanca",
  "lever seated reverse fly": "Apertura sentado invertido con palanca",
  "lever seated reverse fly (parallel grip)": "Apertura sentado invertido con palanca (Parallel grip)",
  "lever seated row": "Remo sentado con palanca",
  "lever seated squat calf raise on leg press machine": "Elevación de pantorrillas sentado sentadilla pierna press machine con palanca",
  "lever shoulder press": "Press de hombros con palanca",
  "lever shoulder press v. 2": "Press de hombros v. 2 con palanca",
  "lever shoulder press v. 3": "Press de hombros v. 3 con palanca",
  "lever shrug": "Encogimiento con palanca",
  "lever standing calf raise": "Elevación de pantorrillas de pie con palanca",
  "lever standing chest press": "Press de pie pecho con palanca",
  "lever t bar row": "Remo t bar con palanca",
  "lever t-bar reverse grip row": "Remo en T agarre inverso con palanca",
  "lever triceps extension": "Extensión de tríceps con palanca",
  "lever unilateral row": "Remo unilateral con palanca",
  "leverage chest press": "Press pecho palanca",
  "leverage deadlift": "Peso muerto palanca",
  "leverage decline chest press": "Press pecho declinado palanca",
  "leverage high row": "Remo alto palanca",
  "leverage incline chest press": "Press pecho inclinado palanca",
  "leverage iso row": "Remo iso palanca",
  "leverage shoulder press": "Press hombro palanca",
  "leverage shrug": "encogimiento con palanca",
  "linear 3-part start technique": "técnica de inicio lineal 3 partes",
  "linear acceleration wall drill": "aceleración lineal contra pared",
  "linear depth jump": "salto de profundidad lineal",
  "log lift": "levantamiento de tronco",
  "london bridge": "Puente london",
  "london bridges": "puentes de Londres",
  "looking at ceiling": "mirar al techo",
  "low cable crossover": "cruce bajo con cable",
  "low cable triceps extension": "extensión de tríceps bajo",
  "low glute bridge on floor": "Puente de glúteos en el suelo",
  "low pulley row to neck": "remo bajo al cuello",
  "lower back curl": "Curl inferior espalda",
  "lower back-smr": "liberación miofascial lumbar",
  "lunge pass through": "zancada paso",
  "lunge sprint": "zancada sprint",
  "lunge with jump": "Zancada jump",
  "lunge with twist": "Zancada giro",
  "lying (side) quads stretch": "Estiramiento de cuádriceps acostado (Lateral)",
  "lying bent leg groin": "apertura de ingle tumbado",
  "lying cable curl": "curl con cable tumbado",
  "lying cambered barbell row": "remo con barra curvada tumbado",
  "lying close-grip bar curl on high pulley": "curl agarre estrecho tumbado en polea alta",
  "lying close-grip barbell triceps extension behind the head": "extensión de tríceps agarre estrecho tumbado detrás cabeza",
  "lying close-grip barbell triceps press to chin": "press de tríceps agarre estrecho tumbado al mentón",
  "lying crossover": "cruce tumbado",
  "lying dumbbell tricep extension": "extensión tríceps mancuerna tumbado",
  "lying elbow to knee": "Codo a rodilla acostado",
  "lying face down plate neck resistance": "resistencia cuello con placa prono",
  "lying face up plate neck resistance": "resistencia cuello con placa supino",
  "lying glute": "glúteos tumbado",
  "lying hamstring": "isquiotibiales tumbado",
  "lying high bench barbell curl": "curl barra banco alto tumbado",
  "lying leg curls": "curl piernas tumbado",
  "lying leg raise flat bench": "Elevación de piernas acostado flat bench",
  "lying leg-hip raise": "Elevación acostado leg-hip",
  "lying machine squat": "sentadilla máquina tumbado",
  "lying one-arm lateral raise": "elevación lateral unilateral tumbado",
  "lying prone quadriceps": "cuádriceps prono",
  "lying rear delt raise": "elevación posterior tumbado",
  "lying supine dumbbell curl": "curl mancuerna supino",
  "lying t-bar row": "remo barra T tumbado",
  "lying triceps press": "press tríceps tumbado",
  "machine bench press": "press banca máquina",
  "machine bicep curl": "curl bíceps máquina",
  "machine inner chest press": "Press inner pecho con máquina",
  "machine preacher curls": "curl predicador máquina",
  "machine shoulder (military) press": "press militar máquina",
  "machine triceps extension": "extensión tríceps máquina",
  "march sit (wall)": "Marcha sentado (pared)",
  "medicine ball catch and overhead throw": "Lanzamiento sobre la cabeza con balón medicinal",
  "medicine ball chest pass": "Pase de pecho con balón medicinal",
  "medicine ball chest push from 3 point stance": "Empuje pecho 3 point stance con balón medicinal",
  "medicine ball chest push multiple response": "Empuje pecho multiple response con balón medicinal",
  "medicine ball chest push single response": "Empuje pecho una response con balón medicinal",
  "medicine ball chest push with run release": "Empuje pecho run release con balón medicinal",
  "medicine ball close grip push up": "Empuje agarre cerrado up con balón medicinal",
  "medicine ball full twist": "giro completo con balón medicinal",
  "medicine ball overhead slam": "Golpe sobre la cabeza con balón medicinal",
  "medicine ball scoop throw": "lanzamiento scoop con balón medicinal",
  "medicine ball supine chest throw": "Lanzamiento de pecho boca arriba con balón medicinal",
  "middle back shrug": "encogimiento espalda media",
  "middle back stretch": "estiramiento espalda media",
  "mixed grip chin": "dominada agarre mixto",
  "mixed grip chin-up": "Dominada supina agarre mixto",
  "modified hindu push-up (male)": "Flexión modificado hindu (Hombre)",
  "modified push up to lower arms": "Empuje modificado up inferior brazos",
  "monster walk": "Caminata del monstruo",
  "mountain climber": "Escalador",
  "mountain climbers": "escaladores",
  "moving claw series": "serie garra móvil",
  "muscle snatch": "arrancada muscular",
  "muscle up": "Muscle up",
  "muscle-up (on vertical bar)": "Muscle-up",
  "narrow push-up on exercise ball": "Flexión narrow exercise ball",
  "narrow stance hack squats": "hack squat postura estrecha",
  "narrow stance leg press": "prensa piernas postura estrecha",
  "narrow stance squats": "sentadillas postura estrecha",
  "natural glute ham raise": "elevación glúteo‑ham natural",
  "neck press": "press cervical",
  "neck side stretch": "Estiramiento cuello lateral",
  "neck-smr": "SMR cuello",
  "negative crunch": "Crunch negative",
  "oblique crunch v. 2": "Crunch oblicuos v. 2",
  "oblique crunches": "crunch oblicuo",
  "oblique crunches - on the floor": "crunch oblicuo suelo",
  "oblique crunches floor": "Crunches oblicuos floor",
  "olympic barbell hammer curl": "Curl olympic barbell hammer",
  "olympic barbell triceps extension": "Extensión de tríceps olympic barbell",
  "olympic squat": "sentadilla olímpica",
  "on your side quad stretch": "estiramiento de cuádriceps lateral",
  "on-your-back quad stretch": "estiramiento de cuádriceps tumbado",
  "one arm against wall": "Un brazo contra la pared",
  "one arm chin-up": "Dominada supina a un brazo",
  "one arm dip": "Fondo un brazo",
  "one arm dumbbell bench press": "press de banca con mancuerna a una mano",
  "one arm dumbbell preacher curl": "curl predicador con mancuerna a una mano",
  "one arm floor press": "press de suelo a una mano",
  "one arm lat pulldown": "jalón al pecho a una mano",
  "one arm pronated dumbbell triceps extension": "extensión de tríceps con mancuerna pronada a una mano",
  "one arm slam (with medicine ball)": "Golpe a un brazo (con balón medicinal)",
  "one arm supinated dumbbell triceps extension": "extensión de tríceps con mancuerna supinada a una mano",
  "one arm towel row": "Remo un brazo towel",
  "one half locust": "media langosta",
  "one handed hang": "colgado con una mano",
  "one knee to chest": "rodilla al pecho",
  "one leg barbell squat": "sentadilla con barra a una pierna",
  "one leg donkey calf raise": "Elevación de pantorrillas una pierna donkey",
  "one leg floor calf raise": "Elevación de pantorrillas una pierna floor",
  "one leg squat": "Sentadilla una pierna",
  "one-arm dumbbell row": "remo unilateral con mancuerna",
  "one-arm flat bench dumbbell flye": "apertura unilateral con mancuerna en banco plano",
  "one-arm high-pulley cable side bends": "flexión lateral con polea alta",
  "one-arm incline lateral raise": "elevación lateral inclinada",
  "one-arm kettlebell clean": "arrancada con kettlebell",
  "one-arm kettlebell clean and jerk": "arrancada y envión con kettlebell",
  "one-arm kettlebell floor press": "press de kettlebell en suelo",
  "one-arm kettlebell jerk": "envión con kettlebell",
  "one-arm kettlebell military press to the side": "press militar lateral con kettlebell",
  "one-arm kettlebell para press": "press con kettlebell",
  "one-arm kettlebell push press": "push press con kettlebell",
  "one-arm kettlebell row": "remo con kettlebell",
  "one-arm kettlebell snatch": "arrancada con kettlebell",
  "one-arm kettlebell split jerk": "envión dividido con kettlebell",
  "one-arm kettlebell split snatch": "arrancada dividida con kettlebell",
  "one-arm kettlebell swings": "balanceo con kettlebell",
  "one-arm long bar row": "remo con barra larga",
  "one-arm medicine ball slam": "slam con balón medicinal",
  "one-arm open palm kettlebell clean": "clean con kettlebell a una mano palma abierta",
  "one-arm overhead kettlebell squats": "sentadilla con kettlebell overhead a una mano",
  "one-arm side deadlift": "peso muerto lateral a una mano",
  "one-arm side laterals": "elevación lateral a una mano",
  "one-legged cable kickback": "patada de cable a una pierna",
  "open palm kettlebell clean": "clean con kettlebell palma abierta",
  "otis up": "Abdominal Otis",
  "otis-up": "levantamiento otis",
  "outside leg kick push-up": "Flexión outside pierna kick",
  "overhead cable curl": "curl de cable overhead",
  "overhead lat": "jalón alto",
  "overhead slam": "slam por encima",
  "overhead squat": "sentadilla por encima",
  "overhead stretch": "estiramiento por encima",
  "overhead triceps": "extensión de tríceps por encima",
  "overhead triceps stretch": "Estiramiento de tríceps sobre la cabeza",
  "pallof press": "press Pallof",
  "pallof press with rotation": "press Pallof con rotación",
  "palms-down dumbbell wrist curl over a bench": "curl muñeca mancuerna palmas abajo sobre banco",
  "palms-down wrist curl over a bench": "curl muñeca palmas abajo sobre banco",
  "palms-up barbell wrist curl over a bench": "curl muñeca barra palmas arriba sobre banco",
  "palms-up dumbbell wrist curl over a bench": "curl muñeca mancuerna palmas arriba sobre banco",
  "parallel bar dip": "fondos en paralelas",
  "pelvic tilt": "Inclinación pélvica",
  "pelvic tilt into bridge": "Puente pelvic tilt",
  "peroneals stretch": "Estiramiento peroneals",
  "peroneals-smr": "SMR peroneos",
  "physioball hip bridge": "puente cadera con pelota",
  "pike-to-cobra push-up": "Flexión pike-to-cobra",
  "pin presses": "press con pin",
  "piriformis-smr": "SMR piriforme",
  "plank": "plancha",
  "plate pinch": "pinza de placa",
  "plate twist": "giro con placa",
  "platform hamstring slides": "deslizamientos de isquiotibiales",
  "plie dumbbell squat": "sentadilla plie con mancuernas",
  "plyo kettlebell pushups": "flexiones pliométricas con kettlebell",
  "plyo push up": "Empuje explosiva up",
  "plyo push-up": "flexión pliométrica",
  "posterior step to overhead reach": "Paso posterior con alcance sobre la cabeza",
  "posterior tibialis stretch": "Estiramiento de tibial posterior",
  "potty squat": "Sentadilla potty",
  "potty squat with support": "Sentadilla potty support",
  "power clean": "Cargada power",
  "power clean from blocks": "clean de potencia desde bloques",
  "power jerk": "jerk de potencia",
  "power partials": "parciales de potencia",
  "power point plank": "Plancha power point",
  "power snatch": "snatch de potencia",
  "power snatch from blocks": "snatch de potencia desde bloques",
  "power stairs": "escalera de potencia",
  "preacher curl": "curl predicador",
  "preacher hammer dumbbell curl": "curl martillo predicador con mancuerna",
  "press sit-up": "press abdominal",
  "prisoner half sit-up (male)": "Abdominal prisoner half (Hombre)",
  "prone manual hamstring": "curl manual de isquiotibiales",
  "prone twist on stability ball": "Giro boca abajo stability ball",
  "prowler sprint": "sprint con trineo",
  "pull through": "tirón con polea",
  "pull up (neutral grip)": "Jalón up (Agarre neutro grip)",
  "pull-in (on stability ball)": "Jalón (Stability ball)",
  "pull-up": "Dominada",
  "pullups": "dominadas",
  "push and pull bodyweight": "Jalón empuje bodyweight",
  "push press": "press con impulso",
  "push press - behind the neck": "press con impulso detrás del cuello",
  "push to run": "Empuje run",
  "push up on bosu ball": "Empuje up bosu ball",
  "push up to side plank": "flexión a plancha lateral",
  "push-up": "Flexión",
  "push-up (bosu ball)": "Flexión",
  "push-up (on stability ball)": "Flexión",
  "push-up (wall)": "Flexión",
  "push-up (wall) v. 2": "Flexión v. 2 (Wall)",
  "push-up close-grip off dumbbell": "Flexión agarre cerrado off dumbbell",
  "push-up inside leg kick": "Flexión inside pierna kick",
  "push-up medicine ball": "Flexión medicine ball",
  "push-up on lower arms": "Flexión inferior brazos",
  "push-up plus": "Flexión plus",
  "push-up to side plank": "Flexión lateral plancha",
  "push-up wide": "flexión ancha",
  "push-ups - close triceps position": "flexiones estrechas",
  "push-ups with feet elevated": "flexiones con pies elevados",
  "push-ups with feet on an exercise ball": "flexiones con pies en pelota",
  "pushups": "flexiones",
  "pushups (close and wide hand positions)": "flexiones manos juntas y anchas",
  "pyramid": "pirámide",
  "quad stretch": "estiramiento cuádriceps",
  "quadriceps-smr": "SMR cuádriceps",
  "quads": "Cuádriceps",
  "quarter sit-up": "Abdominal quarter",
  "quick feet v. 2": "Pies rápidos v. 2",
  "quick leap": "salto rápido",
  "rack delivery": "carga del rack",
  "rack pull with bands": "tirón de rack con bandas",
  "rack pulls": "tirones de rack",
  "raise single arm push-up": "Flexión elevación una brazo",
  "rear decline bridge": "Puente rear declinado",
  "rear deltoid stretch": "Estiramiento de deltoides rear",
  "rear leg raises": "elevaciones de pierna posterior",
  "rear pull-up": "Dominada rear",
  "reclining big toe pose with rope": "Postura reclinada del dedo gordo con soga",
  "recumbent bike": "bicicleta reclinada",
  "resistance band hip thrusts on knees (female)": "Empuje de cadera de rodillas con banda",
  "resistance band leg extension": "Extensión de piernas de resistencia band",
  "resistance band seated biceps curl": "Curl de bíceps de resistencia band sentado",
  "resistance band seated chest press": "Press de resistencia band sentado pecho",
  "resistance band seated hip abduction": "Abducción de cadera de resistencia band sentado",
  "resistance band seated shoulder press": "Press de hombros de resistencia band sentado",
  "resistance band seated straight back row": "Remo de resistencia band sentado recto espalda",
  "return push from stance": "empuje de retorno",
  "reverse band bench press": "press banca con banda inversa",
  "reverse band box squat": "sentadilla caja con banda inversa",
  "reverse band deadlift": "peso muerto con banda inversa",
  "reverse band power squat": "sentadilla potencia con banda inversa",
  "reverse band sumo deadlift": "peso muerto sumo con banda inversa",
  "reverse barbell curl": "curl con barra inversa",
  "reverse barbell preacher curls": "curl predicador con barra inversa",
  "reverse cable curl": "curl en cable inverso",
  "reverse crunch": "Crunch invertido",
  "reverse dip": "Fondo invertido",
  "reverse flyes": "apertura inversa",
  "reverse flyes with external rotation": "apertura inversa con rotación externa",
  "reverse grip bent-over rows": "remo inclinado con agarre inverso",
  "reverse grip machine lat pulldown": "Jalón de dorsales agarre inverso machine",
  "reverse grip pull-up": "Dominada agarre inverso",
  "reverse grip triceps pushdown": "extensión de tríceps en polea con agarre inverso",
  "reverse hyper extension (on stability ball)": "Extensión invertido hyper (Stability ball)",
  "reverse hyper on flat bench": "Hiperextensión inversa en banco plano",
  "reverse hyperextension": "hiperextensión inversa",
  "reverse machine flyes": "apertura en máquina inversa",
  "reverse plank with leg lift": "Plancha invertido pierna lift",
  "reverse plate curls": "curl con discos inverso",
  "reverse triceps bench press": "press de tríceps en banco inverso",
  "rhomboids-smr": "SMR de romboides",
  "rickshaw carry": "carga de rickshaw",
  "rickshaw deadlift": "peso muerto tipo rickshaw",
  "ring dips": "Fondos ring",
  "rocket jump": "salto cohete",
  "rocking frog stretch": "Estiramiento rocking frog",
  "rocking standing calf raise": "elevación de gemelos con balanceo",
  "rocky pull-up pulldown": "Jalón rocky dominada",
  "rocky pull-ups/pulldowns": "dominadas/pull-downs estilo Rocky",
  "roller back stretch": "Estiramiento de espalda con rodillo",
  "roller body saw": "Sierra corporal con rodillo",
  "roller hip lat stretch": "Estiramiento cadera dorsal con rodillo",
  "roller hip stretch": "Estiramiento cadera con rodillo",
  "roller reverse crunch": "Crunch invertido con rodillo",
  "roller seated shoulder flexor depresor retractor": "Flexor depresor retractor de hombro sentado con rodillo",
  "roller seated single leg shoulder flexor depresor retractor": "Flexor depresor retractor de hombro sentado a una pierna con rodillo",
  "roller side lat stretch": "Estiramiento lateral dorsal con rodillo",
  "romanian deadlift": "peso muerto rumano",
  "romanian deadlift from deficit": "peso muerto rumano con déficit",
  "rope climb": "Escalar la soga",
  "rope crunch": "crunch con cuerda",
  "rope jumping": "salto de cuerda",
  "rope straight-arm pulldown": "jalón de cuerda con brazos rectos",
  "round the world shoulder stretch": "estiramiento circular de hombro",
  "rowing, stationary": "remo estacionario",
  "run": "Correr",
  "run (equipment)": "Carrera (equipo)",
  "runner's stretch": "estiramiento del corredor",
  "runners stretch": "Estiramiento runners",
  "running, treadmill": "correr en cinta",
  "russian twist": "Giro ruso",
  "sandbag load": "carga con saco de arena",
  "scapula dips": "Fondos scapula",
  "scapula push-up": "Flexión scapula",
  "scapular pull-up": "Dominada scapular",
  "scissor jumps (male)": "Saltos de tijera (Hombre)",
  "scissor kick": "patada de tijera",
  "scissors jump": "salto tijera",
  "seated band hamstring curl": "curl de isquiotibiales sentado con banda",
  "seated barbell military press": "press militar con barra sentado",
  "seated barbell twist": "giro con barra sentado",
  "seated bent-over one-arm dumbbell triceps extension": "extensión de tríceps con mancuerna a una mano sentado",
  "seated bent-over rear delt raise": "elevación posterior de deltoides sentado",
  "seated bent-over two-arm dumbbell triceps extension": "extensión de tríceps con mancuerna a dos manos sentado",
  "seated biceps": "curl de bíceps sentado",
  "seated cable rows": "remo con cable sentado",
  "seated cable shoulder press": "press de hombro con cable sentado",
  "seated calf raise": "elevación de gemelos sentado",
  "seated calf stretch": "estiramiento de gemelos sentado",
  "seated calf stretch (male)": "Estiramiento sentado pantorrilla (Hombre)",
  "seated close-grip concentration barbell curl": "curl concentrado de barra estrecho sentado",
  "seated dumbbell curl": "curl con mancuerna sentado",
  "seated dumbbell inner biceps curl": "curl interno de bíceps con mancuerna sentado",
  "seated dumbbell palms-down wrist curl": "curl de muñeca con mancuerna pronado sentado",
  "seated dumbbell palms-up wrist curl": "curl de muñeca con mancuerna supinado sentado",
  "seated dumbbell press": "press con mancuerna sentado",
  "seated flat bench leg pull-in": "encogimiento de piernas sentado",
  "seated floor hamstring stretch": "estiramiento de isquiotibiales sentado",
  "seated front deltoid": "elevación frontal de deltoides sentado",
  "seated glute": "glúteos sentado",
  "seated glute stretch": "Estiramiento sentado glúteo",
  "seated good mornings": "buenos días sentado",
  "seated hamstring": "isquiotibiales sentado",
  "seated hamstring and calf stretch": "estiramiento sentado isquiotibiales y pantorrilla",
  "seated head harness neck resistance": "resistencia de cuello con arnés sentado",
  "seated leg curl": "curl de pierna sentado",
  "seated leg raise": "Elevación de piernas sentado",
  "seated leg tucks": "encogimientos de piernas sentado",
  "seated lower back stretch": "Estiramiento de espalda sentado inferior",
  "seated one-arm cable pulley rows": "remo polea un brazo sentado",
  "seated one-arm dumbbell palms-down wrist curl": "curl muñeca mancuerna palma abajo sentado",
  "seated one-arm dumbbell palms-up wrist curl": "curl muñeca mancuerna palma arriba sentado",
  "seated overhead stretch": "estiramiento overhead sentado",
  "seated palm-up barbell wrist curl": "curl muñeca barra palma arriba sentado",
  "seated palms-down barbell wrist curl": "curl muñeca barra palma abajo sentado",
  "seated piriformis stretch": "Estiramiento de piriforme sentado",
  "seated side crunch (wall)": "Crunch sentado lateral (Wall)",
  "seated side lateral raise": "elevación lateral sentado",
  "seated triceps press": "press de tríceps sentado",
  "seated two-arm palms-up low-pulley wrist curl": "curl muñeca polea baja ambas manos palma arriba sentado",
  "seated wide angle pose sequence": "Secuencia de pose de ángulo amplio sentado",
  "see-saw press (alternating side press)": "press alternado",
  "self assisted inverse leg curl": "Curl de piernas self asistido inverse",
  "self assisted inverse leg curl (on floor)": "Curl de piernas self asistido inverse (Floor)",
  "semi squat jump (male)": "Sentadilla semi jump (Hombre)",
  "short stride run": "Carrera de zancada corta",
  "shotgun row": "remo shotgun",
  "shoulder circles": "círculos de hombro",
  "shoulder grip pull-up": "Dominada hombro grip",
  "shoulder press - with bands": "press de hombro con bandas",
  "shoulder raise": "elevación de hombro",
  "shoulder stretch": "estiramiento de hombro",
  "shoulder tap": "Toque de hombros",
  "shoulder tap push-up": "Flexión hombro tap",
  "side bridge": "puente lateral",
  "side bridge hip abduction": "Abducción de cadera lateral puente",
  "side bridge v. 2": "Puente lateral v. 2",
  "side hip (on parallel bars)": "Cadera lateral (barras paralelas)",
  "side hip abduction": "Abducción de cadera lateral",
  "side hop-sprint": "salto lateral sprint",
  "side jackknife": "jackknife lateral",
  "side lateral raise": "elevación lateral",
  "side laterals to front raise": "laterales a elevación frontal",
  "side leg raises": "elevaciones laterales de pierna",
  "side lying floor stretch": "Estiramiento lateral acostado floor",
  "side lying groin stretch": "estiramiento de ingle lateral",
  "side lying hip adduction (male)": "Adducción de cadera lateral acostado (Hombre)",
  "side neck stretch": "estiramiento lateral de cuello",
  "side plank hip adduction": "Adducción de cadera lateral plancha",
  "side push neck stretch": "Estiramiento de cuello lateral empuje",
  "side push-up": "Flexión lateral",
  "side standing long jump": "salto largo lateral",
  "side to side box shuffle": "shuffle lateral de caja",
  "side to side chins": "dominadas laterales",
  "side wrist pull": "tirón de muñeca lateral",
  "side wrist pull stretch": "Estiramiento lateral muñeca jalón",
  "side-lying floor stretch": "estiramiento lateral en el suelo",
  "side-to-side chin": "Dominada de lado a lado",
  "side-to-side toe touch (male)": "Toque de puntas side-to-side (Hombre)",
  "single arm push-up": "Flexión una brazo",
  "single dumbbell raise": "elevación con mancuerna",
  "single leg bridge with outstretched leg": "Puente una pierna outstretched pierna",
  "single leg butt kick": "patada de glúteo unilateral",
  "single leg calf raise (on a dumbbell)": "Elevación de pantorrillas una pierna (Dumbbell)",
  "single leg glute bridge": "puente de glúteos unilateral",
  "single leg platform slide": "Deslizamiento a una pierna en plataforma",
  "single leg push-off": "impulso unilateral",
  "single leg squat (pistol) male": "Sentadilla una pierna hombre (Pistol)",
  "single-arm cable crossover": "cruce de cable unilateral",
  "single-arm linear jammer": "empuje lineal unilateral",
  "single-arm push-up": "flexión con un brazo",
  "single-cone sprint drill": "sprint con cono",
  "single-leg high box squat": "sentadilla en caja alta unilateral",
  "single-leg hop progression": "progresión de salto unilateral",
  "single-leg lateral hop": "salto lateral unilateral",
  "single-leg leg extension": "extensión de pierna unilateral",
  "single-leg stride jump": "salto de zancada unilateral",
  "sissy squat": "Sentadilla sissy",
  "sit squats": "sentadillas en silla",
  "sit-up": "abdominal",
  "sit-up v. 2": "Abdominal",
  "sit-up with arms on chest": "Abdominal brazos pecho",
  "skater hops": "Saltos de patinador",
  "skating": "patinaje",
  "ski ergometer": "Ergómetro de esquí",
  "ski step": "Paso de esquí",
  "skin the cat": "Piel de gato",
  "sled 45 degrees one leg press": "Prensa de piernas 45 degrees one con trineo",
  "sled 45° leg press (side pov)": "Prensa de piernas 45° con trineo (Lateral pov)",
  "sled 45в° calf press": "Press 45в° pantorrilla con trineo",
  "sled 45в° leg press": "Prensa de piernas 45в° con trineo",
  "sled 45в° leg press (back pov)": "Prensa de piernas 45в° con trineo (Espalda pov)",
  "sled 45в° leg wide press": "Press 45в° pierna amplio con trineo",
  "sled calf press on leg press": "Prensa de piernas pantorrilla press con trineo",
  "sled closer hack squat": "Sentadilla closer hack con trineo",
  "sled drag - harness": "arrastre de trineo con arnés",
  "sled forward angled calf raise": "Elevación de pantorrillas forward angled con trineo",
  "sled hack squat": "Sentadilla hack con trineo",
  "sled lying calf press": "Press acostado pantorrilla con trineo",
  "sled lying squat": "Sentadilla acostado con trineo",
  "sled one leg calf press on leg press": "Prensa de piernas una pierna pantorrilla press con trineo",
  "sled overhead backward walk": "caminata atrás con trineo",
  "sled overhead triceps extension": "extensión de tríceps con trineo",
  "sled push": "empuje de trineo",
  "sled reverse flye": "fly inverso con trineo",
  "sled row": "remo con trineo",
  "sledge hammer": "Mazo",
  "sledgehammer swings": "balanceo de mazo",
  "smith back shrug": "Encogimiento de espalda en Smith",
  "smith behind neck press": "Press smith por detrás cuello",
  "smith bench press": "Press de banca smith",
  "smith bent knee good morning": "Buenos días con rodillas flexionadas en Smith",
  "smith bent over row": "Remo inclinado smith",
  "smith chair squat": "Sentadilla smith chair",
  "smith close-grip bench press": "Press de banca smith agarre cerrado",
  "smith deadlift": "Peso muerto smith",
  "smith decline bench press": "Press de banca smith declinado",
  "smith decline reverse-grip press": "Press smith declinado agarre inverso",
  "smith front squat (clean grip)": "Sentadilla smith frontal (Cargada grip)",
  "smith full squat": "Sentadilla smith completa",
  "smith hack squat": "Sentadilla smith hack",
  "smith hip raise": "Elevación de cadera smith",
  "smith incline bench press": "Press de banca smith inclinado",
  "smith incline reverse-grip press": "Press smith inclinado agarre inverso",
  "smith incline shoulder raise": "elevación de hombro inclinado en smith",
  "smith incline shoulder raises": "Elevaciones de hombros smith inclinado",
  "smith leg press": "Prensa de piernas smith",
  "smith low bar squat": "Sentadilla smith bajo bar",
  "smith machine behind the back shrug": "encogimiento de hombros detrás en smith",
  "smith machine bench press": "press de banca en smith",
  "smith machine bent over row": "remo inclinado en smith",
  "smith machine bicep curl": "Curl bicep con máquina Smith",
  "smith machine calf raise": "elevación de gemelos en máquina Smith",
  "smith machine close-grip bench press": "press de banca agarre cerrado en máquina Smith",
  "smith machine decline close grip bench press": "Press de banca declinado agarre cerrado con máquina Smith",
  "smith machine decline press": "press declinado en máquina Smith",
  "smith machine hang power clean": "clean colgado en máquina Smith",
  "smith machine hip raise": "elevación de cadera en máquina Smith",
  "smith machine incline bench press": "press de banca inclinado en máquina Smith",
  "smith machine incline tricep extension": "Extensión de tríceps inclinado con máquina Smith",
  "smith machine leg press": "prensa de piernas en máquina Smith",
  "smith machine one-arm upright row": "remo vertical unilateral en máquina Smith",
  "smith machine overhead shoulder press": "press militar en máquina Smith",
  "smith machine pistol squat": "sentadilla pistola en máquina Smith",
  "smith machine reverse calf raises": "elevación de gemelos invertida en máquina Smith",
  "smith machine reverse decline close grip bench press": "Press de banca invertido declinado agarre cerrado con máquina Smith",
  "smith machine squat": "sentadilla en máquina Smith",
  "smith machine stiff-legged deadlift": "peso muerto piernas rígidas en máquina Smith",
  "smith machine upright row": "remo vertical en máquina Smith",
  "smith narrow row": "Remo estrecho en Smith",
  "smith one arm row": "Remo smith un brazo",
  "smith one leg floor calf raise": "Elevación de pantorrillas smith una pierna floor",
  "smith rear delt row": "Remo smith deltoides posterior",
  "smith reverse calf raises": "Elevaciones de pantorrillas smith invertido",
  "smith reverse grip bent over row": "Remo inclinado smith agarre inverso",
  "smith reverse-grip press": "Press agarre inverso en Smith",
  "smith seated one leg calf raise": "Elevación de pantorrillas smith sentado una pierna",
  "smith seated shoulder press": "Press de hombros smith sentado",
  "smith seated wrist curl": "Curl de muñeca smith sentado",
  "smith shoulder press": "Press de hombros smith",
  "smith shrug": "Encogimiento de hombros en Smith",
  "smith single leg split squat": "Sentadilla smith una pierna búlgara",
  "smith single-leg split squat": "sentadilla split unilateral en máquina Smith",
  "smith sprint lunge": "Zancada smith sprint",
  "smith squat": "Sentadilla smith",
  "smith standing back wrist curl": "Curl de muñeca smith de pie espalda",
  "smith standing behind head military press": "Press smith de pie por detrás head military",
  "smith standing leg calf raise": "Elevación de pantorrillas smith de pie pierna",
  "smith standing military press": "Press smith de pie military",
  "smith sumo squat": "Sentadilla smith sumo",
  "smith toe raise": "Elevación smith toe",
  "smith upright row": "Remo smith upright",
  "smith wide grip bench press": "Press de banca smith agarre amplio",
  "smith wide grip decline bench press": "Press de banca smith agarre amplio declinado",
  "snatch": "arrancada",
  "snatch balance": "balance de arrancada",
  "snatch deadlift": "peso muerto de arrancada",
  "snatch from blocks": "arrancada con bloques",
  "snatch pull": "Arranque jalón",
  "snatch shrug": "encogimiento de hombros de arrancada",
  "speed band overhead triceps": "tríceps overhead con banda",
  "speed box squat": "sentadilla caja rápida",
  "speed squats": "sentadillas rápidas",
  "spell caster": "Lanzador de hechizos",
  "sphinx": "Esfinge",
  "spider crawl": "caminata araña",
  "spider crawl push up": "Empuje spider crawl up",
  "spider curl": "curl araña",
  "spinal stretch": "estiramiento de columna",
  "spine stretch": "Estiramiento spine",
  "spine twist": "Giro spine",
  "split clean": "clean dividido",
  "split jerk": "jerk dividido",
  "split jump": "salto dividido",
  "split snatch": "snatch dividido",
  "split squat with dumbbells": "sentadilla dividida con mancuernas",
  "split squats": "Sentadillas búlgara",
  "squat jerk": "Sentadilla jerk",
  "squat on bosu ball": "Sentadilla bosu ball",
  "squat to overhead reach": "Sentadilla sobre la cabeza reach",
  "squat to overhead reach with twist": "Sentadilla sobre la cabeza reach giro",
  "squat with bands": "sentadilla con bandas",
  "squat with chains": "sentadilla con cadenas",
  "squat with plate movers": "sentadilla con discos móviles",
  "squats - with bands": "sentadillas con bandas",
  "stability ball crunch (full range hands behind head)": "Crunch con balón suizo (Completa range hands por detrás head)",
  "stairmaster": "máquina de escaleras",
  "stalder press": "Press stalder",
  "standing alternating dumbbell press": "press alternado con mancuernas de pie",
  "standing archer": "Arquero de pie",
  "standing barbell calf raise": "elevación de gemelos con barra de pie",
  "standing barbell press behind neck": "press de barra detrás del cuello de pie",
  "standing behind neck press": "Press de pie por detrás cuello",
  "standing bent-over one-arm dumbbell triceps extension": "extensión de tríceps con mancuerna a una mano inclinado de pie",
  "standing bent-over two-arm dumbbell triceps extension": "extensión de tríceps con mancuernas inclinado de pie",
  "standing biceps cable curl": "curl de bíceps con cable de pie",
  "standing biceps stretch": "estiramiento de bíceps de pie",
  "standing bradford press": "press Bradford de pie",
  "standing cable chest press": "press de pecho con cable de pie",
  "standing cable lift": "levantamiento con cable de pie",
  "standing cable wood chop": "corte de madera con cable de pie",
  "standing calf raise (on a staircase)": "Elevación de pantorrillas de pie",
  "standing calf raises": "elevaciones de gemelos de pie",
  "standing calves": "Pantorrillas de pie",
  "standing calves calf stretch": "Estiramiento de pie pantorrillas pantorrilla",
  "standing concentration curl": "curl de concentración de pie",
  "standing dumbbell calf raise": "elevación de gemelos con mancuerna de pie",
  "standing dumbbell press": "press con mancuerna de pie",
  "standing dumbbell reverse curl": "curl invertido con mancuerna de pie",
  "standing dumbbell straight-arm front delt raise above head": "elevación frontal con mancuerna de brazo recto por encima de la cabeza de pie",
  "standing dumbbell triceps extension": "extensión de tríceps con mancuerna de pie",
  "standing dumbbell upright row": "remo vertical con mancuerna de pie",
  "standing elevated quad stretch": "estiramiento de cuádriceps elevado de pie",
  "standing front barbell raise over head": "elevación frontal con barra de pie sobre la cabeza",
  "standing gastrocnemius calf stretch": "estiramiento de gemelos de pie",
  "standing hamstring and calf stretch": "estiramiento de isquiotibiales y gemelos de pie",
  "standing hamstring and calf stretch with strap": "Estiramiento de pie isquiotibial pantorrilla strap",
  "standing hip circles": "círculos de cadera de pie",
  "standing hip flexors": "flexores de cadera de pie",
  "standing inner-biceps curl": "curl interno de bíceps de pie",
  "standing lateral stretch": "Estiramiento de pie lateral",
  "standing leg curl": "curl de pierna de pie",
  "standing long jump": "salto largo de pie",
  "standing low-pulley deltoid raise": "elevación de deltoides con polea baja de pie",
  "standing low-pulley one-arm triceps extension": "extensión de tríceps unilateral con polea baja de pie",
  "standing military press": "press militar de pie",
  "standing olympic plate hand squeeze": "apretón de disco olímpico de pie",
  "standing one-arm cable curl": "curl con cable a una mano de pie",
  "standing one-arm dumbbell curl over incline bench": "curl con mancuerna a una mano sobre banco inclinado de pie",
  "standing one-arm dumbbell triceps extension": "extensión de tríceps con mancuerna a una mano de pie",
  "standing overhead barbell triceps extension": "extensión de tríceps con barra por encima de la cabeza de pie",
  "standing palm-in one-arm dumbbell press": "press con mancuerna unilateral con palma interna de pie",
  "standing palms-in dumbbell press": "press con mancuerna con palmas internas de pie",
  "standing palms-up barbell behind the back wrist curl": "curl de muñeca con barra detrás de la espalda, palmas arriba, de pie",
  "standing pelvic tilt": "Inclinación pélvica de pie",
  "standing rope crunch": "crunch con cuerda de pie",
  "standing single leg curl": "Curl de piernas de pie una",
  "standing soleus and achilles stretch": "estiramiento de soleo y Aquiles de pie",
  "standing toe touches": "toques de pies de pie",
  "standing towel triceps extension": "extensión tríceps con toalla de pie",
  "standing two-arm overhead throw": "lanzamiento overhead con dos brazos de pie",
  "standing wheel rollerout": "Rodamiento de pie con rueda",
  "star jump": "salto estrella",
  "star jump (male)": "Salto de estrella (Hombre)",
  "stationary bike run v. 3": "Bicicleta fija carrera v. 3",
  "stationary bike walk": "Bicicleta fija caminata",
  "step mill": "escaladora",
  "step-up with knee raise": "subida con elevación de rodilla",
  "stiff leg barbell good morning": "good morning barra piernas rígidas",
  "stiff-legged barbell deadlift": "peso muerto barra piernas rígidas",
  "stiff-legged dumbbell deadlift": "peso muerto mancuerna piernas rígidas",
  "stomach vacuum": "vacío abdominal",
  "straddle maltese": "Maltesa con piernas abiertas",
  "straddle planche": "Planche con piernas abiertas",
  "straight bar bench mid rows": "remo medio barra recta banco",
  "straight leg outer hip abductor": "Abductor externo de cadera con pierna recta",
  "straight raises on incline bench": "elevaciones rectas banco inclinado",
  "straight-arm dumbbell pullover": "pullover mancuerna brazo recto",
  "straight-arm pulldown": "jalón brazo recto",
  "stride jump crossover": "salto cruzado zancada",
  "sumo deadlift": "peso muerto sumo",
  "sumo deadlift with bands": "peso muerto sumo bandas",
  "sumo deadlift with chains": "peso muerto sumo con cadenas",
  "superman": "superman",
  "superman push-up": "Flexión superman",
  "supine chest throw": "lanzamiento de pecho supino",
  "supine one-arm overhead throw": "lanzamiento unilateral supino",
  "supine two-arm overhead throw": "lanzamiento bilateral supino",
  "suspended abdominal fallout": "Abdominal suspendido con caída",
  "suspended fallout": "caída suspendida",
  "suspended push-up": "Flexión suspended",
  "suspended reverse crunch": "Crunch invertido suspendido",
  "suspended row": "Remo suspended",
  "suspended split squat": "Sentadilla suspended búlgara",
  "svend press": "press svend",
  "swimmer kicks v. 2 (male)": "Patadas de nadador v. 2 (Hombre)",
  "swing 360": "Balanceo 360",
  "t-bar row with handle": "remo en T con mango",
  "tate press": "press tate",
  "the straddle": "abertura",
  "thigh abductor": "abductor de muslo",
  "thigh adductor": "aductor de muslo",
  "three bench dip": "Fondo three bench",
  "tire flip": "Voltear llanta",
  "toe touchers": "toques de pies",
  "torso rotation": "rotación de torso",
  "trail running/walking": "correr en sendero",
  "trap bar deadlift": "Peso muerto con barra trampa",
  "tricep dumbbell kickback": "patada de tríceps con mancuerna",
  "tricep side stretch": "estiramiento lateral de tríceps",
  "triceps dip": "Fondo de tríceps",
  "triceps dip (bench leg)": "Fondo de tríceps",
  "triceps dip (between benches)": "Fondo de tríceps",
  "triceps dips floor": "Fondos tríceps floor",
  "triceps overhead extension with rope": "extensión de tríceps alta con cuerda",
  "triceps press": "Press tríceps",
  "triceps pushdown": "extensión de tríceps en polea",
  "triceps pushdown - rope attachment": "extensión de tríceps con cuerda",
  "triceps pushdown - v-bar attachment": "extensión de tríceps con barra V",
  "triceps stretch": "Estiramiento de tríceps",
  "tuck crunch": "Crunch tuck",
  "twin handle parallel grip lat pulldown": "Jalón de dorsales twin handle parallel grip",
  "twist hip lift": "Giro cadera lift",
  "twisted leg raise": "Elevación de piernas twisted",
  "twisted leg raise (female)": "Elevación de piernas twisted (Mujer)",
  "two toe touch (male)": "Toque de puntas dos (Hombre)",
  "two-arm dumbbell preacher curl": "curl predicador con mancuernas",
  "two-arm kettlebell clean": "clean con kettlebell a dos manos",
  "two-arm kettlebell jerk": "jerk con kettlebell a dos manos",
  "two-arm kettlebell military press": "press militar con kettlebell a dos manos",
  "two-arm kettlebell row": "remo con kettlebell a dos manos",
  "underhand cable pulldowns": "jalones con agarre supino",
  "upper back stretch": "Estiramiento de espalda superior",
  "upper back-leg grab": "agarre de espalda alta y pierna",
  "upright barbell row": "remo vertical con barra",
  "upright cable row": "remo vertical en polea",
  "upright row - with bands": "remo vertical con bandas",
  "upward facing dog": "Perro mirando hacia arriba",
  "upward stretch": "estiramiento vertical",
  "v-bar pulldown": "jalón barra V",
  "v-bar pullup": "dominada barra V",
  "v-sit on floor": "V-sit en el suelo",
  "vertical leg raise (on parallel bars)": "Elevación de piernas vertical (Parallel bars)",
  "vertical swing": "balance vertical",
  "walk elliptical cross trainer": "Caminar en elíptica",
  "walking high knees lunge": "Zancada walking alta knees",
  "walking lunge": "Zancada caminando",
  "walking on incline treadmill": "Caminar en cinta inclinada",
  "walking on stepmill": "Caminar en escaladora",
  "walking, treadmill": "caminata cinta",
  "weighted ball hyperextension": "hiperextensión pelota pesada",
  "weighted ball side bend": "flexión lateral pelota pesada",
  "weighted bench dip": "Fondo bench con peso",
  "weighted close grip chin-up on dip cage": "Fondo agarre cerrado chin-up cage con peso",
  "weighted cossack squats (male)": "Sentadillas cossack con peso (Hombre)",
  "weighted crunch": "Crunch con peso",
  "weighted crunches": "abdominales con peso",
  "weighted decline sit-up": "Abdominal declinado con peso",
  "weighted donkey calf raise": "Elevación de pantorrillas donkey con peso",
  "weighted drop push up": "Empuje drop up con peso",
  "weighted front plank": "Plancha frontal con peso",
  "weighted front raise": "Elevación frontal con peso",
  "weighted hanging leg-hip raise": "Elevación colgado leg-hip con peso",
  "weighted hyperextension (on stability ball)": "Hiperextensión con peso (balón suizo)",
  "weighted jump squat": "sentadilla salto con peso",
  "weighted kneeling step with swing": "Balanceo de rodillas step con peso",
  "weighted lunge with swing": "Zancada balanceo con peso",
  "weighted muscle up": "Muscle up con peso",
  "weighted muscle up (on bar)": "Muscle up con peso (barra)",
  "weighted one hand pull up": "Jalón one hand up con peso",
  "weighted overhead crunch (on stability ball)": "Crunch sobre la cabeza con peso (Stability ball)",
  "weighted pull ups": "dominadas con peso",
  "weighted pull-up": "Dominada con peso",
  "weighted round arm": "Brazo circular con peso",
  "weighted russian twist": "Giro ruso con peso",
  "weighted russian twist (legs up)": "Giro ruso con peso",
  "weighted russian twist v. 2": "Giro ruso con peso",
  "weighted seated bicep curl (on stability ball)": "Curl sentado bicep con peso (Stability ball)",
  "weighted seated twist (on stability ball)": "Giro sentado con peso (Stability ball)",
  "weighted side bend (on stability ball)": "Flexión lateral con peso (balón suizo)",
  "weighted sissy squat": "Sentadilla sissy con peso",
  "weighted sit-ups - with bands": "abdominales con peso y bandas",
  "weighted squat": "Sentadilla con peso",
  "weighted standing curl": "Curl de pie con peso",
  "weighted standing hand squeeze": "Apretón de manos de pie con peso",
  "weighted straight bar dip": "Fondo recto bar con peso",
  "weighted stretch lunge": "Estiramiento zancada con peso",
  "weighted svend press": "Press svend con peso",
  "weighted three bench dips": "Fondos three bench con peso",
  "weighted tricep dips": "Fondos tríceps con peso",
  "weighted triceps dip on high parallel bars": "Fondo de tríceps alta parallel bars con peso",
  "wheel rollerout": "Rodamiento con rueda",
  "wheel run": "Carrera con rueda",
  "wide grip pull-up": "Dominada agarre amplio",
  "wide grip rear pull-up": "Dominada agarre amplio rear",
  "wide hand push up": "Empuje amplio hand up",
  "wide stance barbell squat": "sentadilla con barra postura amplia",
  "wide stance stiff legs": "peso muerto piernas rígidas postura amplia",
  "wide-grip barbell bench press": "press banca barra agarre amplio",
  "wide-grip chest dip on high parallel bars": "Fondo de pecho agarre amplio alta parallel bars",
  "wide-grip decline barbell bench press": "press banca declinado barra agarre amplio",
  "wide-grip decline barbell pullover": "pullover barra agarre amplio declinado",
  "wide-grip lat pulldown": "jalón lat agarre amplio",
  "wide-grip pulldown behind the neck": "jalón detrás del cuello agarre amplio",
  "wide-grip rear pull-up": "dominada agarre amplio",
  "wide-grip standing barbell curl": "curl de barra de pie agarre amplio",
  "wind sprints": "Sprints de viento",
  "windmills": "molinos",
  "world greatest stretch": "Estiramiento world greatest",
  "world's greatest stretch": "estiramiento del mundo",
  "wrist circles": "Círculos de muñeca",
  "wrist roller": "rodillo de muñeca",
  "wrist rollerer": "Rodillo de muñeca",
  "wrist rotations with straight bar": "rotaciones de muñeca con barra recta",
  "yoke walk": "caminata con yugo",
  "zercher squats": "sentadillas Zercher",
  "zottman curl": "curl Zottman",
  "zottman preacher curl": "curl predicador Zottman",
}

```

### lib\nutrition.ts

```
export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
}

export const META_ADJUSTMENTS: Record<string, number> = {
  slow: 0.9, normal: 1.0, fast: 1.1,
}

const GOAL_MACROS: Record<string, { cal: number; protein: number; fat: number }> = {
  hypertrophy: { cal: 300, protein: 2.2, fat: 0.8 },
  strength: { cal: 200, protein: 2.0, fat: 0.9 },
  endurance: { cal: 100, protein: 1.8, fat: 1.0 },
  weight_loss: { cal: -400, protein: 2.4, fat: 0.7 },
}

export function calculateBMR(w: number, h: number, a: number, g: string) {
  return 10 * w + 6.25 * h - 5 * a + (g === 'male' ? 5 : -161)
}

export function calculateTDEE(w: number, h: number, a: number, g: string, act: string, meta: string) {
  return Math.round(calculateBMR(w, h, a, g) * (ACTIVITY_MULTIPLIERS[act] || 1.55) * (META_ADJUSTMENTS[meta] || 1.0))
}

export function calculateMacros(w: number, h: number, a: number, g: string, act: string, meta: string, goal: string) {
  const tdee = calculateTDEE(w, h, a, g, act, meta)
  const cfg = GOAL_MACROS[goal] || { cal: 0, protein: 2.0, fat: 0.8 }
  const calories = tdee + cfg.cal
  const protein = Math.round(w * cfg.protein)
  const fat = Math.round(w * cfg.fat)
  const carbs = Math.round((calories - (protein * 4 + fat * 9)) / 4)
  return { tdee, calories, protein, carbs, fat }
}

```

### lib\rls.sql

```
-- Protección de la base de datos: activar RLS en todas las tablas.
-- Ejecutar en Supabase Dashboard -> SQL Editor.
-- Cada usuario solo puede leer/escribir SUS propios datos (auth.uid()).

-- ============ user_profiles (la clave primaria ES el user id) ============
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own_select" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_own_insert" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_own_update" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_own_delete" ON public.user_profiles FOR DELETE USING (auth.uid() = id);

-- ============ Tablas con user_id ============
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workouts_own_select" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "workouts_own_insert" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "workouts_own_update" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "workouts_own_delete" ON public.workouts FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "meals_own_select" ON public.meals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "meals_own_insert" ON public.meals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "meals_own_update" ON public.meals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "meals_own_delete" ON public.meals FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "points_own_select" ON public.user_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "points_own_insert" ON public.user_points FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "points_own_update" ON public.user_points FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "points_own_delete" ON public.user_points FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routines_own_select" ON public.routines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "routines_own_insert" ON public.routines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "routines_own_update" ON public.routines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "routines_own_delete" ON public.routines FOR DELETE USING (auth.uid() = user_id);

-- ============ workout_sets (sin user_id: hereda del workout) ============
ALTER TABLE public.workout_sets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sets_own_select" ON public.workout_sets FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));
CREATE POLICY "sets_own_insert" ON public.workout_sets FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));
CREATE POLICY "sets_own_update" ON public.workout_sets FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));
CREATE POLICY "sets_own_delete" ON public.workout_sets FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.workouts w WHERE w.id = workout_id AND w.user_id = auth.uid()));

-- ============ routine_exercises (sin user_id: hereda de la rutina) ============
ALTER TABLE public.routine_exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routine_ex_own_select" ON public.routine_exercises FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));
CREATE POLICY "routine_ex_own_insert" ON public.routine_exercises FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));
CREATE POLICY "routine_ex_own_update" ON public.routine_exercises FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));
CREATE POLICY "routine_ex_own_delete" ON public.routine_exercises FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.routines r WHERE r.id = routine_id AND r.user_id = auth.uid()));

-- ============ exercises (catálogo público: solo lectura) ============
-- Cualquiera puede LEER, nadie puede insertar/editar/borrar con la anon key.
-- El script de importación debe usar la service_role_key (ver scripts/import_exercises.js).
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exercises_read" ON public.exercises FOR SELECT USING (true);

```

### lib\schema.sql

```
-- Tabla de usuarios (Supabase la crea automáticamente)
-- Aquí solo extendemos con datos adicionales

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Biblioteca de ejercicios predefinidos
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'chest', 'back', 'legs', 'shoulders', 'arms', 'core'
  description TEXT,
  muscle_group TEXT,
  slug TEXT UNIQUE,
  exercise_type TEXT, -- 'weight_reps', 'bodyweight_reps', 'duration', 'distance_duration', 'assisted_bodyweight'
  equipment TEXT,
  primary_muscle TEXT,
  secondary_muscles TEXT[], -- array of muscle names
  is_stretch BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Entrenamientos registrados por usuario
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Detalles de cada ejercicio en un entrenamiento
CREATE TABLE IF NOT EXISTS workout_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  weight DECIMAL(5,2),
  reps INTEGER,
  sets INTEGER,
  rest_seconds INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registro de comidas
CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snack'
  food_name TEXT NOT NULL,
  calories INTEGER,
  protein DECIMAL(5,1),
  carbs DECIMAL(5,1),
  fats DECIMAL(5,1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sistema de puntos
CREATE TABLE IF NOT EXISTS user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Log de puntos (para tracking histórico)
DROP TABLE IF EXISTS points_log;

-- Rutinas personalizadas (opcional)
CREATE TABLE IF NOT EXISTS routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routine_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  sets INTEGER,
  reps INTEGER,
  rest_seconds INTEGER,
  order_index INTEGER
);

-- Índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON workouts(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, date);

```

### lib\supabase.ts

```
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

```

### lib\translate.ts

```
import { EXERCISE_NAMES_ES } from './names_es'

const EQUIPMENT_MAP: Record<string, string> = {
  'body weight': 'peso corporal',
  dumbbell: 'mancuernas',
  cable: 'polea',
  barbell: 'barra',
  'leverage machine': 'máquina',
  band: 'banda elástica',
  'smith machine': 'máquina Smith',
  kettlebell: 'kettlebell',
  weighted: 'con peso',
  'stability ball': 'balón suizo',
  'ez barbell': 'barra EZ',
  'medicine ball': 'balón medicinal',
  rope: 'soga',
  machine: 'máquina',
  other: 'otro',
}

const MUSCLE_MAP: Record<string, string> = {
  abs: 'abdominales',
  abdominals: 'abdominales',
  'rectus abdominis': 'recto abdominal',
  obliques: 'oblicuos',
  biceps: 'bíceps',
  'biceps brachii': 'bíceps braquial',
  triceps: 'tríceps',
  'triceps brachii': 'tríceps braquial',
  shoulders: 'hombros',
  delts: 'deltoides',
  deltoids: 'deltoides',
  deltoid: 'deltoides',
  'anterior deltoid': 'deltoides anterior',
  'lateral deltoid': 'deltoides lateral',
  'medial deltoid': 'deltoides medio',
  'posterior deltoid': 'deltoides posterior',
  chest: 'pecho',
  pecs: 'pectorales',
  pectorals: 'pectorales',
  'pectoralis major': 'pectoral mayor',
  'pectoralis minor': 'pectoral menor',
  back: 'espalda',
  lats: 'dorsales',
  'latissimus dorsi': 'dorsal ancho',
  traps: 'trapecios',
  trapezius: 'trapecios',
  rhomboids: 'romboides',
  'erector spinae': 'erectores espinales',
  serratus: 'serrato',
  'lower back': 'lumbar',
  'hip flexors': 'flexores de cadera',
  forearms: 'antebrazos',
  brachialis: 'braquial',
  calves: 'pantorrillas',
  gastrocnemius: 'gastrocnemio',
  soleus: 'sóleo',
  'tibialis anterior': 'tibial anterior',
  quads: 'cuádriceps',
  quadriceps: 'cuádriceps',
  hamstrings: 'isquiotibiales',
  glutes: 'glúteos',
  gluteals: 'glúteos',
  'gluteus maximus': 'glúteo mayor',
  hips: 'caderas',
  adductors: 'aductores',
  abductors: 'abductores',
  neck: 'cuello',
  'levator scapulae': 'elevador de escápula',
  core: 'core',
  infraspinatus: 'infraespinoso',
  supraspinatus: 'supraespinoso',
  'teres major': 'redondo mayor',
  'teres minor': 'redondo menor',
  wrist: 'muñeca',
  ankle: 'tobillo',
}

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(w => (/^\d/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

export function translateName(name: string): string {
  if (!name) return name
  const es = EXERCISE_NAMES_ES[name.toLowerCase()]
  return es || titleCase(name)
}

export function translateMuscle(m: string): string {
  if (!m) return m
  const key = m.trim().toLowerCase()
  return MUSCLE_MAP[key] || MUSCLE_MAP[key.replace(/s$/, '')] || m
}

export function translateEquipment(eq: string): string {
  if (!eq) return eq
  return EQUIPMENT_MAP[eq.trim().toLowerCase()] || eq
}

```

### lib\useMuscleCounts.ts

```
'use client'

import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const MUSCLE_CATEGORIES: Record<string, string[]> = {
  pecho: ['Pecho'],
  espalda: ['Espalda'],
  piernas: ['Pierna'],
  hombros: ['Hombro'],
  brazos: ['Brazos'],
  core: ['Core'],
}

export function useMuscleCounts(userId: string) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: workouts } = await supabase
        .from('workouts')
        .select('*, workout_sets(*, exercises(*))')
        .eq('user_id', userId)
        .gte('date', sevenDaysAgo.toISOString())

      if (cancelled) return
      const result: Record<string, number> = { pecho: 0, espalda: 0, piernas: 0, hombros: 0, brazos: 0, core: 0 }
      workouts?.forEach(workout => {
        workout.workout_sets?.forEach((set: any) => {
          const category = set.exercises?.category
          if (!category) return
          Object.entries(MUSCLE_CATEGORIES).forEach(([muscle, categories]) => {
            if (categories.includes(category)) result[muscle]++
          })
        })
      })
      setCounts(result)
      setLoading(false)
    }

    fetchData()
    return () => { cancelled = true }
  }, [userId])

  return { counts, loading }
}

```

### lib\utils.ts

```
export { cn } from "cn"

```

### next.config.ts

```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

```

### next-env.d.ts

```
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### PONYTAIL_AGENTS.md

```
# Ponytail, lazy senior dev mode

You are a lazy senior developer. Lazy means efficient, not careless. The best code is the code never written.

Before writing any code, stop at the first rung that holds:

1. Does this need to be built at all? (YAGNI)
2. Does it already exist in this codebase? Reuse the helper, util, or pattern that's already here, don't re-write it.
3. Does the standard library already do this? Use it.
4. Does a native platform feature cover it? Use it.
5. Does an already-installed dependency solve it? Use it.
6. Can this be one line? Make it one line.
7. Only then: write the minimum code that works.

The ladder runs after you understand the problem, not instead of it: read the task and the code it touches, trace the real flow end to end, then climb.

Bug fix = root cause, not symptom: a report names a symptom. Grep every caller of the function you touch and fix the shared function once — one guard there is a smaller diff than one per caller, and patching only the path the ticket names leaves a sibling caller still broken.

Rules:

- No abstractions that weren't explicitly requested.
- No new dependency if it can be avoided.
- No boilerplate nobody asked for.
- Deletion over addition. Boring over clever. Fewest files possible.
- Shortest working diff wins, but only once you understand the problem. The smallest change in the wrong place isn't lazy, it's a second bug.
- Question complex requests: "Do you actually need X, or does Y cover it?"
- Pick the edge-case-correct option when two stdlib approaches are the same size, lazy means less code, not the flimsier algorithm.
- Mark intentional simplifications with a `ponytail:` comment. If the shortcut has a known ceiling (global lock, O(n²) scan, naive heuristic), the comment names the ceiling and the upgrade path.

Not lazy about: understanding the problem (read it fully and trace the real flow before picking a rung, a small diff you don't understand is just laziness dressed up as efficiency), input validation at trust boundaries, error handling that prevents data loss, security, accessibility, the calibration real hardware needs (the platform is never the spec ideal, a clock drifts, a sensor reads off), anything explicitly requested. Lazy code without its check is unfinished: non-trivial logic leaves ONE runnable check behind, the smallest thing that fails if the logic breaks (an assert-based demo/self-check or one small test file; no frameworks, no fixtures). Trivial one-liners need no test.

(Yes, this file also applies to agents working on the ponytail repo itself. Especially to them.)

```

### postcss.config.mjs

```
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```

### PROJECT_CONTEXT_animejs_resumen.md

```
## Objective
- **gym-coach (ACTIVO):** embellecer la app Next.js con shadcn/ui + anime.js, entregar diagrama de arquitectura con archify, y dejar todo publicado en GitHub para que Vercel (https://gym-coach-acme-de5d.vercel.app) despliegue automáticamente.
- **canal_youtube (COMPLETADO):** base SQLite + Excel con contenido de Factible y Mitico — entregado, cerrado.

## Important Details
- **AGENTS.md:** leer `PROJECT_CONTEXT.md` antes de tocar código (hecho); Next 16 breaking changes → leer `node_modules/next/dist/docs/`; guardar en UTF-8, NO usar PowerShell `Get-Content`/`WriteAllText` para editar.
- **OneDrive/git:** todo comando git que lee objetos falla con `fatal: mmap failed: Invalid argument` en la carpeta OneDrive del proyecto. Workaround establecido: clonar el repo en `C:\Users\samue\AppData\Local\Temp\opencode\gym-coach-clone`, copiar archivos, commit+push desde el clon (identity local en clon: `daniel carrillo <fragozodanielcarrillo@gmail.com>`, NO global).
- **archify:** renderer recibe `repo-root` vía env `ARCHIFY_REPO_ROOT` (NO CLI flag); `ARCHIFY_QUALITY_PROFILE` y `ARCHIFY_DIAGNOSTIC_FORMAT=json` también por env. `--repo-root` relativo no funcionó; el clon de temp (fuera de OneDrive, HEAD = revisión fijada `e7a48d8e6880d3a19e74fc985022283f6821c42b`) sí funciona. Importar `render-architecture.mjs` directamente ejecuta un demo y genera `web-app-rendered.html` en el cwd (lado-efecto).
- **View Transitions nativo:** Next 16 lo soporta (`viewTransition: true` en next.config), pero `react@19.2.4` instalado NO exporta `ViewTransition` (solo canary) → se usa anime.js para transiciones de página.
- **animejs@4.5.0 completo instalado:** se usan `animate`, `createTimeline`, `stagger`, `utils.round`; disponibles además SVG line-drawing, `createScope`, loops. Propiedades CSS confirmadas en uso: `opacity`, `translateY`, `translateX`, `scale`.
- **Flujo de publicación GitHub confirmado por el usuario** (vía question "Sí, haz el push (Recomendado)"): cada batch de cambios se clona a temp, se copian archivos, se hace commit (`git config user.name "daniel carrillo"; git config user.email "fragozodanielcarrillo@gmail.com"` en el clon) y `git push origin HEAD`. Tras cada push se borra el clon temp.
- **Vercel ya conectado:** repo origin `https://github.com/DaniAvocado/gym-coach.git`, deploy URL `https://gym-coach-acme-de5d.vercel.app`; despliega automáticamente tras push.
- **`.gitignore` verificado:** `.env*` (excepto `.env.local.example`), `.next/`, `.vercel` ignorados → no se suben secretos. Escaneo de staged diff por secretos: limpio (solo falsa positiva URL registry).
- **shadcn v5:** componentes importan de `@base-ui/react` y `cn` del paquete `"cn"`; variables de tema en `app/globals.css` (clase `dark` en `<html>`).
- La página auth de login/registro se veía "muy pegada con items sobrepuestos"; el usuario pidió que el bloque demo replique el estilo de animejs.com (timer, animaciones, selector CSS). Pregunta del usuario: "¿estamos usando html, css o js?" → respuesta: los tres (React/Next.js HTML + CSS Tailwind + TS/JS, anime.js como motor JS).

## Work State
### Completed
- **Diagrama archify FINALIZADO:** `finalize` pasó todas las gates (validate/deliver/check/browser-check) tras: (1) apuntar `ARCHIFY_REPO_ROOT` al clon de temp `gym-coach-clone` (evidencia verificada contra revisión `e7a48d8`), (2) reflow de geometría: `coach` → [571,300], `llm` → [892,300], `supabase` → [571,110] para arreglar `composition/label-gap` (gaps 65px → ≥103/161px). Artifact 763,700 bytes; receipts `.finalize.json`, `.finalize-summary.json`, `.browser-check.json`, `.delivery.json` en la carpeta del diagrama.
- **Publicado en GitHub (commit `463b92d`):** shadcn/ui (button, card, badge, input, label, separator) + tema oscuro + landing animada con anime.js. 12 archivos, sin secretos ni `lib/macros.ts`.
- **`npm run build` VERDE** (compile + TypeScript + 7 páginas estáticas) — OneDrive activo hidrató `lib/macros.ts`.
- **Publicado en GitHub (commit `404d66b`):** `components/page-transition.tsx` (nuevo, transición entrada por navegación vía anime.js, respeta prefers-reduced-motion, montado en layout raíz); spacings de landing ampliados (stats `gap-4/8` + `py-6`, cards `gap-6/gap-x-10` + `p-6`, margins `mt-12→14`, `mt-8→12`).
- **Publicado en GitHub (último commit, push exitoso):** `app/auth/page.tsx` reescrita con Card/CardContent shadcn (max-w 420px, `!p-8 sm:!p-10`), Badge + h1 "Gym *Coach*" + CardDescription, Input con Label (clase `!h-11`), botón gradiente, timeline de entrada anime.js (`.auth-card`, `.auth-title`, `.auth-form`) + re-animación del form en cambio de `mode`/`isSignUp` vía `formRef`; toda la lógica Supabase intacta. Build verde + smoke test `/auth` 200 con markup `auth-card` + botón OK.
- **UTILIDADES ARCHIFY DESCUBIERTAS:** renderer directo `node "C:\Users\samue\.agents\skills\archify\renderers\architecture\render-architecture.mjs" <candidate> <out> --layout-json` con env vars `ARCHIFY_REPO_ROOT`, `ARCHIFY_QUALITY_PROFILE`, `ARCHIFY_DIAGNOSTIC_FORMAT`; repo-root del CLI se pasa por env `rendererEnv()` en `archify.mjs`; clon en `AppData\Local\Temp\opencode\gym-coach-clone` (puede necesitar recrearse).
- **campo y flujo de publicación GitHub establecido y aprobado por el usuario** (vía question "Sí, haz el push (Recomendado)"): clonar a temp, copiar archivos, commit con identity `daniel carrillo <fragozodanielcarrillo@gmail.com>`, push `origin HEAD`, borrar clon. Cada batch de cambios se publica tras prueba.

### Active
- **ANIME DEMO BLOCK EN LA LANDING (pendiente de implementar):** el usuario pidió "Aplicar todo, dentro de mi página" replicando animejs.com (timer/reloj de progreso, animaciones demo, targeting por selector CSS con select de easing con Play). Se recomendó y aceptó el formato "Bloque demo en la landing". No implementado aún.
- Posiblemente también re-animar dashboard con el mismo estilo (sugerido al usuario, sin confirmación).
- **Verificar Vercel:** deploy automático de los últimos push (auth) aún sin confirmar en `https://gym-coach-acme-de5d.vercel.app`.

### Blocked
- (none)

## Next Move
1. Implementar `components/anime-demo.tsx` (bloque demo en la landing: timer de progreso con rAF + readout ms y barra, grid de dots animados por selector CSS con `animate('.demo-dot', ...)` y `stagger`, botón Play, `<select>` de easing, guard `prefers-reduced-motion`; usar solo propiedades `opacity`/`translateY`/`translateX`/`scale` confirmadas de v4).
2. Integrar el bloque en `app/page.tsx` (sección tras las cards, con clases `enter-cards`/nueva para entrada), `npm run build`, smoke test con `npm start -p 321N` comprobando 200 + markup, y publicar con el flujo de clon+commit+push (borrar clon temp tras push).
3. Confirmar el deploy en Vercel y avisar al usuario; opcional: preguntar si también quiere aplicar el mismo estilo al dashboard.
4. Responder al usuario que ya están usando html/css/js (React/Next.js + Tailwind + TypeScript; anime.js como motor JS).

## Relevant Files
- `C:\Users\samue\OneDrive - mail.uniatlantico.edu.co\Documentos\PROYECTOS\gym-coach`: raíz del proyecto (workdir de todos los comandos).
- `...\gym-coach\app\page.tsx`: landing con hero anime.js + secciones de stats/cards (editar para integrar demo block); NO citar como fuente archify.
- `...\gym-coach\components\page-transition.tsx`: transición de navegación por anime.js (ya en GitHub).
- `...\gym-coach\components\animated...` (AnimatedBackground.tsx): fondo fijo z-0, sin problemas de overlap en auth.
- `...\gym-coach\components\ui\*.tsx` + `lib\utils.ts`: componentes shadcn base-ui (Button, Card, Badge, Input, Label).
- `...\gym-coach\app\auth\page.tsx`: auth reescrita con shadcn + anime.js (ya en GitHub).
- `...\gym-coach\app\layout.tsx`: envuelve children en `<PageTransition>`.
- `...\gym-coach\.archify\architecture-gymcoach-20261004-120639\`: candidate.json + `architecture-gym-coach.html` (763 KB) + receipts finalize/deliver/browser-check.
- `C:\Users\samue\.agents\skills\archify\bin\archify.mjs`: CLI archify (finalize/validate/render); renderer en `renderers\architecture\render-architecture.mjs` (lee env `ARCHIFY_REPO_ROOT`).
- `C:\Users\samue\AppData\Local\Temp\opencode\gym-coach-clone`: clon temp global del repo (recrear para cada push, se borra tras push).

```

### README.md

```
# Gym Coach - Tu Entrenador Personal

App web de entrenamiento personal con trackers de **entrenamientos, nutrición, recuperación muscular** y un **Coach IA** basado en ciencia.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind 4 · Supabase · Vercel
**Diseño:** Glassmorphism con paleta rosa/azul/morado + fondo animado interactivo

---

## Desplegar Localmente

### Requisitos
- Node.js 20+ (recomendado 22)
- npm

### Pasos

```bash
# 1. Clonar el repo
git clone https://github.com/DaniAvocado/gym-coach.git
cd gym-coach

# 2. Instalar dependencias
npm install

# 3. Crear archivo de entorno
# Copia .env.local.example a .env.local y llena los valores (ver sección Supabase)
```

### Configurar Supabase

1. Crea un proyecto gratis en [supabase.com](https://supabase.com)
2. Ve a **SQL Editor** y ejecuta el contenido de `lib/schema.sql`
3. En **Table Editor** → tabla `exercises`, inserta los ejercicios de `lib/exercises_seed.sql`
4. Ve a **Settings → API** y copia:
   - `Project URL`
   - `anon public` key
5. Crea el archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-ANON-KEY
```

6. (Opcional) Desactiva "Confirm email" en **Authentication → Providers → Email** para que el registro sea directo

### Ejecutar

```bash
npm run dev
```

Abre **http://localhost:3000**

---

## Desplegar en Vercel

### Requisitos
- Cuenta en [vercel.com](https://vercel.com) (puedes entrar con GitHub)
- Repo subido a GitHub

### Pasos

1. **Sube el código a GitHub** (si no lo has hecho):

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/gym-coach.git
git push -u origin main
```

2. **Conecta con Vercel:**
   - Ve a [vercel.com/new](https://vercel.com/new)
   - Haz clic en **"Continue with GitHub"** e importa el repo `gym-coach`
   - Vercel detecta Next.js automáticamente

3. **Añade las variables de entorno** (Settings → Environment Variables):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://TU-PROYECTO.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu anon public key |

4. Haz clic en **"Deploy"**
5. Listo - Vercel te da una URL como `https://gym-coach.vercel.app`

### Deploys automáticos
Cada `git push` a `main` genera un nuevo deploy. No hay que hacer nada manual.

---

## Memoria para Agentes IA

Este repo incluye `PROJECT_CONTEXT.md` - la fuente de verdad del proyecto (arquitectura, fórmulas, decisiones, historial). Cualquier agente IA debe leerlo antes de trabajar. `AGENTS.md` lo instruye automáticamente.

## Changelog

Ver `CHANGELOG.md` para el historial completo de cambios.

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16, React 19, Tailwind 4 |
| Estilos | Glassmorphism, Framer Motion, Canvas animado |
| Backend | Supabase (Postgres + Auth) |
| Deploy | Vercel |
| Automatización | n8n (local) - workflows en `workflows/` |

```

### scripts\import_free_exercise_db.js

```
// One-off: backfill muscles/equipment/images from yuhonas/free-exercise-db and insert missing exercises.
// Reads SUPABASE_SERVICE_ROLE_KEY + SUPABASE URL from .env.local
const fs = require('fs')
const path = require('path')

async function main() {
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
  const getEnv = k => (env.split('\n').find(l => l.startsWith(k + '=')) || '').split('=').slice(1).join('=').trim()
  const URL = getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const KEY = getEnv('SUPABASE_SERVICE_ROLE_KEY')
  const free = JSON.parse(fs.readFileSync(process.env.TEMP + '/freedb.json', 'utf8'))

  const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/s$/, '')

  const MUSCLE_CAT = {
    quadriceps: 'Pierna', hamstrings: 'Pierna', glutes: 'Pierna', calves: 'Pierna',
    abductors: 'Pierna', adductors: 'Pierna',
    chest: 'Pecho', back: 'Espalda', lats: 'Espalda', 'middle back': 'Espalda',
    'lower back': 'Espalda', traps: 'Espalda', neck: 'Espalda',
    shoulders: 'Hombro', biceps: 'Brazos', triceps: 'Brazos', forearms: 'Brazos',
    abdominals: 'Core', obliques: 'Core',
  }
  const catOf = ex => {
    const p = ((ex.primaryMuscles && ex.primaryMuscles[0]) || '').toLowerCase()
    return MUSCLE_CAT[p] || (ex.category === 'cardio' ? 'Cardio' : 'Core')
  }

  async function api(p, opts = {}) {
    const r = await fetch(URL + p, {
      ...opts,
      headers: {
        apikey: KEY, Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json', ...(opts.headers || {}),
      },
    })
    if (!r.ok) throw new Error(p + ' -> ' + r.status + ' ' + await r.text())
    const ct = r.headers.get('content-type') || ''
    return ct.includes('json') ? r.json() : null
  }

  let existing = []
  for (let off = 0; ; off += 1000) {
    const rows = await api(`/rest/v1/exercises?select=id,name,gif_url,image_url&limit=1000&offset=${off}`)
    existing = existing.concat(rows)
    if (rows.length < 1000) break
  }
  console.log('existing:', existing.length)
  const byNorm = new Map()
  existing.forEach(e => { const k = norm(e.name); if (!byNorm.has(k)) byNorm.set(k, e) })

  const imgBase = 'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises'
  const toUpdate = []
  const toInsert = []

  for (const ex of free) {
    const match = byNorm.get(norm(ex.name))
    const img = ex.images && ex.images[0] ? `${imgBase}/${ex.images[0]}` : null
    const primary = (ex.primaryMuscles || [])[0] || null
    if (match) {
      const patch = {}
      if (ex.equipment) patch.equipment = ex.equipment
      if (primary) patch.target_muscle = primary
      if (ex.secondaryMuscles?.length) patch.secondary_muscles = ex.secondaryMuscles
      if (!match.image_url && img) patch.image_url = img
      toUpdate.push({ id: match.id, patch })
    } else {
      toInsert.push({
        name: ex.name, category: catOf(ex), description: null,
        muscle_group: primary, equipment: ex.equipment, target_muscle: primary,
        secondary_muscles: ex.secondaryMuscles || [], instructions_es: null,
        instruction_steps_es: [], gif_url: null, image_url: img,
        dataset_id: 'free-exercise-db:' + ex.id,
      })
    }
  }
  console.log('to update:', toUpdate.length, '| to insert:', toInsert.length)

  let known = 0
  for (const u of toUpdate) {
    await api(`/rest/v1/exercises?id=eq.${u.id}`, { method: 'PATCH', body: JSON.stringify(u.patch), headers: { Prefer: 'return=minimal' } })
    known++
    if (known % 100 === 0) console.log('updated', known)
  }
  console.log('updates applied:', known)

  for (let i = 0; i < toInsert.length; i += 100) {
    const batch = toInsert.slice(i, i + 100)
    await api('/rest/v1/exercises', { method: 'POST', body: JSON.stringify(batch), headers: { Prefer: 'return=minimal' } })
    console.log('inserted', i + batch.length)
  }
  console.log('DONE')
}

main().catch(e => { console.error('FAILED:', e); process.exit(1) })
```

### scripts\translate_free_db.js

```
// One-off: translate free-exercise-db names missing from names_es.ts using the Coach LLM (Groq).
// Appends the new entries to lib/names_es.ts.
const fs = require('fs')
const path = require('path')

async function main() {
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
  const getEnv = k => (env.split('\n').find(l => l.startsWith(k + '=')) || '').split('=').slice(1).join('=').trim()
  const BASE = getEnv('COACH_LLM_BASE_URL').replace(/\/$/, '')
  const KEY_E = getEnv('COACH_LLM_API_KEY')
  const MODEL = process.env.MODEL || 'openai/gpt-oss-120b'

  const namesTs = fs.readFileSync(path.join(__dirname, '..', 'lib', 'names_es.ts'), 'utf8')
  const free = JSON.parse(fs.readFileSync(process.env.TEMP + '/freedb.json', 'utf8'))

  const parseKey = l => { const m = l.match(/^\s*"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)"/); return m ? [m[1], m[2]] : null }
  const have = new Set(namesTs.split('\n').map(parseKey).filter(Boolean).map(([k]) => k))
  const todo = [...new Set(free.map(e => e.name.toLowerCase()))].filter(n => !have.has(n))
  console.log('to translate:', todo.length)

  async function translateBatch(names) {
    const r = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY_E },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 4096,
        messages: [{
          role: 'system',
          content: `Traduce al español (latino, fitness/gimnasio) los siguientes nombres de ejercicios. Responde SOLO con JSON: un objeto donde cada clave es el nombre original y el valor la traducción. NO agregues nada más. Traducciones naturales y cortas, sin paréntesis explicativos.`,
        }, { role: 'user', content: JSON.stringify(names) }],
      }),
    })
    if (!r.ok) throw new Error('LLM ' + r.status + ' ' + await r.text())
    const j = await r.json()
    return JSON.parse(j.choices[0].message.content)
  }

  const out = {}
  for (let i = 0; i < todo.length; i += 120) {
    const batch = todo.slice(i, i + 120)
    console.log('batch', i / 120 + 1, 'of', Math.ceil(todo.length / 120))
    Object.assign(out, await translateBatch(batch))
    await new Promise(r => setTimeout(r, 1000))
  }
  console.log('translated entries:', Object.keys(out).length)

  const lines = Object.entries(out).map(([k, v]) => `  "${k}": "${v}",`)
  fs.appendFileSync(path.join(__dirname, '..', 'lib', 'names_es.ts'), '\n' + lines.join('\n') + '\n')
  console.log('appended to names_es.ts')
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1) })
```

### specs\001-context-generator-fix\checklists\requirements.md

```
# Specification Quality Checklist: Memoria del proyecto sin auto-inclusión

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-11-06
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Items marked incomplete require spec updates before `/speckit.clarify` or `/speckit.plan`
- Decisión de alcance resuelta como supuesto en lugar de pregunta abierta: las siete copias
  duplicadas del archivo de memoria se descartan porque el historial ya vive en el repositorio de
  versiones y en el registro de cambios.

```

### specs\001-context-generator-fix\data-model.md

```
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

```

### specs\001-context-generator-fix\plan.md

```
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

```

### specs\001-context-generator-fix\quickstart.md

```
# Quickstart — verificación

Guía ejecutable para probar que el arreglo funciona de verdad. Cada bloque falla de forma ruidosa si
el comportamiento esperado no se cumple.

## Prerrequisitos

- Windows PowerShell 5.1 (el que hay). No se necesita `pwsh`.
- `node` en el PATH (solo para leer bytes y contar; el generador no lo usa).
- Estar en la raíz del repositorio.

## Interfaz del generador

Sin argumentos. Escribe `PROJECT_CONTEXT.md` en la raíz e imprime una línea con el recuento de
archivos. Al terminar avisa al webhook de n8n; si el webhook no responde, no falla.

```powershell
.\scripts\generate-context.ps1
```

## 1. La memoria no se incluye a sí misma

```powershell
node -e "const L=require('fs').readFileSync('PROJECT_CONTEXT.md','utf8').split(/\r?\n/);for(const h of ['## Archivos del proyecto','## Dependencias (package.json)','## Codigo fuente']){const n=L.filter(l=>l===h).length;console.log((n===1?'ok   ':'FALLA')+' '+n+' x '+h)}"
```

**Esperado**: las tres líneas con `ok` y `1 x` cada una. Antes del arreglo las tres imprimían
`8 x`, porque el archivo contenía ocho copias de sí mismo.

La comparación es por línea completa (`l===h`), no por subcadena: los documentos de `specs/` citan
estos encabezados como texto y una búsqueda por subcadena los contaría como duplicados falsos.

## 2. Dos corridas no hacen crecer el archivo

```powershell
$s1 = .\scripts\generate-context.ps1 *> $null; $a = (Get-Item PROJECT_CONTEXT.md).Length
.\scripts\generate-context.ps1 *> $null
$b = (Get-Item PROJECT_CONTEXT.md).Length
"primera: $a bytes / segunda: $b bytes / variacion: {0:N2}%" -f (($b - $a) / $a * 100)
```

**Esperado**: variación por debajo del 5 % en valor absoluto. Antes del arreglo la segunda corrida
duplicaba el tamaño (~+100 %).

## 3. Tamaño útil

```powershell
"{0:N0} KB" -f ((Get-Item PROJECT_CONTEXT.md).Length / 1KB)
```

**Esperado**: menos de 800 KB. Antes del arreglo: 2 769 KB.

## 4. Codificación correcta

```powershell
node -e "const b=require('fs').readFileSync('PROJECT_CONTEXT.md');const t=b.toString('utf8');const bom=b[0]===0xEF&&b[1]===0xBB&&b[2]===0xBF;const L=t.split(/\r?\n/);let sec='',fuera=0,dentro=0;for(const l of L){if(/^### .+\.\w+$/.test(l))sec=l;if(/[\u00c3\u00c2\u01ed\uFFFD]/.test(l)){if(/^### (\.specify|specs)[\\\/]/.test(sec))dentro++;else fuera++}}console.log((bom?'FALLA BOM':'ok sin BOM')+' | U+FFFD='+(t.split(String.fromCharCode(0xfffd)).length-1)+' | mojibake fuera de los docs del problema='+fuera+' (esperado 0) | dentro='+dentro)"
```

**Esperado**: `ok sin BOM`, `U+FFFD=0` y `mojibake fuera de los docs del problema=0`.

Las coincidencias `dentro` son legítimas: `constitution.md`, `spec.md`, `research.md` y este archivo
citan las secuencias corruptas para describir el defecto. Antes del arreglo había además decenas de
`Ã©` / `Ã³` en el volcado del código real.

## 5. El conocimiento curado sobrevive

```powershell
# El documento existe y AGENTS.md lo enlaza
Test-Path docs/anime-v4.md
Select-String -Path AGENTS.md -Pattern 'anime-v4' | ForEach-Object { $_.Line.Trim() }

# Y no quedó enterrado ni duplicado dentro de la memoria
node -e "const L=require('fs').readFileSync('PROJECT_CONTEXT.md','utf8').split(/\r?\n/);const h='## anime.js v4 \u2014 reglas que NO son negociables';console.log('secciones de anime.js v4: '+L.filter(l=>l===h).length+' (esperado 1: el volcado de docs/anime-v4.md)')"
```

**Esperado**: `True`, una línea de `AGENTS.md` con el enlace y `secciones de anime.js v4: 1`.

Esa única sección es el volcado de `docs/anime-v4.md` en el inventario de código, es decir el
conocimiento aparece una vez y en su propio archivo, no enterrado ni repetido. Las menciones al
_nombre_ del archivo son varias porque los documentos de `specs/` lo citan; eso no es duplicación de
contenido.

## 6. Ninguna dependencia, ruta ni configuración se rompió

```powershell
npx tsc --noEmit
npm run lint
```

**Esperado**: `npx tsc --noEmit` con código de salida 0 y ningún error nuevo de lint.

`npm run lint` **ya falla antes de este cambio** (64 errores previos en `app/`, `components/` y
`lib/`, todos de `no-explicit-any`, `set-state-in-effect` y `no-require-imports` en los scripts de
importación). Este cambio solo toca `scripts/generate-context.ps1`, `AGENTS.md`, `docs/anime-v4.md`,
`specs/` y el archivo generado, así que la cifra debe quedarse igual.

## 7. La aplicación sigue igual (puerta del Principio V)

```powershell
npm run build
```

**Esperado**: compilación verde: 7 páginas generadas y 5 rutas (`/`, `/_not-found`, `/api/coach`,
`/auth`, `/dashboard`). Este cambio no altera el comportamiento de la
aplicación; si el build cambia, algo se movió fuera de alcance.

## Criterio de cierre

Las siete comprobaciones en verde, en ese orden. La 6 y la 7 son obligatorias antes de publicar, por
el Principio V de la constitución.

```

### specs\001-context-generator-fix\research.md

```
# Fase 0 — Investigación

Todas las decisiones están verificadas sobre esta máquina, no inferidas.

## Contexto medido

| Hecho | Medición |
|---|---|
| Tamaño actual de `PROJECT_CONTEXT.md` | 2 835 040 bytes · 56 223 líneas |
| Copias del mismo snapshot dentro del archivo | 8 (los tres encabezados de sección aparecen 8 veces cada uno) |
| Entorno de PowerShell | `5.1.26100.9818`, edición Desktop; `pwsh` no instalado |
| `Set-Content -Encoding UTF8` en 5.1 | escribe `EF BB BF` + contenido → **UTF-8 con marca** |
| `Get-Content -Raw` en 5.1 sobre UTF-8 sin marca | decodifica como ANSI → acentos y símbolos corruptos |
| Referencias externas al script | ninguna fuera de sí mismo; no hay workflow de n8n que lo invoque |

## D1 — Excluir la salida del propio barrido

**Decisión**: añadir `PROJECT_CONTEXT` al patrón de exclusión de los **dos** `Where-Object` del
script (inventario de archivos y volcado de código fuente).

**Rationale**: la causa es directa. El script recorre `$p` recursivamente buscando `*.md` y su
propia salida es un `*.md` en `$p`. La segunda corrida embebe la primera; la tercera embebe la
segunda, que ya contenía la primera. Es crecimiento multiplicativo, no lineal. Excluir el archivo
por nombre corta el ciclo en la raíz.

**Alternativas consideradas**:
- *Mover la salida fuera del árbol recorrido*: rompe la convención del proyecto (`PROJECT_CONTEXT.md`
  en la raíz) y la instrucción de `AGENTS.md` que lo señala ahí. Descartada.
- *Detectar el archivo por igualdad de ruta absoluta en vez de por nombre*: más correcto en teoría,
  más código y más frágil si mañana se genera otra copia. El nombre es fijo y único en el repo;
  verificado que no hay otro archivo con ese nombre. Descartada por innecesaria.

## D2 — Lectura y escritura UTF-8 explícitas, sin marca

**Decisión**: reemplazar `Get-Content $_.FullName -Raw` por
`[System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)` y
`Set-Content -Encoding UTF8` por
`[System.IO.File]::WriteAllText($ruta, $texto, (New-Object System.Text.UTF8Encoding $false))`.

**Rationale**: se midió el comportamiento defectuoso. `Get-Content -Raw` en 5.1 solo detecta UTF-8
si el archivo trae marca; sin ella decodifica con la página de códigos del sistema. Por eso la
memoria actual contiene `Stack tÃ©cnico` (era `Stack técnico`) y `F` seguido del carácter de reemplazo
U+FFFD en lugar de `ó` (`Fórmulas biométricas`): es el generador leyendo UTF-8 como ANSI. Del otro lado,
`Set-Content -Encoding UTF8` **añade** marca, que viola el Principio III y además hace que la
siguiente lectura funcione por accidente. Las dos llamadas de `System.IO` fijan el comportamiento
sin depender de la versión de PowerShell.

**Alternativas consideradas**:
- *Migrar a PowerShell 7 (`pwsh`)*: no está instalado, y añadir un requisito de entorno para
  arreglar dos líneas es desproporcionado. Descartada.
- *Reescribir el generador en Node*: `node` sí está en la máquina, pero implicaría portar el script
  completo (inventario, dependencias, volcado, webhook) para corregir dos líneas. Viola el Principio
  II sin necesidad. Descartada.
- *Seguir usando `-Encoding UTF8` y limpiar la marca después*: dos pasos donde uno basta, y hay que
  recordar limpiarla en cada lectura posterior. Descartada.

## D3 — Escritura atómica

**Decisión**: escribir a `<archivo>.tmp` y luego `Move-Item -Force` sobre el destino.

**Rationale**: el caso límite de dos ejecuciones simultáneas (una manual, una desatendida) deja hoy
el archivo a medias si ambas escriben a la vez. Con temporal + movimiento en el mismo volumen, el
destino siempre contiene un archivo completo: el de una corrida o el de la otra.

**Alternativas consideradas**:
- *Bloqueo con archivo `.lock`*: resuelve la exclusión mutua, no la atomicidad, y añade limpieza de
  bloqueos huérfanos si un proceso muere. Más código para el mismo síntoma. Descartada.

## D4 — Destino del conocimiento curado

**Decisión**: mover la sección de `anime.js` v4 (hoy al final de `PROJECT_CONTEXT.md`) a
`docs/anime-v4.md`, y añadir una línea en `AGENTS.md` que lo enlace como lectura obligatoria antes
de tocar animaciones.

**Rationale**: el conocimiento curado no se deriva del código; no puede vivir en un archivo que se
regenera. `AGENTS.md` es el archivo normativo que los agentes ya leen (Principio I), así que es el
punto de enlace correcto, pero meter ~90 líneas técnicas dentro de un archivo de reglas lo vuelve
menos legible. Un documento enlazado conserva ambas propiedades: alcanzable desde las reglas y fuera
del generador.

**Alternativas consideradas**:
- *Dejarlo al final de `PROJECT_CONTEXT.md`*: es lo que hay hoy y es exactamente el problema — no se
  pierde, se duplica en cada corrida y nadie lo encuentra. Descartada.
- *Pegarlo completo dentro de `AGENTS.md`*: cumple "alcanzable" pero engorda el archivo que todo
  agente lee al arrancar, y la constitución pide que siga siendo pequeño y legible. Descartada.
- *Ponerlo en un comentario del código de las animaciones*: el conocimiento es transversal a cuatro
  componentes; repetirlo en cada uno es duplicación. Descartada.

## D5 — Preservar el disparo desatendido

**Decisión**: no cambiar la invocación. El script sigue aceptando cero argumentos, escribiendo en
`PROJECT_CONTEXT.md` y avisando por el webhook de n8n al terminar.

**Rationale**: no se encontró ningún consumidor externo que lo invoque, pero el requisito FR-009
exige que siga siendo desatendido y el Principio II prohíbe cambios no pedidos. La única adición es
la línea de salida con el recuento de archivos (FR-010), que es informativa y no rompe nada.

## D6 — Sin contratos formales

**Decisión**: no generar `contracts/`.

**Rationale**: es una herramienta de mantenimiento interna, sin consumidores externos ni esquema de
datos propio. El único "contrato" real —se invoca sin argumentos, deja un archivo y reporta una
línea— cabe en `quickstart.md` y se verifica ejecutándolo.

## D7 — Sin framework de pruebas

**Decisión**: la verificación es un guion de comprobaciones ejecutables en `quickstart.md`, no una
suite automatizada.

**Rationale**: el repositorio no tiene infraestructura de pruebas (no hay script `test` en
`package.json`, no hay runner instalado). Introducir Vitest o Pester para un script de mantenimiento
viola el Principio II. El Principio II también pide *una* comprobación ejecutable para la lógica no
trivial: las cinco comprobaciones de `quickstart.md` fallan de forma ruidosa si el arreglo se rompe.

```

### specs\001-context-generator-fix\spec.md

```
# Feature Specification: Memoria del proyecto sin auto-inclusión

**Feature Branch**: `001-context-generator-fix`

**Created**: 2026-11-06

**Status**: Draft

**Input**: User description: "Los dos, en ese orden" — primero el generador de contexto, luego la limpieza de código muerto.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - La memoria del proyecto se regenera sin crecer (Priority: P1)

Un mantenedor (persona o agente) ejecuta el generador de memoria del proyecto para refrescar el
inventario de archivos, dependencias y código fuente. Ejecuta el generador hoy, y mañana otra vez
sin haber cambiado nada. El archivo resultante pesa prácticamente lo mismo y contiene **una** copia
del proyecto, no dos.

**Why this priority**: es el defecto activo. Hoy el archivo tiene 2.7 MB y 56 223 líneas porque
contiene ocho copias de sí mismo; la siguiente ejecución lo lleva a ~5.5 MB. Un archivo que crece
así deja de ser utilizable por un agente, rompe los diffs y consume contexto sin aportar nada.

**Independent Test**: ejecutar el generador dos veces consecutivas sin tocar el repositorio y
comparar el tamaño de los dos archivos resultantes y el número de snapshots contenidos.

**Acceptance Scenarios**:

1. **Given** un repositorio sin cambios en el código, **When** se ejecuta el generador, **Then** el
   archivo de memoria contiene exactamente un inventario de archivos y un volcado de código.
2. **Given** el archivo de memoria ya generado, **When** se ejecuta el generador otra vez,
   **Then** el tamaño resultante difiere del anterior en menos del 5 %.
3. **Given** el archivo de memoria actual de 2.7 MB, **When** se ejecuta el generador una vez con
   la corrección aplicada, **Then** el archivo baja a menos de 800 KB.

---

### User Story 2 - El conocimiento curado sobrevive a la regeneración (Priority: P2)

Un mantenedor consulta el conocimiento acumulado sobre una dependencia (por ejemplo, las trampas de
migración de anime.js v4 que costaron una sesión entera descubrir). Ese conocimiento sigue
disponible después de que el generador se haya ejecutado, y no aparece duplicado ni enterrado dentro
de un volcado de código.

**Why this priority**: hoy ese conocimiento vive al final de un archivo que el generador sobrescribe
y auto-incluye. No se pierde, pero se convierte en ruido duplicado que nadie va a encontrar. Es una
pérdida silenciosa de valor, no un error visible.

**Independent Test**: regenerar la memoria desde cero y verificar que el conocimiento curado sigue
accesible desde las reglas de trabajo del proyecto, sin duplicados.

**Acceptance Scenarios**:

1. **Given** conocimiento curado agregado al proyecto, **When** se ejecuta el generador, **Then**
   ese conocimiento sigue accesible desde las reglas de trabajo.
2. **Given** el archivo de memoria regenerado, **When** se busca el conocimiento curado dentro de
   él, **Then** no aparece duplicado.

---

### User Story 3 - La memoria regenerada es legible y buscable (Priority: P3)

Un agente lee el archivo de memoria para orientarse en el repositorio. Encuentra un documento
recorrible de arriba a abajo, con acentos correctos y sin secciones repetidas.

**Why this priority**: la memoria existe para orientar a agentes; un documento con ocho repeticiones
y texto corrupto activamente engaña y encarece cada sesión.

**Independent Test**: abrir el archivo regenerado, recorrer los encabezados y verificar que no hay
títulos repetidos y que los acentos están intactos.

**Acceptance Scenarios**:

1. **Given** el archivo de memoria regenerado, **When** se listan sus encabezados de primer nivel,
   **Then** cada encabezado aparece una sola vez.
2. **Given** el archivo de memoria regenerado, **When** se buscan secuencias típicas de corrupción
   de codificación, **Then** no se encuentra ninguna.

---

### Edge Cases

- **El archivo de memoria no existe todavía**: el generador lo crea desde cero sin fallar.
- **El archivo de memoria existe con contenido previo**: el generador no debe perder contenido
  curado en silencio; o lo preserva, o se detiene de forma visible antes de sobrescribirlo.
- **Dos ejecuciones simultáneas** (una manual y otra disparada por automatización): el resultado no
  debe quedar corrupto ni a medias.
- **Archivos del proyecto cuyo nombre se parece al archivo de memoria**: deben seguir apareciendo en
  el inventario; la exclusión aplica solo al archivo de salida exacto.
- **Repositorio sin historial de versiones**: el generador no debe depender de él para funcionar.
- **Archivos con acentos en el nombre o en el contenido**: se conservan intactos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El generador MUST excluir su propio archivo de salida tanto del inventario de archivos
  como del volcado de código fuente.
- **FR-002**: Una ejecución del generador MUST producir exactamente un inventario de archivos y un
  volcado de código fuente, nunca una copia del resultado anterior.
- **FR-003**: Ejecutar el generador dos veces consecutivas sin cambios en el repositorio MUST
  producir archivos cuyo tamaño difiera en menos del 5 %.
- **FR-004**: El generador MUST preservar el contenido curado existente o MUST detenerse con un
  error visible antes de sobrescribirlo; MUST NOT descartarlo en silencio.
- **FR-005**: El archivo generado MUST ser UTF-8 válido, sin marca de orden de bytes, con acentos y
  símbolos intactos.
- **FR-006**: El generador MUST NOT incluir valores de configuración del entorno ni credenciales en
  la salida.
- **FR-007**: El conocimiento curado del proyecto MUST residir en un documento que sobreviva a la
  regeneración y MUST ser alcanzable desde las reglas de trabajo que leen los agentes.
- **FR-008**: Una sola ejecución sobre el estado actual MUST reducir el archivo de memoria por
  debajo de 800 KB.
- **FR-009**: El generador MUST seguir ejecutándose de forma desatendida, sin interacción, desde la
  automatización existente.
- **FR-010**: El generador MUST reportar en su salida que la ejecución terminó y cuántos archivos
  incluyó.

### Key Entities *(include if feature involves data)*

- **Archivo de memoria del proyecto**: documento de orientación generado. Atributos: fecha de
  generación, inventario de rutas, dependencias declaradas, volcado del código fuente. Es de solo
  lectura para agentes; su contenido no establece reglas.
- **Documento de reglas de trabajo**: conjunto pequeño y curado de reglas operativas que los agentes
  leen antes de trabajar. Es normativo.
- **Conocimiento curado**: notas técnicas acumuladas sobre dependencias y decisiones, con fecha y
  razón. No se deriva del código; no debe regenerarse.
- **Ejecución del generador**: instancia de regeneración. Atributos: instante, conjunto de archivos
  incluidos, resultado (éxito o detención).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Dos ejecuciones consecutivas producen archivos cuyo tamaño difiere en menos del 5 %.
- **SC-002**: El archivo de memoria regenerado pesa menos de 800 KB partiendo de los 2.7 MB
  actuales.
- **SC-003**: El archivo de memoria regenerado contiene exactamente un encabezado de inventario de
  archivos y un encabezado de volcado de código.
- **SC-004**: El archivo de memoria regenerado contiene cero secuencias de corrupción de
  codificación (los patrones `Ã`, `Â`, `ǭ`, o el carácter de reemplazo U+FFFD).
- **SC-005**: El conocimiento curado sobre anime.js v4 sigue accesible desde las reglas de trabajo
  después de una regeneración completa.
- **SC-006**: Un agente encuentra el conocimiento curado en su primer intento, sin tener que leer el
  volcado de código fuente.

## Assumptions

- El historial completo del proyecto ya está preservado en el repositorio de versiones y en el
  registro de cambios, por lo que las siete copias duplicadas dentro del archivo de memoria se
  pueden descartar sin pérdida de información.
- El conocimiento curado de anime.js v4 actualmente al final del archivo de memoria se puede
  rescatar antes de regenerar; existe y es legible.
- No hay consumidores programáticos del archivo de memoria más allá de agentes y lectores humanos;
  ningún proceso lo parsea por su estructura.
- La automatización que dispara el generador seguirá existiendo; el cambio no altera su disparador.
- El contenido curado que se mueva a las reglas de trabajo puede ser más extenso que las reglas
  actuales sin volverlas inmanejables.

```

### specs\001-context-generator-fix\tasks.md

```
# Tasks: Memoria del proyecto sin auto-inclusión

**Input**: Design documents from `/specs/001-context-generator-fix/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: no hay framework de pruebas en el repositorio (ver D7 en `research.md`). La verificación son
los bloques ejecutables de `quickstart.md`, asignados como tareas concretas.

**Organization**: tareas agrupadas por historia de usuario. La Fase 2 (fundacional) bloquea a las
demás: rescatar el conocimiento curado y arreglar la codificación tiene que ocurrir **antes** de
regenerar, porque regenerar sobrescribe el archivo donde ese conocimiento vive hoy.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: paralelizable (archivo distinto, sin dependencias pendientes)
- **[Story]**: historia de `spec.md` a la que pertenece la tarea
- Rutas de archivo exactas en cada tarea

## Path Conventions

Proyecto único. Rutas desde la raíz del repositorio.

---

## Phase 1: Setup

**Purpose**: fijar la línea base para poder demostrar que el defecto existe y que se corrigió.

- [X] T001 Medir el estado actual de `PROJECT_CONTEXT.md` ejecutando los bloques 1 y 3 de `specs/001-context-generator-fix/quickstart.md` y registrar la salida (`8 x` en los tres encabezados y 2 769 KB) como línea base antes de tocar `scripts/generate-context.ps1`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: lo que debe existir antes de regenerar. Sin esto, la primera corrida destruye valor.

**⚠ CRITICAL**: ninguna historia puede ejecutarse antes de completar esta fase.

- [X] T002 [P] Rescatar la sección de anime.js v4 del final de `PROJECT_CONTEXT.md` y escribirla íntegra, sin reescribirla, en `docs/anime-v4.md` (UTF-8 sin BOM, encabezado de primer nivel propio)
- [X] T003 [P] Añadir una línea en `AGENTS.md`, bajo "MEMORIA OBLIGATORIA", que enlace `docs/anime-v4.md` como lectura previa obligatoria antes de tocar animaciones
- [X] T004 Reemplazar en `scripts/generate-context.ps1` las lecturas de `package.json` (línea 26) y de cada archivo fuente (línea 40) por `[System.IO.File]::ReadAllText($ruta, [System.Text.Encoding]::UTF8)`, y la escritura final (línea 49) por `<salida>.$PID.tmp` + `[System.IO.File]::WriteAllText($tmp, $texto, (New-Object System.Text.UTF8Encoding $false))` + `Move-Item -Force` sobre `PROJECT_CONTEXT.md` (el sufijo `$PID` evita que dos corridas escriban el mismo temporal)
- [X] T005 Añadir al mensaje final de `scripts/generate-context.ps1` el recuento de archivos incluidos en el inventario (FR-010), sin cambiar la invocación ni el disparador de n8n

**Checkpoint**: el conocimiento curado está fuera del archivo generado y el script escribe UTF-8 correcto de forma atómica. Ya se puede regenerar sin pérdida.

---

## Phase 3: User Story 1 - La memoria del proyecto se regenera sin crecer (Priority: P1) 🎯 MVP

**Goal**: dos corridas consecutivas producen un archivo del mismo orden de magnitud, con un solo inventario y un solo volcado de código.

**Independent Test**: ejecutar el generador dos veces sin tocar el repositorio y comparar tamaño y número de encabezados.

- [X] T006 [US1] Añadir `PROJECT_CONTEXT` al patrón de exclusión de los **dos** `Where-Object` de `scripts/generate-context.ps1` (líneas 17 y 33), de forma que solo se excluya el archivo de salida exacto y no archivos con nombres parecidos
- [X] T007 [US1] Ejecutar `.\scripts\generate-context.ps1` una vez y verificar con el bloque 1 de `quickstart.md` que cada encabezado (`## Archivos del proyecto`, `## Dependencias (package.json)`, `## Codigo fuente`) aparece exactamente una vez, comparando líneas completas y no subcadenas (los documentos de `specs/` citan esos encabezados)
- [X] T008 [US1] Ejecutar el generador dos veces consecutivas y comprobar con el bloque 2 de `quickstart.md` que la variación de tamaño es menor al 5 % en valor absoluto
- [X] T009 [US1] Ejecutar dos instancias del generador en paralelo y verificar que `PROJECT_CONTEXT.md` queda completo (encabezados únicos y cierre `Fin del contexto.`), nunca truncado

**Checkpoint**: US1 funciona sola. El archivo ya no se auto-incluye.

---

## Phase 4: User Story 2 - El conocimiento curado sobrevive a la regeneración (Priority: P2)

**Goal**: el conocimiento técnico acumulado sigue accesible desde las reglas de trabajo después de regenerar.

**Independent Test**: regenerar desde cero y comprobar que `docs/anime-v4.md` sigue existiendo, enlazado desde `AGENTS.md` y sin copia técnica dentro de `PROJECT_CONTEXT.md`.

- [X] T010 [US2] Tras la regeneración de T007, verificar con el bloque 5 de `quickstart.md` que `docs/anime-v4.md` existe, que `AGENTS.md` lo enlaza y que en `PROJECT_CONTEXT.md` el conocimiento aparece en una sola sección (el volcado de `docs/anime-v4.md`) y no duplicado

**Checkpoint**: US1 y US2 conviven: el archivo generado ya no contiene conocimiento curado duplicado.

---

## Phase 5: User Story 3 - La memoria regenerada es legible y buscable (Priority: P3)

**Goal**: acentos intactos, sin marca de orden de bytes, sin secciones repetidas.

**Independent Test**: leer los bytes del archivo regenerado y buscar patrones de corrupción.

- [X] T011 [US3] Verificar con el bloque 4 de `quickstart.md` que `PROJECT_CONTEXT.md` no tiene BOM y que no contiene ninguna secuencia de mojibake (`Ã`, `Â`, `ǭ`) ni U+FFFD
- [X] T012 [US3] Verificar que las rutas y el contenido con acentos del repositorio (por ejemplo `Fórmulas biométricas`) aparecen correctos en el archivo regenerado, comparando un archivo fuente con su sección en `PROJECT_CONTEXT.md`

**Checkpoint**: las tres historias funcionan de forma independiente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: cerrar los requisitos transversales de la especificación.

- [X] T013 [P] Verificar que `PROJECT_CONTEXT.md` no contiene valores de entorno ni credenciales (FR-006): buscar `SUPABASE_SERVICE`, `sk-`, `N8N_API_KEY` y cualquier línea con `=` proveniente de `.env*` en el inventario
- [X] T014 Verificar que `scripts/generate-context.ps1` sigue siendo desatendido (FR-009): sin `Read-Host`, sin `-Confirm`, y que un fallo del webhook de n8n no aborta la ejecución
- [X] T015 Ejecutar `npx tsc --noEmit`, `npm run lint` y `npm run build` (bloques 6 y 7 de `quickstart.md`) y confirmar `tsc` en 0, los mismos 64 errores de lint previos (ninguno nuevo) y el build con 7 páginas y 5 rutas

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Fase 1)**: sin dependencias.
- **Foundational (Fase 2)**: depende de T001. **Bloquea las tres historias**: regenerar antes de T002 destruye el conocimiento curado, y regenerar antes de T004 escribe un archivo corrupto.
- **US1 (Fase 3)**: depende de la Fase 2 completa. T006 → T007 → T008 → T009.
- **US2 (Fase 4)**: depende de T007 (necesita el archivo ya regenerado).
- **US3 (Fase 5)**: depende de T007 (necesita el archivo ya regenerado).
- **Polish (Fase 6)**: depende de T007, T010, T011 y T012.

### Within Each User Story

- El cambio en el script (T004, T005, T006) va antes de cualquier corrida de verificación.
- T006 es una sola línea por cada `Where-Object`; T004 y T005 tocan el mismo archivo y van en orden.

### Parallel Opportunities

- T002 y T003 pueden ejecutarse en paralelo: archivos distintos (`docs/anime-v4.md` y `AGENTS.md`).
- T010, T011, T012 y T013 son verificaciones de solo lectura sobre archivos distintos: paralelizables entre sí una vez T007 terminó.
- T004, T005 y T006 **no** son paralelizables entre sí: mismo archivo.

---

## Parallel Example: Fase 2

```text
# Archivos distintos, sin dependencias entre sí:
Tarea: "Rescatar la sección de anime.js v4 en docs/anime-v4.md"
Tarea: "Añadir el enlace a docs/anime-v4.md en AGENTS.md"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. T001 — línea base.
2. T002–T005 — rescate, enlace, codificación, recuento.
3. T006–T009 — exclusión y verificación de crecimiento.
4. **STOP y VALIDAR**: `PROJECT_CONTEXT.md` por debajo de 800 KB y estable entre corridas.

### Incremental Delivery

1. Fase 2 → el conocimiento está a salvo y el script escribe bien.
2. US1 → el archivo deja de crecer (MVP publicable).
3. US2 → se confirma que el conocimiento sigue accesible.
4. US3 → se confirma que no hay corrupción ni duplicados.
5. Fase 6 → puertas de `tsc`, lint y build antes de publicar.

---

## Notes

- [P] = archivos distintos, sin dependencias pendientes.
- No se añaden dependencias ni framework de pruebas: la verificación es ejecutable desde `quickstart.md`.
- Publicación por clon temporal, según el Principio V; no es una tarea de este spec.

```

### specs\002-dead-code-removal\checklists\requirements.md

```
# Specification Quality Checklist: Eliminación de código y dependencias sin uso

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-11-06
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Items marked incomplete require spec updates before `/speckit.clarify` or `/speckit.plan`
- Dos elementos del informe de auditoría se descartaron tras verificarlos: el componente de navegación
  del panel ya está unificado (no hay duplicación) y la migración `migration_v3.sql` no es código
  muerto (su columna se lee en la interfaz, y una migración es historia del esquema).
- Se añadieron dos elementos no listados en el informe original: el paquete `shadcn` declarado como
  dependencia de ejecución sin ningún importador, y los alias de tema derivados de los tokens
  eliminados.

```

### specs\002-dead-code-removal\plan.md

```
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

```

### specs\002-dead-code-removal\quickstart.md

```
# Quickstart — verificación

Cada bloque falla de forma ruidosa si algo quedó a medias. Todo se ejecuta desde la raíz del
repositorio, en Windows PowerShell 5.1 con `node` en el PATH.

## 1. Cero importadores de lo eliminado

```powershell
node -e "const fs=require('fs'),path=require('path');const skip=/node_modules|\.next|\.git|PROJECT_CONTEXT/;const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory()){if(!skip.test(p)&&e.name!=='.specify'&&e.name!=='specs')walk(p)}else if(/\.(ts|tsx|js|jsx|mjs|css)$/.test(e.name)){const t=fs.readFileSync(p,'utf8');for(const n of ['separator','/macros','lucide-react'])if(new RegExp(n.replace('/','\\\\/')).test(t))console.log('REF '+n+' en '+p)}}};walk('.');console.log('fin')"
```

**Esperado**: solo `fin`. Ninguna línea `REF`.

## 2. Los archivos no existen

```powershell
@('components/ui/separator.tsx','lib/macros.ts','public/file.svg','public/globe.svg','public/next.svg','public/vercel.svg','public/window.svg') | ForEach-Object { "$_ existe=$([bool](Test-Path $_))" }
```

**Esperado**: `existe=False` en las siete líneas.

## 3. Dependencias declaradas

```powershell
node -e "const p=require('./package.json');console.log('lucide-react='+(('lucide-react' in p.dependencies)?'PRESENTE':'ausente'));console.log('shadcn='+(('shadcn' in p.dependencies)?'PRESENTE (correcto)':'AUSENTE (rompe el CSS)'));console.log('total deps='+Object.keys(p.dependencies).length)"
```

**Esperado**: `lucide-react=ausente`, `shadcn=PRESENTE (correcto)`, `total deps=12` (eran 13).

`shadcn` se queda porque `app/globals.css` importa su hoja de estilos; sacarlo rompería el build.

## 4. Tokens de tema sin consumidores

```powershell
node -e "const t=require('fs').readFileSync('app/globals.css','utf8');const decl=(t.match(/^\s*--(chart|sidebar)[-\w]*\s*:/gm)||[]).length;const alias=(t.match(/^\s*--color-(chart|sidebar)[-\w]*\s*:/gm)||[]).length;console.log('declaraciones='+decl+' alias='+alias)"
Select-String -Path app\globals.css -Pattern 'bg-chart|text-chart|border-chart|--sidebar' | ForEach-Object { $_.Line }
```

**Esperado**: `declaraciones=0 alias=0` y ninguna línea suelta.

## 5. El hook ya no ofrece un intervalo inalcanzable

```powershell
Select-String -Path lib\useMuscleCounts.ts -Pattern 'refreshMs|setInterval' | ForEach-Object { $_.Line.Trim() }
Select-String -Path components\*.tsx -Pattern 'useMuscleCounts\(' | ForEach-Object { $_.Line.Trim() }
```

**Esperado**: la primera búsqueda no imprime nada; la segunda muestra dos llamadas con un solo
argumento (`userId`).

## 6. Tipos y lint

```powershell
npx tsc --noEmit; "tsc exit: $LASTEXITCODE"
npm run lint 2>&1 | Select-String -Pattern 'problems'
```

**Esperado**: `tsc exit: 0`, y un total de problemas **que no sube** de los 64 previos (este cambio
solo puede reducirlos). Cualquier error en un archivo tocado es un fallo.

## 7. Empaquetado

```powershell
npm run build 2>&1 | Select-String -Pattern 'Compiled|Generating static pages|Route|/dashboard'
```

**Esperado**: compilación verde, 7 páginas generadas y las 5 rutas (`/`, `/_not-found`,
`/api/coach`, `/auth`, `/dashboard`).

## 8. Arranque real

```powershell
npm run dev
# en otra terminal:
@('/','/auth','/dashboard') | ForEach-Object { $r = Invoke-WebRequest -Uri "http://localhost:3000$_" -MaximumRedirection 0 -SkipHttpErrorCheck -EA SilentlyContinue; "$_ -> $($r.StatusCode)" }
```

**Esperado**: `/` y `/auth` en `200`; `/dashboard` en `200` o `307` (redirección a `/auth` sin
sesión), nunca `404` ni `500`. Ningún `404` a `next.svg`, `vercel.svg` u otro recurso eliminado en la
pestaña Network.

## Criterio de cierre

Las ocho comprobaciones en verde. Las 6 y 7 son obligatorias antes de publicar (Principio V).

```

### specs\002-dead-code-removal\research.md

```
# Evidencia del escaneo

Todo lo de abajo se midió sobre el árbol de trabajo antes de borrar nada. El escaneo es reproducible:
recorre `app/`, `components/`, `lib/` y `scripts/` buscando el nombre de cada archivo, paquete o
variable dentro de un `import` o de una cadena de texto.

## Módulos sin importadores

| Archivo | Importadores | Qué lo delata |
|---|---|---|
| `components/ui/separator.tsx` | 0 | Ningún archivo lo importa. Usa `@base-ui/react/separator` y `cn`, que siguen teniendo otros consumidores. |
| `lib/macros.ts` | 0 | Encabezado corrupto y fórmulas duplicadas de `lib/nutrition.ts` con resultados distintos. |

Resto de `components/ui/`: `badge`, `button`, `card`, `input`, `label` — todos importados desde
`app/auth/page.tsx` o `app/page.tsx`. Se conservan.

## Dependencias sin importador

| Paquete | Importadores | Nota |
|---|---|---|
| `lucide-react` | 0 | Ningún icono de esa librería se usa. |
| `shadcn` | 1 | **No es código muerto**: `app/globals.css` hace `@import "shadcn/tailwind.css"`, que resuelve a `node_modules/shadcn/dist/tailwind.css` (638 líneas de keyframes y variantes `data-*`). Se conserva. |

Verificadas y conservadas pese a no aparecer en `import`: `react-dom` (la exige Next en tiempo de
ejecución) y los `@types/*` más `typescript` (herramientas de desarrollo). `@base-ui/react` sigue vivo
porque `badge`, `button` e `input` lo importan.

## Dependencia que parecía muerta y no lo está

`shadcn` era el candidato más fuerte: es una CLI declarada como dependencia de ejecución. Pero su
hoja de estilos es parte del CSS de la aplicación. Moverla a `devDependencies` sería más correcto en
teoría y no cambia nada en Vercel (instala todo para compilar), así que no se toca.

## Recursos públicos

`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`: 0 referencias en código,
estilos o configuración. Son la plantilla por defecto de Next. `public/` no contiene nada más.

## Tokens de tema

Declarados 13 por bloque de tema (`--chart-1..5`, `--sidebar`, `--sidebar-foreground`,
`--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`,
`--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`), en `:root` y en `.dark`, más 13
alias `--color-*` en el bloque `@theme inline`. Ninguna clase de utilidad derivada
(`bg-chart-1`, `text-sidebar-*`, …) se usa en el código: 0 consumidores. Total: 39 líneas.

## Hook de recuperación muscular

`lib/useMuscleCounts.ts` expone `refreshMs?: number`. Los dos llamadores pasan solo `userId`. La rama
`if (refreshMs) { setInterval(...) }` nunca se ejecuta, y `refreshMs` está en el arreglo de
dependencias del efecto sin poder cambiar nunca.

## Descartados tras verificar (no son código muerto)

| Candidato | Por qué se conserva |
|---|---|
| `NavRow` | No está duplicado: es un componente con prop `variant`. El informe estaba desactualizado. |
| `lib/migration_v3.sql` | `spotify_playlist` se lee en `SpotifyWidget.tsx`; además una migración es historia del esquema. |
| `lib/migration_v4_rls.sql` | Contiene políticas RLS desplegadas; no se juzga por lectores en el código. |

```

### specs\002-dead-code-removal\spec.md

```
# Feature Specification: Eliminación de código y dependencias sin uso

**Feature Branch**: `002-dead-code-removal`

**Created**: 2026-11-06

**Status**: Draft

**Input**: User description: "La limpieza de código muerto pendiente" — acotada a código muerto y duplicación, sin refactorizar nada más.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El repositorio no contiene archivos que nadie importa (Priority: P1)

Un mantenedor abre el repositorio y encuentra solo archivos que forman parte de la aplicación. No
hay que adivinar si un archivo es código en producción o un resto de un intento anterior.

**Why this priority**: dos archivos de código (`components/ui/separator.tsx` y `lib/macros.ts`) no
tienen ningún importador. El segundo además duplica las fórmulas de nutrición que ya viven en otro
módulo, con un encabezado corrupto. Un lector que los encuentre puede terminar usando el módulo
equivocado y obtener resultados distintos a los de la aplicación.

**Independent Test**: recorrer todos los módulos de `app/`, `components/` y `lib/` y verificar que
cada uno tiene al menos un importador o es una ruta/página de la aplicación.

**Acceptance Scenarios**:

1. **Given** el repositorio actual, **When** se buscan importadores de `components/ui/separator.tsx`,
   **Then** no hay ninguno y el archivo no existe.
2. **Given** el repositorio actual, **When** se buscan importadores de `lib/macros.ts`,
   **Then** no hay ninguno y el archivo no existe.
3. **Given** la aplicación en ejecución, **When** se navega por todas las pantallas, **Then** se ve
   exactamente igual que antes del cambio.

---

### User Story 2 - No se instala ni se descarga nada que la aplicación no use (Priority: P2)

Un mantenedor revisa las dependencias declaradas y cada una tiene un consumidor real en el código.
La instalación es más pequeña y no arrastra paquetes que nadie importa.

**Why this priority**: un paquete declarado no se importa en ningún archivo (`lucide-react`) y otro
(`shadcn`) es la CLI de componentes, que sí aporta una hoja de estilos al build y por eso se
conserva. El primero pesa en cada instalación y en cada despliegue sin aportar nada.

**Independent Test**: instalar desde cero y verificar que la aplicación compila y arranca sin esos
paquetes; confirmar que no hay ningún `import` que los nombre.

**Acceptance Scenarios**:

1. **Given** las dependencias declaradas, **When** se busca cada nombre de paquete en el código,
   **Then** todos los declarados tienen al menos un importador real.
2. **Given** una instalación limpia sin esos paquetes, **When** se compila y se arranca la
   aplicación, **Then** compila y arranca sin errores.

---

### User Story 3 - La aplicación no publica archivos que nadie solicita (Priority: P3)

Un mantenedor revisa los archivos públicos del sitio y cada uno se usa en alguna pantalla o
metadato. Ningún visitante descarga restos de una plantilla.

**Why this priority**: cinco archivos gráficos en los recursos públicos no aparecen referenciados en
ningún componente, hoja de estilos ni configuración. Son el sobrante de la plantilla inicial.

**Independent Test**: buscar cada nombre de archivo público en todo el código y en la configuración.

**Acceptance Scenarios**:

1. **Given** los recursos públicos actuales, **When** se busca cada uno de los cinco gráficos,
   **Then** ninguna referencia existe y los cinco archivos no están.
2. **Given** el sitio desplegado, **When** se carga cualquier pantalla, **Then** no aparece ninguna
   petición fallida a esos recursos.

---

### User Story 4 - La hoja de estilos no define tokens que nadie consume (Priority: P3)

Un mantenedor lee la hoja de estilos global y cada variable declarada se usa en alguna parte de la
interfaz o se elimina.

**Why this priority**: trece variables de color (`--chart-1` a `--chart-5` y ocho `--sidebar-*`) están
declaradas en dos bloques de tema, más trece alias de tema derivados, y ninguna se consume en ningún
componente. Son 39 líneas que sugieren una capacidad de gráficos y de barra lateral que la aplicación
no tiene.

**Independent Test**: buscar cada nombre de variable en todo el código, incluidas las clases de
utilidad generadas.

**Acceptance Scenarios**:

1. **Given** la hoja de estilos, **When** se busca el consumo de cada variable de gráficos y de
   barra lateral, **Then** ninguna se consume y las declaraciones no están.
2. **Given** la aplicación en ejecución, **When** se recorren las pantallas en tema claro y oscuro,
   **Then** los colores no cambian respecto al estado anterior.

---

### User Story 5 - El estado de recuperación muscular no contiene una actualización automática inalcanzable (Priority: P3)

Un mantenedor lee el hook que expone los conteos de recuperación muscular y encuentra solo
comportamiento que la aplicación ejerce.

**Why this priority**: el hook acepta un intervalo de refresco opcional que ninguno de sus dos
llamadores pasa. La rama que arma el temporizador nunca se ejecuta: es código muerto con apariencia
de funcionalidad.

**Independent Test**: buscar todos los llamadores del hook y verificar los argumentos que pasan.

**Acceptance Scenarios**:

1. **Given** los dos llamadores del hook, **When** se revisan sus argumentos, **Then** ninguno pasa
   intervalo y el hook ya no ofrece ese parámetro ni arma ningún temporizador.
2. **Given** la pantalla de recuperación muscular, **When** se abre, **Then** los conteos cargan y
   se muestran igual que antes.

---

### Edge Cases

- **Un archivo de `components/ui/` que parece genérico pero sí se usa**: se conserva. La decisión se
  toma por importadores reales, no por nombre ni por parecer sobrante.
- **Un módulo sin importadores que otra herramienta lee sin importarlo** (por ejemplo, un script que
  lo ejecuta o lo copia): se verifica antes de borrar; si existe ese consumo, se conserva.
- **Una migración de base de datos sin uso aparente en el código**: se conserva. Una migración es
  historia del esquema, no código muerto: el hecho de que la columna no se lea en un archivo no
  significa que no exista en la base de datos desplegada.
- **Un componente de `components/ui/` que queda sin usar después de borrar otro**: se revisa si pasa
  a ser código muerto por efecto del cambio; si es así, se elimina en el mismo cambio.
- **Regeneración de componentes desde la herramienta de diseño**: si una herramienta vuelve a
  escribir los tokens o el componente eliminado en el futuro, no es motivo para conservarlos hoy.
- **Comportamiento en tiempo de ejecución idéntico**: cualquier diferencia observable en pantalla es
  un fallo del cambio, no una mejora.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El repositorio MUST NOT contener módulos de código sin importadores, salvo las rutas y
  páginas propias de la aplicación.
- **FR-002**: `components/ui/separator.tsx` MUST eliminarse: no tiene importadores.
- **FR-003**: `lib/macros.ts` MUST eliminarse: no tiene importadores y duplica fórmulas que ya
  existen en otro módulo con resultados distintos.
- **FR-004**: Toda dependencia declarada MUST tener al menos un importador en el código o cumplir un
  rol explícito de herramienta de desarrollo.
- **FR-005**: `lucide-react` MUST eliminarse de las dependencias: no se importa en ningún archivo.
- **FR-006**: `shadcn` MUST conservarse: `app/globals.css` importa su hoja de estilos
  (`@import "shadcn/tailwind.css"`), así que tiene un consumidor real.
- **FR-007**: Los cinco gráficos públicos de plantilla (`file.svg`, `globe.svg`, `next.svg`,
  `vercel.svg`, `window.svg`) MUST eliminarse: ningún componente, hoja de estilos ni configuración
  los referencia.
- **FR-008**: Las variables de color de gráficos y de barra lateral MUST eliminarse de ambos bloques
  de tema y de sus alias, porque ningún elemento de la interfaz las consume.
- **FR-009**: El hook de conteos de recuperación muscular MUST NOT aceptar un intervalo de refresco
  que ningún llamador usa; la rama del temporizador MUST eliminarse.
- **FR-010**: Las migraciones de base de datos MUST conservarse aunque no tengan lectores en el
  código.
- **FR-011**: Tras el cambio, la aplicación MUST compilar y renderizar todas sus pantallas sin
  diferencias visuales ni funcionales observables.
- **FR-012**: El cambio MUST reducir el número de archivos del repositorio y el de dependencias
  declaradas; no puede añadir ninguno.

### Key Entities *(include if feature involves data)*

- **Módulo de código**: archivo con lógica de la aplicación. Atributos: ruta, número de importadores,
  si es una ruta o página de la aplicación.
- **Dependencia declarada**: paquete del que depende el proyecto. Atributos: nombre, tipo
  (ejecución o desarrollo), número de importadores, rol si no se importa.
- **Recurso público**: archivo servido al navegador. Atributos: ruta, número de referencias.
- **Token de tema**: variable de estilo reutilizable. Atributos: nombre, número de consumidores.
- **Migración de base de datos**: cambio versionado del esquema. Atributos: versión, cambio aplicado,
  si sigue siendo parte del historial.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Cero módulos de código sin importadores en `app/`, `components/` y `lib/` (hoy: 2).
- **SC-002**: Cero dependencias declaradas sin importador que no sean herramientas de desarrollo
  (hoy: 1).
- **SC-003**: Cero recursos públicos sin referencias (hoy: 5 de 5).
- **SC-004**: Cero tokens de tema sin consumidores (hoy: 13 variables y sus 13 alias).
- **SC-005**: Las 5 rutas de la aplicación (7 páginas generadas) responden y se renderizan sin errores
  de consola nuevos.
- **SC-006**: La compilación de tipos y el empaquetado de producción terminan sin errores.
- **SC-007**: El recuento de archivos del repositorio baja en al menos 8 y el de dependencias en
  exactamente 1.

## Assumptions

- Ningún proceso externo importa `lib/macros.ts` ni `components/ui/separator.tsx`; se verificó que no
  hay importadores dentro del repositorio y no existe ningún consumidor fuera de él.
- `shadcn` se conserva: su `dist/tailwind.css` (638 líneas de keyframes y variantes `data-*`) lo
  consume `app/globals.css`. Sacarlo obligaría a copiar esa hoja al repositorio, que es más código
  del que se pretendía quitar.
- La migración `lib/migration_v3.sql` se conserva: la columna que crea (`spotify_playlist`) sí se lee
  en la interfaz, y aun sin lectores una migración es historia del esquema.
- El componente de navegación del panel ya está unificado en una sola definición con variantes; el
  informe de duplicación estaba desactualizado y no se toca.
- Los tokens de tema eliminados no serán reescritos por la herramienta de diseño en el corto plazo;
  si eso ocurre, se vuelven a eliminar en ese momento.
- La verificación es una comprobación de ejecución real (compilación, empaquetado y recorrido de las
  pantallas), no una lectura del código.

```

### specs\002-dead-code-removal\tasks.md

```
# Tasks: Eliminación de código y dependencias sin uso

**Input**: Design documents from `/specs/002-dead-code-removal/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `quickstart.md`

**Tests**: sin framework de pruebas en el repositorio. La verificación son los bloques de
`quickstart.md`, asignados como tareas.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: paralelizable (archivo distinto, sin dependencias pendientes)
- **[Story]**: historia de `spec.md`

## Path Conventions

Proyecto único. Rutas desde la raíz del repositorio.

---

## Phase 1: Setup

- [X] T001 Registrar la línea base del escaneo: 2 módulos sin importadores, 1 dependencia muerta, 5 recursos sin referencias, 39 líneas de tokens y `refreshMs` sin llamadores (bloques 1 a 5 de `quickstart.md`)

---

## Phase 2: Foundational

No hay infraestructura compartida: cada historia es un borrado independiente. Sin prerequisitos
bloqueantes.

**Checkpoint**: se puede empezar por cualquier historia.

---

## Phase 3: User Story 1 - El repositorio no contiene archivos que nadie importa (Priority: P1) 🎯 MVP

**Goal**: cero módulos sin importadores en `app/`, `components/` y `lib/`.

**Independent Test**: bloque 1 y 2 de `quickstart.md` en cero.

- [X] T002 [P] [US1] Eliminar `components/ui/separator.tsx`
- [X] T003 [P] [US1] Eliminar `lib/macros.ts`
- [X] T004 [US1] Tras los borrados, volver a escanear `components/ui/` y confirmar que `badge`, `button`, `card`, `input` y `label` siguen teniendo importadores (ninguno quedó huérfano por efecto del cambio)

**Checkpoint**: US1 completa y verificable sola.

---

## Phase 4: User Story 2 - No se instala ni se descarga nada que la aplicación no use (Priority: P2)

**Goal**: toda dependencia declarada tiene consumidor real o rol de herramienta.

**Independent Test**: bloque 3 de `quickstart.md`.

- [X] T005 [US2] Quitar `lucide-react` de `dependencies` en `package.json` con `npm uninstall lucide-react`, dejando `package-lock.json` y `node_modules` consistentes
- [X] T006 [US2] Verificar que no queda ningún `import` de `lucide-react`, que `shadcn` sigue en pie por el `@import` de `app/globals.css` y que `@base-ui/react`, `cn` y `class-variance-authority` conservan consumidores

**Checkpoint**: instalación más pequeña sin cambiar código de aplicación.

---

## Phase 5: User Story 3 - La aplicación no publica archivos que nadie solicita (Priority: P3)

**Goal**: `public/` solo contiene recursos referenciados.

**Independent Test**: bloque 2 de `quickstart.md` para los cinco gráficos.

- [X] T007 [US3] Eliminar `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg` y `public/window.svg`
- [X] T008 [US3] Confirmar que no queda ninguna referencia a esos nombres en `app/`, `components/`, `lib/` ni en la configuración

---

## Phase 6: User Story 4 - La hoja de estilos no define tokens que nadie consume (Priority: P3)

**Goal**: cero variables de tema sin consumidor.

**Independent Test**: bloque 4 de `quickstart.md`.

- [X] T009 [US4] Eliminar de `app/globals.css` las 13 declaraciones de `--chart-*` y `--sidebar-*` en `:root`, las 13 del bloque `.dark` y los 13 alias `--color-chart-*` / `--color-sidebar-*` del bloque `@theme inline`
- [X] T010 [US4] Confirmar con el bloque 4 que quedan 0 declaraciones y 0 alias, y que ninguna clase derivada de esos tokens se usa en el código

---

## Phase 7: User Story 5 - El hook no contiene una actualización automática inalcanzable (Priority: P3)

**Goal**: el hook expone solo comportamiento que la aplicación ejerce.

**Independent Test**: bloque 5 de `quickstart.md`.

- [X] T011 [US5] Quitar el parámetro `refreshMs` de `useMuscleCounts` en `lib/useMuscleCounts.ts`, la rama `if (refreshMs) { setInterval(...) }` y `refreshMs` del arreglo de dependencias del efecto, dejando `[userId]`
- [X] T012 [US5] Verificar que los dos llamadores siguen pasando solo `userId` y que los conteos cargan igual

**Checkpoint**: las cinco historias completas e independientes.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T013 [P] `npx tsc --noEmit` en 0 (bloque 6)
- [X] T014 [P] `npm run lint` sin errores nuevos: el total no sube de 64 (bloque 6)
- [X] T015 [P] `npm run build` verde con 7 páginas y 5 rutas (bloque 7)
- [X] T016 Arranque real de `/`, `/auth` y `/dashboard` sin 404 ni errores de consola nuevos (bloque 8)
- [X] T017 Regenerar `PROJECT_CONTEXT.md` con el generador corregido y confirmar que el inventario ya no lista los siete archivos eliminados y que el archivo sigue por debajo de 800 KB y sin mojibake

---

## Dependencies & Execution Order

- **Setup (Fase 1)**: sin dependencias.
- **US1, US2, US3, US4, US5**: independientes entre sí. T002 y T003 en paralelo; T007 y T009 tocan
  archivos distintos y pueden ir en paralelo; T011 es independiente.
- **Polish (Fase 8)**: después de las cinco historias. T017 va al final, porque el inventario debe
  reflejar el árbol ya limpio.

### Parallel Opportunities

- T002 ∥ T003 ∥ T007 ∥ T009 ∥ T011 (cinco archivos distintos, sin dependencias).
- T013 ∥ T014 ∥ T015 no conviene: comparten `node_modules` y `.next`; ejecutar en orden.

---

## Implementation Strategy

### MVP First (User Story 1)

1. T001 — línea base.
2. T002–T004 — fuera los dos módulos sin importadores.
3. **STOP y VALIDAR**: bloque 1 y 2 de `quickstart.md` en cero.

### Incremental Delivery

1. US1 → repositorio sin módulos huérfanos.
2. US2 → instalación sin paquetes muertos.
3. US3 → `public/` sin restos de plantilla.
4. US4 → hoja de estilos sin tokens muertos.
5. US5 → hook sin rama inalcanzable.
6. Polish → verificación y regeneración de la memoria.

---

## Notes

- Todo el cambio es sustracción; si una tarea necesita añadir código, el alcance está mal.
- Las migraciones SQL no se tocan (FR-010).
- Publicación por clon temporal, según el Principio V; no es una tarea de este spec.

```

---
Fin del contexto.