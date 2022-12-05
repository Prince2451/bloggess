export type UserRole = "admin";

export interface User {
  firstName: string;
  lastName?: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
