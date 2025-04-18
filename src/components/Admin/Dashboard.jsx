import React, { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaClipboardList, FaRupeeSign } from "react-icons/fa";
import axios from "axios";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 border-l-8 ${color}`}>
      <div className="text-4xl text-gray-600">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get("/admin/users/count");
      const ordersRes = await axios.get("/orders/getorders");
      const productsRes = await axios.get("/admin/products/count");
      const revenueRes = await axios.get("/admin/orders/total-revenue");
      const newUsersRes = await axios.get("/admin/users/recent");

      setTotalUsers(usersRes.data.count);
      setTotalOrders(ordersRes.data.data.length);
      setTotalProducts(productsRes.data.count);
      setTotalRevenue(revenueRes.data.totalRevenue);
      setRecentOrders(ordersRes.data.data.slice(0, 5));
      setNewUsers(newUsersRes.data.users);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome, Admin 👋</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <DashboardCard title="Total Users" value={totalUsers} icon={<FaUsers />} color="border-blue-500" />
        <DashboardCard title="Total Orders" value={totalOrders} icon={<FaClipboardList />} color="border-green-500" />
        <DashboardCard title="Products" value={totalProducts} icon={<FaBoxOpen />} color="border-yellow-500" />
        <DashboardCard title="Total Revenue" value={`₹${totalRevenue}`} icon={<FaRupeeSign />} color="border-purple-500" />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-5 text-gray-700">Recent Orders</h2>
          <ul className="divide-y divide-gray-200">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <li key={order._id} className="py-4 flex flex-col">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-semibold">#{order._id.slice(-6)}</p>
                      <p className="text-gray-400 text-sm">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-700">₹{order.totalAmount}</p>
                      <p className={`text-sm font-medium ${
                        order.status === "Delivered" || order.status === "Done" ? "text-green-600" :
                        order.status === "Pending" ? "text-yellow-600" :
                        "text-red-600"
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-4 text-gray-500 text-center">No recent orders found.</li>
            )}
          </ul>
        </div>

        {/* New Users */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-5 text-gray-700">New Users</h2>
          <ul className="divide-y divide-gray-200">
            {newUsers.length > 0 ? (
              newUsers.map((user) => (
                <li key={user._id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-semibold">{user.name || "Unnamed User"}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-4 text-gray-500 text-center">No new users found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
