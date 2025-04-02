import { supabase } from "../lib/supabaseClient";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export async function getChatRoomsForUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select("id, name, created_at,user_id")
      .eq("user_id", userId);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    throw error;
  }
}
export async function getMessagesForChatRoom(chatRoomId: number | null) {
  if (!chatRoomId) {
    throw new Error("Chat room ID is required");
  }
  try {
    const { data, error } = await supabase
      .from("message")
      .select("id,content,user_id,is_ai,created_at")
      .eq("chat_room_id", chatRoomId)
      .order("created_at", { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    throw error;
  }
}
export async function createChatRoomForUser(userId: string, chatRoomName: string) {
  try {
    const { data, error } = await supabase
      .from("chat_rooms")
      .insert({ name: chatRoomName, user_id: userId })
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw error;
  }
}
export async function sendMessage(
  userId: string | undefined,
  chatRoomId: number,
  idAi: boolean,
  content: string | null
) {
  try {
    const { data, error } = await supabase
      .from("message")
      .insert({
        chat_room_id: chatRoomId,
        user_id: userId,
        is_ai: idAi,
        content: content,
      })
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw error;
  }
}
export async function sendMessageFromGPT(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "子育ての専門家です。" },
        { role: "user", content: message },
      ],
    });
    const messageFromGPT = completion.choices[0].message.content;
    return messageFromGPT;
  } catch (error) {
    console.error("Error sending message from GPT:", error);
    throw error;
  }
}
