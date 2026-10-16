
node {
    stage('Checkout') {
        checkout scm
        echo 'GitHub checkout successful'
    }

    stage('Test Website Files') {
        if (!fileExists('index.html')) {
            error('index.html is missing')
        }

        if (!fileExists('style.css')) {
            error('style.css is missing')
        }

        if (!fileExists('script.js')) {
            error('script.js is missing')
        }

        if (!fileExists('server.ps1')) {
            error('server.ps1 is missing')
        }

        echo 'SUCCESS: All project files found'
    }

    stage('Deploy Website') {
        powershell '''
            $ErrorActionPreference = "Stop"

            $port = 8000
            $url = "http://localhost:$port/"

            $response = $null
            try {
                $response = Invoke-WebRequest `
                    -Uri $url `
                    -UseBasicParsing `
                    -TimeoutSec 2 `
                    -ErrorAction Stop
            } catch {
                $response = $null
            }

            if ($response -and
                $response.Content -match "Foodie Express") {
                Write-Host "Website is already running."
            } else {
                if ($response) {
                    throw "Port 8000 is serving a different website. Stop the old server and rebuild."
                }

                $serverFile = Join-Path $env:WORKSPACE "server.ps1"

                $arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$serverFile`""

                Start-Process `
                    -FilePath "powershell.exe" `
                    -ArgumentList $arguments `
                    -WindowStyle Hidden

                Start-Sleep -Seconds 3
            }

            $check = Invoke-WebRequest `
                -Uri $url `
                -UseBasicParsing `
                -TimeoutSec 10

            if ($check.StatusCode -ne 200) {
                throw "Website health check failed."
            }

            if ($check.Content -notmatch "Foodie Express") {
                throw "The expected Foodie Express website was not found."
            }

            Write-Host "Deployment successful!"
            Write-Host "Website: http://localhost:8000"
        '''
    }

    stage('Complete') {
        echo 'SUCCESS: Online Food Ordering CI/CD pipeline completed!'
    }
}
