const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "testing user",
  email: "testinguser1@test.com",
  password: "testingpass@123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await User(userOne).save();
});

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "testing user",
      email: "testinguser@test.com",
      password: "testingpass@123",
    })
    .expect(201);

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "testing user",
      email: "testinguser@test.com",
    },
    token: user.tokens[0].token,
  });
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(response.body.user._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not allow non-existint user", async () => {
  await request(app)
    .post("users/login")
    .send({
      email: userOne.email,
      password: "aaaaaaaaaaaaa",
    })
    .expect(404);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for non-authenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should allow user to delete its account", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(response.body._id);
  expect(user).toBeNull();
});

test("should not allow user to delete its account", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `${userOne.tokens[0].token}`)
    .attach("image", "tests/fixtures/profile.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should change valid field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `${userOne.tokens[0].token}`)
    .send({ name: "new name" })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toBe("new name");
});

test("shoud not allow invalid fields to be updated", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `${userOne.tokens[0].token}`)
    .send({ location: "Ahmedabad" })
    .expect(400);
});
