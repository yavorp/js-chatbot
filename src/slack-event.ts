export interface MessageEvent {
  token: string;
  team_id: string;
  api_app_id: string;
  event: {
    type: string;
    event_ts: number;
    user: string;
  };
  type: string;
  authed_users: string[];
  event_id: string;
  event_time: number;
}
