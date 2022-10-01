const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("adding users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test("duplicate usernames cannot be added", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "rutheless",
      password: "sasa",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("username and password must be defined", async () => {
    const usersAtStart = await helper.usersInDb();
    const noUsername = {
      name: "rutheless",
      password: "sasa",
    };
    const noPassword = {
      username: "ruth",
      name: "rutheless",
    };
    const result = await api
      .post("/api/users")
      .send(noUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain("must have username and password");

    const anotherResult = await api
      .post("/api/users")
      .send(noPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(anotherResult.body.error).toContain(
      "must have username and password"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("username and password atleast 3 chars", async () => {
    const usersAtStart = await helper.usersInDb();
    const badUsername = {
      username: "ro",
      name: "rutheless",
      password: "sasa",
    };
    const badPassword = {
      username: "rooted",
      name: "rutheless",
      password: "sa",
    };
    const result = await api
      .post("/api/users")
      .send(badUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    const anotherResult = await api
      .post("/api/users")
      .send(badPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(anotherResult.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
