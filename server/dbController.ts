import { Request, Response, NextFunction } from "express";
import { ServerError } from "./serverTypes";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_PUBLIC_ANON_KEY, SUPABASE_URL } = process.env;

export const supabase = createClient(SUPABASE_URL!, SUPABASE_PUBLIC_ANON_KEY!)

export const getPersonalDetails = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await supabase
      .from("personal_details")
      .select("*")

    if (error) {
      throw new Error("Couldn't retrieve from database!")
    }

    res.locals.personalDetails = data;

    return next();

  }
  catch (error) {
    console.error(error);
    const err = {
      log: "Something went wrong while retrieving info from database",
      status: 500,
      message: {
        error: `${error}`
      }
    }
    return next(err);
  }
}

export const updatePersonalDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const newNickname = req.params.nickname;
    const { data, error } = await supabase
      .from("personal_details")
      .update({ nickname: newNickname })
      .match({ first_name: "Hee Je", last_name: "Joo" })
      .select();

    if (error) {
      throw new Error("Couldn't update info in database!")
    }

    res.locals.newDetails = data;

    return next();

  }
  catch (error) {
    console.error(error);
    const err = {
      log: "Something went wrong while retrieving info from database",
      status: 500,
      message: {
        error: `${error}`
      }
    }
    return next(err);
  }

}

export const destroyPerson = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    const { error } = await supabase
      .from("personal_details")
      .delete()
      .match({ first_name: "Hee Je", last_name: "Joo" })

    if (error) throw new Error("Person already exists in DB")

    return next();
  }
  catch (error) {
    console.error(error);
    const err = {
      log: "Something went wrong while deleting info from database",
      status: 500,
      message: {
        error: `${error}`
      }
    }
    return next(err);
  }
}

export const checkPerson = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await supabase
      .from("personal_details")
      .select("*")
      .match({ first_name: "Hee Je", last_name: "Joo" })

    if (data?.length) {
      throw new Error("Hee Je is already alive");
    }

    return next();
  }
  catch (error) {
    console.error(error);
    const err = {
      log: "Couldn't revive user. I think maybe they are alive?",
      status: 500,
      message: {
        error: `${error}`
      }
    }
    return next(err);
  }
}

export const revivePerson = async (_req: Request, res: Response, next: NextFunction) => {
  try {

    const heeJe = {
      firstName: "Hee Je",
      lastName: "Joo",
      nickname: "Darryl",
      hobbies: ["Guitar", "Bouldering", "Etc"],
      isAlive: true
    }

    const { data, error } = await supabase
      .from("personal_details")
      .insert({
        first_name: heeJe.firstName,
        last_name: heeJe.lastName,
        nickname: heeJe.nickname,
        hobbies: heeJe.hobbies,
        is_alive: heeJe.isAlive
      })
      .select();

    if (error) throw new Error("Something went wrong while reviving Hee Je!");

    res.locals.heeJe = data;

    return next();
  }
  catch (error) {
    console.error(error);
    const err: ServerError = {
      log: "Something went wrong while adding Hee Je to database",
      status: 500,
      message: {
        error: `${error}`
      }
    }
    return next(err);
  }
};