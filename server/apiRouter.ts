import { Router, Request, Response } from "express";

import { getPersonalDetails, updatePersonalDetails, destroyPerson, checkPerson, revivePerson } from "./dbController";

const router = Router();

router.get('/applicant', getPersonalDetails, (_req: Request, res: Response) => {

  const { personalDetails } = res.locals;

  return res.status(200).json(personalDetails)

})

/** Strictly for the purposes of this exercise, each endpoint has been assigned a "GET" method to ensure that visiting each of these endpoints triggers a CRUD operation in the database. */

// this would be a "PATCH" request with the nickname contained in the request body.
router.get('/applicant/nickname/:nickname', updatePersonalDetails, (_req: Request, res: Response) => {

  const { newDetails } = res.locals;

  return res.status(200).json(newDetails);

})

// this would be a "DELETE" request with query parameters in the body or in the request itself.
router.get('/applicant/destroy', destroyPerson, (_req: Request, res: Response) => {

  return res.status(200).send("Successfully removed Hee Je from DB")

})

// this would be a "POST" request with the query parameters contained in the request body.
router.get('/applicant/revive', checkPerson, revivePerson, (_req: Request, res: Response) => {

  const { heeJe } = res.locals;

  return res.status(200).json(heeJe);

})

// error-triggering endpoint to test routing behavior.
router.get('/error-trigger', (_req: Request, _res: Response) => { throw new Error("") })


export { router };