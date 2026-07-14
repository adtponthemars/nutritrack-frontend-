import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodLogCards from './FoodLogCards'

const FoodHistory = ({user}) => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchFoodLogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/foodlog/user/${user.uid}?date=${today}`
        );
        setFoodLogs(response.data.data);
      } catch (err) {
        console.error("Error fetching food logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodLogs();
  }, [user, today]);

  if (loading) return <p>Loading...</p>;
  if (!foodLogs.length) return <p>No food logged for this day.</p>;

  return (
    <div className="">
     <FoodLogCards logs={foodLogs}/>
    </div>
  );
};

export default FoodHistory;
