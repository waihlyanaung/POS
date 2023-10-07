"use client";
import React, { useState, useEffect } from "react";
import { get, del, post, put } from "@/app/Global/api/inventory";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";

const Brand = () => {
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  // get brand
  const [data, setData] = useState([]);
  
  useEffect(() => {
    get("brand")
      .then((response) => {
        console.log(response);
        console.log("GET Response:", setData(response.data.data));
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, [refresh]);

  // brand delete
  const deleteHandler = (id) => {
    del(`brand/${id}`)
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    del();
  }, []);

  // brand create logic
  const [newBrandData, setNewBrandData] = useState({
    name: "",
    company: "",
    agent: "",
    phone_no: "",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBrandData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateFormSubmit = (event) => {
    event.preventDefault();
  
    // Check if both "name" and "company" fields have values
    
      post("brand", newBrandData)
        .then((response) => {
          console.log("Brand created:", response.data);
          closeModal();
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.error("Error creating brand:", error);
        });
    
  };
  

  // brand update

  const [updateBrandData, setUpdateBrandData] = useState({
    id: "",
    name: "",
    company: "",
    agent: "",
    phone_no: "",
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openUpdateModal = (item) => {
    setUpdateBrandData({
      id: item.id,
      name: item.name,
      company: item.company,
      agent: item.agent,
      phone_no: item.phone_no,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateFormSubmit = (event) => {
  event.preventDefault();

  // Check if 'name' and 'company' fields are provided and not empty
  if (!updateBrandData.name || !updateBrandData.company) {
    console.error("Name and company fields are required.");
    return; // Exit the function if fields are missing
  }

  console.log("Updating brand with data:", updateBrandData);

  put(`brand/${updateBrandData.id}`, updateBrandData)
    .then((response) => {
      console.log("Brand updated:", response.data);
      closeUpdateModal();
      setRefresh(!refresh);
    })
    .catch((error) => {
      console.error("Error updating brand:", error);
    });
};

  

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = searchInput.trim() === "" ? data : filteredData;
  const currentRows = currentData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search functionality
  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item?.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filteredItems);
  }, [searchInput, data]);

  return (
    <div className="h-full">
      {/* brand create  */}
      <div className=" p-2 mt-7">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black text-2xl ml-3 font-bold"> Brand Control</div>
          
        
          
          <button
            onClick={openCreateModal}
            className="px-4 py-1 bg-blue-400 text-1xl mr-3 font-bold text-white rounded  hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Create Brand
          </button>
        </div>
      </div>
        {/* Search bar */}
        <div className="p-2 mt-2 ml-3">
            <input
              type="text"
              placeholder="Search brand name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeIn">
            <form onSubmit={handleCreateFormSubmit} className="w-full">
              <label className="block mb-2 text-gray-600">
                Name:
                <input
                  type="text"
                  name="name"
                  value={newBrandData.name}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1 "
                />
              </label>
              <label className="block mb-2 text-gray-600">
                Company:
                <input
                  type="text"
                  name="company"
                  value={newBrandData.company}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1"
                />
              </label>
              <label className="block mb-2 text-gray-600">
                Agent:
                <input
                  type="text"
                  name="agent"
                  value={newBrandData.agent}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1"
                />
              </label>
              <label className="block mb-2 text-gray-600">
                Phone Number:
                <input
                  type="text"
                  name="phone_no"
                  value={newBrandData.phone_no}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1"
                />
              </label>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-200"
                >
                  Create
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="min-w-full border rounded-lg overflow-hidden mt-4">
        <thead className="bg-blue-200 ">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              BRAND NAME
            </th>
            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              COMPANY NAME
            </th>
            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              AGENT
            </th>
            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              PHONE
            </th>
            <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {currentRows.map((item) => (
            <tr key={item?.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item?.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item?.agent}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item?.phone_no}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => deleteHandler(item?.id)}
                  className="text-[#DC2626] hover:text-red-700 focus:outline-none"
                >
                  <AiTwotoneDelete />
                </button>
                <button
                  onClick={() => openUpdateModal(item)}
                  className="text-[#72CDFE] hover:text-blue-700 focus:outline-none ml-2"
                >
                  <GrEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {data.length > rowsPerPage && (
          <ul className="flex">
            {Array.from({ length: Math.ceil(data.length / rowsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
          <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeInUp">
            <form onSubmit={handleUpdateFormSubmit} className="w-full">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={updateBrandData.name}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>
              <label className="block mb-2">
                Company:
                <input
                  type="text"
                  name="company"
                  value={updateBrandData.company}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      company: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>
              <label className="block mb-2">
                Agent:
                <input
                  type="text"
                  name="agent"
                  value={updateBrandData.agent}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      agent: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>
              <label className="block mb-2">
                Phone Number:
                <input
                  type="text"
                  name="phone_no"
                  value={updateBrandData.phone_no}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      phone_no: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-200"
                >
                  Update
                </button>
                <button
                  onClick={closeUpdateModal}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;

