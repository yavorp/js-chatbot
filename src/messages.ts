import { time } from 'console';
import { webClient, BOT_TOKEN } from './web-client';

export async function sendMessage(text: string, channel: string) {
  await webClient.chat.postMessage({
    token: BOT_TOKEN,
    text,
    channel
  })
}

export async function scheduleMessage(text: string, channel: string, postAt: number){
  validateTimestamp(postAt);
  const res = await webClient.chat.scheduleMessage({
    post_at: (postAt / 1000).toString(),
    token: BOT_TOKEN,
    text,
    channel
  });
  console.log(res);
}

function validateTimestamp(timestamp: number) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const after5Yeears = new Date(year + 5, month, day);
  if(timestamp < 0 || timestamp < after5Yeears.getTime()) {
    throw new Error('Invalid timestamp was set');
  }
}
