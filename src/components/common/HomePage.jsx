import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaTags, FaUser } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserFooter } from "../layouts/UserFooter";
import { CartIcon } from "./CartIcon";
import { addToCart } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
import { FavouriteIcon } from "../items/FavouriteIcon";

export const HomePage = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
  }, []);

  const getProfilePath = (role) => {
    switch (role?.toUpperCase()) {
      case "CUSTOMER":
        return "/user/profile";
      case "ADMIN":
        return "/admin/profile";
      case "VENDOR":
        return "/vendor/profile";
      default:
        return "/login";
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


  //slider setting for carousel
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  

  return (
    <div className="bg-blue-50 min-h-screen overflow-x-hidden w-full">
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold text-blue-900">FMCG Hub</h1>
        <div className="flex items-center gap-4">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search any product..."
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600 cursor-pointer text-lg" />
          </div> */}
          {/* <Link to="/cart" className="text-blue-900 hover:text-blue-600">
            <FaShoppingCart size={22} />
          </Link> */}
          <CartIcon />
          <Link to={role ? getProfilePath(role) : "/login"} className="text-blue-900 hover:text-blue-600">
            <FaUser size={22} />
          </Link>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-300 to-blue-500 text-white py-16 px-8 text-center w-full rounded-lg mt-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals on FMCG Products</h2>
        <p className="text-lg mb-6">Discover the best offers on daily essentials & groceries.</p>
        <Link to="/shop" className="bg-white text-blue-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all">
          Shop Now
        </Link>
      </section>

      <section className="py-10 px-8 w-full">
        {/* <h2 className="text-3xl font-bold text-blue-900 text-gray-800 mb-8 text-center">SHOP BY CATEGORY</h2> */}
        <h2 className="bg-white text-blue-900 px-6 py-3 rounded-lg text-3xl font-semibold text-center mb-8 w-full hover:bg-gray-200 transition-all">
        SHOP BY CATEGORY
      </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category._id}
                to={`/subcategory/${category._id}`}
                className="bg-white p-5 rounded-lg shadow-md text-center hover:shadow-lg transition-all flex flex-col items-center"
              >
                <FaTags className="text-blue-600 text-4xl mb-3" />
                <span className="text-lg font-semibold text-gray-800">{category.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No categories available.</p>
          )}
        </div>
      </section>

      <section className="py-10 px-8 w-full">
  {/* <h2 className="text-3xl font-bold text-gray-800 text-blue-900 mb-8 text-center">BEST SELLING PRODUCTS</h2> */}
  <h2 className="bg-white text-blue-900 px-6 py-3 rounded-lg text-3xl font-semibold text-center mb-8 hover:bg-gray-200 transition-all">
  EXPLORE MORE PRODUCTS
</h2>

<Slider {...sliderSettings}>
          {products.length > 0 ? (
            products.map((product) => {
              // Destructure the product properties
              const { _id, productName, offerPrice, basePrice, productImages, quantity } = product;
              const isOutOfStock = quantity === 0;

              return (
                <div key={_id} className="p-4">
                  <div className="bg-white rounded-lg shadow-md p-4 text-center w-[200px] h-[350px] mx-auto flex flex-col relative">
                    {/* Wishlist Icon */}
                   <div className="absolute top-2 right-2 z-10">
                    <FavouriteIcon product={product} />
                   </div>
                    <Link to={`/product/getproductbyid/${_id}`} className="block">
                      <img
                        src={productImages || "https://via.placeholder.com/250"}
                        alt={productName}
                        className="w-full h-40 object-cover rounded-md mb-3"
                      />
                      <h3 className="text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap mb-2">
                        {productName}
                      </h3>
                      <p className="text-pink-700 font-bold mb-2">₹{offerPrice}</p>
                    </Link>
                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isOutOfStock) {
                          dispatch(
                            addToCart({
                              id: _id,
                              name: productName,
                              price: offerPrice || basePrice,
                              image: productImages || "https://via.placeholder.com/250"
                            })
                          );
                        }
                      }}
                      className={`mt-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all w-full flex justify-center items-center gap-1 
                        ${isOutOfStock ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                      disabled={isOutOfStock}
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </Slider>
      </section>

      <UserFooter/>
    </div>

  );
};

export default HomePage;

