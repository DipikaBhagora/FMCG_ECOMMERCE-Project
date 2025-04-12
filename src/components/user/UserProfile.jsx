import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaUserTag, FaSignOutAlt, FaPhone } from "react-icons/fa";

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
                    Phone: res.data.data.number || "Not available",
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

    const roleColors = {
        ADMIN: "bg-red-500",
        CUSTOMER: "bg-blue-500",
        VENDOR: "bg-green-500",
        DEFAULT: "bg-gray-500"
    };

    // const handleLogout = () => {
    //      // Clear Redux states
    // dispatch(clearCart());
    // dispatch(clearWishlist());

    // //localStorage.removeItem("token"); // Remove JWT token
    // localStorage.removeItem("id"); // Remove user ID
    // localStorage.removeItem("role"); // Remove user details
    // localStorage.removeItem("cart");
    // localStorage.removeItem("wishlist");
    // sessionStorage.clear(); // Clear sessionStorage if used
    
    // // Hard reload to reset persisted states and redirect
    // window.location.href = "/login";
    //     // localStorage.removeItem("id");
    //     // window.location.href = "/login";
    // };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm border border-gray-300">
                <div className="flex flex-col items-center mb-4">
                    <FaUserCircle className="text-gray-700 text-5xl mb-2" />
                    <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : !user ? (
                    <p className="text-center text-red-500">User not found</p>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md shadow-sm">
                            <FaUserCircle className="text-gray-600 text-lg" />
                            <p className="text-gray-800 text-sm font-semibold">{user.name}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md shadow-sm">
                            <FaEnvelope className="text-gray-600 text-lg" />
                            <p className="text-gray-800 text-sm font-semibold">{user.email}</p>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md shadow-sm">
                            <FaPhone className="text-gray-600 text-lg transform rotate-190"  />
                            <p className="text-gray-800 text-sm font-semibold">{user.Phone}</p>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md shadow-sm justify-center">
                            <FaUserTag className="text-gray-600 text-lg" />
                            <span className={`px-4 py-1 text-white text-xs font-semibold rounded-full ${roleColors[user.role] || roleColors.DEFAULT}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                )}
                
                <button 
                    // onClick={handleLogout} 
                    className="mt-4 flex items-center justify-center w-full bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition">
                    <FaSignOutAlt className="mr-2" />
                    <Link to="/logout">Logout</Link> 
                </button>
            </div>
        </div>
    );
};
