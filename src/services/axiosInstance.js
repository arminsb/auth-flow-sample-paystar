// *** if you felt there is lack of cfg for axios use this instance 🚀 ***

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});


// *** if you felt there is a lack of interception uncomment below lines 🔐 ***
// axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     if (error.response.status === 401) {
//         router.push('/auth/login')
//     } else {
//         return Promise.reject(error);
//     }
//   });

export default axiosInstance;
