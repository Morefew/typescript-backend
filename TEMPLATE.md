# Template Documentation

This document details all components included in the TypeScript Backend Template.

## Template Overview

This is a production-ready Express.js backend template with modern tooling, best practices, and automated quality checks.

**Version:** 1.0.0  
**Node.js Required:** 22+  
**Package Manager:** npm

---

## 📦 Dependencies

### Core

- **express** `^5.2.1` - Web application framework for Node.js

### Dev Dependencies

#### TypeScript & Type Definitions

- **typescript** `^5.9.3` - TypeScript compiler
- **@tsconfig/node22** `^22.0.5` - TypeScript config optimized for Node.js 22
- **@types/node** `^25.0.3` - Type definitions for Node.js
- **@types/express** `^5.0.6` - Type definitions for Express

#### Linting & Formatting

- **eslint** `^9.39.2` - JavaScript linter
- **@eslint/js** `^9.39.2` - ESLint's default JS configuration
- **typescript-eslint** `^8.50.1` - TypeScript linting support
- **eslint-plugin-perfectionist** `^5.1.0` - Import/export sorting
- **prettier** `^3.7.4` - Code formatter

#### Testing

- **vitest** `^4.0.16` - Unit testing framework
- **@vitest/coverage-v8** `^4.0.16` - Code coverage reporting
- **@vitest/eslint-plugin** `^1.6.4` - ESLint plugin for test files

#### Git Hooks & CI

- **husky** `^9.x.x` - Git hooks manager
- **lint-staged** `^15.x.x` - Run linters on staged files
- **concurrently** `^9.2.1` - Run multiple commands concurrently

#### Development Server

- **tsx** `^4.21.0` - Fast TypeScript runner (for future use if needed)

---

## 📂 File Structure

```
typescript-backend-template/
│
├── src/                          # Source code
│   ├── index.ts                  # Application entry point
│   ├── utils/
│   │   └── sum.ts                # Example utility function
│   └── __tests__/
│       └── sum.spec.ts           # Example test file
│
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CD pipeline
│
├── .husky/
│   └── pre-commit                # Pre-commit git hook
│
├── .vscode/
│   ├── extensions.json           # Recommended VS Code extensions
│   └── settings.json             # VS Code workspace settings
│
├── scripts/
│   └── init.js                   # Interactive project setup script
│
├── .env                          # Environment variables (local)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .nvmrc                        # Node.js version specification
├── .prettierrc                   # Prettier configuration
├── .prettierignore               # Prettier ignore rules
│
├── eslint.config.js              # ESLint configuration (flat config)
├── vitest.config.js              # Vitest configuration
├── tsconfig.json                 # TypeScript compiler options
├── tsconfig.build.json           # TypeScript build config (no tests)
│
├── package.json                  # Project metadata & dependencies
├── package-lock.json             # Dependency lock file
│
├── README.md                     # This file (template guide)
├── TEMPLATE.md                   # Template documentation
├── template-instructions.md      # (Removed after init)
└── LICENSE                       # MIT License
```

---

## ⚙️ Configuration Details

### TypeScript Configuration (`tsconfig.json`)

Extends `@tsconfig/node22` with:

- **outDir**: `./dist` - Compiled output location
- **rootDir**: `./` - Source root
- **module**: `nodenext` - ES modules with Node.js compatibility
- **target**: `esnext` - Modern JavaScript output
- **strict**: `true` - Strict type checking enabled
- **esModuleInterop**: `true` - CommonJS/ESM interoperability
- **verbatimModuleSyntax**: ~~`true`~~ (removed to allow esModuleInterop)
- **moduleDetection**: `force` - Force ES modules
- **skipLibCheck**: `true` - Skip type checking of declaration files

### Build Configuration (`tsconfig.build.json`)

Extends `tsconfig.json` but excludes:

- `**/*.test.ts`
- `**/*.spec.ts`

This ensures test files aren't included in production builds.

### ESLint Configuration (`eslint.config.js`)

Uses flat config format with:

- **eslint.configs.recommended** - ESLint recommended rules
- **typescript-eslint.configs.strictTypeChecked** - Strict TS rules
- **typescript-eslint.configs.stylisticTypeChecked** - Style rules
- **eslint-plugin-perfectionist** - Import sorting rules
- **@vitest/eslint-plugin** - Test-specific rules for `*.spec.ts` and `*.test.ts`

Ignores: `**/*.js` (compiled output) and `dist/` (build output)

### Prettier Configuration (`.prettierrc`)

```json
{
  "printWidth": 150
}
```

Formatting rules that respect Prettier defaults except:

- Line width: 150 characters (instead of default 80)

### Vitest Configuration (`vitest.config.js`)

Uses default Vitest settings with no custom configuration needed.

### Package.json Scripts

| Script         | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `dev`          | Start development with auto-reload and watch mode |
| `start`        | Run compiled server                               |
| `build`        | Clean dist and compile TypeScript                 |
| `type-check`   | Run TypeScript type checker                       |
| `lint`         | Check code with ESLint                            |
| `lint:fix`     | Auto-fix ESLint issues                            |
| `format`       | Format code with Prettier                         |
| `format:check` | Verify code formatting                            |
| `test`         | Run tests in watch mode                           |
| `test:run`     | Run tests once (CI mode)                          |
| `test:ui`      | Interactive test UI                               |
| `coverage`     | Generate coverage report                          |
| `init`         | Setup script (removed after first run)            |
| `prepare`      | Husky initialization hook                         |

---

## 🔐 Pre-commit Hooks (Husky)

Located in `.husky/pre-commit`:

```bash
npm run test:run      # Run all tests once
npm run type-check    # Type check entire project
npx lint-staged       # Lint and format staged files
```

### lint-staged Configuration

Defined in `package.json`:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --check"],
  "*.{json,yml,yaml,md}": ["prettier --check"]
}
```

Check-only approach: Issues are reported but not auto-fixed, allowing developers to review and fix manually.

---

## 🚀 GitHub Actions CI/CD (`.github/workflows/ci.yml`)

Runs on every push to `main`:

1. Checkout code
2. Setup Node.js from `.nvmrc`
3. Install dependencies (`npm ci`)
4. Run tests (`npm run test:run`)
5. Type check (`npm run type-check`)
6. Lint with fix (`npm run lint:fix`)
7. Format with Prettier (`npm run format`)
8. Final lint check (`npm run lint`)
9. Final format check (`npm run format:check`)

All checks must pass for the workflow to succeed.

---

## 📝 VS Code Integration

### Recommended Extensions (`.vscode/extensions.json`)

- **ESLint** (`dbaeumer.vscode-eslint`) - Real-time linting
- **Prettier** (`esbenp.prettier-vscode`) - Code formatting
- **TypeScript** (`ms-vscode.vscode-typescript-next`) - TypeScript support

### Workspace Settings (`.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

Auto-format code on save using Prettier.

---

## 🔄 Subpath Imports Configuration

Defined in `package.json`:

```json
"imports": {
  "#*": "./src/*"
}
```

Allows clean imports:

```typescript
// Instead of:
import { sum } from "../../utils/sum.js";

// Write:
import { sum } from "#utils/sum.js";
```

---

## 🧪 Testing Setup

### Vitest Features

- Fast unit testing with ESM support
- TypeScript support without configuration
- Built-in code coverage with V8
- Interactive UI mode
- Watch mode for development

### Test File Organization

- Test files: `src/__tests__/**/*.spec.ts`
- Utility files: `src/utils/**/*.ts`
- Naming convention: `<name>.spec.ts` or `<name>.test.ts`

### Example Test

```typescript
import { describe, expect, it } from "vitest";
import { sum } from "#utils/sum.js";

describe("sum function", () => {
  it("should add two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

---

## 📦 Environment Variables

### `.env` File

Local environment variables (not committed to git).

### `.env.example`

Template for required environment variables:

```env
PORT=
```

### Usage

```typescript
const port = process.env.PORT ?? "3000";
```

Environment variables are read automatically by Node.js 20.6+.

---

## 🔌 Git Ignore Rules

Comprehensive `.gitignore` excludes:

- Node modules: `node_modules/`
- Build output: `dist/`, `build/`
- Environment: `.env`, `.env.*` (except `.env.example`)
- Logs: `*.log`, logs/
- IDE: `.vscode/`, `.idea/`, `*.swp`
- OS: `.DS_Store`, `Thumbs.db`
- Test coverage: `coverage/`
- Temporary: `.next/`, `.nuxt/`, `.cache/`

---

## 🎯 Best Practices Implemented

1. **Type Safety**
   - Strict TypeScript configuration
   - No implicit any
   - Strict null checks

2. **Code Quality**
   - Linting with ESLint
   - Formatting with Prettier
   - Pre-commit hooks enforce standards

3. **Testing**
   - Unit tests with Vitest
   - Code coverage reporting
   - Test files collocated with features

4. **CI/CD**
   - Automated GitHub Actions workflow
   - Tests on every push
   - Type checking in pipeline

5. **Developer Experience**
   - Auto-format on save
   - Fast development server (tsx)
   - Interactive test UI
   - Meaningful npm scripts

6. **Maintainability**
   - Clear project structure
   - Self-documenting configuration
   - Example files and comments

---

## 🚀 Next Steps After Setup

1. **Customize** - Run `npm run init` to personalize your project
2. **Install Dependencies** - `npm install`
3. **Start Developing** - `npm run dev`
4. **Write Tests** - Add `.spec.ts` files alongside your code
5. **Commit** - Husky will run pre-commit checks automatically

---

## 📄 License

MIT - Free to use for personal and commercial projects.

---

## 📞 Support

For issues with the template itself, refer to the original template repository.

For issues with specific tools:

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
