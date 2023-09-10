import { PhotoIcon } from "@heroicons/react/24/solid";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, provider, storage } from "../utils/firebase.config";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [pfpExists, setPfpExists] = useState(false);

  const navigate = useNavigate();

  const handlePfpChange = (event) => {
    setPfpExists(event.target.files[0]);
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "allUsers", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "allChatsFromUser", user.uid), {});

            navigate("/");
            setLoading(false);
          });
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="parentContainer">
      <div className="border-2 border-brand-ice/20 w-[80%] sm:max-w-[600px] h-[600px] rounded-lg shadow-2xl">
        <div className="w-[90%] mx-auto mt-6 flex flex-col items-center">
          <h1 className="font-black text-4xl">
            Chat<span className="text-brand-ena">Chat</span>
          </h1>
          <p className="text-lg font-semibold mt-6">Register</p>
          <form onSubmit={handleCreateUser}>
            <input type="text" placeholder="Display Name" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <input
              type="file"
              onChange={handlePfpChange}
              className="hidden"
              id="file"
            />
            <div className="flex items-center mt-6 w-full gap-x-4">
              <label htmlFor="file">
                <PhotoIcon className="w-8 hover:opacity-50 transition-all duration-300 cursor-pointer" />
              </label>
              <span className="text-sm">Choose profile picture</span>
              {pfpExists && "✔️"}
            </div>
            <button
              type="submit"
              className="bg-brand-shiori w-full mt-6 py-3 rounded-md font-semibold
          hover:bg-opacity-70 transition-all duration-200 flex justify-center"
            >
              {loading ? (
                <ThreeDots
                  height="24"
                  width="24"
                  radius="9"
                  color="#f9f4da"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Create account"
              )}
            </button>
          </form>
          <div className="flex justify-between w-full mt-8">
            <button className="hover:underline hover:text-brand-yua">
              Create using Google instead?
            </button>
            <div>
              <span className="text-brand-ice/40">
                Already have an account?{" "}
              </span>
              <Link to={"/login"}>
              <button className="hover:text-brand-ramu hover:underline font-semibold">
                Login
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
