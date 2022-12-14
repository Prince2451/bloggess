const apiUrls = {
  auth: {
    refreshToken: "/auth/token",
    login: "/auth/login",
    register: "/auth/register",
    user: "/auth/user",
  },
  posts: {
    all: "/posts",
    single: "/posts/:postId",
    create: "/posts",
    edit: "/posts/:postId",
    delete: "/posts/:postId",
    uploadCoverImage: "posts/cover-image",
  },
};

export default apiUrls;
