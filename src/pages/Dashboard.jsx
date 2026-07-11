import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodHistory from "../components/FoodHistory";

const Dashboard = ({ user }) => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetches daily nutrition summary from backend
  useEffect(() => {
    const fetchDailySummary = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/summary/${user.uid}`);
        setSummary(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to load nutrition data.");
      }
    };

    if (user) fetchDailySummary();
  }, [user]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  const {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    dailyCalories,
    dailyProtein,
    dailyCarbs,
    dailyFat,
  } = summary;

  const nutrients = [
    { label: "Protein", consumed: totalProtein, required: dailyProtein },
    { label: "Carbs", consumed: totalCarbs, required: dailyCarbs },
    { label: "Fat", consumed: totalFat, required: dailyFat },
  ];

  //  Calculates percentage of nutrient completed
  const getPercent = (consumed, required) => {
    if (!required) return 0;
    return Math.min((consumed / required) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8FFD7] to-[#BBC863] flex flex-col  py-5 px-9">
      {/* HEADER  */}
      <div className="w-[100%] flex justify-between ">
        <h1>Dashboard</h1>
        <div><img
          src={user?.photoURL}
          alt="User avatar"
          className="w-14 h-14 rounded-full border-2 border-green-500 shadow-md"
        /></div>
      </div>
      <div>
        <div className="font-bold text-4xl">Hi, {user?.displayName}!</div>
      </div>
      {/* DASHBOARD  */}
      <div className="flex justify-between items-center">
        {/* ----------LINEAR PROGRESS BAR--------------- */}
        <div className="w-3xl">
          {nutrients.map((nutrient) => (
            <div key={nutrient.label} className="p-2">
              <div className="flex justify-between mb-1">
                <p className="font-semibold text-gray-600">{nutrient.label}</p>
                <p className="text-sm text-gray-600">
                  {nutrient.consumed}/{nutrient.required} {nutrient.label === "Calories" ? "kcal" : "g"}
                </p>
              </div>

              <div className="w-full bg-white rounded-full h-5 overflow-hidden">
                <div
                  className="h-5 bg-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${getPercent(nutrient.consumed, nutrient.required)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        {/*------------CIRCULAR BAR------------ */}
        <div className="flex flex-col w-[30%] py-10 rounded-2xl  bg-amber-300 items-center space-y-3">
          <p className="font-semibold text-lg mb-6">Daily Progress</p>
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={
                  282.6 - (282.6 * totalCalories) / dailyCalories
                }
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-bold">{Math.min(totalCalories, dailyCalories)}</p>
              <p className="text-xs text-gray-600">/ {dailyCalories} kcal</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/foodsearch")}
        className="mt-6 w-45 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md font-semibold transition"
      >
        Add Food Log
      </button>
      <div className="mt-4 p-2">
        
        <div>
          <FoodHistory user={user}/>
        </div>
      </div>

    </div>
  );
};

export default Dashboard