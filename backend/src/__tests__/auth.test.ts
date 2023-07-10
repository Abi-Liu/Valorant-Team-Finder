import supertest from "supertest";
import AuthController from "../controllers/auth";
import createServer from "../config/server";
import mongoose from "mongoose";
import User from "../models/User";
import { MongoMemoryServer } from "mongodb-memory-server";

const userLoginInput = {
  email: "jane.doe@example.com",
  password: "password123",
};

const userRegisterInput = {
  email: "jane.doe@example.com",
  ign: "JaneDoe",
  password: "password123",
  confirmPassword: "password123",
};

describe("auth", () => {
  const OLD_ENV = process.env;
  //@ts-ignore
  let app;
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    process.env.DB_STRING = mongoServer.getUri();
    app = createServer();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    process.env = OLD_ENV;
  });

  //POST Auth Register test
  describe("register user route", () => {
    describe("given empty input fields", () => {
      it("should return a 400 status and a message saying invalid credentials", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send({ ign: "", email: "", password: "", confirmPassword: "" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Invalid Credentials");
      });
    });

    describe("given password and confirm password do not match", () => {
      it("should return a 400 status and a message saying invalid credentials", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send({ ...userRegisterInput, confirmPassword: "password" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Invalid Credentials");
      });
    });

    describe("given all input fields are valid", () => {
      it("should return a 200 and the user info", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send(userRegisterInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          email: "jane.doe@example.com",
          ign: "JaneDoe",
          password: expect.any(String),
          team: "",
        });
      });
    });

    describe("given the email/ign is already taken", () => {
      it("should return a 400 and a message saying that the User already exists", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send(userRegisterInput);

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("User already exists");
      });
    });
  });

  //POST Auth Login tests
  describe("login user route", () => {
    //Empty password field
    describe("given empty password", () => {
      it("should return a 400 and a message saying invalid email or password", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/login")
          .send({ ...userLoginInput, password: "" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Invalid email or password");
      });
    });

    //Empty email field
    describe("given empty email", () => {
      it("should return a 400 and a message saying invalid email or password", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/login")
          .send({ ...userLoginInput, email: "" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Invalid email or password");
      });
    });

    //invalid email format
    describe("given invalid email format", () => {
      it("should return a 400 and a message saying invalid email or password", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/login")
          .send({ ...userLoginInput, email: "janedoe" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Invalid email or password");
      });
    });

    //given wrong password
    describe("given wrong password", () => {
      it("should return a 400 and a message saying no user found", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/login")
          .send({ ...userLoginInput, password: "janedoe" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("No user found");
      });
    });
  });
});
