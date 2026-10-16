
# Online Food Ordering Website

## Project Objective
To create an online food ordering website and automate
testing and deployment using GitHub and Jenkins.

## Technologies Used
- HTML
- CSS
- JavaScript
- Git and GitHub
- Jenkins CI/CD
- Python HTTP server

## Features
- Responsive food menu
- Food prices
- Add to cart
- Cart total calculation
- Demo checkout
- Automated file checks
- Jenkins deployment pipeline

## How to Run Locally

1. Install Python.
2. Open PowerShell in the project folder.
3. Run:

   python -m http.server 8000

4. Open http://localhost:8000

## Jenkins Configuration

Repository:
https://github.com/Vinay5194/Online-Food-Ordering.git

Branch:
*/main

Script Path:
Jenkinsfile

## Pipeline Stages

1. Checkout
2. Test Website Files
3. Deploy Website

## Expected Result

A successful Jenkins build should show:
CI/CD pipeline completed successfully!

Website:
http://localhost:8000

## Limitations
This is a student demo. It does not use a database,
save customer orders, or process real payments.
