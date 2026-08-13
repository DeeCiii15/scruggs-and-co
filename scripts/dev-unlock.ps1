# Stops stale Next.js dev servers and removes the dev lock file.
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

foreach ($port in 3000, 3001) {
  Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique |
    ForEach-Object {
      Write-Host "Stopping process $_ on port $port"
      Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
}

Start-Sleep -Seconds 1
$lock = Join-Path $projectRoot ".next\dev\lock"
if (Test-Path $lock) {
  Remove-Item $lock -Force
  Write-Host "Removed dev lock"
}

Write-Host "Done. Run: npm run dev"
