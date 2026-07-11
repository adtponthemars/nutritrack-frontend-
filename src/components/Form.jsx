import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Form({ user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "1.55",
    goal: "maintain",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please sign in first");

    // 🔹 Map and format values to match backend schema
    const payload = {
      firebaseUid: user.uid,
      email: user.email,
      name: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      gender: formData.gender,
      goal:
        formData.goal === "loss"
          ? "weight_loss"
          : formData.goal === "gain"
          ? "muscle_gain"
          : "maintenance",
      activityLevel:
        formData.activity === "1.2"
          ? "sedentary"
          : formData.activity === "1.375"
          ? "light"
          : formData.activity === "1.55"
          ? "moderate"
          : "active",
    };

    try {
      const token = await auth.currentUser.getIdToken();

      await axios.post("http://localhost:5000/api/user-data", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(" Nutrition data saved successfully!");
      navigate("/foodsearch");
    } catch (error) {
      console.error("Error saving nutrition data:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🥦 Daily Nutrition Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age (yrs)"
              className="w-1/2 p-2 border rounded-lg"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            >
              <option value="male">Male ♂️</option>
              <option value="female">Female ♀️</option>
            </select>
          </div>

          <div className="flex gap-4">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="w-1/2 p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              className="w-1/2 p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Activity Level</label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="1.2">Sedentary (little/no exercise)</option>
              <option value="1.375">Lightly active (1–3 days/wk)</option>
              <option value="1.55">Moderately active (3–5 days/wk)</option>
              <option value="1.725">Very active (6–7 days/wk)</option>
              <option value="1.9">Extra active (hard training)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="loss">Weight Loss 🔽</option>
              <option value="maintain">Maintain ⚖️</option>
              <option value="gain">Muscle Gain 💪</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold transition ${
              user
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!user}
          >
            {user ? "Calculate & Save" : "Sign in to Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

