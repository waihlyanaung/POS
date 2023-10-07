"use client"
import React, { useEffect, useState } from 'react';
import { getVoucherData } from '../Global/api/inventory';

const Page = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  useEffect(() => {
    // Make the API request when the component mounts
    getVoucherData("/voucher")
      .then((response) => {
        // Assuming the API response structure matches the desired output
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Helper function to render the table rows for the current page
  const renderTableRows = () => {
    if (!data || !data.data || !data.data.vouchers) {
      return null;
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const vouchers = data.data.vouchers.slice(startIndex, endIndex);

    return vouchers.map((voucher) => (
      <tr key={voucher.id} className='text-center'>
        <td className="border px-4 py-2">{voucher.voucher_number}</td>
        <td className="border px-4 py-2">{voucher.cash}</td>
        <td className="border px-4 py-2">{voucher.tax}</td>
        <td className="border px-4 py-2">{voucher.net_total}</td>
        <td className="border px-4 py-2">{voucher.record_count}</td>
        <td className="border px-4 py-2">{voucher.create_date}</td>
      </tr>
    ));
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil((data?.data?.vouchers.length || 0) / rowsPerPage);

  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-2xl font-semibold mb-4 ml-4">Voucher Record</h1>
      {data ? (
        <div className="overflow-x-auto">
          <table className="min-w-full mt-5">
            <thead>
              <tr>
                <th className="border bg-gray-200 px-4 py-2">Voucher Number</th>
                <th className="border bg-gray-200 px-4 py-2">Cash</th>
                <th className="border bg-gray-200 px-4 py-2">Tax</th>
                <th className="border bg-gray-200 px-4 py-2">Net Total</th>
                <th className="border bg-gray-200 px-4 py-2">Record Count</th>
                <th className="border bg-gray-200 px-4 py-2">Create Date</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`cursor-pointer px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;



