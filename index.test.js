const request = require("supertest");
const app = require("./src/app");
const { Fruit,  User } = require("./models/index");

const { execSync } = require('child_process');
execSync('npm run seed');

describe("Test GET route", () => {
    it("GET /users works correctly", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toEqual(200);
    });
    it("GET /users returns an array of users", async () => {
        const response = await request(app).get("/users");
        expect(Array.isArray(response.body)).toBe(true);
    });
    it("GET /users returns the correct number of users", async () => {
        const response = await request(app).get("/users");
        const users = await User.findAll();
        expect(response.body.length).toBe(users.length);
    });
    it("GET /users returns the correct user data", async () => {
        const response = await request(app).get("/users");
        const user = await User.findAll();
        expect(response.body[0].name).toBe(user[0].name);
        expect(response.body[0].email).toBe(user[0].email);
        expect(response.body[0].age).toBe(user[0].age);
    });
    it("GET /users/:id returns the correct data", async () => {
        const response = await request(app).get("/users/1");
        const user = await User.findByPk(1);
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
        expect(response.body.age).toBe(user.age);
    });
})

describe("Test POST route", () => {
    it("POST /users returns user array that includes new user", async () => {
        const newUser = {
            name: "Test User",
            age: 25,
        }
        const response = await request(app).post("/users").send(newUser);
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.age).toBe(newUser.age);
    })
})

describe("Test PUT route", () => {
    it("PUT /users/:id updates the user with provided value", async () => {
        const updatedUser = {
            id: 2,
            name: "Updated User",
            age: 30,
        }
        await request(app).put("/users/2").send(updatedUser);
        const user = await User.findByPk(2);
        expect(user.name).toBe(updatedUser.name);
        expect(user.age).toBe(updatedUser.age);
    })
})

describe("Test DELETE route", () => {
    it("DELETE /users/:id deletes the user with provided id", async () => {
        const response = await request(app).delete("/users/1");
        expect(response.body).toBe(1);
    })
})