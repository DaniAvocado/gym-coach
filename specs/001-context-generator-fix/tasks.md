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
