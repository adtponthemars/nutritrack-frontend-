import React from 'react';
import { useNavigate } from "react-router-dom";
import { heroImg } from '../assets/asset';

const HomePage = ({ user, profileExists }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div>
      <section className="flex flex-col-reverse lg:flex-row items-center px-20 py-10 gap-12">
        <div className="lg:w-2/5 ">
          <h1 className="text-6xl font-extrabold leading-tight">
            Every Meal Counts. <br />Track It Easily.
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Track your meals, get food recommendations, and stay healthy effortlessly.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={() => {
                if (!user) navigate("/auth");
                else if (user && !profileExists) navigate("/form");
                else navigate("/dashboard");
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              {!user && "Get Started"}
              {user && !profileExists && "Continue Profile Setup"}
              {user && profileExists && "Go to Dashboard"}
            </button>
          </div>
        </div>

        <div className="w-3/5 flex justify-center">
          <img src={heroImg} alt="Healthy eating" className="w-6xl" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-10 py-10">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 items-center gap-10">
          <div className='bg-blue-300 shadow rounded-2xl p-6'>
            <div className="text-green-600 text-4xl mb-3">📝</div>
            <h3 className="font-semibold text-lg">1. Create your profile</h3>
            <p className="text-gray-600 text-sm mt-2">Enter your basic details</p>
          </div>

          <div className='bg-lime-300 shadow rounded-2xl p-6'>
            <div className="text-green-600 text-4xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg">2. Log your meals</h3>
            <p className="text-gray-600 text-sm mt-2">Search or scan food items</p>
          </div>

          <div className='bg-amber-300 shadow rounded-2xl p-6'>
            <div className="text-green-600 text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-lg">3. Track your progress</h3>
            <p className="text-gray-600 text-sm mt-2">View insights and stay on top of your goals</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
