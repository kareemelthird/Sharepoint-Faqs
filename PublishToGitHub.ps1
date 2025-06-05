# Setup Git and Publish to GitHub
# This script helps you install Git, initialize the repository, and publish to GitHub

Write-Host "SharePoint FAQ Web Part - GitHub Setup" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Check if Git is installed
$gitInstalled = $false
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "✓ Git is already installed: $gitVersion" -ForegroundColor Green
        $gitInstalled = $true
    }
} catch {
    Write-Host "✗ Git is not installed" -ForegroundColor Red
}

# Install Git if not present
if (-not $gitInstalled) {
    Write-Host "`nInstalling Git..." -ForegroundColor Yellow
    
    # Check if winget is available
    try {
        winget --version | Out-Null
        Write-Host "Installing Git using winget..." -ForegroundColor Yellow
        winget install --id Git.Git -e --source winget
        
        # Add Git to PATH for current session
        $env:Path += ";C:\Program Files\Git\bin"
        
        Write-Host "✓ Git installed successfully!" -ForegroundColor Green
        Write-Host "Note: You may need to restart your terminal for Git to be available in PATH" -ForegroundColor Yellow
    } catch {
        Write-Host "✗ winget not available. Please install Git manually from: https://git-scm.com/download/windows" -ForegroundColor Red
        Write-Host "After installing Git, run this script again." -ForegroundColor Yellow
        exit 1
    }
}

# Wait for manual Git installation if needed
if (-not $gitInstalled) {
    Write-Host "`nWaiting for Git installation..." -ForegroundColor Yellow
    do {
        Start-Sleep -Seconds 2
        try {
            git --version | Out-Null
            $gitInstalled = $true
        } catch {
            # Still waiting
        }
    } while (-not $gitInstalled)
}

Write-Host "`n📁 Setting up Git repository..." -ForegroundColor Cyan

# Initialize Git repository
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Configure Git user (if not already configured)
$gitUserName = git config --global user.name 2>$null
$gitUserEmail = git config --global user.email 2>$null

if (-not $gitUserName) {
    $userName = Read-Host "Enter your Git username"
    git config --global user.name $userName
    Write-Host "✓ Git username configured" -ForegroundColor Green
}

if (-not $gitUserEmail) {
    $userEmail = Read-Host "Enter your Git email"
    git config --global user.email $userEmail
    Write-Host "✓ Git email configured" -ForegroundColor Green
}

# Add all files to Git
git add .
Write-Host "✓ Files added to Git staging area" -ForegroundColor Green

# Create initial commit
$commitMessage = "Initial commit - SharePoint FAQ Web Part"
try {
    git commit -m $commitMessage
    Write-Host "✓ Initial commit created" -ForegroundColor Green
} catch {
    Write-Host "✓ No changes to commit (already committed)" -ForegroundColor Green
}

Write-Host "`n🌐 GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`nNext steps to publish to GitHub:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com and create a new repository" -ForegroundColor White
Write-Host "2. Repository name suggestion: 'sharepoint-faq-webpart'" -ForegroundColor White
Write-Host "3. Don't initialize with README, .gitignore, or license (we already have them)" -ForegroundColor White
Write-Host "4. Copy the repository URL (e.g., https://github.com/yourusername/sharepoint-faq-webpart.git)" -ForegroundColor White

$repoUrl = Read-Host "`nEnter the GitHub repository URL"

if ($repoUrl) {
    # Add remote origin
    try {
        git remote add origin $repoUrl
        Write-Host "✓ Remote origin added" -ForegroundColor Green
    } catch {
        try {
            git remote set-url origin $repoUrl
            Write-Host "✓ Remote origin updated" -ForegroundColor Green
        } catch {
            Write-Host "✗ Error setting remote origin" -ForegroundColor Red
        }
    }
    
    # Push to GitHub
    Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Cyan
    try {
        git branch -M main
        git push -u origin main
        Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "✓ Your repository is now available at: $repoUrl" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error pushing to GitHub. You may need to authenticate." -ForegroundColor Red
        Write-Host "Try running: git push -u origin main" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host "Your SharePoint FAQ Web Part is now on GitHub!" -ForegroundColor White
Write-Host "`nYou can now:" -ForegroundColor White
Write-Host "• Share the repository URL with others" -ForegroundColor White
Write-Host "• Set up GitHub Pages for documentation" -ForegroundColor White
Write-Host "• Enable GitHub Actions for CI/CD" -ForegroundColor White
Write-Host "• Collaborate with other developers" -ForegroundColor White

Write-Host "`nRepository structure:" -ForegroundColor Cyan
Write-Host "📁 Your project includes:" -ForegroundColor White
Write-Host "  ✓ Complete SPFx web part source code" -ForegroundColor White
Write-Host "  ✓ Comprehensive README.md" -ForegroundColor White
Write-Host "  ✓ .gitignore for SPFx projects" -ForegroundColor White
Write-Host "  ✓ TypeScript configuration" -ForegroundColor White
Write-Host "  ✓ Package.json with dependencies" -ForegroundColor White
