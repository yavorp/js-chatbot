import { WebClient, LogLevel } from "@slack/web-api";

require('dotenv').config();
export const BOT_TOKEN = process.env.BOT_TOKEN!;

export const webClient = new WebClient(BOT_TOKEN, {
  logLevel: LogLevel.DEBUG
});
