# AQA-TOAD-SKELETON

Ultimate SDET Framework Skeleton | Playwright + TypeScript + Zod | OrangeHRM Demo

This is a production-grade automation framework designed for modern web applications. It implements advanced engineering patterns to ensure high cohesion, low coupling, and exceptional test stability.

## 🚀 Key Architectural Features

- **Domain-Driven Page Object Model**: Full encapsulation of DOM details. Page Objects expose high-level domain actions and assertions, keeping spec files clean and focused on business scenarios.
- **Strict Private Locators**: Locators are kept private and initialized in constructors using modern Playwright selectors (`getByRole`, `getByPlaceholder`, `getByLabel`), following accessibility best practices.
- **Hybrid UI/API Testing**: Integrated API clients for lightning-fast test data setup and teardown, combined with robust UI verification.
- **Fail-Fast Environment Validation**: Automated configuration validation on startup using **Zod**, preventing runtime failures due to environment drift.
- **Advanced CI/CD Pipelines**:
  - **PR Checks**: Automated linting, type-checking, and smoke testing on every Pull Request.
  - **Scalable Regression**: Nightly runs with worker-level sharding and automated report merging.
- **Professional Tooling**:
  - **Husky & lint-staged**: Automated Prettier formatting on every commit.
  - **Custom Slack Reporting**: Real-time test results with flaky-test detection and GitHub Action run links.
  - **Allure Integration**: Transparent reporting with automated business-level steps.

## 🛠 Tech Stack

- **Language**: TypeScript (Modern ESNext / Bundler resolution)
- **Test Runner**: [Playwright](https://playwright.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **VCS Hooks**: [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged)
- **Linting/Formatting**: ESLint & Prettier
- **Target App**: [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/)

## 🏗 Project Structure

```
project-root/
├── .github/workflows/       # CI/CD pipelines (Lint, Smoke, Nightly)
├── src/
│   ├── api/                 # Typed API clients and Zod schemas
│   ├── config/              # Validated environment configuration
│   ├── core/                # Framework engine and base classes
│   ├── components/          # Domain-specific UI components (OrangeTable, etc.)
│   ├── constants/           # Centralized routes, endpoints, and domain labels
│   ├── pages/               # Domain-Driven Page Objects
│   ├── fixtures/            # Modular Playwright fixtures (Auth, API, Page)
│   ├── helpers/             # Data Builders and utility helpers
│   └── reporters/           # Custom test reporters (Slack)
├── tests/                   # Tiered test suites (Smoke, Critical, Regression)
└── playwright.config.ts     # Global Playwright settings
```

## 🚦 Getting Started

1.  **Installation**:

    ```bash
    npm install
    npx playwright install
    ```

2.  **Configuration**:
    Copy `.env.example` to `.env`. For the OrangeHRM demo site, safe defaults are applied automatically.

    ```bash
    cp .env.example .env
    ```

3.  **Execution**:

    ```bash
    # Run smoke tests
    npm run test:smoke

    # Run in headed mode
    HEADLESS=false npx playwright test --project=smoke
    ```

## 📋 Engineering Standards

- **Encapsulation**: Never expose raw Playwright locators or `expect` calls in spec files.
- **Atomicity**: Tests are independent and manage their own data lifecycle via fixtures.
- **Branching**: Strict "Feature Branch -> Pull Request" workflow enforced by the Git Workflow Manifesto.
- **Type Safety**: No `any` type allowed. Strict TypeScript checking is part of the CI pipeline.

---

_Stay professional, stay focused._
