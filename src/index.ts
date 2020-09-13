import { archiveChannel, getBotsInfo, BotMetaData } from './http-service';
import { MessageEvent } from './slack-event';
import { WebClient } from '@slack/web-api';
import express from 'express';
import { createEventAdapter } from '@slack/events-api';

require('dotenv').config();
const slackSigningSecret = process.env.SIGNING_SECRET || '';

const slackEvents = createEventAdapter(slackSigningSecret);
const webCllient = new WebClient(process.env.BOT_TOKEN);

const server = express();

const port = process.env.PORT || 3000;
let botId: string;


function parseUserId(userTag: string) {
  return userTag.substring(2, userTag.length - 1);
}

slackEvents.on('message', async (event) => {
  const res = event as MessageEvent;
  console.log(event);
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  if(event.user !== botId) {
    try {
      await webCllient.chat.postMessage({
        token: process.env.BOT_TOKEN,
        text: 'hello wrold',
        channel: event.user
      })
    } catch(error) {
      console.error(error);
    }
    
  } else {
    const userTag = event.text.split(' ').pop();
    const userString = parseUserId(userTag!);
    await webCllient.conversations.open({
      token: process.env.BOT_TOKEN,
      users: event.user, userString
    })
  }
});

slackEvents.on('app_mention', async (event) => {
  const channel = event.channel as string;
  const text = event.text as string;
  console.log('in app mention')
  const channelType = event.channelType as string;
  if (text.includes('archive channel')) {
    if (event.channel_type !== 'im') {
      console.log('in the if');
      
      const res = await webCllient.channels.archive({
        channel,
        token: process.env.BOT_TOKEN
      })
      
      if(!res.ok) {
        await webCllient.chat.postMessage({
          token: process.env.BOT_TOKEN,
          text: 'I cannot do the requested task',
          channel: event.channel
        })
      }
    }  
  }
  
  if (text.includes('create channel')) {
    webCllient.channels.create({
      name: 'random-test',
      token: process.env.BOT_TOKEN
    });
  }
  
  if (text.includes('invite')) {
    const userTag = text.split(' ').pop();
    const userString = parseUserId(userTag!);
    console.log(userString)
    webCllient.channels.invite({
      channel,
      user: userString
    })
  }
  
})

server.use(slackEvents.expressMiddleware());
server.use(express.json());

webCllient.auth.test({
  token: process.env.BOT_TOKEN
}).then(data => {
  if(!data.ok) {
    throw new Error('OAuth token of the bot is not valid');
  }
  botId = data?.user_id as string || 'tapak' ;
  server.listen(port, () => {
    console.log(`just started bot with id ${botId}`)
    console.log(`Listens on port ${port}`);
  })
});
