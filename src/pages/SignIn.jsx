import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignIn({ setUser }) {
  const navigate = useNavigate();

  // Read "mode" from URL (login or signup)
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const mode = params.get("mode") || "login"; // default: login

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Store user in parent App state
      setUser(result.user);

    } catch (error) {
      console.log("Error signing in...", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-400 to-yellow-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[360px] text-center">
        <h1 className="text-3xl font-bold mb-6">
          {mode === "signup" ? "Create Your Account" : "Welcome Back"}
        </h1>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 shadow-sm hover:shadow-md px-6 py-3 rounded-2xl text-gray-700 font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FcGoogle size={24} />
          <span>
            {mode === "signup" ? "Sign Up with Google" : "Log In with Google"}
          </span>
        </button>

        <p className="text-gray-500 text-sm mt-6">
          {mode === "signup"
            ? "Already have an account?"
            : "New user?"}
          <span
            className="text-green-600 ml-1 cursor-pointer hover:underline"
            onClick={() =>
              navigate(`/signin?mode=${mode === "signup" ? "login" : "signup"}`)
            }
          >
            {mode === "signup" ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}
