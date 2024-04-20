import { Router, Request, Response } from "express";

import { getPersonalDetails, updatePersonalDetails, destroyPerson, checkPerson, revivePerson } from "./dbController";

const router = Router();

router.get('/applicant', getPersonalDetails, (_req: Request, res: Response) => {

  const { personalDetails } = res.locals;

  return res.status(200).json(personalDetails)

})

router.get('/applicant/nickname/:nickname', updatePersonalDetails, (_req: Request, res: Response) => {

  const { newDetails } = res.locals;

  return res.status(200).json(newDetails);

})

router.get('/applicant/destroy', destroyPerson, (_req: Request, res: Response) => {

  return res.status(200).send("Successfully removed Hee Je from DB")

})

router.get('/applicant/revive', checkPerson, revivePerson, (_req: Request, res: Response) => {

  const { heeJe } = res.locals;

  return res.status(200).json(heeJe);

})

router.get('/error-trigger', (_req: Request, _res: Response) => { throw new Error("") })


export { router };