import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-2xl shadow-lg w-[400px] text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
        <p className="text-gray-600 mb-8">Continue to your nutrition dashboard</p>

        <button
          className="w-full bg-green-600 text-white py-3 rounded-xl mb-4 hover:bg-green-700"
          onClick={() => navigate("/signin?mode=login")}
        >
          Log In
        </button>

        <button
          className="w-full border border-gray-400 py-3 rounded-xl hover:bg-gray-100"
          onClick={() => navigate("/signin?mode=signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
