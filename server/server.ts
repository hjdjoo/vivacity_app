import express, { Request, Response, Application, ErrorRequestHandler } from "express";
import 'dotenv/config';
import { router as apiRouter } from "./apiRouter";
import { ServerError } from "./serverTypes";

const app: Application = express();
const PORT: number = 3000;

/** parse incoming requests */
app.use(express.json());

/** route handlers */
app.use('/awesome', apiRouter);

/** unknown route handler */
app.use('/', (_req: Request, res: Response) => {

  return res.status(404).send("Unknown Route")

})

/** global error handler */

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {

  const defaultError: ServerError = {
    log: "Unknown Middleware Error",
    status: 500,
    message: {
      error: "Something went wrong"
    }
  }

  const errObj = Object.assign(defaultError, err);

  return res.status(errObj.status).json(errObj);

}

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
};

export default app;