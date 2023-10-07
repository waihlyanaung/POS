"use client";

import React, { useState, useEffect } from "react";
import { get, post, put } from "@/app/Global/api/inventory";

const Product = () => {
  const [refresh, setRefresh] = useState(false);
  const [pdata, setPdata] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [data, setData] = useState([]);
  const [newBrandData, setNewBrandData] = useState({
    product_id: "",
    quantity: "",
    more_information: "",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [updateBrandData, setUpdateBrandData] = useState({
    id: "",
    product_id: "",
    quantity: "",
    more_information: "",
  });

  useEffect(() => {
    // Fetch product data
    get("product")
      .then((response) => {
        console.log(response)
        setPdata(response.data.data);
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });

    // Fetch stock data
    get("stock")
      .then((response) => {
      console.log(response)
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, [refresh]);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const handleProductSelect = (event) => {
    setSelectedProductId(event.target.value);
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

    if (!selectedProductId) {
      console.error("Product ID is required");
      return;
    }

    // Set the product_id before making the API call
    newBrandData.product_id = selectedProductId;

    post("stock", newBrandData)
      .then((response) => {
        console.log("Stock created:", response.data);
        closeModal();
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error creating brand:", error);
      });
  };

  const openUpdateModal = (item) => {
    setSelectedProductId(item.product_id);
    setUpdateBrandData({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      more_information: item.more_information,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedProductId) {
      console.error("Product ID is required");
      return;
    }

    // Set the product_id before making the API call
    updateBrandData.product_id = selectedProductId;

    put(`stock/${updateBrandData.id}`, updateBrandData)
      .then((response) => {
        console.log("Stock updated:", response.data);
        closeModal();
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error updating brand:", error);
      });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
   // Pagination Logic
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
 
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  
  return (
    <div>
      {/* create stock */}
      <div className=" p-2">
        <div className="container  mx-auto flex justify-between items-center">
          <div className="text-black text-1xl font-semibold ml-3"> Stock</div>
          <button
            onClick={openCreateModal}
            className="px-4 py-1 bg-blue-400 mr-3 text-1xl font-semibold text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Create Stock
          </button>
        </div>
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeIn">
            <form onSubmit={handleCreateFormSubmit} className="w-full">
              <label className="block mb-2 text-gray-600">
                <div>
                  <label className="block mb-2 text-gray-600">Product Id</label>
                  <select
                    className="mb-2"
                    onChange={handleProductSelect}
                    name="product_id"
                    value={selectedProductId}
                  >
                    <option value="" >
                      Choose a Product
                    </option>
                    {pdata?.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.name}
                      </option>
                    ))}
                  </select>
                  {selectedProductId && (
                    <p>
                      You have selected:{" "}
                      {
                        pdata.find(
                          (productg) => productg.id === selectedProductId
                        )?.name
                      }
                    </p>
                  )}
                </div>
              </label>
              <label className="block mb-2 text-gray-600">
                Quantity
                <input
                  type="text"
                  name="quantity"
                  value={newBrandData.quantity}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1"
                />
              </label>
              <label className="block mb-2 text-gray-600">
                More Information
                <input
                  type="text"
                  name="more_information"
                  value={newBrandData.more_information}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1"
                />
              </label>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

      
        {/* Table with Pagination */}
        <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 bg-blue-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 bg-blue-200 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 bg-blue-200 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                More Information
              </th>
              <th className="px-6 bg-blue-200 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item?.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item?.product_name}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item?.quantity}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item?.more_information}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                 
                  <button
                    onClick={() => openUpdateModal(item)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <ul className="flex">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (page, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-2 mx-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded hover:bg-blue-600 hover:text-white`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      {/* update stock */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
          <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeInUp">
            <form onSubmit={handleUpdateFormSubmit} className="w-full">
              <label className="block mb-2 text-gray-600">
                <div>
                  <label className="block mb-2 text-gray-600">Product Id</label>
                  <select
                    className="mb-2"
                    onChange={handleProductSelect}
                    name="product_id"
                    value={selectedProductId}
                  >
                    <option value="" disabled>
                      Choose a Product
                    </option>
                    {pdata?.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.name}
                      </option>
                    ))}
                  </select>
                  {selectedProductId && (
                    <p>
                      You have selected:{" "}
                      {
                        pdata.find(
                          (productg) => productg.id === selectedProductId
                        )?.name
                      }
                    </p>
                  )}
                </div>
              </label>
              <label className="block mb-2">
                Quantity
                <input
                  type="text"
                  name="quantity"
                  value={updateBrandData.quantity}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      quantity: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>
              <label className="block mb-2">
                More Information
                <input
                  type="text"
                  name="more_information"
                  value={updateBrandData.more_information}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      more_information: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
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
    </div>
  );
};

export default Product;


