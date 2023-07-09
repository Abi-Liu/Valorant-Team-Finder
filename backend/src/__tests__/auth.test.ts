import supertest from "supertest";
import AuthController from "../controllers/auth";
import createServer from "../config/server";
import mongoose from "mongoose";
import User from "../models/User";
import { MongoMemoryServer } from "mongodb-memory-server";

const userId = new mongoose.Types.ObjectId().toString();
const userResponse = {
  _id: userId,
  email: "jane.doe@example.com",
  ign: "JaneDoe",
  password: "password123",
};

const userInput = {
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

  describe("register user route", () => {
    describe("given all input fields are valid", () => {
      it("should return a 200 and the user info", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual({});
      });
    });

    // describe("given ign already taken", () => {
    //   it("should return a 400", async () => {
    //     const ign = "";
    //   });
    // });
  });
});
