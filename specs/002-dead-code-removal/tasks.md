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
