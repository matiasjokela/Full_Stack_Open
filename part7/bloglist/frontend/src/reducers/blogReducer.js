import blogService from "../services/blogs";

const addBlog = (newBlog) => {
  return {
    type: "NEW_BLOG",
    data: { newBlog },
  };
};

const setBlogs = (blogs) => {
  return {
    type: "SET_BLOGS",
    data: { blogs },
  };
};

const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return state.concat(action.data.newBlog);
    case "SET_BLOGS":
      return action.data.blogs;
    default:
      return state;
  }
};

export { createBlog, initializeBlogs };

export default reducer;

//   const deleteBlog = async (id) => {
//     const returnedBlog = await blogService.remove(id);
//     console.log(returnedBlog);
//     const allBlogs = await blogService.getAll();
//     setBlogs(allBlogs);
//   };

//   const likeBlog = async (blogObject, id) => {
//     const returnedBlog = await blogService.update(blogObject, id);
//     console.log(returnedBlog);
//     const allBlogs = await blogService.getAll();
//     setBlogs(allBlogs);
//   };

//   const addBlog = async (blogObject) => {
//     addBlogRef.current.toggleVisibility();
//     try {
//       const returnedBlog = await blogService.create(blogObject);
//       console.log(returnedBlog);
//       const allBlogs = await blogService.getAll();
//       setBlogs(allBlogs);
//     } catch (exception) {
//       console.log(exception);
//     }
//   };
