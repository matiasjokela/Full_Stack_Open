import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const addBlogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("logged in as", user);
    } catch (exception) {
      console.log(exception);
      setUser(null);
      setUsername("");
      setPassword("");

      dispatch(setNotification("wrong username or password", 5));
    }
  };

  const deleteBlog = async (id) => {
    const returnedBlog = await blogService.remove(id);
    console.log(returnedBlog);
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
  };

  const likeBlog = async (blogObject, id) => {
    const returnedBlog = await blogService.update(blogObject, id);
    console.log(returnedBlog);
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={addBlogRef}>
      <BlogForm />
    </Togglable>
  );

  const loggedInView = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      {blogForm()}
      {blogs.map((blog) => {
        console.log(blogs);
        return (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            loggedUser={user}
            removeBlog={deleteBlog}
          />
        );
      })}
    </div>
  );

  return <>{user === null ? loginForm() : loggedInView()}</>;
};

export default App;
