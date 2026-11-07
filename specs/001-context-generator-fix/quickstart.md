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
