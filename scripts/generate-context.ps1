$ErrorActionPreference = 'SilentlyContinue'
$p = $PSScriptRoot
if (-not $p) { $p = Split-Path -Parent $MyInvocation.MyCommand.Path }
$p = Split-Path -Parent $p
$o = Join-Path $p 'PROJECT_CONTEXT.md'
$ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$bt = [char]96
$utf8 = New-Object System.Text.UTF8Encoding $false

$s = @()
$s += '# gym-coach - Contexto del proyecto'
$s += ''
$s += "**Auto-generado:** $ts"
$s += ''
$s += '## Archivos del proyecto'
$s += "$bt$bt$bt"
$files = @(Get-ChildItem $p -Recurse -File | Where-Object {
    $_.FullName -notmatch 'node_modules|\.next|\.git|\.opencode|package-lock' -and $_.FullName -ne $o
})
$files | ForEach-Object {
    $_.FullName.Substring($p.Length + 1)
} | Sort-Object | ForEach-Object { $s += $_ }
$s += "$bt$bt$bt"
$s += ''

$s += '## Dependencias (package.json)'
$s += "$bt$bt$bt" + 'json'
$pkg = [System.IO.File]::ReadAllText((Join-Path $p 'package.json'), [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$s += ($pkg.dependencies | ConvertTo-Json -Depth 1)
$s += "$bt$bt$bt"
$s += ''

$s += '## Codigo fuente'
Get-ChildItem $p -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.mjs,*.sql,*.css,*.md | Where-Object {
    $_.FullName -notmatch 'node_modules|\.next|\.git|\.opencode|package-lock' -and $_.FullName -ne $o
} | Sort-Object FullName | ForEach-Object {
    $rel = $_.FullName.Substring($p.Length + 1)
    $s += ''
    $s += "### $rel"
    $s += ''
    $s += "$bt$bt$bt"
    $content = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    if ($content) { $s += $content }
    $s += "$bt$bt$bt"
}

$s += ''
$s += '---'
$s += 'Fin del contexto.'

$tmp = "$o.$PID.tmp"
[System.IO.File]::WriteAllText($tmp, ($s -join [Environment]::NewLine), $utf8)
Move-Item -Force $tmp $o
Write-Output "Contexto actualizado: $o ($($files.Count) archivos)"

try {
    Invoke-RestMethod -Uri 'http://localhost:5678/webhook/gym-coach-contexto' -Method Post -Body (@{ ok = $true; output = "Contexto actualizado: $o" } | ConvertTo-Json) -ContentType 'application/json' -TimeoutSec 5
} catch {}
