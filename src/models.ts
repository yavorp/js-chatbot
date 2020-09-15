export interface MessageEvent {
  type: string;
  user: string;
  team: string;
  text: string;
  // timestamp
  ts: number;
  channel: string;
  event_ts: number;
  channel_type: string
}