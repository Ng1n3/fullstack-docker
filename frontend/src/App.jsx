import { useState, useEffect } from "react";
import GoalInput from "./components/goals/GoalInput";
import CourseGoals from "./components/goals/CourseGoals";
import ErrorAlert from "./components/UI/ErrorAlert";

function App() {
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await fetch("http://localhost:3005/goals");

        if (!response.ok) {
          throw new Error("Fetching the goals failed.");
        }

        const resData = await response.json();
        setLoadedGoals(resData.goals);
      } catch (err) {
        console.error(err);
        setError(err.message || "Fetching goals failed - the server responded with an error.");
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addGoalHandler(goalText) {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch("http://localhost:3005/goals", {
        method: "POST",
        body: JSON.stringify({
          text: goalText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Adding the goal failed.");
      }

      const resData = await response.json();

      setLoadedGoals((prevGoals) => [
        { id: resData.goal.id, text: goalText },
        ...prevGoals,
      ]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Adding a goal failed - the server responded with an error.");
    }

    setIsLoading(false);
  }

  async function deleteGoalHandler(goalId) {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:3005/goals/${goalId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Deleting the goal failed.");
      }

      const resData = await response.json();

      setLoadedGoals((prevGoals) => 
        prevGoals.filter((goal) => goal.id !== goalId)
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Deleting the goal failed - the server responded with an error.");
    }

    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <GoalInput onAddGoal={addGoalHandler} />
      {!isLoading && (
        <CourseGoals goals={loadedGoals} onDeleteGoal={deleteGoalHandler} />
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;