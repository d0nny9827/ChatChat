import {
  VideoCameraIcon,
  UserPlusIcon,
  PhoneIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import CurrentChatContainer from "./CurrentChatContainer";
import MessageInput from "./MessageInput";
import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

export default function MainChat({hiddenSidebar, handleSidebar}) {

  const { data } = useContext(ChatContext)

  const handleSide = () => {
    handleSidebar()
  }

  return (
    <div className={`flex-[2]`}>
      <div className="p-3 bg-brand-coal flex items-center justify-between">
        <span className="font-bold text-lg">{data.user.displayName}</span>
        <div className="sm:flex items-center gap-x-4 hidden">
          <VideoCameraIcon className="icon" />
          <PhoneIcon className="icon" />
          <UserPlusIcon className="icon" />
          <EllipsisVerticalIcon onClick={handleSide} className="icon" />
        </div>
      </div>
      <CurrentChatContainer />
      <MessageInput />
    </div>
  );
}
