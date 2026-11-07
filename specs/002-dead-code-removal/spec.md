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
