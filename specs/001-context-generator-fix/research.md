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
