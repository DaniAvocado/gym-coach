# Gym Coach — Guía para Agentes IA

## Ruta del proyecto
`C:\Users\DANIEL\OneDrive - mail.uniatlantico.edu.co\Documentos\PROYECTOS\gym-coach`

## MEMORIA OBLIGATORIA
Antes de tocar código, lee `PROJECT_CONTEXT.md` (arquitectura, fórmulas, historial, decisiones).
Ese archivo es la fuente de verdad del proyecto — no releer conversaciones antiguas.

## Rutas de trabajo
- App local: `npm run dev` en la raíz → http://localhost:3000
- Deploy: Vercel → https://gym-coach-acme-de5d.vercel.app
- Repo: https://github.com/DaniAvocado/gym-coach
- n8n: http://localhost:5678 (API key en env `N8N_API_KEY`)
- Workflows n8n exportados: `workflows/*.json`

## Encodings
Los archivos deben guardarse en UTF-8. NO usar PowerShell `Get-Content`/`WriteAllText`
para editar (corrompe acentos). Usar herramientas de edición que respeten UTF-8.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
