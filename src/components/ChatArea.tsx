import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { getMessagesForChatRoom } from "../utils/chatServices";
import { useAuth } from "../context/AuthContextProvider";
type chartArea = {
  selectedChatRoomId: number | null;
};
function ChatArea({ selectedChatRoomId }: chartArea) {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchMessages() {
      if (!selectedChatRoomId) return;
      try {
        const fecthMessages = await getMessagesForChatRoom(selectedChatRoomId);
        setMessages(fecthMessages);
      } catch {
        console.error("Error fetching messages");
      }
    }
    fetchMessages();
  }, [selectedChatRoomId]);
  return (
    <div className="bg-zinc-800 h-full text-white p-4 flex flex-col">
      <div className="bg-zinc-800 flex items-center justify-between">
        <h1 className="text-xl font-medium">Chat GPT Clone</h1>
        <div
          onClick={() => {
            if (window.confirm("ログアウトしてもよろしいですか？")) {
              signOut();
            }
          }}
        >
          <img
            src={user?.user_metadata.avatar_url}
            alt={user?.user_metadata.full_name}
            className="size-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-center flex-grow overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl w-full flex flex-col">
          <div className="flex-grow">
            {/* right caht me */}
            {messages?.map((message) => (
              <div key={message.id}>
                {message.is_ai ? (
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex-shrink-0 bg-zinc-900 rounded-full size-9 border border-zinc-100 flex items-center justify-center">
                      <p>AI</p>
                    </div>
                    <div className=" rounded-lg inline-block p-2">{message.content}</div>
                  </div>
                ) : (
                  <div key={message.id} className="text-right mb-6">
                    <div className="bg-zinc-700 rounded-lg inline-block p-2">
                      <p>{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div className="text-center">Loading...</div>}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="max-w-3xl mx-auto ">
          <ChatInput
            setIsLoading={setIsLoading}
            selectedChatRoomId={selectedChatRoomId}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
