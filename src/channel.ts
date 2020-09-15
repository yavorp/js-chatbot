import { webClient, BOT_TOKEN } from './web-client';

export interface Channel {
  id: string;
  name: string;
  is_channel: boolean,
  is_group: boolean,
  is_im: boolean,
  is_archived: boolean;

}

export async function addChannel(name: string) {
  const res = await webClient.conversations.create({
    token: BOT_TOKEN,
    name
  });
  console.log(res);
}

export async function inviteUserToChannel(channel: string, user: string) {
  
  const channels = await getAllActiveChannels();
  const foundChannel = channels.find(ch => ch.name === channel);
  if(!foundChannel) {
    throw new Error('Channel not found');
  }
  const res = await webClient.conversations.invite({
    channel: foundChannel.id,
    users: user
  });

  console.log(res);
}

async function getAllActiveChannels() {
  const result = await webClient.users.conversations({
    token: BOT_TOKEN
  });

  const channels = result.channels as Channel[];
  return channels.filter(({is_archived, is_channel}) => (!is_archived) && is_channel);

}


export async function archiveChannel(channelName: string ) {
  const channels = await getAllActiveChannels();
  const channel = channels.find(ch => ch.name === channelName);
  if(!channelName) {
    throw new Error('You try to archive not existing channel');
  }
  
  if (channel) {
    const res = webClient.conversations.archive({
      token: BOT_TOKEN,
      channel: channel?.id
    });
  }
}