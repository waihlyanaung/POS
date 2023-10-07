"use client"
// page.js
import React, { useEffect, useState } from 'react';
import { get } from '../Global/api/inventory';



const Page = () => {
  const [voucherData, setVoucherData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const [dailySummary, setDailySummary] = useState(null); // State for daily summary

  useEffect(() => {
    // Fetch the voucher data when the component mounts
    get("https://c.mmsdev.site/api/v1/voucher")
      .then((response) => {
        console.log(response);
        // Assuming the data you want is in response.data.data.vouchers
        setVoucherData(response.data.data.vouchers);
        // Extract and set daily_summary
        setDailySummary(response.data.data.daily_summary);
      })
      .catch((error) => {
        console.error('Error fetching voucher data:', error);
      });
  }, []);

  const totalPages = Math.ceil(voucherData?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = voucherData ? voucherData.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      {voucherData ? (
        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">No</th>
                <th className="py-2 px-4">Voucher Number</th>
                <th className="py-2 px-4">Create Date</th>
                <th className="py-2 px-4">Item Count</th>
                <th className="py-2 px-4">Cash</th>
                <th className="py-2 px-4">Tax</th>
                <th className="py-2 px-4">Net Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {currentItems.map((voucher, index) => (
                <tr key={voucher.id}>
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{voucher.voucher_number}</td>
                  <td className="px-6 py-4 text-center">{voucher.create_date}</td>
                  <td className="px-6 py-4 text-center">{voucher.record_count}</td>
                  <td className="px-6 py-4 text-center">{voucher.cash}</td>
                  <td className="px-6 py-4text-center">{voucher.tax}</td>
                  <td className="px-6 py-4 text-center">{voucher.net_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {voucherData.length > itemsPerPage && (
              <p>
                {currentPage > 1 && (
                  <span onClick={() => paginate(currentPage - 1)}>&lt;</span>
                )}
                {' Page '}
                {currentPage} of {totalPages} {' '}
                {currentPage < totalPages && (
                  <span onClick={() => paginate(currentPage + 1)}>&gt;</span>
                )}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {dailySummary && ( // Render daily summary if available
        <div className="mt-6 flex justify-center">
        <div className="bg-gray-100 p-4 rounded-xl mr-4 shadow-md">
          <h2 className="text-lg font-semibold">Total Voucher</h2>
          <p>{dailySummary.total_voucher}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl mr-4 shadow-md">
          <h2 className="text-lg font-semibold">Total Tax</h2>
          <p>{dailySummary.total_tax}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl mr-4 shadow-md">
          <h2 className="text-lg font-semibold">Total Cash</h2>
          <p>{dailySummary.total_cash}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total</h2>
          <p>{dailySummary.total}</p>
        </div>
      </div>
      
      
      )}
    </div>
  );
};

export default Page;

