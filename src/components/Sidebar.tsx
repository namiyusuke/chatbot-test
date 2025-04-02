import { ChatRoom } from "../types/types";
import { createChatRoomForUser } from "../utils/chatServices";
import { useAuth } from "../context/AuthContextProvider";
type Props = {
  chatRooms: ChatRoom[] | null;
  setSelectedChatRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedChatRoomId: number | null;
  setChatRooms: React.Dispatch<React.SetStateAction<ChatRoom[] | null>>;
};
function Sidebar({ chatRooms, setSelectedChatRoomId, selectedChatRoomId, setChatRooms }: Props) {
  const { user } = useAuth();
  const handleClick = (id: number) => {
    setSelectedChatRoomId(id);
  };
  const handleCreateChatRoom = async () => {
    const chartRoomName = window.prompt("Enter the name of the chat room");
    if (chartRoomName && user?.id) {
      try {
        const newRoom = await createChatRoomForUser(user?.id, chartRoomName);
        setChatRooms((prevRooms) => (prevRooms ? [...prevRooms, newRoom] : [newRoom]));
        setSelectedChatRoomId(newRoom.id);
      } catch (error) {
        console.error("Error creating chat room:", error);
      }
    }
  };
  return (
    <div className="bg-zinc-900 h-full text-white p-4 flex flex-col gap-4">
      <button
        onClick={() => handleCreateChatRoom()}
        className="border px-4 py-2 rounded-lg border-white hover:bg-white hover:text-slate-900 duration-200"
      >
        + create new
      </button>
      <nav>
        <ul className="space-y-2">
          {chatRooms?.map((chatRoom) => (
            <li
              key={chatRoom.id}
              onClick={() => handleClick(chatRoom.id)}
              className={`hover:bg-white hover:text-slate-600 duration-200 cursor-pointer py-2 px-2 rounded-lg ${
                selectedChatRoomId === chatRoom.id ? "bg-slate-600" : "bg-transparent"
              }`}
            >
              {chatRoom.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
