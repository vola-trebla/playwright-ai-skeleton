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
├── .github/workflows/       # CI/CD pipelines (Lint + Typecheck, Smoke, Nightly)
├── docs/
│   ├── adr/                 # Architecture Decision Records
│   └── CONVENTIONS.md       # Test naming, imports, selector and builder rules
├── src/
│   ├── api/                 # Typed API clients (EmployeeApiClient), Zod schemas, ApiError
│   ├── config/              # Zod-validated environment configuration
│   ├── core/                # Base classes: BasePage, BaseComponent, StaticRoutePage
│   ├── components/          # Reusable UI components (OrangeTable)
│   ├── constants/           # Routes, API endpoints, OXD selectors, test tags
│   ├── pages/               # Page Objects (domain actions + assertions, no raw locators)
│   ├── fixtures/            # Fixture chain: auth -> api -> page (worker-scoped auth)
│   ├── helpers/             # BaseBuilder, EmployeeBuilder, waitForApi
│   └── reporters/           # Custom Slack reporter with flaky-test detection
├── tests/                   # Tiered spec suites
│   ├── smoke/               # Fast sanity checks (PR gate)
│   ├── critical/            # Happy-path end-to-end scenarios
│   ├── regression/          # Negative and edge-case scenarios
│   └── api/                 # Contract tests (API shape and semantics)
└── playwright.config.ts     # Projects: smoke, api, regression-chrome
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

- **Encapsulation**: Assertions and locators live in Page Objects. Spec files express domain intent only. See [ADR 0001](docs/adr/0001-domain-first-test-api.md).
- **Fixture chain**: `authTest -> apiTest -> test` with worker-scoped storage state. See [ADR 0002](docs/adr/0002-fixture-architecture.md).
- **Selector priority**: `getByRole` first, OXD CSS classes isolated to `src/constants/oxd-selectors.ts`, XPath prohibited. See [ADR 0003](docs/adr/0003-selector-strategy.md).
- **Atomicity**: Tests are independent and manage their own data lifecycle via fixtures.
- **Branching**: Strict "Feature Branch -> Pull Request" workflow enforced by the Git Workflow Manifesto.
- **Type Safety**: No `any` type allowed. Strict TypeScript checking (`noUncheckedIndexedAccess`, `noImplicitOverride`) is part of the CI pipeline.
- **Conventions**: Test naming, import order, builder usage, tag constants - see [CONVENTIONS](docs/CONVENTIONS.md).

---

_Stay professional, stay focused._
