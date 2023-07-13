import supertest from "supertest";
import createServer from "../config/server";

describe("get profile", () => {
  it("should return 200 and the users profile", async () => {
    const app = createServer();
    const { statusCode, body } = await supertest(app).get("/profile");
    expect(statusCode).toBe(200);
    expect(body).toEqual({});
  });
});
