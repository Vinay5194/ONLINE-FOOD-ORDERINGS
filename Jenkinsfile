
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Downloading code from GitHub'
                checkout scm
            }
        }

        stage('Test Website Files') {
            steps {
                bat 'if not exist index.html exit /b 1'
                bat 'if not exist style.css exit /b 1'
                bat 'if not exist script.js exit /b 1'

                echo 'All website files found successfully'
            }
        }

        stage('Deploy Website') {
            steps {
                powershell '''
                    $ErrorActionPreference = "Stop"
                    $port = 8000

                    $listener = Get-NetTCPConnection `
                        -LocalPort $port `
                        -State Listen `
                        -ErrorAction SilentlyContinue

                    if (-not $listener) {
                        $python = (Get-Command python `
                            -ErrorAction SilentlyContinue).Source

                        if (-not $python) {
                            $python = (Get-Command py `
                                -ErrorAction SilentlyContinue).Source
                        }

                        if (-not $python) {
                            throw "Python is not installed or not in PATH."
                        }

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
                    } else {
                        Write-Host "Port 8000 already has a server."
                    }

                    $response = Invoke-WebRequest `
                        -Uri "http://localhost:8000" `
                        -UseBasicParsing

                    if ($response.StatusCode -ne 200) {
                        throw "Website deployment check failed."
                    }

                    Write-Host "Website is running at http://localhost:8000"
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Build failed. Check Console Output.'
        }
    }
}
