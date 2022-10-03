export type Post = {
  id: string | number;
  title: string;
  coverImage: string;
  slug: string;
  createdOn: string;
  category: string;
  hashTags?: Array<string>;
};
