// // components/Profile.js
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { db } from '@/app/db/index'; // Import your database and tables


// function Profile() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Example using Drizzle ORM
//         const result = await db.select().from(db.users).where(eq(users.id, 'userId')); // replace 'userId' with the correct ID
//         if (result.length > 0) {
//           setUserData(result[0]); // assuming only one user is returned
//         } else {
//           console.log('No user found');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     // ... rest of your component
//   );
// }

// export default Profile;