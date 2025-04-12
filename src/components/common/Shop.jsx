import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { FavouriteIcon } from "../items/FavouriteIcon";

// Reusable Product Card
const ProductCard = ({ product }) => {

  
  //dispatch hook -> responsible for calling redux action in any component
  const dispatch = useDispatch();

  const { _id,productName, offerPrice, basePrice, quantity, productImages, productDetail } = product;
  const discount = basePrice ? ((basePrice - offerPrice) / basePrice) * 100 : 0;
  const isOutOfStock = quantity === 0;

  return (
    <div className="bg-blue-50">
    <div className="bg-white p-3 rounded-lg shadow-lg hover:shadow-2xl transition-all w-full max-w-[250px] text-center relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {discount.toFixed(2)}% OFF
        </div>
      )}

       {/* Wishlist Icon */}
       <div className="absolute top-2 right-2">
          <FavouriteIcon product={product} />
        </div>

      {/* Product Image */}
      <Link to={`/product/getproductbyid/${product._id}`} className="block"> 
      <img
        className="w-full h-36 object-cover rounded-md mb-3"
        src={productImages || "https://via.placeholder.com/250"}
        alt={productName}
      />

      {/* Product Name */}
      <h4 className="text-lg font-semibold w-full truncate">{productName || "unnamed Product" }</h4>
      {/* <p className="text-sm text-gray-600 mt-1 w-full line-clamp-2">{productDetail || "No description available."}</p> */}
      </Link>

      {/* Pricing */}
      <p className="text-black-100 font-bold text-base mt-1">
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
        onClick={(e) => {
          e.stopPropagation()
          if (!isOutOfStock) {
            dispatch(addToCart({
              id: _id,
              name: productName,
              price: offerPrice || basePrice,
              image: productImages || "https://via.placeholder.com/250",
          })
          );
          }
        }}
        className={`mt-3 px-3 py-1.5 rounded-md text-sm font-semibold transition-all w-full flex justify-center items-center gap-1 
          ${isOutOfStock ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        disabled={isOutOfStock}
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
    </div>
    
  );
};

export const Shop = () => {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useSelector((state) => state.cart.cart);
  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product/getproducts");
      setProducts(res.data.data || []);
      console.log(res)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-blue-50 w-full min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full fixed top-0 left-0 z-50">
        <Link to="/" className="text-2xl font-bold text-blue-900">FMCG Hub</Link>
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-lg px-3 py-1 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-2 text-blue-900 cursor-pointer text-xl" />
          </div>
           {/* Cart Link with badge */}
           <Link to="/cart" className="relative text-blue-900">
            <FaShoppingCart size={25} />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-10 w-full">
        <div className="max-w-[1200px] w-full mx-auto px-6">
          {/* Shop Products Heading */}
          {/* <h2 className="text-center mb-8 font-bold text-4xl text-gray-800">SHOP PRODUCTS</h2> */}
          <h2 className="bg-white text-blue-900 px-6 py-3 rounded-lg text-3xl font-semibold text-center mb-8 w-full hover:bg-gray-200 transition-all">
        SHOP PRODUCTS
      </h2>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
              <p className="text-center text-gray-500 col-span-4">No products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

