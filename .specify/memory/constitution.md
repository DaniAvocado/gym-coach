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
