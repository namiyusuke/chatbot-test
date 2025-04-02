export interface ChatRoom {
  id: number;
  name: string;
  user_id: string;
  created_at: string;
}
export interface Message {
  id: string;
  content: string;
  user_id: string;
  is_ai: boolean;
  created_at: string;
}
