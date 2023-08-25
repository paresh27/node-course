const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userOneId,
  setupDatabase,
  userTwo,
  userTwoId,
  taskOne,
  taskTwo,
  taskThree,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("should create a task for a user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "From my test" })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

test("should get all task of a user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body).toHaveLength(2);
});

test("other user should not be able to delete someone else's task", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
