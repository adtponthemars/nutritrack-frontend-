import React, { useState } from "react";
import axios from "axios";

export default function FoodRecommendationPage({user}) {
  const [filterType, setFilterType] = useState("calories");
  const [foodCategory, setFoodCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const userId = user.uid; 

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/recommend-foods`, {
        userId,
        filterType,
        foodCategory,
      });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 h-fit  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Food Recommendations</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Select Nutrient Focus</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white border px-3 py-2 rounded w-full"
          >
            <option value="calories">High Calorie</option>
            <option value="protein">High Protein</option>
            <option value="carbs">High Carbs</option>
            <option value="fat">High Fat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Food Category</label>
          <select
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value)}
            className="border bg-white px-3 py-2 rounded w-full"
          >
            <option value="">Any</option>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Veg</option>
            <option value="raw">Raw</option>
            <option value="processed">Processed</option>
            <option value="fruit">Fruits</option>
          </select>
        </div>
      </div>

      <button
  onClick={fetchRecommendations}
  className="bg-amber-500 text-white px-4 py-2 rounded mb-6 
             hover:bg-amber-600 hover:scale-105 
             transition-all duration-200 ease-in-out"
>
  Get Recommendations
</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {recommendations.map((food, i) => (
    <div
      key={i}
      className="bg-white p-5 rounded-2xl shadow-xl border-emerald-800 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {food.name}
      </h3>

      <div className="space-y-1 text-gray-600 text-sm">
        <p><span className="font-medium">Calories:</span> {food.calories || "N/A"}</p>
        <p><span className="font-medium">Protein:</span> {food.protein || 0} g</p>
        <p><span className="font-medium">Carbs:</span> {food.carbs || 0} g</p>
        <p><span className="font-medium">Fat:</span> {food.fat || 0} g</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
