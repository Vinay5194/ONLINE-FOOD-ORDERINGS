
stage('Deploy Website') {
    steps {
        powershell '''
            $ErrorActionPreference = "Stop"
            $port = 8000

            # Add your actual Python path here if necessary.
            $python = "C:\\Python313\\python.exe"

            if (-not (Test-Path $python)) {
                $python = (Get-Command python.exe `
                    -ErrorAction SilentlyContinue).Source
            }

            if (-not $python -or -not (Test-Path $python)) {
                throw "Python not found. Set the correct Python path in Jenkinsfile."
            }

            $listener = Get-NetTCPConnection `
                -LocalPort $port `
                -State Listen `
                -ErrorAction SilentlyContinue

            if (-not $listener) {
                Start-Process `
                    -FilePath $python `
                    -ArgumentList @(
                        "-m", "http.server",
                        "$port",
                        "--directory",
                        "$env:WORKSPACE"
                    ) `
                    -WindowStyle Hidden

                Start-Sleep -Seconds 3
            }

            $response = Invoke-WebRequest `
                -Uri "http://localhost:8000" `
                -UseBasicParsing

            if ($response.StatusCode -ne 200) {
                throw "Website deployment failed."
            }

            Write-Host "Website is running at http://localhost:8000"
        '''
    }
}
