
node {
    stage('Checkout') {
        echo 'Downloading project from GitHub'
        checkout scm
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

        echo 'SUCCESS: All website files found'
    }

    stage('Find Python') {
        def python = powershell(
            returnStdout: true,
            script: '''
                $ErrorActionPreference = "Stop"

                $cmd = Get-Command python.exe `
                    -ErrorAction SilentlyContinue

                if ($cmd) {
                    $cmd.Source
                    exit 0
                }

                $cmd = Get-Command py.exe `
                    -ErrorAction SilentlyContinue

                if ($cmd) {
                    $cmd.Source
                    exit 0
                }

                $paths = @(
                    "C:\\Python313\\python.exe",
                    "C:\\Python312\\python.exe",
                    "C:\\Python311\\python.exe",
                    "C:\\Program Files\\Python313\\python.exe",
                    "C:\\Program Files\\Python312\\python.exe"
                )

                foreach ($p in $paths) {
                    if (Test-Path $p) {
                        Write-Output $p
                        exit 0
                    }
                }

                throw "Python not found. Install Python and restart Jenkins."
            '''
        ).trim()

        env.PYTHON_EXE = python
        echo "Python found: ${python}"
    }

    stage('Deploy Website') {
        powershell '''
            $ErrorActionPreference = "Stop"
            $port = 8000

            $listener = Get-NetTCPConnection `
                -LocalPort $port `
                -State Listen `
                -ErrorAction SilentlyContinue

            if (-not $listener) {
                Start-Process `
                    -FilePath $env:PYTHON_EXE `
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
                throw "Website health check failed"
            }

            Write-Host "Website deployed successfully!"
            Write-Host "Open http://localhost:8000"
        '''
    }

    stage('Pipeline Complete') {
        echo 'SUCCESS: Online Food Ordering CI/CD pipeline completed'
    }
}
