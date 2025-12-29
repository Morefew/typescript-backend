import type { TokenIndexer } from "morgan";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT ?? "9001";

// Logger configuration
app.use(
  morgan(function (tokens: TokenIndexer, req, res) {
    return [
      tokens.method?.(req, res) ?? "UNKNOWN_METHOD",
      tokens.url?.(req, res) ?? "UNKNOWN_URL",
      "Res-Stat:",
      tokens.status?.(req, res) ?? "UNKNOWN_STATUS",
      "Content-Length :",
      tokens.res?.(req, res, "content-length") ?? "UNKNOWN_LENGTH",
      "Response-Time:",
      tokens["response-time"]?.(req, res) ?? "UNKNOWN_TIME",
      "ms",
      "Date:",
      tokens.date?.(req, res) ?? "UNKNOWN_DATE",
    ].join(" - ");
  }),
);

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World 6");
  console.log("Response sent");
});

app.get("/new", (req, res) => {
  res.status(200).send("New Page");
  console.log("New Page sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
