const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

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

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: "testing user two",
  email: "testinguser2@test.com",
  password: "testingpass@123",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_TOKEN),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task",
  completed: true,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await User(userOne).save();
  await User(userTwo).save();
  await Task.deleteMany();
  await Task(taskOne).save();
  await Task(taskTwo).save();
  await Task(taskThree).save();
};

module.exports = {
  userOne,
  userOneId,
  setupDatabase,
  userTwo,
  userOneId,
  taskOne,
  taskTwo,
  taskThree,
};
