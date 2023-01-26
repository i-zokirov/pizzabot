import express from "express";
import bot from "./bot";

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./src/keys/dialogflow.json";

const app = express();

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
