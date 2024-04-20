// test/server.unit.test.ts
import { Request, Response, NextFunction } from "express";
import supertest from "supertest"
import request from "supertest"
import app from "../server";
// import { errorHandler } from "../server"; // Assuming errorHandler is exported

describe("API Server Unit Tests", () => {

  describe("API Route handling", () => {
    it("should route requests to /awesome to apiRouter", async () => {
      await supertest(app)
        .get('/awesome/applicant')
        .expect(200)
        .then(response => {
          expect(response.body[0].first_name).toBe("Hee Je")
        })
    })
  })

  describe("Unknown Route Handler", () => {
    it("should return a 404 status for unknown routes", async () => {
      await supertest(app)
        .get('/awesome/application')
        .expect(404)
        .then(response => {
          expect(response.text).toBe("Unknown Route")
        })

    });
  });

  describe("Global Error Handling", () => {
    it("should handle errors with a 500 status", async () => {

      await supertest(app)
        .get("/awesome/error-trigger")
        .expect(500)
        .then(response => {
          expect(response.body).toEqual({
            log: "Unknown Middleware Error",
            status: 500,
            message: {
              error: "Something went wrong"
            }
          })
        })

    });
  });

});

