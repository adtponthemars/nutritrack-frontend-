import React, { useState } from "react";

export default function NutritionForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "female",
    height: "",
    weight: "",
    activity: "1.2",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateNutrition = (e) => {
    e.preventDefault();

    const { age, gender, height, weight, activity } = formData;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    // BMR calculation (Mifflin-St Jeor Equation)
    let bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    // TDEE (BMR × activity factor)
    const tdee = Math.round(bmr * parseFloat(activity));

    // Macros (50% carbs, 20% protein, 30% fats)
    const carbs = Math.round((0.5 * tdee) / 4);
    const protein = Math.round((0.2 * tdee) / 4);
    const fats = Math.round((0.3 * tdee) / 9);

    setResult({ bmr: Math.round(bmr), tdee, carbs, protein, fats });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Daily Nutrition Calculator
      </h2>

      <form onSubmit={calculateNutrition} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Age (years)</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Activity Level</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="1.2">Sedentary (little/no exercise)</option>
            <option value="1.375">Lightly active (1-3 days/week)</option>
            <option value="1.55">Moderately active (3-5 days/week)</option>
            <option value="1.725">Very active (6-7 days/week)</option>
            <option value="1.9">Super active (athlete/physical job)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Your Daily Requirement:</h3>
          <p><strong>BMR:</strong> {result.bmr} kcal/day</p>
          <p><strong>TDEE:</strong> {result.tdee} kcal/day</p>
          <p><strong>Carbs:</strong> {result.carbs} g</p>
          <p><strong>Protein:</strong> {result.protein} g</p>
          <p><strong>Fats:</strong> {result.fats} g</p>
        </div>
      )}
    </div>
  );
}
