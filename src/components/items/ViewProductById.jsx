import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ViewProductById = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/getproductbyid/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (!product) return <p className="text-center mt-10 text-lg text-red-500">Product not found</p>;

  const { productName, offerPrice, basePrice, quantity, productImages, productDetail } = product;
  const discount = basePrice && offerPrice ? ((basePrice - offerPrice) / basePrice) * 100 : 0;
  const isOutOfStock = quantity === 0;

  return (
    <>
{/* <div className="bg-blue-50 min-h-screen flex justify-center px-4 py-8"> */}
  {/* Navbar */}
  <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full fixed top-0 left-0 z-50">
    <Link to="/" className="text-2xl font-bold text-blue-900 tracking-wide">FMCG Hub</Link>
    <div className="flex items-center gap-3">
      {/* Cart Icon */}
      <Link to="/cart">
        <FaShoppingCart className="text-2xl text-blue-900 hover:text-blue-600 transition" />
      </Link>
    </div>
  </nav>

  <div className="bg-blue-50 min-h-screen flex justify-center px-4 py-8">

  {/* Product Card - More Compact & Professional */}
  <div className="mt-32 mb-24 w-full max-w-2xl bg-white shadow-md rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-lg">
    
    {/* Image - Proportional and Refined */}
    <img 
      src={product.productImages || "https://via.placeholder.com/300"} 
      alt={product.productName} 
      className="w-full md:w-1/2 h-58 object-cover border"
    />

    {/* Product Details */}
    <div className="w-full md:w-1/2 space-y-2">
      <h1 className="text-2xl font-semibold text-gray-900">{product.productName}</h1>

      {/* Price Section */}
      <div className="flex items-center gap-2">
        <p className="text-base text-lg font-bold text-red-600">₹{product.offerPrice || product.basePrice}</p>
        {product.basePrice && product.offerPrice && (
          <p className="text-gray-500 text-sm line-through">₹{product.basePrice}</p>
        )}
         {discount > 0 && (
              <span className="text-lg bg-red-500 text-white px-2 py-1 rounded-md">{discount.toFixed(2)}% OFF</span>
            )}
      </div>

      <p className="text-lg text-gray-700">{product.productDetail || "No description available."}</p>

      <div className="flex items-center gap-3">
        <span className="bg-pink-100 text-xs mt-2 px-3 py-1 rounded-md">Qty: {product.quantity}</span>
        <span className={product.quantity === 0 ? "text-red-500 text-sm" : "text-green-600 text-sm"}>
          {product.quantity === 0 ? "Out of Stock" : "In Stock"}
        </span>
      </div>

      {/* Buy Now Button - More Prominent */}
      <button 
        className={`mt-3 px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition w-full 
          ${product.quantity === 0 ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        disabled={product.quantity === 0}
      >
        {product.quantity === 0 ? "Out of Stock" : "Buy Now"}
      </button>
    </div>
  </div>
</div>
</>
  );
};

