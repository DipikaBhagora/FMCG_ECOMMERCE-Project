import React,{useState, useEffect} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const StatusBadge = ({ status }) => {
  const statusClass =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
    >
      {status}
    </span>
  );
};

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

 
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users"); // replace URL if needed
        console.log(res.data)
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally {
        setLoading(false);
      }
    };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/deleteuser/${userId}`);
        fetchUsers(); // Refresh users after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
  fetchUsers();
}, []);


  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Users
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.roleId?.name}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status ? "Active" : "Inctive" } />
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  {/* <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button> */}
                  <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
