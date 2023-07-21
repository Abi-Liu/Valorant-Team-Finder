import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { realUserInput, userRegisterInput } from "./utils/inputs";
import { Region } from "src/Interfaces/Types";

describe.skip("Profile and Matches Routes", () => {
  //SET UP FOR TESTS
  const OLD_ENV = process.env;
  //@ts-ignore
  let app;
  //@ts-ignore
  let agent;
  //@ts-ignore
  let agent2;

  let uid: string;
  let puuid: string;
  let region: Region;

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
        uid = body.user;
        puuid = body.puuid;
        region = body.region;
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
          expiryTime: expect.any(String),
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

  //GET Profile Routes
  describe("get profile route", () => {
    //Given authorized user and a valid URL
    describe("Given authorized user and a valid URL", () => {
      it("should return a status 200 and profile and user ign", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent.get(`/profile/${uid}`);
        expect(statusCode).toBe(200);
        expect(Object.keys(body).length).toEqual(2);
      });
    });

    //Given authorized user and an invalid URL
    describe("Given authorized user and an invalid URL", () => {
      it("should return a status 404 and an error message", async () => {
        const random = new mongoose.Types.ObjectId().toString();
        //@ts-ignore
        const { statusCode, body } = await agent.get(`/profile/${random}`);
        expect(statusCode).toBe(404);
        expect(body.message).toEqual("Page not found");
      });
    });
  });

  //TESTING MATCHES ROUTES
  describe("Matches routes", () => {
    //POST createMatch route given user is authorized, with a valid puuid
    describe("given user is authorized, with a valid puuid", () => {
      it("should return a 200 and the match history", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent
          .post("/matches/createMatches")
          .send({ puuid, region });
        expect(statusCode).toBe(200);
        expect(body.matches.length).toEqual(5);
      });
    });

    //GET Matches route
    describe("given user is authorized, and a valid URL", () => {
      it("should return a 200 and the match history", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent.get(`/matches/${uid}`);

        expect(statusCode).toBe(200);
        expect(body.matches.length).toEqual(5);
      });
    });
  });
});
