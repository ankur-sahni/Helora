# Notification hook: system sound + toast (BurntToast if installed). Fail-open.
$ErrorActionPreference = 'SilentlyContinue'

$msg = 'Claude Code needs your attention'
try {
    $raw = [Console]::In.ReadToEnd()
    if ($raw) {
        $j = $raw | ConvertFrom-Json
        if ($j.message) { $msg = [string]$j.message }
    }
} catch {}

try { [System.Media.SystemSounds]::Asterisk.Play() } catch {}

try {
    if (Get-Module -ListAvailable -Name BurntToast) {
        Import-Module BurntToast
        New-BurntToastNotification -Text 'Claude Code', $msg
    }
} catch {}

exit 0
