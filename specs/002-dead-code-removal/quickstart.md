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
