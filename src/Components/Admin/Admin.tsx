import React from 'react';
// import { ROLE } from './roles';
// import { Route, Routes } from 'react-router-dom';
// import {
//   CreateAccount,
//   Home,
//   Login,
//   NotFound,
//   AdminDashboard,
//   UserDashboard,
// } from 'sections';
// import PrivateRoute from './PrivateRoute';

// export const Router = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/create-account" element={<CreateAccount />} />
//       <Route path="login" element={<Login />} />
//       <Route
//         path="admin-dashboard"
//         element={
//           <PrivateRoute roles={[Role.Admin]}>
//             <AdminDashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="user-dashboard"
//         element={
//           <PrivateRoute roles={[Role.User]}>
//             <UserDashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };