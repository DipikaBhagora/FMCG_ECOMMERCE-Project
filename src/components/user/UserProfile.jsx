import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";

export const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem("id");
            if (!userId) {
                console.error("User ID not found in localStorage");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`/getuser/${userId}`);
                console.log("API Response:", res.data);

                setUser({
                    name: `${res.data.data.firstName} ${res.data.data.lastName}`,
                    email: res.data.data.email,
                    role: res.data.data.roleId?.name || "Not Assigned"
                });

            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Role badge colors
    const roleColors = {
        ADMIN: "bg-red-500",
        CUSTOMER: "bg-blue-500",
        VENDOR: "bg-green-500",
        DEFAULT: "bg-gray-500"
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-300">
                {/* Profile Icon & Title */}
                <div className="flex flex-col items-center mb-6">
                    <FaUserCircle className="text-gray-700 text-7xl mb-3" />
                    <h2 className="text-3xl font-bold text-gray-900">User Profile</h2>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : !user ? (
                    <p className="text-center text-red-500">User not found</p>
                ) : (
                    <div className="space-y-5">
                        {/* Name */}
                        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
                            <FaUserCircle className="text-gray-600 text-xl" />
                            <p className="text-gray-800 text-lg font-semibold">{user.name}</p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
                            <FaEnvelope className="text-gray-600 text-xl" />
                            <p className="text-gray-800 text-lg font-semibold">{user.email}</p>
                        </div>

                        {/* Role */}
                        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md justify-center">
                            <FaUserTag className="text-gray-600 text-xl" />
                            <span className={`px-6 py-2 text-white text-sm font-semibold rounded-full ${roleColors[user.role] || roleColors.DEFAULT}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";

// export const UserProfile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const userId = localStorage.getItem("id");
//             if (!userId) {
//                 console.error("User ID not found in localStorage");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const res = await axios.get(`/getuser/${userId}`);
//                 console.log("API Response:", res.data); // Debugging log

//                 setUser({
//                     name: `${res.data.data.firstName} ${res.data.data.lastName}`,
//                     email: res.data.data.email,
//                     role: res.data.data.roleId?.name || "Not Assigned"
//                 });

//             } catch (error) {
//                 console.error("Error fetching user profile:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     // Role badge colors
//     const roleColors = {
//         ADMIN: "bg-red-500",
//         CUSTOMER: "bg-blue-500",
//         VENDOR: "bg-green-500",
//         DEFAULT: "bg-gray-500"
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
//             <div className="w-full max-w-sm bg-white/10 backdrop-blur-md shadow-2xl rounded-lg p-8 text-center border border-white/20">
//                 {/* Profile Icon */}
//                 <div className="flex flex-col items-center">
//                     <FaUserCircle className="text-white text-6xl mb-4 animate-pulse" />
//                     <h2 className="text-2xl font-bold text-white">User Profile</h2>
//                 </div>

//                 {loading ? (
//                     <p className="text-center text-white mt-6 animate-pulse">Loading...</p>
//                 ) : !user ? (
//                     <p className="text-center text-red-300 mt-6">User not found</p>
//                 ) : (
//                     <div className="mt-6 space-y-6">
//                         {/* Name */}
//                         <div className="flex items-center justify-center space-x-3 bg-white/20 p-3 rounded-lg shadow-md">
//                             <FaUserCircle className="text-white text-lg" />
//                             <p className="text-white text-lg font-medium">{user.name}</p>
//                         </div>

//                         {/* Email */}
//                         <div className="flex items-center justify-center space-x-3 bg-white/20 p-3 rounded-lg shadow-md">
//                             <FaEnvelope className="text-white text-lg" />
//                             <p className="text-white text-lg font-medium">{user.email}</p>
//                         </div>

//                         {/* Role */}
//                         <div className="flex items-center justify-center space-x-3 bg-white/20 p-3 rounded-lg shadow-md">
//                             <FaUserTag className="text-white text-lg" />
//                             <span className={`px-4 py-1 text-white text-sm font-semibold rounded-full ${roleColors[user.role] || roleColors.DEFAULT}`}>
//                                 {user.role}
//                             </span>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

