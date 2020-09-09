import { MessageEvent } from './slack-event';
import { WebClient } from '@slack/web-api';
import express from 'express';
import { createEventAdapter } from '@slack/events-api';

require('dotenv').config();
const slackSigningSecret = process.env.SIGNING_SECRET || '';

const slackEvents = createEventAdapter(slackSigningSecret);
const webCllient = new WebClient(process.env.BOT_TOKEN);

require('dotenv').config();
const server = express();

const port = process.env.PORT || 3000;
slackEvents.on('message', async (event) => {
  const res = event as MessageEvent;
  console.log(event);
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  await webCllient.chat.postMessage({
    token: process.env.BOT_TOKEN,
    text: 'hello wrold',
    channel: event.user
  }).catch(err => console.error(err));
});

server.use(slackEvents.expressMiddleware());
server.use(express.json());
server.post('/',(request, response) => {
  console.log(request.body);
  response.send(request.body.challenge);
});



server.listen(port, () => {
  console.log(`Listens on port ${port}`);
})