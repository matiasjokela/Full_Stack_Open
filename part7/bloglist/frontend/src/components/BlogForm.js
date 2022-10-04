import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleAdding = async (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    );
    dispatch(setNotification(`a new blog ${title} by ${author} added`, 5));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAdding}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </>
  );
};

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// };

export default BlogForm;
