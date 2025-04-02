import { useAuth } from "../context/AuthContextProvider";
import { useState } from "react";
import { sendMessage, sendMessageFromGPT } from "../utils/chatServices";
import { Message } from "../types/types";
type ChatInputProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChatRoomId: number | null;
  messages: Message[] | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
};
function ChatInput({ selectedChatRoomId, setMessages, setIsLoading }: ChatInputProps) {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id || !selectedChatRoomId) return;
    try {
      const messageFromUser = await sendMessage(user?.id, selectedChatRoomId, false, inputMessage);
      setInputMessage("");
      setIsLoading(true);
      const messageFromGPT = await sendMessageFromGPT(inputMessage);
      const aiMessage = await sendMessage(undefined, selectedChatRoomId, true, messageFromGPT);
      setMessages((prev) => (prev ? [...prev, messageFromUser] : [messageFromUser]));
      setMessages((prev) => (prev ? [...prev, aiMessage] : [aiMessage]));
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        placeholder="メッセージを入力"
        type="text"
        className="w-full bg-zinc-700 px-4 py-2 rounded-lg focus:outline-none"
        onChange={(e) => setInputMessage(e.target.value)}
        value={inputMessage}
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2">送信</button>
    </form>
  );
}

export default ChatInput;
