import express, { Request, Response, NextFunction } from "express";
import { getHttpStatus, isInternalError } from "./domain/errors";
import { isUserCreationRequest } from "./domain/user";
import { createUser } from "./services/userCreationService";
const app = express();
app.use(express.json());

app.get("/auth/ping", (_, res) => {
  res.send({ message: "pong" });
});

app.post("/auth/user", async ({ body }, res, next) => {
  try {
    if (!isUserCreationRequest(body)) return;
    await createUser(body);
    res.send({ message: `user created!` });
  } catch (err) {
    handleErrors(res, next, err);
  }
});

// Required due to express v4.xx not handling async errors
const handleErrors = (res: Response, next: NextFunction, err?: any) => {
  console.log(JSON.stringify(err));
  if (isInternalError(err)) {
    const { code, message } = err;
    const status = getHttpStatus(code);
    console.log(message);
    res.status(status).send({ code, message });
  } else {
    console.error(`Unexpected error ${err}`);
    res.status(500).send({ message: "internal error" });
  }
  next();
};

// TODO: make port dynamic
app.listen(3000, () => {
  console.log("app listening");
});
