// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation'

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = 'https://c.mmsdev.site/api/v1/login';

//     try {
//       const response = await axios.post(url, {
//         email,
//         password,
//       });

//       const token = response.data;

//       // Store the token in a cookie
//       Cookies.set('token', token);

//       console.log('Login successful:', response.data);

//       // Redirect to the desired page after successful login
//       router.push('/category');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex justify-center items-center h-screen">
//       <div className="bg-purple-100 w-[40%] p-8 rounded-md shadow-md form-container">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 outline-none py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 outline-none py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-[#7522E9] mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
