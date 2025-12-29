# How to Use the TypeScript Backend Template

This guide explains how to use the `typescript-backend-template` to create new projects.

## Quick Start

### 1. Create a New Project from Template

Go to: https://github.com/Morefew/typescript-backend-template

Click the **"Use this template"** button → **"Create a new repository"**

Configure your new repository:

- **Repository name** - e.g., `my-api`, `user-service`, `payment-backend`
- **Description** - Brief description of your project
- **Visibility** - Public or Private
- **Include all branches** - Leave unchecked

Click **"Create repository from template"**

### 2. Clone Your New Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git
cd YOUR_PROJECT_NAME
```

### 3. Initialize Your Project

```bash
npm install
npm run init
```

This will launch an interactive setup wizard that prompts for:

- **Project name** - The name of your project (alphanumeric, hyphens allowed)
- **Description** - A brief description (optional)
- **Author name** - Your name (optional)

### 4. Start Developing

```bash
npm run dev
```

The server will start with auto-reload on file changes.

---

## What the Setup Script Does

When you run `npm run init`, the script will:

1. **Update `package.json`**
   - Set your custom project name
   - Add your description (if provided)
   - Set author information (if provided)

2. **Generate `README.md`**
   - Create a new README with your project name
   - Include relevant documentation and usage instructions
   - Keep all the template's guidance

3. **Clean Up Template Files**
   - Remove `template-instructions.md`
   - Remove `scripts/init.js` (this script is one-time use)
   - Remove empty `scripts/` directory if applicable

4. **Initialize Fresh Git**
   - Remove the git history from the template
   - Create a new git repository
   - Make an initial commit: "feat: initialize project from template"

---

## Directory Structure

After setup, your project will have:

```
your-project/
├── src/                          # Your application code
│   ├── index.ts                  # Entry point
│   ├── utils/                    # Utility functions
│   └── __tests__/                # Test files
│
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CD
│
├── .husky/
│   └── pre-commit                # Git hooks for quality checks
│
├── .vscode/                       # VS Code configuration
│
├── .env                          # Environment variables (local, not committed)
├── .env.example                  # Template for required variables
├── .gitignore                    # Git ignore rules
├── .nvmrc                        # Node.js version lock
├── .prettierrc                   # Prettier config
│
├── eslint.config.js              # ESLint configuration
├── vitest.config.js              # Vitest configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.build.json           # TypeScript build config (excludes tests)
│
├── package.json                  # Project metadata
├── package-lock.json             # Dependency lock file
├── README.md                     # Your project documentation
└── LICENSE                       # MIT License
```

---

## Essential npm Scripts

### Development

```bash
npm run dev              # Start server with auto-reload
npm run start            # Run compiled server
npm run build            # Compile TypeScript
npm run type-check       # Check TypeScript types
```

### Code Quality

```bash
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
```

### Testing

```bash
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once (CI mode)
npm run test:ui          # Interactive test UI (browser)
npm run coverage         # Generate coverage report
```

---

## Configuration Files

### `.env` File

Create a `.env` file in your project root for local environment variables:

```env
PORT=3000
DATABASE_URL=postgresql://localhost/mydb
API_KEY=your-secret-key
```

Access in code:

```typescript
const port = process.env.PORT ?? "3000";
const dbUrl = process.env.DATABASE_URL;
```

See `.env.example` for required variables.

### TypeScript Configuration

The template uses:

- **tsconfig.json** - Main TypeScript config (extends @tsconfig/node22)
- **tsconfig.build.json** - Build config that excludes test files

You can customize TypeScript options in `tsconfig.json`.

### ESLint Configuration

Located in `eslint.config.js` with:

- TypeScript support
- Strict type checking rules
- Import sorting via ESLint Perfectionist
- Special rules for test files (Vitest)

Disable specific rules with comments:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const value: any = someValue;
```

### Prettier Configuration

Located in `.prettierrc` with a line width of 150 characters.

Modify if needed:

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

---

## Subpath Imports

Use clean import paths with the `#*` prefix:

```typescript
// Instead of:
import { sum } from "../../utils/sum.js";

// Write:
import { sum } from "#utils/sum.js";
```

This is configured in `package.json` via the `imports` field.

---

## Git Hooks & Pre-commit Checks

### Pre-commit Hook

When you commit code, Husky automatically runs:

1. **Tests** - `npm run test:run`
2. **Type Check** - `npm run type-check`
3. **Lint & Format Check** - `npx lint-staged`

If any check fails:

- Your commit is blocked
- Fix the issues shown in the error message
- Try committing again

### Bypass Hooks (Not Recommended)

```bash
git commit --no-verify  # Skip all hooks
```

Only use in emergencies!

---

## GitHub Actions CI/CD

The template includes a GitHub Actions workflow that runs on every push to `main`.

The workflow:

1. Sets up Node.js 22
2. Installs dependencies
3. Runs all tests
4. Type checks your code
5. Lints with ESLint
6. Formats with Prettier
7. Validates everything passes

View results in the **Actions** tab of your repository.

---

## Writing Tests

Create test files with `.spec.ts` or `.test.ts` extension:

```typescript
import { describe, expect, it } from "vitest";
import { sum } from "#utils/sum.js";

describe("sum function", () => {
  it("should add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("should handle negative numbers", () => {
    expect(sum(-1, 1)).toBe(0);
  });
});
```

### Running Tests

```bash
npm run test              # Watch mode - reruns on file changes
npm run test:run          # Run once (CI mode)
npm run test:ui           # Interactive UI in browser
npm run coverage          # Generate coverage report
```

---

## Adding Dependencies

### Regular Dependencies (used in production)

```bash
npm install express cors helmet
```

These go in `dependencies` in package.json.

### Dev Dependencies (only for development/testing)

```bash
npm install -D @types/cors
```

These go in `devDependencies` in package.json.

### Updating Dependencies

Check for updates:

```bash
npm outdated
```

Update specific packages:

```bash
npm update package-name
```

Update all packages:

```bash
npm update
```

---

## Common Tasks

### Create a New Route

1. Create a handler function:

```typescript
// src/handlers/users.ts
import { RequestHandler } from "express";

export const getUsers: RequestHandler = async (req, res) => {
  res.json({ users: [] });
};
```

2. Add the route:

```typescript
// src/index.ts
import { getUsers } from "#handlers/users.js";

app.get("/users", getUsers);
```

3. Test it:

```bash
npm run dev
# Visit http://localhost:3000/users
```

### Create a Utility Function

1. Create the utility:

```typescript
// src/utils/helpers.ts
export function formatDate(date: Date): string {
  return date.toISOString();
}
```

2. Test it:

```typescript
// src/__tests__/helpers.spec.ts
import { describe, expect, it } from "vitest";
import { formatDate } from "#utils/helpers.js";

describe("formatDate", () => {
  it("should format date to ISO string", () => {
    const date = new Date("2025-01-01");
    expect(formatDate(date)).toContain("2025-01-01");
  });
});
```

3. Run tests:

```bash
npm run test
```

---

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

1. Change it in `.env`:

```env
PORT=3001
```

2. Or kill the process using the port:

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Pre-commit Hook Fails

If Husky hooks fail:

1. Check the error message
2. Run the failing command manually:
   ```bash
   npm run type-check
   npm run lint
   npm run test:run
   ```
3. Fix the issues
4. Try committing again

### Git Clone Issues

If cloning fails with SSH errors, use HTTPS:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT.git
```

### Dependency Issues

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. **Install additional dependencies** - Add libraries you need
2. **Create your first feature** - Start building with the template structure
3. **Write tests** - Add tests alongside your code
4. **Set up environment variables** - Copy `.env.example` to `.env` and fill in values
5. **Push to GitHub** - Commit and push your code
6. **Monitor CI/CD** - Check the Actions tab to see your workflow run

---

## Questions or Issues?

Refer to the tool documentation:

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

**Happy coding! 🚀**
