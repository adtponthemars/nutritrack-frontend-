import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Pencil, LogOut } from 'lucide-react';

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
    <div className="min-h-screen w-full py-5 md:py-10 px-4 relative">

      {/* Logout Button */}
      
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm bg-red-600 md:right-6 text-white px-4 py-2 rounded-lg  font-semibold"
        >
          Log Out
        </button>

          <div className="flex pt-10 flex-col justify-center  items-center gap-6">
            <img
              src={user.photoURL}
              alt="User"
              className="size-16 md:size-20 rounded-full border-4 border-green-400 shadow"
            />
            <div>
              <h1 className="text-md font-semibold text-center md:text-2xl md:font-bold">{user.displayName}</h1>
              <p className="text-gray-600 text-[10px] md:text-[15px]">{user.email}</p>
            </div>
          </div>
      

        <div className="md:p-8 w-full max-w-3xl mx-auto">

        {/* Profile Details */}
        <div className="mt-6 md:mt-2">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold">Personal Info</h2>

            {/* Buttons */}
            <div className="flex gap-4 ">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-green-500 flex justify-center items-center size-12 rounded-full text-white "
                >
                  <Pencil />
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
          {/* Age */}
          <div className="grid grid-cols-2 gap-5">
            <div className="border-y-2 border-gray-200 p-3">
              <label className="font-medium">Age</label>
              <input
                type="number"
                disabled={!editing}
                value={profile.age || ""}
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value })
                }
                className="w-full mt-1 p-2 rounded-lg"
              />
            </div>

            {/* Height */}
            <div className="border-y-2 border-gray-200 p-3">
              <label className="font-medium">Height (cm)</label>
              <input
                type="number"
                disabled={!editing}
                value={profile.height || ""}
                onChange={(e) =>
                  setProfile({ ...profile, height: e.target.value })
                }
                className="w-full mt-1 p-2"
              />
            </div>

            {/* Weight */}
            <div className="border-y-2 border-gray-200 p-3">
              <label className="font-medium">Weight (kg)</label>
              <input
                type="number"
                disabled={!editing}
                value={profile.weight || ""}
                onChange={(e) =>
                  setProfile({ ...profile, weight: e.target.value })
                }
                className="w-full mt-1"
              />
            </div>

            {/* Gender */}
            <div className="border-y-2 border-gray-200 p-3">
              <label className="font-medium">Gender</label>
              <select
                disabled={!editing}
                value={profile.gender || ""}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                className="w-full mt-1 p-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Goal */}
            <div className="border-y-2 border-gray-200 p-3">
              <label className="font-medium">Goal</label>
              <select
                disabled={!editing}
                value={profile.goal || ""}
                onChange={(e) =>
                  setProfile({ ...profile, goal: e.target.value })
                }
                className="w-full mt-1"
              >
                <option value="">Select</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="border-y-2 border-gray-200 p-3">
              <label className="font-medium">Activity Level</label>
              <select
                disabled={!editing}
                value={profile.activityLevel || ""}
                onChange={(e) =>
                  setProfile({ ...profile, activityLevel: e.target.value })
                }
                className="w-full mt-1 p-2 "
              >
                <option value="">Select</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
