"use client";
import { get } from "@/app/Global/api/inventory";
import React, { useEffect, useState } from "react";

const MonthlyPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState([]);
  const rowsPerPage = 5;

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "finance/monthly/1-08-2023";

    // Make the GET request using the get function from api.js
    get(apiUrl)
      .then((response) => {
        console.log(response);
        // Assuming the response contains the desired data structure
        setData(response.data);
        setSummary(response.data.monthly_sale_summary);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the data for the current page
  const currentPageData = data
    ? data.monthly_sale_overview.data.slice(startIndex, endIndex)
    : [];

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 ml-4 mt-6">
        Monthly Sales Data
      </h1>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {/* Render the data as a table with Tailwind CSS classes */}
          <table className="min-w-full divide-y divide-gray-200 mt-9">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  bg-gray-200 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 uppercase tracking-wider">
                  Voucher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 uppercase tracking-wider">
                  Cash
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 uppercase tracking-wider">
                  Tax
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {currentPageData.map((sale, index) => (
                <tr key={sale.date}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sale.voucher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.cash}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.tax}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="mt-4 flex justify-center">
            {Array.from(
              {
                length: Math.ceil(
                  data.monthly_sale_overview.data.length / rowsPerPage
                ),
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`mx-2 px-4 py-2 rounded-full border ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

          {/* Monthly Summary Data */}
          <div className="mt-6 flex justify-center">
            <div className="bg-gray-100 p-4 rounded-xl mr-4">
              <h2 className="text-lg font-semibold">Total Voucher</h2>
              <p>{summary.total_vouchers}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl mr-4">
              <h2 className="text-lg font-semibold">Total Tax</h2>
              <p>{summary.total_tax}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl mr-4">
              <h2 className="text-lg font-semibold">Total Cash</h2>
              <p>{summary.total_cash}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <h2 className="text-lg font-semibold">Total</h2>
              <p>{summary.total}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyPage;
