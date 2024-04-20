// test/dbController.test.ts
import { Request, Response, NextFunction } from "express";
import { getPersonalDetails, updatePersonalDetails, destroyPerson, checkPerson, revivePerson } from "../dbController";

jest.mock("@supabase/supabase-js", () => {

  let testData = { id: 1, name: "Test Name" };
  let testError: string | null = "Error"

  return {
    createClient: jest.fn(() => {
      return {
        from: jest.fn().mockReturnThis(),
        select: jest.fn(() => ({
          match: jest.fn(() => ({
            data: testData,
            error: testError
          })),
          data: [testData],
          error: testError
        })),
        update: jest.fn(() => ({
          match: jest.fn(() => ({
            select: jest.fn(() => ({
              data: testData,
              error: testError
            }))
          }))
        })),
        delete: jest.fn(() => ({
          match: jest.fn()
        })),
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: testData,
            error: testError
          }))
        })),
      }
    }),
    setTestData: (newData: any) => {
      testData = newData
    },
    setError: (newError: string | null) => {
      testError = newError;
    }
  };
});

describe("dbController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      locals: {}
    };
    nextFunction = jest.fn();
  });

  describe("getPersonalDetails", () => {
    it("return personal details", async () => {

      const { setTestData, setError } = require("@supabase/supabase-js");
      setTestData([{ id: 1, name: "Test Name" }]);
      setError(null);

      await getPersonalDetails(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.locals).toHaveProperty("personalDetails");
      expect(nextFunction).toHaveBeenCalled();
    });

    it("should handle errors if an error is detected", async () => {

      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([]);
      setError("Test Error");

      await getPersonalDetails(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.objectContaining({ status: 500 }));

    });
  });

  describe("updatePersonalDetails", () => {
    it("should set newDetails if there is no error", async () => {

      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([]);
      setError(null);

      mockRequest.params = { nickname: "TestName" };

      await updatePersonalDetails(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.locals).toHaveProperty("newDetails");
      expect(nextFunction).toHaveBeenCalled();
    });

    it("should handle errors if an error is detected", async () => {

      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([]);
      setError("Test Error");

      await updatePersonalDetails(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.objectContaining({ status: 500 }));
    });
  });

  describe("destroyPerson", () => {
    it("should call next on success", async () => {

      const { setError } = require("@supabase/supabase-js");

      setError(null);

      await destroyPerson(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it("should handle errors if an error is detected", async () => {

      const { setError } = require("@supabase/supabase-js");
      setError("Test Error");

      await destroyPerson(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.objectContaining({ status: 500 }));
    });
  });

  describe("checkPerson", () => {
    it("should call next if no one is found", async () => {
      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([]);
      setError(null);

      await checkPerson(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();

    });
    it("should throw an error if someone is already in the DB", async () => {
      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([{ id: 1, name: "Test Name" }]);
      setError(null);

      await checkPerson(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.objectContaining({ status: 500 }))

    })

  })

  describe("revivePerson", () => {
    it("should save info to res.locals on success", async () => {
      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([{ id: 1, name: "Test Name" }]);
      setError(null);

      await revivePerson(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.locals).toHaveProperty("heeJe");
      expect(nextFunction).toHaveBeenCalled();
    });

    it("should handle errors on failure", async () => {

      const { setTestData, setError } = require("@supabase/supabase-js");

      setTestData([]);
      setError("Test Error");

      await revivePerson(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.objectContaining({ status: 500 }));
    });
  });
});
