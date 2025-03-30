import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaTags, FaUser } from "react-icons/fa";

// Reusable Product Card
const ProductCard = ({ product }) => {
  const { productName, offerPrice, basePrice, quantity, productImages } = product;
  const discount = basePrice ? Math.round(((basePrice - offerPrice) / basePrice) * 100) : 0;
  const isOutOfStock = quantity === 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all w-full max-w-[200px] mx-auto flex flex-col relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
          {discount}% OFF
        </span>
      )}

      {/* Image */}
      <div className="h-32 w-full rounded-t-lg overflow-hidden">
        <img
          className="w-full h-full max-w-full object-cover"
          src={productImages || "https://via.placeholder.com/250"}
          alt={productName}
        />
      </div>

      {/* Details */}
      <div className="p-2 flex flex-col text-center">
        <h4 className="text-lg font-semibold text-gray-900">{productName}</h4>
        <div className="flex items-center justify-center space-x-2 mt-1">
          <span className="text-green-600 font-bold text-lg">₹{offerPrice}</span>
          {basePrice && <span className="text-gray-500 line-through text-sm">₹{basePrice}</span>}
        </div>

         {/* Stock Status with Quantity */}
         <div className={`text-sm font-medium ${isOutOfStock ? "text-red-600" : "text-black-600"}`}>
          {isOutOfStock ? "Out of Stock" : `In Stock (Qt: ${quantity})`}
        </div>
        
        {/* Add to Cart Button */}
        <button
          className={`mt-3 mb-4 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 justify-center w-full ${
            isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
          }`}
          disabled={isOutOfStock}
        >
          <FaShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export const HomePage = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);

  
  // Retrieve role from localStorage and update state
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(JSON.parse(storedRole)); // Parse stored role properly
    }
  }, []);

  // Function to get the profile path based on role
  const getProfilePath = (role) => {
    console.log("Role from localStorage:", role); // Debugging role retrieval
    switch (role?.toUpperCase()) {
      case "CUSTOMER":
        return "/user/profile";
      case "ADMIN":
        return "/admin/profile";
      case "VENDOR":
        return "/vendor/profile";
      default:
        return "/login"; // Redirect to login if role is not found
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/getcategories");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product/getproducts");
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden w-full">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold text-green-600">FMCG Hub</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-64 text-sm"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer text-lg" />
          </div>
          <Link to="/cart" className="text-green-600 hover:text-green-700">
            <FaShoppingCart size={22} />
          </Link>
           <Link to={role ? getProfilePath(role) : "/login" } className="text-green-600 hover:text-green-700">
            <FaUser size={22} />
          </Link>     
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16 px-8 text-center w-full rounded-lg mt-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals on FMCG Products</h2>
        <p className="text-lg mb-6">Discover the best offers on daily essentials & groceries.</p>
        <Link
          to="/shop"
          className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all"
        >
          Shop Now
        </Link>
      </section>

      <section className="py-10 px-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category._id}
                to={`/subcategory/${category._id}`}
                className="bg-white p-5 rounded-lg shadow-md text-center hover:shadow-lg transition-all flex flex-col items-center"
              >
                <FaTags className="text-green-600 text-4xl mb-3" />
                <span className="text-lg font-semibold text-gray-800">{category.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No categories available.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Best Selling Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p className="text-center text-gray-500 col-span-5">No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
