// test/apiRouter.test.ts
import request from "supertest";
import app from "../server";

describe("ApiRouter", () => {

  describe("GET /applicant", () => {
    it("Should get applicant details", async () => {
      const response = await request(app).get("/awesome/applicant");

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body[0].first_name).toBe("Hee Je")
    });
  });

  describe("GET /applicant/nickname/:nickname", () => {
    it("should update and respond with new details", async () => {
      const response = await request(app).get("/awesome/applicant/nickname/darl");

      expect(response.status).toBe(200);
      expect(response.body[0].nickname).toBe("darl")

    });
  });

  describe("GET /applicant/destroy", () => {
    it("should remove person from DB and respond correctly", async () => {

      const response = await request(app).get("/awesome/applicant/destroy");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Successfully removed Hee Je from DB");

    });
  });

  describe("GET /applicant/revive", () => {
    it("should revive person and respond correctly", async () => {

      const response = await request(app).get("/awesome/applicant/revive");

      if (response.status !== 200) {
        expect(response.text).toBe("Error: Hee Je is already alive")
        return;
      }

      expect(response.status).toBe(200);
      expect(response.body[0].first_name).toBe("Hee Je");

    });
  });
});
