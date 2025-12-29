# TypeScript Backend Template

A production-ready Express.js backend template with TypeScript, ESLint, Prettier, Vitest, and GitHub Actions CI/CD.

## 🚀 Quick Start

### Using This Template

1. Click **"Use this template"** → **"Create a new repository"** on GitHub
2. Clone your new repository locally
3. Run the setup script:
   ```bash
   npm install
   npm run init
   ```
4. Follow the interactive prompts to customize your project
5. Start developing:
   ```bash
   npm run dev
   ```

### What the Setup Script Does

The `npm run init` command will:

- Prompt for your project name and description
- Update `package.json` with your project details
- Generate a customized `README.md`
- Clean up template-specific files
- Initialize a fresh git repository

## ✨ What's Included

### Core Technologies

- **Express.js** - Web framework for Node.js
- **TypeScript** - Static type checking
- **Node.js 22** - Latest LTS version

### Development Tools

- **tsx** - Fast TypeScript runner (no build step needed)
- **Vitest** - Modern unit testing framework
- **ESLint** - Code linting with flat config
- **Prettier** - Code formatter
- **TypeScript ESLint** - TypeScript-aware linting

### Quality Assurance

- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files
- **GitHub Actions** - Automated CI/CD pipeline

### Developer Experience

- **Auto-formatting** - Prettier on save in VS Code
- **Pre-commit hooks** - Auto-run tests and linting
- **Subpath imports** - Clean imports with `#*` prefix
- **Environment variables** - Built-in `.env` support

## 📋 Available Scripts

Once you've set up your project, you'll have access to these npm scripts:

```bash
# Development
npm run dev           # Start server with auto-reload
npm run start         # Run compiled server

# Building & Type Checking
npm run build         # Build project (compile TypeScript)
npm run type-check    # Run TypeScript type checker only

# Code Quality
npm run lint          # Check code with ESLint
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting

# Testing
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once (CI mode)
npm run test:ui       # Interactive test UI in browser
npm run coverage      # Generate test coverage report
```

## 📁 Project Structure

```
src/
├── index.ts           # Application entry point
├── utils/             # Utility functions
└── __tests__/         # Test files

.github/
├── workflows/
│   └── ci.yml         # GitHub Actions CI pipeline

.husky/               # Git hooks
.vscode/              # VS Code settings & extensions
```

## 🔧 Configuration Files

- **tsconfig.json** - TypeScript compiler options (extends @tsconfig/node22)
- **tsconfig.build.json** - Build config (excludes test files)
- **vitest.config.js** - Vitest test runner config
- **eslint.config.js** - ESLint flat config with TypeScript support
- **.prettierrc** - Prettier formatting rules
- **.env.example** - Example environment variables

## 🚦 Git Hooks & CI/CD

### Pre-commit Checks (via Husky)

When you commit code, the following checks run automatically:

1. **Tests** - Runs unit tests (`npm run test:run`)
2. **Type Checking** - Validates TypeScript (`npm run type-check`)
3. **Linting** - Checks code quality on staged files
4. **Formatting** - Validates code style on staged files

If any check fails, the commit is blocked. Fix the issues and try again.

### GitHub Actions Workflow

The CI pipeline runs on every push to main and:

1. Sets up Node.js from `.nvmrc`
2. Installs dependencies
3. Runs tests
4. Type checks code
5. Runs ESLint
6. Runs Prettier
7. Validates all quality gates

## 💡 Tips & Best Practices

### Using Subpath Imports

Instead of: `import { sum } from "../../../utils/sum.js"`

You can write: `import { sum } from "#utils/sum.js"`

Configure in `package.json`:

```json
"imports": {
  "#*": "./src/*"
}
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
```

Access in code: `process.env.PORT`

See `.env.example` for available variables.

### Adding Tests

Create test files with `.spec.ts` or `.test.ts` extension:

```typescript
import { describe, expect, it } from "vitest";
import { myFunction } from "#utils/myFunction.js";

describe("myFunction", () => {
  it("should work correctly", () => {
    expect(myFunction()).toBe(true);
  });
});
```

## 🔄 Keeping Your Project Updated

This template is frozen to ensure stability. For future projects, simply use the template again instead of merging updates into existing projects.

If you need improvements to the template itself, create a new version in the template repository.

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)

## 📄 License

ISC
