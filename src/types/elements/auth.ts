export type Post = {
  id: string | number;
  title: string;
  coverImage: string;
  slug: string;
  createdOn: string;
  category: string;
  hashTags?: Array<string>;
};

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
