import React, { useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
const FoodLogCards = ({ logs }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative w-full my-4">
      <h2 className="text-2xl font-bold mb-4 px-10">Today's Food Logs</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2  z-10 hover:bg-gray-100"
      >
        <ChevronLeft/>
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronRight/>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
      >
        {logs.map((log) => (
          <div
            key={log._id}
            className="min-w-[250px] uppercase bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex-shrink-0 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold capitalize text-gray-800">
              {log.mealType}
            </h3>

            <p className="text-gray-600 font-medium mt-1">
              {log.foodName} — {log.quantity}g
            </p>

            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>🔥 Calories: {log.nutrients.calories}</p>
              <p>🥩 Protein: {log.nutrients.protein} g</p>
              <p>🍚 Carbs: {log.nutrients.carbs} g</p>
              <p>🧈 Fat: {log.nutrients.fat} g</p>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Logged on {new Date(log.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodLogCards;
