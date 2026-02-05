# subagent-notify.ps1
# Hook script that shows a popup notification when a subagent completes

# Read JSON input from stdin
$jsonInput = [Console]::In.ReadToEnd()

# Parse the JSON to get subagent info
try {
    $data = $jsonInput | ConvertFrom-Json
    $subagentType = $data.subagent_type
    $status = $data.status

    # Customize message based on status
    if ($status -eq "completed") {
        $message = "Subagente '$subagentType' finalizado com sucesso!"
        $icon = 64  # Information icon
    } else {
        $message = "Subagente '$subagentType' terminou com erro."
        $icon = 48  # Warning icon
    }
} catch {
    $message = "Subagente finalizado!"
    $icon = 64
}

# Show popup notification
$wshell = New-Object -ComObject WScript.Shell
$wshell.Popup($message, 3, "Cursor - Subagente Concluido", $icon) | Out-Null

# Return empty JSON (hook output)
Write-Output "{}"

exit 0
