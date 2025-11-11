<# 
Safe helper script for Media-Careers-India local dev:
- Backs up .env to .env.bak
- Fixes single-line .env that contains several ADMIN_ keys on one line
- Shows the current ADMIN_ configuration presence (booleans only)
- Kills stray node processes (optional prompt)
- Starts the Next dev server in a new window bound to 0.0.0.0:3000
- Waits until the server is reachable, then calls /api/debug-admin and reports the JSON
- Optionally attempts a login test with an explicit test password if you choose
Notes:
- This script does not print or transmit secret values.
- Run from the project root (where your package.json and .env live).
#>

param(
  [switch] $AutoKillNode = $false,
  [switch] $RunLoginTest = $false
)

function Write-Header($text) {
  Write-Host "=== $text ===" -ForegroundColor Cyan
}

# 1) Ensure we are in a project folder (presence of package.json or .env)
if (-not (Test-Path .\package.json)) {
  Write-Host "Warning: package.json not found in current directory. Run this from the project root." -ForegroundColor Yellow
}
# 2) Backup .env
if (-not (Test-Path .env)) {
  Write-Host ".env not found. Creating .env from .env.example if available." -ForegroundColor Yellow
  if (Test-Path .env.example) { Copy-Item .env.example .env -Force; Write-Host "Created .env from .env.example" -ForegroundColor Green }
  else { New-Item .env -ItemType File -Force | Out-Null; Write-Host "Created empty .env" -ForegroundColor Yellow }
}

$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backup = ".env.bak.$timestamp"
Copy-Item .env $backup -Force
Write-Header "Backed up .env to $backup"

# 3) Fix .env if it's a single line containing ADMIN_USER ADMIN_PASS ADMIN_JWT_SECRET
$content = Get-Content .env -Raw
if ($content -match "ADMIN_USER=.*ADMIN_PASS=.*ADMIN_JWT_SECRET=") {
  Write-Host "Detected admin vars on single line; splitting into lines..." -ForegroundColor Yellow
  # Replace " ADMIN_PASS=" and " ADMIN_JWT_SECRET=" with newline versions.
  $fixed = $content -replace "\s+ADMIN_PASS=", "`nADMIN_PASS=" -replace "\s+ADMIN_JWT_SECRET=", "`nADMIN_JWT_SECRET="
  Set-Content -Path .env -Value $fixed -Force
  Write-Host ".env rewritten with ADMIN_* variables on separate lines." -ForegroundColor Green
} else {
  Write-Host "No single-line admin var issue detected." -ForegroundColor Green
}

# 4) Show current ADMIN_ boolean presence (no secrets printed)
Write-Header "ADMIN_* presence in .env (booleans only)"
$lines = Get-Content .env
$adminUserSet = $lines -match '^ADMIN_USER='
$adminPassSet = $lines -match '^ADMIN_PASS='
$adminJwtSet  = $lines -match '^ADMIN_JWT_SECRET='
Write-Host "ADMIN_USER set: $adminUserSet"
Write-Host "ADMIN_PASS set: $adminPassSet"
Write-Host "ADMIN_JWT_SECRET set: $adminJwtSet"

# 5) Optional: kill node processes that might be hung
if ($AutoKillNode) {
  Write-Header "Killing all node processes"
  Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 1
  Write-Host "All node processes stopped (if any existed)."
} else {
  $nodeProcs = Get-Process node -ErrorAction SilentlyContinue
  if ($nodeProcs) {
    Write-Host "Found running node processes:"
    $nodeProcs | Format-Table Id, ProcessName, StartTime -AutoSize
    $answer = Read-Host "Kill these node processes now? (y/N)"
    if ($answer -match '^[Yy]') {
      $nodeProcs | Stop-Process -Force
      Write-Host "Node processes stopped."
    } else {
      Write-Host "Leaving node processes running."
    }
  } else {
    Write-Host "No node processes found."
  }
}

# 6) Start the dev server in a new terminal window (so this script can finish)
Write-Header "Starting Next dev server in a new terminal window"
$startCommand = 'cmd.exe /k "set HOST=0.0.0.0&& set PORT=3000&& npm run dev"'
Start-Process -FilePath "cmd.exe" -ArgumentList '/k', "set HOST=0.0.0.0&& set PORT=3000&& npm run dev" -WindowStyle Normal
Write-Host "Started npm run dev in a new CMD window. Wait 6-10s for server to boot, then this script will poll."

# 7) Poll the server until it responds or timeout
$maxAttempts = 30
$attempt = 0
$serverUrl = "http://127.0.0.1:3000/"
$ok = $false
Write-Header "Waiting for server at $serverUrl"
while ($attempt -lt $maxAttempts -and -not $ok) {
  try {
    $resp = Invoke-WebRequest -Uri $serverUrl -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
    $ok = $true
    Write-Host "Server responded with status $($resp.StatusCode)." -ForegroundColor Green
    break
  } catch {
    Start-Sleep -Seconds 2
    $attempt++
    Write-Host "Attempt $attempt/$maxAttempts: server not ready yet..."
  }
}
if (-not $ok) {
  Write-Host "Server did not respond on $serverUrl after $maxAttempts attempts. Please check the server terminal window for errors." -ForegroundColor Red
  exit 2
}

# 8) Query the debug endpoint (safe boolean-only endpoint)
$debugUrl = "http://127.0.0.1:3000/api/debug-admin"
Write-Header "Calling $debugUrl (safe debug)"
try {
  $debugResp = Invoke-RestMethod -Uri $debugUrl -Method Get -TimeoutSec 5 -ErrorAction Stop
  Write-Host "Debug response (booleans):"
  $debugResp | ConvertTo-Json -Depth 3 | Write-Host
} catch {
  Write-Host "Failed to reach $debugUrl. If this endpoint doesn't exist in your project, ignore this step." -ForegroundColor Yellow
}

# 9) Optional login test (only with a test password you choose)
if ($RunLoginTest) {
  $testUser = Read-Host "Enter the admin username to test (default: phildass)"
  if ([string]::IsNullOrWhiteSpace($testUser)) { $testUser = "phildass" }
  $testPass = Read-Host "Enter the test password to try (this will NOT be stored). Use a simple test password like testpass123" -AsSecureString
  $plainPass = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($testPass))
  $body = @{ username = $testUser; password = $plainPass } | ConvertTo-Json
  Write-Host "Testing login POST to /api/auth/login..."
  try {
    $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $resp = Invoke-WebRequest -Uri "http://127.0.0.1:3000/api/auth/login" -Method Post -Body $body -ContentType "application/json" -WebSession $session -UseBasicParsing -ErrorAction Stop
    Write-Host "Login call returned status $($resp.StatusCode)."
    Write-Host "Set-Cookie header (partial):"
    $resp.Headers['Set-Cookie'] | Write-Host
  } catch {
    Write-Host "Login returned an error. If it returned 401, credentials did not match server values." -ForegroundColor Yellow
  }
}

Write-Header "Script finished"
Write-Host "If the debug endpoint and login test succeeded, open http://localhost:3000/admin/login in the browser (clear cookies or use Incognito)."
Write-Host "If the server isn't running or you see errors, copy the server terminal output and paste it where you need help."
