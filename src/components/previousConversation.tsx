import { previousChatsAtom } from "@/store/previousChats";
import { useRecoilState } from "recoil";

export const PreviousConversation = () => {
  const [previousState] = useRecoilState(previousChatsAtom);

  return (
    <div className="flex flex-col px-2 py-6">
      <h3 className="text-lg font-bold px-2">Previous Chats</h3>
      <div className="flex flex-col gap-[2px] mt-4">
        {previousState.chats.map((chat, idx) => (
          <div
            key={idx}
            className="group relative flex items-center overflow-hidden cursor-pointer px-2 py-2 rounded-lg hover:bg-secondary"
          >
            <div className="relative w-full text-sm whitespace-nowrap">
              {chat.name}
              <span className="absolute right-[-8px] h-full w-11 bg-fade-left-half group-hover:bg-fade-left-half-primary"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
