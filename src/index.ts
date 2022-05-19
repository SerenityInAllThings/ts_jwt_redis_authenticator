import express from "express";
import { isUserCreationRequest } from "./domain/user";
import { createUser } from "./services/userCreationService";
const app = express();
app.use(express.json());

app.get("/ping", (_, res) => {
  res.send({ message: "pong" });
});

app.post("/user", async ({ body }, res) => {
  try {
    // TODO: improve bad request messages
    if (!isUserCreationRequest(body)) {
      res.status(400).send({ message: "invalid body" });
      return;
    }
    await createUser(body);
    res.send({ message: `user created!` });
  } catch (err) {
    // TODO: error handling, also don't expose error
    console.error("Error creating user", err);
    res.send({ message: "error", err });
  }
});

app.listen(3000, () => {
  console.log("app listening");
});
