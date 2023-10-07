"use client"
import { useRouter } from 'next-router-mock';
import Link from 'next/link';
// pages/receipt.js

import React, { useEffect, useState } from 'react';

const ReceiptPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00 Ks');

  useEffect(() => {
    // Retrieve selected products data from local storage
    const storedData = localStorage.getItem('selectedProducts');
    if (storedData) {
      const { products, totalPrice } = JSON.parse(storedData);
      setSelectedProducts(products);
      setTotalPrice(totalPrice);
    }
  }, []);

  return (

    <div>

    <div className="bg-white p-4 rounded-lg shadow-md w-[35%] mx-auto mt-[18%]">
    <h1 className="text-2xl font-bold mb-4 ml-6">Receipt</h1>
    <ul className="text-base mb-2 ml-6">
      {selectedProducts.map((product, index) => (
        <li key={index} className="flex justify-between">
          <span className="w-2/5">{product.name}</span>-
          <span className="w-1/5">{product.quantity}</span>-
          <span className="w-2/5">{product.sale_price} Ks</span>
        </li>
      ))}
    </ul>
    <strong className="flex ml-[52%]">Total - {totalPrice} Ks</strong>
    
    {/* Add Edit and Print buttons */}
    
  </div>
  <div className="flex justify-center mt-9 ml-4">
  <Link href="/recent">
          <div className="bg-gray-500   text-white font-bold py-2 px-4 rounded">
            Recent
          </div>
        </Link>
  <Link href="/category">
          <div className="bg-gray-500 ml-5  text-white font-bold py-2 px-4 rounded">
            Next Sale
          </div>
        </Link>
</div></div>
);
};

export default ReceiptPage;
