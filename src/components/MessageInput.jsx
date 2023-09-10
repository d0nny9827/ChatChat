import {
  PaperClipIcon,
  MicrophoneIcon,
  PhotoIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../utils/firebase.config";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMessage = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "oneOnOneChats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "oneOnOneChats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "allChatsFromUser", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "allChatsFromUser", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="bg-brand-coal p-4 flex items-center gap-x-4">
      <input
        type="text"
        value={text}
        placeholder="Type something..."
        className="w-full p-1 rounded outline-none placeholder:text-brand-ice/40
       bg-transparent"
        onChange={(event) => setText(event.target.value)}
      />
      <div className="flex items-center gap-x-4">
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(event) => setImg(event.target.files[0])}
        />
        <label htmlFor="file">
          <PhotoIcon className="icon" />
        </label>
        <PaperClipIcon className="icon" />
        <MicrophoneIcon className="icon" />
        <FaceSmileIcon className="icon" />
        <button
          onClick={handleSendMessage}
          className="bg-brand-shiori px-6 py-1.5 rounded-md text-sm font-semibold
        hover:bg-opacity-70 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
