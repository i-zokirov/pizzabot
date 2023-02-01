import "./express";
import "./bot/index";
import "./database/index";

if (process.env.NODE_ENV === "production") {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "/etc/secrets/dialogflow.json";
} else {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./src/keys/dialogflow.json";
}
