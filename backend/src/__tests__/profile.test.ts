import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { realUserInput } from "./utils/inputs";

describe("Profile Routes", () => {
  //SET UP FOR TESTS
  const OLD_ENV = process.env;
  //@ts-ignore
  let app;
  //@ts-ignore
  let agent;
  //@ts-ignore
  let agent2;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    process.env.DB_STRING = mongoServer.getUri();
    app = createServer();

    //creates an authorized agent to test the protected routes

    //agent used to test team creation based on all valid inputs
    agent = supertest.agent(app);

    await agent.post("/auth/register").send(realUserInput);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    process.env = OLD_ENV;
  });

  //TESTS START HERE
  describe("create profile route", () => {
    describe("given user is authorized with a real ign", () => {
      it("should return a status of 200 and their profile data", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent.post("/profile/createProfile");
        console.log(body);
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: 0,
          cardLarge: expect.any(String),
          _id: expect.any(String),
          cardSmall: expect.any(String),
          puuid: expect.any(String),
          rank: expect.any(String),
          rankImage: expect.any(String),
          region: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
});

// describe("get profile", () => {
//   it("should return 200 and the users profile", async () => {
//     const app = createServer();
//     const { statusCode, body } = await supertest(app).get("/profile");
//     expect(statusCode).toBe(200);
//     expect(body).toEqual({});
//   });
// });
