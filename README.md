# Gym Coach - Tu Entrenador Personal

App web de entrenamiento personal con trackers de **entrenamientos, nutrición, recuperación muscular** y un **Coach IA** basado en ciencia.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind 4 · Supabase · Vercel
**Diseño:** Glassmorphism con paleta rosa/azul/morado + fondo animado interactivo

---

## Desplegar Localmente

### Requisitos
- Node.js 20+ (recomendado 22)
- npm

### Pasos

```bash
# 1. Clonar el repo
git clone https://github.com/DaniAvocado/gym-coach.git
cd gym-coach

# 2. Instalar dependencias
npm install

# 3. Crear archivo de entorno
# Copia .env.local.example a .env.local y llena los valores (ver sección Supabase)
```

### Configurar Supabase

1. Crea un proyecto gratis en [supabase.com](https://supabase.com)
2. Ve a **SQL Editor** y ejecuta el contenido de `lib/schema.sql`
3. En **Table Editor** → tabla `exercises`, inserta los ejercicios de `lib/exercises_seed.sql`
4. Ve a **Settings → API** y copia:
   - `Project URL`
   - `anon public` key
5. Crea el archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-ANON-KEY
```

6. (Opcional) Desactiva "Confirm email" en **Authentication → Providers → Email** para que el registro sea directo

### Ejecutar

```bash
npm run dev
```

Abre **http://localhost:3000**

---

## Desplegar en Vercel

### Requisitos
- Cuenta en [vercel.com](https://vercel.com) (puedes entrar con GitHub)
- Repo subido a GitHub

### Pasos

1. **Sube el código a GitHub** (si no lo has hecho):

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/gym-coach.git
git push -u origin main
```

2. **Conecta con Vercel:**
   - Ve a [vercel.com/new](https://vercel.com/new)
   - Haz clic en **"Continue with GitHub"** e importa el repo `gym-coach`
   - Vercel detecta Next.js automáticamente

3. **Añade las variables de entorno** (Settings → Environment Variables):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://TU-PROYECTO.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu anon public key |

4. Haz clic en **"Deploy"**
5. Listo - Vercel te da una URL como `https://gym-coach.vercel.app`

### Deploys automáticos
Cada `git push` a `main` genera un nuevo deploy. No hay que hacer nada manual.

---

## Memoria para Agentes IA

Este repo incluye `PROJECT_CONTEXT.md` - la fuente de verdad del proyecto (arquitectura, fórmulas, decisiones, historial). Cualquier agente IA debe leerlo antes de trabajar. `AGENTS.md` lo instruye automáticamente.

## Changelog

Ver `CHANGELOG.md` para el historial completo de cambios.

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16, React 19, Tailwind 4 |
| Estilos | Glassmorphism, Framer Motion, Canvas animado |
| Backend | Supabase (Postgres + Auth) |
| Deploy | Vercel |
| Automatización | n8n (local) - workflows en `workflows/` |
