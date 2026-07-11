import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Form from "./components/Form";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";
import FoodSearch from "./components/FoodLog";
import HomePage from "./pages/HomePage"; // 
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FoodRecommendations from "./components/FoodRecommendations";
import FoodHistory from "./components/FoodHistory";
import AuthChoice from "./pages/AuthChoice";

function AuthWatcher({ setUser, setAuthLoading, setProfileExists }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      const publicPaths = ["/", "/auth", "/signin"];

      if (!currentUser) {
        setProfileExists(false); 
        if (!publicPaths.includes(location.pathname)) {
          navigate("/auth");
        }
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/user-data/${currentUser.uid}`
        );

        if (res.data.exists) {
          setProfileExists(true);
        } else {
          setProfileExists(false);

          if (location.pathname !== "/form") {
            navigate("/");
          }
        }
      } catch (err) {
        console.error("Error checking profile:", err);
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname, setUser]);

  return null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  return (
    <Router>
      <div className="">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed ">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1   ml-55">
             <AuthWatcher
            setUser={setUser}
            setAuthLoading={setAuthLoading}
            setProfileExists={setProfileExists}
          />
          <Routes>
            <Route path="/" element={<HomePage user={user} profileExists={profileExists} />} />
            <Route path="/auth" element={<AuthChoice />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route
              path="/form"
              element={
                <ProtectedRoute user={user}>
                  <Form user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <Profile user={user} />
                </ProtectedRoute> 
              }
            />
            <Route
              path="/foodsearch"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <FoodSearch user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            {/* Extra Routes */}
            <Route path="/recommend" element={<FoodRecommendations user={user} />} />
            <Route path="/foodlogs" element={<FoodHistory user={user} />} />
          </Routes>

        </div>
      </div>
      </div>
    </Router>
  );
}
