import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// get env params
require('dotenv').config();


export interface BotMetaData{
  ok: boolean;
  url: string;
  team: string;
  user: string;
  team_id: string;
  user_id: string;
}    


const SERVER_URL = 	'https://slack.com/api/';
export const axios = Axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Authorization': `Bearer ${process.env.OAUTH_TOKEN}`
  }
});

export const getBotsInfo = async () => {
    return (await axios.post<BotMetaData>(`auth.test`)).data;
}

export async function archiveChannel(channel: string) {
  return (await axios.post<{ok: boolean, error: string}>('conversations.archive', {
    channel
  })).data;
}