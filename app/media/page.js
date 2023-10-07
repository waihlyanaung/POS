"use client"
import React, { useEffect, useState } from 'react';
import { getPhotoData, uploadFile } from '../Global/api/inventory';

const MediaPage = () => {
  // State variables
  const [photoData, setPhotoData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to load photo data from the server
  const fetchPhotoData = () => {
    getPhotoData()
      .then(response => {
        setPhotoData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching photo data:', error);
        setError('Error fetching photo data. Please try again later.');
      });
  };

  // Function to open the upload modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the upload modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle file upload
  const handleFileUpload = event => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      uploadFile(file)
        .then(() => {
          closeModal(); // Close the modal after successful upload
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          setError('Error uploading file. Please try again later.');
        })
        .finally(() => {
          setSelectedFile(null);
        });
    }
  };

  // Poll for new data every 30 seconds (adjust the interval as needed)
  useEffect(() => {
    const interval = setInterval(fetchPhotoData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPhotoData(); // Fetch initial data from the server
  }, []);

  return (
    <div className="h-full mx-auto p-4">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Media</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Upload Photo
        </button>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white shadow-md rounded p-8">
            <h2 className="text-xl font-bold mb-4">Upload Photo</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <button
              className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Photo List */}
      <div className="max-h-screen flex-wrap overflow-y-auto mt-4">
        <ul className='flex flex-wrap w-full gap-6 justify-around'>
          {photoData.slice().reverse().map((photo, index) => (
            <li key={photo.url} className={`mb-4 ${index === 0 ? 'mt-0' : ''}`}>
              <img src={photo.url} alt={photo.name} className=" " style={{ height: "150px", width: "300px" }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MediaPage;


















