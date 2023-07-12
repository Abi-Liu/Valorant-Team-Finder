import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { userRegisterInput } from "./auth.test";

describe("team", () => {
  //setting up mongo memory server
  const OLD_ENV = process.env;
  //@ts-ignore
  let app;
  //@ts-ignore
  let agent;
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    process.env.DB_STRING = mongoServer.getUri();
    app = createServer();

    //creates an authorized agent to test the protected routes
    agent = supertest.agent(app);
    await agent.post("/auth/register").send(userRegisterInput);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    process.env = OLD_ENV;
  });

  //POST Create team route
  describe("POST create team route", () => {
    //given no user authorized
    //given user is authorized and
  });

  //get team route tests
  describe("get team route", () => {
    // given no user is authorized
    describe("given no user is authorized", () => {
      it("should return a status 401", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app).get("/team/getTeams");

        expect(statusCode).toBe(401);
      });
    });

    //given user is authorized
    describe("given user is authenticated", () => {
      it("should return a status code 200 and a list of all teams", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent.get("/team/getTeams");
        //@ts-ignore
        expect(statusCode).toBe(200);
        // expect(body).toEqual();
      });
    });
  });
});
