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

// official slack documentation
  // "token": "XXYYZZ",
  // "team_id": "TXXXXXXXX",
  // "api_app_id": "AXXXXXXXXX",
  // "event": {
  //         "type": "name_of_event",
  //         "event_ts": "1234567890.123456",
  //         "user": "UXXXXXXX1"
  // },
  // "type": "event_callback",
  // "authed_users": [
  //         "UXXXXXXX1",
  //         "UXXXXXXX2"
  // ],
  // "event_id": "Ev08MFMKH6",
  // "event_time": 1234567890