
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

## npm run test - Command Breakdown Overview
When you run `npm run test`, you're executing the Vitest testing framework to run all tests in your React application and generate a JSON report of the results

## Command Flow

### 1. Package.json Script Execution
```json
"scripts": {
  "test": "vitest run"
}
```
- npm looks up the `test` script in `package.json`
- Executes `vitest run` command

### 2. Vitest Configuration Loading
Vitest reads configuration from `vite.config.js`:
```javascript
test: {
  globals: true,              // Makes testing globals available
  environment: 'jsdom',       // Simulates browser environment
  setupFiles: './src/test/setup.js',  // Runs setup before tests
  reporters: ['json'],        // Output format
  outputFile: 'test.json'     // Where to save results
}
```

### 3. Test Environment Setup
- **JSDOM Environment**: Creates a virtual DOM environment for React component testing
- **Setup File**: Runs `src/test/setup.js` which imports `@testing-library/jest-dom` for additional matchers
- **Global Configuration**: Makes Vitest globals (`describe`, `it`, `expect`) available without imports

### 4. Test Discovery
Vitest automatically finds and runs test files matching these patterns:
- `**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`
- `**/test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`

**Found Test File**: `src/components/MainContent.test.jsx`

### 5. Component Under Test: MainContent
The component being tested has this behavior:
```javascript
function MainContent() {
  const [helpVisible, setHelpVisible] = useState(false);
  
  function toggleHelp() {
    setHelpVisible((isVisible) => !isVisible);
  }
  
  return (
    <main>
      <button onClick={toggleHelp}>{helpVisible ? 'Hide' : 'Show'} Help</button>
      {helpVisible && <HelpArea />}
    </main>
  );
}
```

### 7. Test Result generation
After running all tests, Vitest generates a JSON report which will be saved to test.json

### 8. Testing Libraries Used

**@testing-library/react**: Provides utilities for testing React components
- `render()`: Renders components for testing
- `screen`: Queries for elements in the virtual DOM

**@testing-library/user-event**: Simulates user interactions
- `userEvent.click()`: Simulates mouse clicks

**@testing-library/jest-dom**: Provides additional matchers
- `toBeInTheDocument()`: Checks if element exists in DOM

## Integration with GitHub Actions
The generated `test.json` is used in the GitHub workflow:
- Uploaded as an artifact if tests fail
- Provides detailed failure information for debugging
- Enables automated testing in CI/CD pipeline

## Running Tests
```bash
npm run test          # Run all tests once
npm run test:watch    # Run tests in watch mode (if configured)
npm run test:coverage # Run with coverage report (if configured)
