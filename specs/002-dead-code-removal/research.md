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
