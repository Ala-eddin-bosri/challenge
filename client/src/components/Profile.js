import React, { useState, useEffect } from "react";

const Profile = () => {
  // State for user data
  const [userData, setUserData] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Retrieve userId from local storage
  const userId = localStorage.getItem("userId");
console.log(userId)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if userId is available before making the API request
        if (!userId) {
          throw new Error("User ID is not available");
        }

        // Make a request to fetch user data using the userId
        const response = await fetch(
          `http://localhost:8000/api/user/${userId}`
        ); // Replace with your actual API endpoint
        const fetchedUserData = await response.json();

        // Set user data to state
        setUserData(fetchedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setError("Error fetching user data");
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    // Check if userId is available before calling fetchUserData
    if (userId) {
      fetchUserData();
    }
  }, [userId]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
console.log(userData)
  // Render your component with the user data
  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <div>
          <p>Name: {userData.user.name}</p>
          <p>Email: {userData.user.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
