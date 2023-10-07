"use client"
import React, { useState } from "react";
import { post } from "../Global/api/inventory";
// Import the post function from your api.js file

const Page = () => {
  const [newPassword, setNewPassword] = useState({
    current_password: "",
    new_password: "",
  });
  const [message, setMessage] = useState(""); // State to store success message

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    try {
      // Send a POST request to change the password
      const response = await post("change-password", newPassword);

      if (response.data.message === "Password changed successfully") {
        // Password changed successfully, set success message
        setMessage("Password changed successfully");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  // Event handler for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {message && <div>{message}</div>} {/* Display success message */}
      <form id="passwordChangeForm" onSubmit={handleSubmit}>
        <label htmlFor="current_password">Current Password:</label>
        <input
          type="password"
          id="current_password"
          name="current_password"
          required
          value={newPassword.current_password}
          onChange={handleInputChange}
        /><br /><br />

        <label htmlFor="new_password">New Password:</label>
        <input
          type="password"
          id="new_password"
          name="new_password"
          required
          value={newPassword.new_password}
          onChange={handleInputChange}
        /><br /><br />

        <input type="submit" value="Change Password" />
      </form>
    </div>
  );
};

export default Page;
