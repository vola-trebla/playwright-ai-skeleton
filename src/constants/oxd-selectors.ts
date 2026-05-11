/**
 * OrangeHRM (OXD design system) CSS selectors.
 *
 * Single source of truth for product-specific class names. Prefer a11y locators
 * (getByRole / getByLabel / getByText) over anything listed here - this map is
 * only for cases where the product does not expose stable ARIA semantics.
 *
 * When OrangeHRM updates the OXD version, edit this file - not Page Objects.
 */
export const OXD = {
  table: {
    root: '.oxd-table',
    /** Two variants seen across OXD versions - keep both for defensive matching. */
    row: 'tbody tr, .oxd-table-body .oxd-table-card',
    card: '.oxd-table-body .oxd-table-card',
    cell: '.oxd-table-cell, td',
    columnHeader: '.oxd-table-header [role="columnheader"]',
  },
  form: {
    root: '.oxd-form',
    inputGroup: '.oxd-input-group',
  },
  dialog: {
    title: '.oxd-dialog-title',
    dangerButton: 'button.oxd-button--label-danger',
    textButton: 'button.oxd-button--text',
  },
  alert: {
    content: '.oxd-alert-content-text',
  },
  login: {
    brandingLogo: '.orangehrm-login-branding img',
  },
  icons: {
    trash: 'i.bi-trash',
  },
} as const;
