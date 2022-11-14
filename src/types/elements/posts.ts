export interface PostFormFields {
  title: string;
  description: string;
  coverImage: {
    value: File | null;
    url: string;
  };
  content: string;
}
