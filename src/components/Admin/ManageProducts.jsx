import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`/product/getproducts`);
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products!", { position: "top-center" });
    }
  };

  const handleDelete = async (productId) => {
    setIsDeleting(productId);
    try {
      const res = await axios.delete(`/product/deleteproduct/${productId}`);

      if (res.status === 200 || res.status === 204) {
        toast.error("💣 Product deleted!! 💣", {
          position: "top-center",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
        await getAllProducts();
      } else {
        toast.error("Failed to delete product!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred. Try again!", { position: "top-center" });
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Products (Admin)</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Product Name</th>
              <th className="px-6 py-4 font-medium">Vendor</th>
              <th className="px-6 py-4 font-medium">Price (₹)</th>
              <th className="px-6 py-4 font-medium">Stock(label)</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-6 py-4">
                    <img
                      src={product?.productImages}
                      alt={product?.productName}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{product?.productName}</td>
                  <td className="px-6 py-4">
                    {product?.userId?.firstName|| "N/A"}  {product?.userId?.lastName} 
                  </td>
                  <td className="px-6 py-4">₹{product?.offerPrice}</td>
                  <td className="px-6 py-4">{product?.quantity}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <Link to={`/vendor/updateproduct/${product._id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(product._id)}
                      disabled={isDeleting === product._id}
                    >
                      {isDeleting === product._id ? "..." : <FaTrash />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
