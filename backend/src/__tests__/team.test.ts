import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { userRegisterInput, userRegisterInput2 } from "./utils/inputs";

const createTeamInput = { teamName: "best team" };

describe("team", () => {
  //setting up mongo memory server
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
    agent = supertest.agent(app);
    agent2 = supertest.agent(app);
    await agent.post("/auth/register").send(userRegisterInput);
    await agent2.post("/auth/register").send(userRegisterInput2);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    process.env = OLD_ENV;
  });

  //POST Create team route
  describe("POST create team route", () => {
    //given no user authorized
    describe("given no user is authorized", () => {
      it("should return a status 401 and a message of User not authorized", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app)
          .post("/team/createTeam")
          .send(createTeamInput);

        expect(statusCode).toBe(401);
        expect(body.message).toEqual("User not authorized");
      });
    });

    //given user is authorized and not currently in a team
    describe("given user is authorized and not currently in a team", () => {
      it("should return a status 200 and a the team information", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent
          .post("/team/createTeam")
          .send(createTeamInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: "best team",
          teammates: ["JaneDoe"],
        });
      });
    });

    //given user is authorized and is currently in a team
    describe("given user is authorized and is currently in a team", () => {
      it("should return a status 500 and a message telling the user they're in a team.", async () => {
        //@ts-ignore
        await agent.post("/team/createTeam").send(createTeamInput);

        //@ts-ignore
        const { statusCode, body } = await agent
          .post("/team/createTeam")
          .send(createTeamInput);

        expect(statusCode).toBe(500);
        expect(body.message).toEqual(
          "You are currently in a team. Please leave before making a new team"
        );
      });
    });

    //given user is authorized but inputs are invalid
    describe("given user is authorized but inputs are invalid", () => {
      it("should return a status 400 and an error message.", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2
          .post("/team/createTeam")
          .send({ teamName: "" });

        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Team name cannot be blank");
      });
    });
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
