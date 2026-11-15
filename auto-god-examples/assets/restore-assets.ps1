# restore-assets.ps1 - decode the base64 assets bundled with auto-god-examples
# Usage:  powershell -NoProfile -ExecutionPolicy Bypass -File assets\restore-assets.ps1
# Each file in assets\base64\*.b64 starts with metadata lines (#path / #bytes / #sha256)
# followed by the base64 payload. Existing files are never overwritten.

$ErrorActionPreference = 'Stop'
$assetsDir = Split-Path -Parent $PSCommandPath
$root      = Split-Path -Parent $assetsDir
$b64Dir    = Join-Path $assetsDir 'base64'

$created = 0
$skipped = 0
$failed  = 0

foreach ($f in Get-ChildItem -Path $b64Dir -Filter '*.b64' | Sort-Object Name) {
    $lines = Get-Content -Path $f.FullName -Encoding UTF8
    $rel = $null
    $sha = $null
    $body = ''
    foreach ($line in $lines) {
        if ($line -like '#path:*')   { $rel = $line.Substring(6).Trim(); continue }
        if ($line -like '#sha256:*') { $sha = $line.Substring(8).Trim(); continue }
        if ($line -like '#*') { continue }
        $t = $line.Trim()
        if ($t.Length -gt 0) { $body += $t }
    }
    if (-not $rel) { Write-Host "SKIP (no #path): $($f.Name)" -ForegroundColor Yellow; $failed++; continue }

    $dest = Join-Path $root ($rel -replace '/', '\')
    if (Test-Path -LiteralPath $dest) { $skipped++; continue }

    $dir = Split-Path $dest -Parent
    if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

    try {
        $bytes = [Convert]::FromBase64String($body)
        [IO.File]::WriteAllBytes($dest, $bytes)
        if ($sha) {
            $h = [Security.Cryptography.SHA256]::Create()
            $got = [BitConverter]::ToString($h.ComputeHash($bytes)).Replace('-', '').ToLower()
            if ($got -ne $sha) { Write-Host "SHA MISMATCH: $rel" -ForegroundColor Red; $failed++ }
        }
        $created++
        Write-Host "restored $rel"
    } catch {
        Write-Host ("FAILED {0}: {1}" -f $rel, $_.Exception.Message) -ForegroundColor Red
        $failed++
    }
}

Write-Host ''
Write-Host ("restored={0}  skipped(existing)={1}  failed={2}" -f $created, $skipped, $failed) -ForegroundColor Green
