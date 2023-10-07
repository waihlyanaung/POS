"use client";
import React, { useEffect, useState } from "react";
import { del, get, getPhotoData, post } from "@/app/Global/api/inventory"; // Import your API functions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEdit,
  faTrash,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Import the new icons

// Modal component for adding a product

const AddProductModal = ({ onAddProduct, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand_id: "",
    category_id: "",
    actual_price: "",
    sale_price: "",
    unit: "",
    photo: "", // Store the selected photo here
    more_information: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(formData);
    // Close the modal here if needed
    onClose();
  };

  const [photoData, setPhotoData] = useState([]);
  useEffect(() => {
    getPhotoData()
      .then((response) => {
        console.log(response);
        setPhotoData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching photo data:", error);
        setError("Error fetching photo data. Please try again later.");
      });
  }, []);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  // for selected brand name
  const [selectedBrandName, setSelectedBrandName] = useState(""); // Removed selectedBrandId state

  // get brand for selecting
  const [brands, setBrands] = useState([]);
  const onSelectBrand = (selectedBrandValue) => {
    setSelectedBrandName(selectedBrandValue); // Set the selected brand's name
    const selectedBrand = brands.find(
      (brand) => brand.name === selectedBrandValue
    );
    if (selectedBrand) {
      setFormData({ ...formData, brand_id: selectedBrand.id }); // Set the selected brand's ID
    }
  };

  useEffect(() => {
    get("brand")
      .then((response) => {
        console.log(response);
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, []);

  const [listCategories, setListCategories] = useState([]);
  // Fetch data for list categories when the component mounts
  useEffect(() => {
    // Define the API endpoint to fetch categories
    const apiUrlList = "/category";

    // Fetch data for list categories when the component mounts
    get(apiUrlList)
      .then((response) => {
        console.log(response);
        setListCategories(response.data.data);

        // Check if formData.category_id is empty
        if (!formData.category_id) {
          // Set the value of category_id to an empty string initially
          setFormData({ ...formData, category_id: "" });
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold ">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-3  w-full"
              required
            />
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Brand ID
            </label>
            <select
              name="brand_name" // Updated to use brand_name for value
              value={selectedBrandName}
              onChange={(e) => onSelectBrand(e.target.value)} // Handle brand selection
              className="border rounded-lg px-3 w-full"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category ID
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="border rounded-lg px-3 w-full"
              required
            >
              <option value="">Select Category</option>{" "}
              {/* Add the default option */}
              {listCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Actual Price
            </label>
            <input
              type="text"
              name="actual_price"
              value={formData.actual_price}
              onChange={handleChange}
              className="border rounded-lg px-3  w-full"
              required
            />
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sale Price
            </label>
            <input
              type="text"
              name="sale_price"
              value={formData.sale_price}
              onChange={handleChange}
              className="border rounded-lg px-3  w-full"
              required
            />
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="border rounded-lg px-3  w-full"
              required
            />
          </div>

          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Photo
            </label>
            <select
              name="photo" // Store the selected photo URL here
              value={formData.photo}
              onChange={handleChange}
              className="border rounded-lg px-3 w-full"
            >
              <option value="">Select Photo</option>
              {photoData.map((photo) => (
                <option key={photo.id} value={photo.url}>
                  {photo.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            {formData.photo && (
              <img
                src={formData.photo} // Display the selected photo
                alt="Selected Photo"
                className="w-20 h-20" // Added a fixed width and auto height
              />
            )}
          </div>

          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              More Information
            </label>
            <textarea
              name="more_information"
              value={formData.more_information}
              onChange={handleChange}
              className="border rounded-lg px-3  w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white  px-3 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white  px-3 rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isCreatingVoucher, setIsCreatingVoucher] = useState(true); // Set the initial value as needed


  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  // Define pageNumbers based on the total number of pages
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    
      
    const apiUrl = "product"; // Replace with the correct API endpoint URL for fetching products
    get(apiUrl)
      .then((response) => {
        console.log(response);
        setProductData(response.data.data);
        localStorage.setItem("productData", JSON.stringify(response.data.data));
      })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  , []);

  const handleDelete = (id) => {
    setProductToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    const apiUrl = `product/${productToDeleteId}`;

    del(apiUrl)
      .then(() => {
        const updatedProductData = productData.filter(
          (product) => product.id !== productToDeleteId
        );
        setProductData(updatedProductData);

        localStorage.setItem("productData", JSON.stringify(updatedProductData));
        setShowDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  // Calculate startIndex and endIndex based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, productData.length);
  // Function to add a new product
  const handleAddProduct = (newProductData) => {
    const apiUrl = "product";

    post(apiUrl, newProductData)
      .then((response) => {
        console.log(response);
        const addedProduct = response.data.data;
        setProductData((prevProductData) => [...prevProductData, addedProduct]);
        // Update localStorage with the new product data
        localStorage.setItem(
          "productData",
          JSON.stringify([...productData, addedProduct])
        );
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };


  const [refresh, setRefresh] = useState(false);
  // get stock logic
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    const apiUrlStock = "stock";
    get(apiUrlStock)
    .then((response) => {
      console.log(response);
      setStockData(response.data.data);
    })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, [refresh]);

  return (
    <div>
      <div className="flex items-center justify-between mt-4 ml-3">
        <h1 className="text-3xl font-bold mb-4">Product Page</h1>
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-3"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Your table header */}
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Sale Price</th>
              <th className="px-4 py-2">Total Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          {/* Your table body */}
          <tbody>
  {isCreatingVoucher ? (
    // Render this content when creating a voucher
    productData.slice(startIndex, endIndex).map((product, index) => {
      return (
        <tr key={product.id} className="text-center">
          <td className="px-4 py-2">{startIndex + index + 1}</td>
          <td className="px-4 py-2">{product.name}</td>
          <td className="px-4 py-2">{product.brand_name}</td>
          <td className="px-4 py-2">{product.unit}</td>
          <td className="px-4 py-2">{product.sale_price}</td>
          <td className="px-4 py-2">
            {product.total_stock}
          </td>
          <td className="px-4 py-2">
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              onClick={() => handleEdit(product.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button> */}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleDelete(product.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    // Render this content when creating stock
    productData.slice(startIndex, endIndex).map((product, index) => {
      const stockInfo = stockData.find(
        (stock) => stock.product_id === product.id
      );
      return (
        <tr key={product.id} className="text-center">
          <td className="px-4 py-2">{startIndex + index + 1}</td>
          <td className="px-4 py-2">{product.name}</td>
          <td className="px-4 py-2">{product.brand_name}</td>
          <td className="px-4 py-2">{product.unit}</td>
          <td className="px-4 py-2">{product.sale_price}</td>
          <td className="px-4 py-2">
            {stockInfo ? stockInfo.quantity : 0}
          </td>
          <td className="px-4 py-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              onClick={() => handleEdit(product.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleDelete(product.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    })
  )}
</tbody>

        </table>
      </div>
      {/* pagnitation control */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold  px-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-400"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <span className="text-gray-600 mt-1">
          Page {currentPage} of {Math.ceil(productData.length / itemsPerPage)}
        </span>

        <button
          onClick={() =>
            setCurrentPage(
              Math.min(
                currentPage + 1,
                Math.ceil(productData.length / itemsPerPage)
              )
            )
          }
          disabled={
            currentPage === Math.ceil(productData.length / itemsPerPage)
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 px-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <AddProductModal
          onAddProduct={handleAddProduct}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-3 rounded-lg mr-2"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-400 text-white px-3 rounded-lg"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
