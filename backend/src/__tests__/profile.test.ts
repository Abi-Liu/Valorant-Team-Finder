import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { realUserInput, userRegisterInput } from "./utils/inputs";

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

    //agent used to test profile creation based on all valid inputs
    agent = supertest.agent(app);
    //agent used to test profile creation based on authorized user, but invalid IGN
    agent2 = supertest.agent(app);

    await agent.post("/auth/register").send(realUserInput);
    await agent2.post("/auth/register").send(userRegisterInput);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    process.env = OLD_ENV;
  });

  //TESTS START HERE
  //POST Profile route
  describe("create profile route", () => {
    //given no user authorized
    describe("given no user is authorized", () => {
      it("should return a status 401 and a message of User not authorized", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app).post(
          "/profile/createProfile"
        );

        expect(statusCode).toBe(401);
        expect(body.message).toEqual("User not authorized");
      });
    });

    //given a user is authorized with a real IGN
    describe("given user is authorized with a real ign", () => {
      it("should return a status of 200 and their profile data", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent.post("/profile/createProfile");
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

    //given a user is authorized with an invalid IGN
    describe("given user is authorized with an invalid ign", () => {
      it("should return a status of 400 and an error message", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.post(
          "/profile/createProfile"
        );
        console.log(body);
        expect(statusCode).toBe(500);
        expect(body.message).toEqual({});
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
