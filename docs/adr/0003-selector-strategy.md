# ADR 0003 - Selector Strategy

Date: 2026-05-11
Status: Accepted

## Context

The project targets OrangeHRM Demo - a third-party Vue SPA built on the OXD design
system. We do not control the frontend, so we cannot add `data-testid` attributes.
Without an explicit policy, each engineer picks selectors by taste, creating drift:
some use `getByRole`, others use CSS class chains, others use `hasText` on English
labels. The drift compounds when OXD is upgraded.

## Decision

Apply selectors in strict priority order. Stop at the first level that works.

### Priority table

| Priority | Locator type                   | Example                                  | Use when                                                     |
| -------- | ------------------------------ | ---------------------------------------- | ------------------------------------------------------------ |
| 1        | `getByRole` + accessible name  | `getByRole('button', { name: 'Login' })` | Element has a meaningful ARIA role and name                  |
| 2        | `getByLabel`                   | `getByLabel('First Name')`               | Form field linked to a `<label>`                             |
| 3        | `getByPlaceholder`             | `getByPlaceholder('Username')`           | Input with placeholder, no label                             |
| 4        | `getByText`                    | `getByText('Dashboard')`                 | Static visible text, no role                                 |
| 5        | Semantic HTML attribute        | `locator('input[name="firstName"]')`     | Stable HTML attribute set by the framework                   |
| 6        | OXD CSS class (via OXD const)  | `locator(OXD.table.card)`                | OXD element with no ARIA semantics (document in OXD const)   |
| 7        | XPath / nth-child / positional | -                                        | **Prohibited** without written justification in code comment |

### Rules

1. **All OXD CSS class strings live in `src/constants/oxd-selectors.ts`** (the `OXD`
   object). Never write an OXD class string inline in a Page Object or Component.
   When OXD ships a new version, edit that file only.

2. **Locale-bound selectors** (English label text, English placeholder) are acceptable
   for this project because the OrangeHRM Demo target is English-only. Document this
   assumption with a comment when the selector is not obviously locale-neutral.

3. **Icon-class selectors** (`button:has(i.bi-trash)`) are allowed as a last resort
   when the button has no accessible name. Add a comment: `// OXD action button has no
accessible name - located by Bootstrap icon class`.

4. **`:has()` CSS chains longer than two levels** require explicit justification.
   Prefer Playwright's `.filter({ has: locator })` for scoping.

## Consequences

### Positive

- Selector failures caused by OXD upgrades are isolated to `oxd-selectors.ts`.
- New team members have a clear decision tree, no guesswork.
- Reviewers can flag violations by checking the priority table.

### Negative

- OXD elements with no semantic markup force us to level 6 or 7, keeping some CSS
  coupling. This is a product limitation, not a framework limitation.

## Rejected alternatives

### data-testid everywhere

We do not control the OrangeHRM frontend. Not applicable.

### XPath

Verbose, brittle, no auto-waiting in Playwright. Prohibited unless no alternative
exists (requires justification comment).

## See also

- `src/constants/oxd-selectors.ts` - the OXD selector registry
- `docs/adr/0001-domain-first-test-api.md` - why selectors live in Page Objects
