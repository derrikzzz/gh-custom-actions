
# Github Actions CI/CD Pipelin Documentation

A brief description of what this project does and who it's for

This repository uses Github Actions for automated linting, testing, building and deployment

```
gh-custom-actions/
│
├── .github/                  # GitHub-specific files (actions, workflows, etc.)
│   ├── actions/              # Custom GitHub Actions (composite, JS, Docker)
│   │   ├── cached-deps/      # Action to cache and install dependencies
│   │   ├── deploy-s3-docker/ # Docker-based S3 deploy action
│   │   └── deploy-s3-javascript/ # JS-based S3 deploy action
│   └── workflows/            # CI/CD workflow definitions
│
├── public/                   # Static public assets (served as-is)
│   └── vite.svg              # Example static asset
│
├── src/                      # Source code for the application
│   ├── assets/               # Static assets (images, fonts, etc.)
│   │   └── images/
│   │       └── logo.png
│   ├── components/           # React components
│   │   ├── HelpArea.css
│   │   ├── HelpArea.jsx
│   │   ├── HelpBox.css
│   │   ├── HelpBox.jsx
│   │   ├── MainContent.jsx
│   │   └── MainContent.test.jsx
│   ├── index.css             # Global styles
│   ├── main.jsx              # App entry point
│   └── test/                 # Test setup files
│       └── setup.js
│
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── index.html                # Main HTML file
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Exact dependency versions
├── test.json                 # Test report/output
└── vite.config.js            # Vite build tool configuration
```

## Custom Actions

### 1. **`cached-deps`**
Purpose: Installs and cache Node.js dependencies for workflow runs in the future, optimising CI/CD performance and avodiing redundant installs in the process

### 2. **`deploy-s3-javascript`**
Purpose: Defines a javascript-based custom Github Action for deploying a static website to AWS S3 bucket

### 3. **`deply-s3-docker`**
Purpose: Defines a Docker-based custom Github Action for deploying a static website to AWS S3 bucket using a Docker container

### 4. **`workflows/deploy.yml`**
Purpose: Github Actions workflow that orchestrates the CI/CD pipeline for the project, including linting, testing, building and deploying the site to AWS S3
