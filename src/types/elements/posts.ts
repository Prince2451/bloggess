export interface PostFormFields {
  title: string;
  description: string;
  coverImage: {
    value: File | null;
    url: string;
  };
  content: string;
}

export interface Post {
  id: string | number;
  title: string;
  description: string;
  content: string;
  categories: [string];
  tags: string[];
  coverImage: {
    url: string;
    base64url: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
}
