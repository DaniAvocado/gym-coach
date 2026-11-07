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
