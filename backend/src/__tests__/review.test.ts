import supertest from "supertest";
import createServer from "../config/server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { realUserInput, realUserInput2 } from "./utils/inputs";
import { Region } from "src/Interfaces/Types";

describe("Review Routes", () => {
  //SET UP FOR TESTS
  const OLD_ENV = process.env;
  //@ts-ignore
  let app;
  //@ts-ignore
  let agent;
  //@ts-ignore
  let agent2;

  //@ts-ignore
  let agentData;
  //@ts-ignore
  let agent2Data;
  //@ts-ignore
  let reviewId;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    process.env.DB_STRING = mongoServer.getUri();
    app = createServer();

    //creates an authorized agent to test the protected routes

    //valid agent who's profile we will be using to test
    agent = supertest.agent(app);
    //valid agent who will be review profile of agent
    agent2 = supertest.agent(app);

    const response = await agent.post("/auth/register").send(realUserInput);
    const response1 = await agent2.post("/auth/register").send(realUserInput2);
    //@ts-ignore
    agentData = response.body;
    //@ts-ignore
    agent2Data = response1.body;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    process.env = OLD_ENV;
  });

  //TESTS START HERE
  //POST CREATE REVIEW ROUTE
  describe("Create Review Route", () => {
    //given user profile exists, and a valid user is reviewing
    describe("given user profile exists, and a valid user is reviewing", () => {
      it("should return 200 and the review", async () => {
        //@ts-ignore
        console.log(agentData);
        //@ts-ignore
        console.log(agent2Data);
        //@ts-ignore
        const { statusCode, body } = await agent2
          //@ts-ignore
          .post(`/review/createReview/${agentData._id}`)
          .send({ message: "Great player!", rating: "5" });

        reviewId = body._id;

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          creatingUser: expect.any(String),
          dislikes: [],
          likes: [],
          message: "Great player!",
          rating: 5,
          user: expect.any(String),
        });
      });
    });
  });

  //PUT LIKE REVIEW ROUTE
  describe("Like review route", () => {
    //given user has not liked it yet
    describe("given valid user and user has not liked it yet", () => {
      it("should return 200 and add a like to the review likes array and return the review", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.put(
          //@ts-ignore
          `/review/likeReview/${reviewId}`
        );
        expect(statusCode).toBe(200);
        expect(body.likes.length).toEqual(1);
      });
    });

    //given user has already liked it
    describe("given valid user and user has liked it already", () => {
      it("should return 200 and remove a like from the review likes array and return the review", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.put(
          //@ts-ignore
          `/review/likeReview/${reviewId}`
        );
        expect(statusCode).toBe(200);
        expect(body.likes.length).toEqual(0);
      });
    });
  });

  //PUT DISLIKE REVIEW ROUTE
  describe("Dislike review route", () => {
    //given user has not liked it yet
    describe("given valid user and user has not disliked it yet", () => {
      it("should return 200 and add a dislike to the review dislikes array and return the review", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.put(
          //@ts-ignore
          `/review/dislikeReview/${reviewId}`
        );
        expect(statusCode).toBe(200);
        expect(body.dislikes.length).toEqual(1);
      });
    });

    //given user has already disliked it
    describe("given valid user and user has disliked it already", () => {
      it("should return 200 and remove a dislike from the review dislikes array and return the review", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.put(
          //@ts-ignore
          `/review/dislikeReview/${reviewId}`
        );
        expect(statusCode).toBe(200);
        expect(body.dislikes.length).toEqual(0);
      });
    });
  });

  //GET REVIEW ROUTE WHEN REVIEWS EXIST
  describe("get review route", () => {
    describe("given valid users and review exists", () => {
      it("Should return 200 and give an array of the reviews", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.get(
          //@ts-ignore
          `/review/getReviews/${agentData._id}`
        );
        expect(statusCode).toBe(200);
        expect(body.length).toEqual(1);
      });
    });

    //review doesn't exist
    describe("given valid users and review doesn't exist", () => {
      it("Should return 200 and return an empty array", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent.get(
          //@ts-ignore
          `/review/getReviews/${agent2Data._id}`
        );
        expect(statusCode).toBe(200);
        expect(body.length).toEqual(0);
      });
    });
  });

  //DELETE RREVIEW ROUTE
  describe("Delete review route", () => {
    //review exists
    describe("given valid users and a review exists to be deleted", () => {
      it("should return 200 and a message saying post was deleted", async () => {
        //@ts-ignore
        const { statusCode, body } = await agent2.delete(
          //@ts-ignore
          `/review/deleteReview/${reviewId}`
        );
        expect(statusCode).toBe(200);
        expect(body.message).toEqual("review successfully deleted");
      });
    });
  });
});
