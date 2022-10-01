import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("createBlog is called with correct information", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);
  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const submitButton = screen.getByText("create");

  await user.type(title, "best blog");
  await user.type(author, "George Best");
  await user.type(url, "manutd.com");
  await user.click(submitButton);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("best blog");
  expect(createBlog.mock.calls[0][0].author).toBe("George Best");
  expect(createBlog.mock.calls[0][0].url).toBe("manutd.com");
});
