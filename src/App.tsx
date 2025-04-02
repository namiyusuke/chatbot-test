import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { getChatRoomsForUser } from "./utils/chatServices";
import { useEffect, useState } from "react";
import { ChatRoom } from "./types/types";
import AuthButton from "./components/AuthButton";
import { useAuth } from "./context/AuthContextProvider";
function App() {
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(null);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(null);
  console.log(user?.id);
  useEffect(() => {
    async function fetchChatRooms() {
      if (!user?.id) return;
      try {
        const rooms = await getChatRoomsForUser(user?.id);
        console.log(rooms[0].id);
        setChatRooms(rooms);
        if (rooms.length > 0) {
          setSelectedChatRoomId(rooms[0].id);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    }
    fetchChatRooms();
  }, [user?.id]);
  // const user = null;

  return (
    <>
      {user ? (
        <>
          <main className="bg-slate-200 md:flex w-screen h-screen ">
            {/* sidebar */}
            <div className="lg:w-1/6 md:w-1/3">
              <Sidebar
                chatRooms={chatRooms}
                setSelectedChatRoomId={setSelectedChatRoomId}
                selectedChatRoomId={selectedChatRoomId}
                setChatRooms={setChatRooms}
              />
            </div>
            <div className="lg:w-5/6 md:w-2/3">
              <ChatArea selectedChatRoomId={selectedChatRoomId} />
            </div>
            {/* header */}
            {/* main */}
          </main>
        </>
      ) : (
        <>
          {/* login */}
          <div className="flex justify-center items-center h-screen bg-zinc-800">
            <AuthButton />
          </div>
        </>
      )}
    </>
  );
}

export default App;
