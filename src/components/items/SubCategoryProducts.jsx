import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

// Reusable Product Card
const ProductCard = ({ product, addToCart }) => {
  const { productName, offerPrice, basePrice, quantity, productImages, productDetail } = product;
  const discount = basePrice ? ((basePrice - offerPrice) / basePrice) * 100 : 0;
  const isOutOfStock = quantity === 0;

  return (
    <div className="bg-blue-50">
    <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-[250px] text-center relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {discount.toFixed(2)}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="h-40 bg-gray-200 overflow-hidden">
        {productImages ? (
          <img
            src={productImages}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3">
        <h4 className="text-lg font-semibold w-full truncate">{productName || "Unnamed Product"}</h4>
        <p className="text-sm text-gray-600 mt-1 w-full truncate">{productDetail || "No description available."}</p>

        {/* Pricing */}
        <p className="text-black font-bold text-base mt-1">
          ₹{offerPrice || basePrice}
          {offerPrice && (
            <span className="text-gray-500 text-xs line-through ml-1">₹{basePrice}</span>
          )}
        </p>

        {/* Stock Availability */}
        <div className="flex items-center justify-center gap-2 mt-2 text-sm font-medium">
          <span className="bg-pink-100 px-2 py-1 rounded">Qty: {quantity}</span>
          <span className={isOutOfStock ? "text-red-500" : "text-green-600"}>
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`mt-3 px-3 py-1.5 rounded-md text-sm font-semibold transition-all w-full flex justify-center items-center gap-1 
            ${isOutOfStock ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          disabled={isOutOfStock}
          onClick={() => addToCart(product)}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
    </div>
  );
};

export const SubCategoryProducts = () => {
  const { subCategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsBySubCategory();
  }, [subCategoryId]);

  const fetchProductsBySubCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/product/getproductbysubcategory/${subCategoryId}`);
      setProducts(res.data.data || []);
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-blue-50 w-full min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full fixed top-0 left-0 z-50 mb-90">
        <Link to="/" className="text-2xl font-bold text-blue-900">FMCG Hub</Link>
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-lg px-3 py-2 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-blue-600 cursor-pointer text-xl" />
          </div>

          {/* Cart Icon with Badge */}
          <div className="relative cursor-pointer">
            <Link to="/cart">
            <FaShoppingCart className="text-3xl text-blue-900" size={25} />
            </Link>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="mt-0 px-4 sm:px-6 lg:px-8 pt-24">
        {/* <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 mt-20">Explore Our Products</h2> */}
        <h2 className="bg-white text-blue-900 px-6 py-3 rounded-lg text-3xl font-semibold text-center mb-8 w-full hover:bg-gray-200 transition-all">
            EXPLORE OUR PRODUCTS
      </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} addToCart={addToCart} />
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default SubCategoryProducts;
