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
