import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author but nothing more at first", async () => {
  const loggedUser = {
    username: "Mr. Musk",
    name: "Elon",
    id: 42,
  };
  const blog = {
    title: "Doge to the moon",
    author: "Elon Musk",
    likes: 42,
    url: "tesla.com",
    user: loggedUser,
  };

  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />);

  const element = screen.getByText("Doge to the moon Elon Musk");
  expect(element).toBeDefined();
  const titleAndAuthor = container.querySelector("#titleAndAuthor");
  expect(titleAndAuthor).not.toHaveStyle("display: none");
  const additionalInfo = container.querySelector("#additionalInfo");
  expect(additionalInfo).toHaveStyle("display: none");
});

test("renders all info when button is pressed", async () => {
  const loggedUser = {
    username: "Mr. Musk",
    name: "Elon",
    id: 42,
  };
  const blog = {
    title: "Doge to the moon",
    author: "Elon Musk",
    likes: 42,
    url: "tesla.com",
    user: loggedUser,
  };

  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const element = screen.getByText("Doge to the moon Elon Musk");
  expect(element).toBeDefined();
  const urlElement = screen.getByText("tesla.com");
  expect(urlElement).toBeDefined();

  const titleAndAuthor = container.querySelector("#titleAndAuthor");
  expect(titleAndAuthor).not.toHaveStyle("display: none");
  const additionalInfo = container.querySelector("#additionalInfo");
  expect(additionalInfo).not.toHaveStyle("display: none");
});

test("two clicks causes event handler to be called twice", async () => {
  const loggedUser = {
    username: "Mr. Musk",
    name: "Elon",
    id: 42,
  };
  const blog = {
    title: "Doge to the moon",
    author: "Elon Musk",
    likes: 42,
    url: "tesla.com",
    user: loggedUser,
  };

  const mockHandler = jest.fn();
  render(<Blog blog={blog} loggedUser={loggedUser} likeBlog={mockHandler} />);

  const user = userEvent.setup();
  // const viewButton = screen.getByText('view')
  // await user.click(viewButton)
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
