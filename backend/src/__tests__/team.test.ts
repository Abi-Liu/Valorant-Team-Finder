import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("team", () => {
  //setting up mongo memory server
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

  //get team route tests
  describe("get team route", () => {
    // given no user is authorized
    describe("given no user is authorized", () => {
      it.only("should return a status 500", async () => {
        //@ts-ignore
        const { statusCode, body } = await supertest(app).get("/team/getTeams");
        console.log(body);
        expect(statusCode).toBe(401);
      });
    });

    describe("given user is authenticated", () => {
      it("should return a status code 200 and a list of all teams", async () => {});
    });
    //given user is authorized
  });
});
