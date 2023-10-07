"use client"


import React, { useEffect, useState } from 'react';
import { get } from '@/app/Global/api/inventory';

const CustomPage = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState([]);
  const [startDate, setStartDate] = useState('2023-08-01');
  const [endDate, setEndDate] = useState('2023-08-20');
  const rowsPerPage = 5;

  useEffect(() => {
    // Make an API request using the get function from api.js
    get(`finance/custom-sale-overview/${startDate}/${endDate}?page=${currentPage}&perPage=${rowsPerPage}`)
      .then((response) => {
        console.log(response)
        setData(response.data);
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [currentPage, startDate, endDate]);

  const totalRows = data ? data.custom_sale_vouchers.total : 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDateSubmit = () => {
    // Fetch data based on the selected date range
    setCurrentPage(1); // Reset to the first page when date range changes
  };

  const renderTableRows = () => {
    if (!data || !data.custom_sale_vouchers.data) {
      return null;
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return data.custom_sale_vouchers.data.slice(startIndex, endIndex).map((item, index) => (
      <tr key={item.voucher}>
        <td className="px-6 py-4 whitespace-nowrap">{startIndex + index + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item.voucher}</td>
        <td className="border px-4 py-2">{item.time}</td>
        <td className="border px-4 py-2">{item.cash}</td>
        <td className="border px-4 py-2">{item.tax}</td>
        <td className="border px-4 py-2">{item.total}</td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4">
      <div className='flex justify-between mt-4'><div className='text-2xl font-bold'>Custom Sale Overview</div>
      <div className="mb-4">
        <label htmlFor="startDate" className="mr-2">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate" className="mx-2">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md ml-2"
          onClick={handleDateSubmit}
        >
          Search
        </button>
      </div></div>
      {data ? (
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
       {/* Daily Summary Data */}
       <div className="mt-6 flex justify-center">
        <div className="bg-gray-100 p-4 rounded-xl mr-4">
          <h2 className="text-lg font-semibold">Total Voucher</h2>
          <p>{summary.total_voucher}</p>
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
  );
};

export default CustomPage;
