# agent-notify.ps1
# Hook script that shows a popup notification when the main agent completes

# Read JSON input from stdin
$jsonInput = [Console]::In.ReadToEnd()

# Parse the JSON to get agent status
try {
    $data = $jsonInput | ConvertFrom-Json
    $status = $data.status

    # Customize message based on status
    switch ($status) {
        "completed" {
            $message = "Agente concluiu a tarefa com sucesso!"
            $icon = 64  # Information icon
        }
        "aborted" {
            $message = "Agente foi interrompido pelo usuario."
            $icon = 48  # Warning icon
        }
        "error" {
            $message = "Agente terminou com erro."
            $icon = 16  # Error icon
        }
        default {
            $message = "Agente finalizado."
            $icon = 64
        }
    }
} catch {
    $message = "Agente finalizado!"
    $icon = 64
}

# Show popup notification
$wshell = New-Object -ComObject WScript.Shell
$wshell.Popup($message, 3, "Cursor - Agente Concluido", $icon) | Out-Null

# Return empty JSON (hook output)
Write-Output "{}"

exit 0
