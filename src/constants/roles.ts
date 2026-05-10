export const Roles = {
  admin: 'admin',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
