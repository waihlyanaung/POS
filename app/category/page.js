"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { get, post } from "../Global/api/inventory";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Fill } from "react-icons/ri";

const CategoryPage = () => {
  const [listCategories, setListCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityInput, setQuantityInput] = useState("");
  const [showQtyButton, setShowQtyButton] = useState(false);
  const [showDelButton, setShowDelButton] = useState(false);
  const [initialProductPrice, setInitialProductPrice] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [recordCount, setRecordCount] = useState(0);
  const [cash, setCash] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
 // New state for voucher number
  const [currentDate, setCurrentDate] = useState(""); // New state for current date

  useEffect(() => {
    const apiUrlListCategories = "/category";
    get(apiUrlListCategories)
      .then((response) => {
        setListCategories(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const apiUrlListProducts = "/product";
    get(apiUrlListProducts)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const calculatedTotalPrice = favorites.reduce((total, favorite) => {
      const price = parseFloat(favorite.sale_price) || 0;
      return total + price;
    }, 0);

    setTotalPrice(calculatedTotalPrice);
  }, [favorites]);

 

  // Function to get the current date
  const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString();
    setCurrentDate(currentDate);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const addToFavorites = (product) => {
    const formattedProduct = {
      ...product,
      quantity: "1 Qty",
      id: product.id,
    };

    const existingIndex = favorites.findIndex((fav) => fav.id === product.id);

    if (existingIndex !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites[existingIndex] = formattedProduct;
      setFavorites(updatedFavorites);
    } else {
      setFavorites([formattedProduct, ...favorites]);
    }

    setInitialProductPrice(parseFloat(product.sale_price) || 0);
  };

  const handleNumberClick = (number) => {
    if (selectedProduct) {
      let newQuantityInput = quantityInput;

      if (number === "QTY") {
        newQuantityInput += "1";
      } else if (number === "DEL") {
        newQuantityInput = newQuantityInput.slice(0, -1);
      } else {
        newQuantityInput += number;
      }

      setQuantityInput(newQuantityInput);

      const currentQuantity = parseFloat(newQuantityInput) || 0;
      const updatedPrice = (initialProductPrice || 0) * currentQuantity;

      const formattedProduct = {
        ...selectedProduct,
        quantity: `${currentQuantity} Qty`,
        sale_price: updatedPrice.toFixed(2),
      };

      const index = favorites.findIndex((fav) => fav.id === selectedProduct.id);

      if (index !== -1) {
        const updatedFavorites = [...favorites];
        updatedFavorites[index] = formattedProduct;
        setFavorites(updatedFavorites);
      }
    }
  };

  const handleDeleteClick = (productToDelete) => {
    if (productToDelete && productToDelete.id) {
      const updatedFavorites = favorites.map((favorite) => {
        if (favorite.id === productToDelete.id) {
          const currentQuantity = favorite.quantity.split(" ")[0] || "0";
          const newQuantity = currentQuantity.slice(0, -1);
          favorite.quantity = `${newQuantity || "0"} Qty`;

          const updatedPrice =
            (initialProductPrice || 0) * parseFloat(newQuantity || "0");

          favorite.sale_price = updatedPrice.toFixed(2);

          if (newQuantity === "0") {
            favorite.sale_price = (initialProductPrice || 0).toFixed(2);
          }
        }
        return favorite;
      });

      setFavorites(updatedFavorites);

      if (selectedProduct && selectedProduct.id === productToDelete.id) {
        setSelectedProduct(null);
        setQuantityInput("");
      }
    }
  };

  const selectProductByColor = (color, product) => {
    const productsWithSameColor = favorites.filter(
      (favProduct) => favProduct.color === color
    );

    if (productsWithSameColor.length > 1) {
      const currentIndex = productsWithSameColor.findIndex(
        (favProduct) => favProduct.id === product.id
      );

      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % productsWithSameColor.length;
        setSelectedProduct(productsWithSameColor[nextIndex]);
      }
    }
  };

  const productSelectedClass = (product) => {
    return selectedProduct && selectedProduct.id === product.id
      ? "bg-blue-200"
      : "";
  };

  const handleRemoveClick = (productToDelete) => {
    if (productToDelete && productToDelete.id) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== productToDelete.id
      );
      setFavorites(updatedFavorites);

      if (selectedProduct && selectedProduct.id === productToDelete.id) {
        setSelectedProduct(null);
        setQuantityInput("");
      }
    }
  };

  const handleClearClick = () => {
    setFavorites([]); // Clear the favorites list
    setTotalPrice(0); // Reset the total price
    setSelectedProduct(null); // Reset the selected product
    setQuantityInput(""); // Reset the quantity input
  };

  const router = useRouter();

   // Function to generate a random voucher number
   const generateVoucherNumber = () => {
    const voucherNumber = Math.floor(100000 + Math.random() * 900000);
    return voucherNumber.toString();
  };

  const handlePaymentClick = () => {
    // Generate voucher number
    const voucherNumber = generateVoucherNumber();
    
    // Create the request body
    const requestBody = {
      customer_name: "Hex exee",
      phone_number: "07812637259",
      voucher_number: voucherNumber,
      more_information: "this is a test request",
      records: favorites.map((favorite) => ({
        product_id: favorite.id,
        quantity: parseFloat(favorite.quantity.split(" ")[0]) || 0,
      })),
    };

    // Make the POST request
    post("voucher", requestBody)
      .then((response) => {
        // Handle the response here, you can access response.data for the JSON data
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      if (totalPrice > 0) {
        // Prepare the data to send to the Receipt page
        const productsData = {
          products: favorites,
          totalPrice: totalPrice.toFixed(2),
          voucherNumber, // Include the generated voucher number
          currentDate, // Include the current date
          itemCount: favorites.length, // Calculate the item count
          cash: totalPrice.toFixed(2), // Set cash to the total price
          tax: "0", // Set tax to 0 (you can calculate it if needed)
          netTotal: totalPrice.toFixed(2), // Set net total to the total price
        };
  
        // Store the selected products data in local storage
        localStorage.setItem("selectedProducts", JSON.stringify(productsData));
  
        // Redirect to the Receipt page
        router.push("/receipt");
      } else {
        // Handle the case when there are no selected products
        alert("Please add products to your receipt before making a payment.");
      }

  };


  return (
    <div className="flex">
      <div className="flex-2">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4"> Categories:</h2>
          <ul className="flex flex-wrap">
            {listCategories.map((category) => (
              <li
                key={category.id}
                className={`rounded-lg border border-gray-300 p-4 m-2 hover:bg-blue-200 transition duration-300 ease-in-out ${
                  selectedCategory === category.name ? "bg-blue-200" : ""
                } cursor-pointer`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-lg font-bold mb-4">Products:</h2>
        <div className="max-h-[400px] min-h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-300 rounded">
          <ul className="w-[100%] grid grid-cols-2">
            {categories
              .filter((product) => product.category_name === selectedCategory)
              .map((product) => (
                <li
                  key={product.id}
                  className={`rounded-lg border border-gray-700 p-2 my-2 mx-3 ${productSelectedClass(
                    product
                  )} cursor-pointer card-animation`}
                  onClick={() => {
                    setSelectedProduct(product);
                    addToFavorites(product);
                    setQuantityInput("");
                  }}
                >
                  <div className="w-[100%]">
                    <div className="card-image">
                      <img
                        src={product.photo}
                        alt={product.name}
                        style={{ height: "150px", width: "300px" }}
                      />
                    </div>
                    <div className="card-content">
                      <div className="product-name text-bold">
                        {product.name}
                      </div>
                      <div className="product-price">
                        {product.sale_price} Ks
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex-1  favorites-section ml-3  ">
        <h2 className="text-lg font-bold mb-4 favorites-header">Receive</h2>
        <div className="flex max-h-[95%] min-h-[95%] flex-col justify-between ">
          <div className=" ">
            <div>
              {favorites.map((favorite, index) => (
                <div
                  key={index}
                  className={`${productSelectedClass(favorite)} cursor-pointer`}
                  style={{
                    color:
                      favorite.id === selectedProduct?.id ? "green" : "black",
                  }}
                  onClick={() => {
                    setSelectedProduct(favorite);
                    setQuantityInput("");
                  }}
                >
                  <li key={index} class="flex justify-between">
                    <span class="w-2/5"> {favorite.name}</span>-
                    <span class="w-1/5">{favorite.quantity} </span>-
                    <span class="w-2/5 ">{favorite.sale_price} Ks</span>
                    <span class="w-2/5 ">
                      <button
                        onClick={() => handleRemoveClick(favorite)}
                        className="ml-3 text-lg  text-red-500"
                        style={{
                          display:
                            selectedProduct?.id === favorite.id
                              ? "inline-block"
                              : "none",
                        }}
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </span>
                  </li>
                </div>
              ))}
            </div>

            <div className="flex ml-[49%]">
              <strong>Total - {totalPrice.toFixed(2)} Ks</strong>
            </div>
          </div>

          <div className=" ">
  <div className="grid grid-cols-4 gap-3">
    {[
                1,
                2,
                3,
                "QTY",
                4,
                5,
                6,
                "DEL",
                7,
                8,
                9,
                "CLEAR",
                "+/-",
                0,
                ".",
                "Payment",
              ].map((number, index) => (
      <div
        key={index}
        className={`col-span-1 ${
          (number === "QTY" && favorites.length > 0) ? "bg-blue-200" : ""
        }`}
        onMouseEnter={() => setHoveredButton(number === "QTY" ? "QTY" : null)}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={() => {
          if (number === "DEL") {
            handleDeleteClick(selectedProduct);
          } else if (number === "QTY") {
            // Handle quantity button logic here
          } else if (number === "CLEAR") {
            handleClearClick();
          } else if (number === "Payment") {
            generateVoucherNumber(); // Generate voucher number
            getCurrentDate(); // Get current date
            handlePaymentClick();
          } else {
            handleNumberClick(number);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        {number}
      </div>
    ))}
  </div>
  {showDelButton && <div className="col-span-1">DEL</div>}
</div>

        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
