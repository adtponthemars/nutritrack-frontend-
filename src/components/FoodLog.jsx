import React, { useState } from "react";
import axios from "axios";
import { Search, Flame, Beef, Wheat, Droplet, Leaf, Candy } from "lucide-react";

const nutrientIcons = {
  Energy: <Flame className="text-orange-500" size={20} />,
  Protein: <Beef className="text-red-500" size={20} />,
  "Carbohydrate, by difference": <Wheat className="text-yellow-600" size={20} />,
  "Total lipid (fat)": <Droplet className="text-pink-500" size={20} />,
  "Fiber, total dietary": <Leaf className="text-green-600" size={20} />,
  "Sugars, total including NLEA": <Candy className="text-rose-500" size={20} />,
};

const mealOptions = ["breakfast", "lunch", "dinner", "snack"];

function FoodSearch({ user, onFoodLogged }) {
  const [query, setQuery] = useState("");
  const [nutrition, setNutrition] = useState([]);
  const [quantity, setQuantity] = useState(100);
  const [mealType, setMealType] = useState("breakfast");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const API_URL= import.meta.env.VITE_SERVER_API;
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchNutrition = async () => {
    if (!query.trim()) {
      setError("Please enter a food name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${API_URL}/api/foodlog`,
        { params: { query } }
      );

      const { nutrients, foodId } = res.data;

      setNutrition(
        nutrients.map((n) => ({ ...n, foodId }))
      );
    } catch (err) {
      setError("Error fetching nutrition data.");
      setNutrition([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async () => {
    if (!nutrition.length) return;

    const getValue = (name) =>
      ((nutrition.find((n) => n.nutrientName === name)?.value || 0) *
        quantity) /
      100;

    const nutrients = {
      calories: getValue("Energy"),
      protein: getValue("Protein"),
      carbs: getValue("Carbohydrate, by difference"),
      fat: getValue("Total lipid (fat)"),
    };

    const foodLogData = {
      userId: user.uid,
      date: new Date(),
      mealType,
      foodId: nutrition[0].foodId,
      foodName: query,
      quantity: Number(quantity),
      nutrients,
    };

    try {
      const res = await axios.post(`${API_URL}/api/foodlog`, foodLogData);

      if (res.status === 201) {
        showToast("Food logged successfully!");
        onFoodLogged?.();
      } else {
        setError("Failed to store food log.");
      }
    } catch (err) {
      setError("Error connecting to backend.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-around py-6 px-7 md:p-15 bg-white">
      <div className="w-full md:w-2/6  border-green-100 ">
        <h2 className=" text-2xl md:text-4xl font-bold text-green-700 text-center mb-4">
          🥗 Nutrition Finder
        </h2>

        {/* Food Search */}
        <input
          type="text"
          className="w-full border border-gray-300 rounded-xl md:px-4 py-2 mb-3 focus:ring-2 focus:ring-green-500"
          placeholder="Search for a food (e.g., Apple)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Quantity Selector */}
        <div className="mb-3">
          <label className="font-medium text-gray-700">Quantity (g)</label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="range"
              min="10"
              max="500"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full"
            />
            <input
              type="number"
              className="w-20 border rounded-lg px-2 py-1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {/* Meal Type Dropdown */}
        <div className="mb-4">
          <label className="font-medium text-gray-700">Meal Type</label>
          <select
            className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            {mealOptions.map((meal) => (
              <option key={meal} value={meal}>
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchNutrition}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2.5 mb-3"
        >
          <Search size={18} />
          {loading ? "Loading..." : "Search Nutrition"}
        </button>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}
      </div>

      {/* Nutrition Display */}
      <div>
        {nutrition.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Nutrition for {quantity}g
            </h3>

            {nutrition.map((nutrient, i) => {
              const value = ((nutrient.value * quantity) / 100).toFixed(2);

              return (
                <div
                  key={i}
                  className="p-4 bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {nutrientIcons[nutrient.nutrientName]}
                      <span className="font-medium">{nutrient.nutrientName}</span>
                    </div>
                    <span className="font-semibold">{value} {nutrient.unitName}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${Math.min(value * 1.2, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleAddFood}
              className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl py-3"
            >
              Add Food to Log
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default FoodSearch;
