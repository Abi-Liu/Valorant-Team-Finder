import supertest from "supertest";
import AuthController from "../controllers/auth";
import createServer from "../config/server";
import mongoose from "mongoose";

const app = createServer();

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
  describe("register user route", () => {
    describe("given all input fields are valid", () => {
      it("should return a 200 and the user info", async () => {
        const createAuthControllerMock = jest
          .spyOn(AuthController, "register")
          //@ts-ignore
          .mockReturnValueOnce(userResponse);

        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userResponse);
        expect(createAuthControllerMock).toHaveBeenCalledWith(userInput);
      });
    });

    // describe("given ign already taken", () => {
    //   it("should return a 400", async () => {
    //     const ign = "";
    //   });
    // });
  });
});
