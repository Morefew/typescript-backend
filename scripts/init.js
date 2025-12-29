#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function prompt(question) {
  return new Promise((resolve) => {
    const rl = createReadlineInterface();
    rl.question(`${colors.bright}${question}${colors.reset} `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function validateProjectName(name) {
  if (!name) {
    return { valid: false, error: "Project name cannot be empty" };
  }

  if (!/^[a-z0-9-]+$/.test(name)) {
    return {
      valid: false,
      error: "Project name can only contain lowercase letters, numbers, and hyphens",
    };
  }

  if (/^-|-$/.test(name)) {
    return { valid: false, error: "Project name cannot start or end with a hyphen" };
  }

  return { valid: true };
}

function getPackageJson() {
  const filePath = path.join(projectRoot, "package.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function updatePackageJson(projectName, description, author) {
  const filePath = path.join(projectRoot, "package.json");
  const pkg = getPackageJson();

  pkg.name = projectName;
  if (description) {
    pkg.description = description;
  }
  if (author) {
    pkg.author = author;
  }

  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + "\n");
}

function updateReadme(projectName, description) {
  const filePath = path.join(projectRoot, "README.md");
  const readme = `# ${projectName}

${description || "A TypeScript/Express backend API"}

## Getting Started

### Prerequisites

- Node.js 22 (check \`.nvmrc\`)
- npm

### Installation

\`\`\`bash
nvm use  # Use the correct Node.js version
npm install
\`\`\`

### Development

Start the development server with auto-reload:

\`\`\`bash
npm run dev
\`\`\`

The server will be available at \`http://localhost:3000\`

## Available Scripts

- \`npm run dev\` - Start development server with auto-reload
- \`npm run start\` - Run compiled server
- \`npm run build\` - Build project (compile TypeScript)
- \`npm run type-check\` - Run TypeScript type checker
- \`npm run lint\` - Check code with ESLint
- \`npm run lint:fix\` - Auto-fix linting issues
- \`npm run format\` - Format code with Prettier
- \`npm run format:check\` - Check code formatting
- \`npm run test\` - Run tests in watch mode
- \`npm run test:run\` - Run tests once (CI mode)
- \`npm run test:ui\` - Interactive test UI in browser
- \`npm run coverage\` - Generate test coverage report

## Project Structure

\`\`\`
src/
├── index.ts           # Application entry point
├── utils/             # Utility functions
└── __tests__/         # Test files
.github/
├── workflows/
│   └── ci.yml         # GitHub Actions CI pipeline
.husky/               # Git hooks
.vscode/              # VS Code settings
\`\`\`

## Code Quality

This project includes:

- **TypeScript** - Static type checking
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Husky** - Git hooks for pre-commit checks
- **GitHub Actions** - Automated CI/CD pipeline

### Pre-commit Hooks

When you commit code, Husky automatically:

1. Runs tests
2. Type checks your code
3. Lints and formats staged files

If any check fails, the commit is blocked until you fix the issues.

## Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`
PORT=3000
\`\`\`

See \`.env.example\` for available variables.

## License

ISC
`;

  fs.writeFileSync(filePath, readme);
}

function removeTemplateFiles() {
  const filesToRemove = [path.join(projectRoot, "template-instructions.md"), path.join(projectRoot, "scripts", "init.js")];

  for (const file of filesToRemove) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      log(`  ✓ Removed ${path.relative(projectRoot, file)}`, "gray");
    }
  }

  // Remove scripts directory if it's now empty
  const scriptsDir = path.join(projectRoot, "scripts");
  if (fs.existsSync(scriptsDir) && fs.readdirSync(scriptsDir).length === 0) {
    fs.rmdirSync(scriptsDir);
    log(`  ✓ Removed empty scripts directory`, "gray");
  }
}

function removeGitHistory() {
  const gitDir = path.join(projectRoot, ".git");
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
    log(`  ✓ Removed git history`, "gray");
  }
}

function initializeGit(projectName) {
  try {
    execSync("git init", { cwd: projectRoot, stdio: "pipe" });
    execSync("git add .", { cwd: projectRoot, stdio: "pipe" });
    execSync('git commit -m "feat: initialize project from template"', {
      cwd: projectRoot,
      stdio: "pipe",
    });
    log(`  ✓ Initialized git repository with initial commit`, "gray");
  } catch (error) {
    log(`  ⚠ Could not initialize git (this is optional)`, "yellow");
  }
}

async function main() {
  log("\n═══════════════════════════════════════════════════════════", "bright");
  log("  TypeScript Backend Template - Project Setup", "bright");
  log("═══════════════════════════════════════════════════════════\n", "bright");

  // Get project name
  let projectName = "";
  let isValid = false;

  while (!isValid) {
    projectName = await prompt("What is your project name? (e.g., my-awesome-api)");
    const validation = validateProjectName(projectName);

    if (!validation.valid) {
      log(`  ✗ ${validation.error}`, "yellow");
    } else {
      isValid = true;
    }
  }

  // Get optional description
  const description = await prompt("Project description (optional - press Enter to skip):");

  // Get optional author
  const author = await prompt("Author name (optional - press Enter to skip):");

  log("\n" + "─".repeat(63), "gray");
  log("Setting up your project...\n", "blue");

  // Update files
  updatePackageJson(projectName, description, author);
  log(`  ✓ Updated package.json`, "gray");

  updateReadme(projectName, description);
  log(`  ✓ Generated README.md`, "gray");

  removeTemplateFiles();

  removeGitHistory();
  initializeGit(projectName);

  log("\n" + "─".repeat(63), "gray");
  log("\n✨ Project setup complete!\n", "green");

  log("Next steps:", "bright");
  log(`  1. cd ${projectName}`, "blue");
  log(`  2. npm install`, "blue");
  log(`  3. npm run dev`, "blue");
  log("\nHappy coding! 🚀\n", "green");
}

main().catch((error) => {
  log(`\n✗ Error: ${error.message}\n`, "yellow");
  process.exit(1);
});
