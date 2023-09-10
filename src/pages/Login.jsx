import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.config";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSigninUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      navigate("/");

      setLoading(false);

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
          <p className="text-lg font-semibold mt-6">Login</p>
          <form onSubmit={handleSigninUser} className="w-full">
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="bg-brand-shiori button mt-8 flex justify-center">
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
                "Sign in to account"
              )}
            </button>
          </form>
          <p className="my-4 font-semibold">or</p>
          <button className="bg-brand-luna button">Sign in with Google</button>
          <div className="flex justify-end w-full mt-8">
            <div>
              <span className="text-brand-ice/40">Don't have an account? </span>
              <Link to={'/register'}>
              <button
                className="hover:text-brand-ramu hover:underline font-semibold"
                >
                Register
              </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
