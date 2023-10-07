"use client";
import React, { useState } from "react";
import { post } from "../Global/api/inventory";

const Page = () => {
  const [newstaff, setNewstaff] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    dob: "",
    gender: "male",
    address: "",
    role: "",
    photo: "",
  });

  // Create a data object with the form values

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewstaff((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateFormSubmit = (event) => {
    event.preventDefault();

    post("user", newstaff)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error creating staff:", error);
      });
  };

  return (
    <div className="bg-gray-100 max-h-screen overflow-y-auto min-h-screen flex justify-center items-center">
      <div className="  w-[40%] p-8 rounded-md shadow-md bg-purple-100">
        <h2 className="text-2xl font-semibold mb-4">Staff Create</h2>
        <form onSubmit={handleCreateFormSubmit}>
          
            
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            
            <input
              type="text"
              id="name"
              name="name"
              value={newstaff.name}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"
            />
          </label>

     
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            
            <input
              type="email"
              id="email"
              name="email" 
              value={newstaff.email}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"
            />
          </label>

          
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            
            <input
             type="password"
              id="password"
              name="password"
              value={newstaff.password}
              onChange={handleInputChange}
              className="block w-full border rounded p-3 mt-1"
            />
         </label>

          
            <label
              htmlFor="phone_number"
              className="block text-gray-700 font-medium"
            >
              Phone Number
            
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={newstaff.phone_number}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"            />
          
          </label>

         
            <label htmlFor="dob" className="block text-gray-700 font-medium">
              Date of Birth
            
            <input
              type="date"
              id="dob"
              name="dob"
              value={newstaff.dob}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"            />
          </label>

          
            <label htmlFor="gender" className="block text-gray-700 font-medium">
              Gender
           
            <select
              id="gender"
              name="gender"
              value={newstaff.gender}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select> </label>
          

          
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium"
            >
              Address
            
            <input
              type="text"
              id="address"
              name="address"
              value={newstaff.address}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"            />
        </label>

        
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Role
            
            <input
              type="elect"
              id="role"
              name="role"
              value={newstaff.role}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1"/>
</label>

          
            <label htmlFor="photo" className="block text-gray-700 font-medium">
              Photo
            
            <input
              type="file"
              id="photo"
              name="photo"
              value={newstaff.photo}
              onChange={handleInputChange}
              className="block w-full border rounded p-2 mt-1" />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mb-3  rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
