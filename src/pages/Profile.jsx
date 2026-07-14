import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_SERVER_API;

  // Fetch user details from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/user-data/user/${user.uid}`
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/api/user-data/user/${user.uid}`,
        profile
      );
      setProfile(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8FFD7] to-[#BBC863] py-10 px-4 relative">

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
      >
        Logout
      </button>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <img
            src={user.photoURL}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-green-400 shadow"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="font-medium">Age</label>
            <input
              type="number"
              disabled={!editing}
              value={profile.age || ""}
              onChange={(e) =>
                setProfile({ ...profile, age: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* Height */}
          <div>
            <label className="font-medium">Height (cm)</label>
            <input
              type="number"
              disabled={!editing}
              value={profile.height || ""}
              onChange={(e) =>
                setProfile({ ...profile, height: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="font-medium">Weight (kg)</label>
            <input
              type="number"
              disabled={!editing}
              value={profile.weight || ""}
              onChange={(e) =>
                setProfile({ ...profile, weight: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-medium">Gender</label>
            <select
              disabled={!editing}
              value={profile.gender || ""}
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Goal */}
          <div>
            <label className="font-medium">Goal</label>
            <select
              disabled={!editing}
              value={profile.goal || ""}
              onChange={(e) =>
                setProfile({ ...profile, goal: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="">Select</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Activity Level */}
          <div>
            <label className="font-medium">Activity Level</label>
            <select
              disabled={!editing}
              value={profile.activityLevel || ""}
              onChange={(e) =>
                setProfile({ ...profile, activityLevel: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
