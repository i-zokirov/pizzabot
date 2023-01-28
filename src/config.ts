import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const dl_projectId = process.env.dl_project_id;
export const dl_languageCode = process.env.dl_lang_code;
export const dl_agentId = process.env.dl_agent_id;
export const MongoDB_URI = process.env.MONGO_DB_URI;
