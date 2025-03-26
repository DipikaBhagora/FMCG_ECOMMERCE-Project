import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaTags, FaUser } from "react-icons/fa";

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/getcategories");
      console.log(res.data)
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
    <div className="bg-gray-100 overflow-x-hidden w-full">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center max-w-screen-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-green-600">FMCG Hub</h1>
        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-lg px-4 py-3 focus:outline-none w-96"
          />
          <FaSearch className="text-gray-600 cursor-pointer text-xl" />
          <Link to="/cart" className="text-green-600">
            <FaShoppingCart size={28} />
          </Link>
          <Link to="/user/profile" className="text-green-600">
            <FaUser size={28} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-24 px-10 text-center max-w-screen-3xl mx-auto w-full rounded-lg mt-8">
        <h2 className="text-5xl md:text-7xl font-bold mb-6">Exclusive Deals on FMCG Products</h2>
        <p className="text-2xl mb-10">Discover the best offers on daily essentials & groceries.</p>
        <Link
          to="/shop"
          className="bg-white text-green-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200"
        >
          Shop Now
        </Link>
      </section>

      {/* Category Section */}
      <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
        <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category._id}
                 //to={`/subcategory/getsubcategorybycategory/${category._id}`}
                 to={`/subcategory/${category._id}`}
                className="bg-white p-8 rounded-lg shadow text-center hover:shadow-lg w-full max-w-[320px] mx-auto flex flex-col items-center"
              >
                <FaTags className="text-green-600 text-4xl mb-4" />
                <span className="text-xl font-semibold">{category.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No categories available.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
        <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Best Selling Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white p-8 rounded-lg shadow hover:shadow-lg w-full max-w-[360px] mx-auto text-center">
                <img src={product.productImages} alt={product.productName} className="w-full mb-5 rounded-md" />
                <h4 className="text-2xl font-bold">{product.productName}</h4>
                <p className="text-green-600 font-semibold text-3xl">₹{product.offerPrice}</p>
                {/* <button className="bg-green-600 text-white px-6 py-4 rounded mt-5 w-full text-xl hover:bg-green-700">
                  Add to Cart
                </button> */}
                <button onClick={() => addToCart(product._id)} className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Add to Cart
</button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;


// import React, {useEffect, useState} from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FaShoppingCart, FaSearch, FaTags, FaUser } from "react-icons/fa";

// export const HomePage = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("/category/getcategories");
//       setCategories(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };
//   return (
//     <div className="bg-gray-100 overflow-x-hidden w-full">
//     {/* Navbar */}
//     <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center max-w-screen-3xl mx-auto w-full">
//       <h1 className="text-3xl font-bold text-green-600">FMCG Hub</h1>
//       <div className="flex items-center gap-6">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="border rounded-lg px-4 py-3 focus:outline-none w-96"
//         />
//         <FaSearch className="text-gray-600 cursor-pointer text-xl" />
//         <Link to="/cart" className="text-green-600">
//           <FaShoppingCart size={28} />
//         </Link>
//         <Link to="/user/profile" className="text-green-600">
//             <FaUser size={28} />
//           </Link>
//       </div>
//     </nav>

//     {/* Hero Section */}
//     <section className="bg-green-700 text-white py-24 px-10 text-center max-w-screen-3xl mx-auto w-full rounded-lg mt-8">
//       <h2 className="text-5xl md:text-7xl font-bold mb-6">Exclusive Deals on FMCG Products</h2>
//       <p className="text-2xl mb-10">Discover the best offers on daily essentials & groceries.</p>
//       <Link
//         to="/shop"
//         className="bg-white text-green-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200"
//       >
//         Shop Now
//       </Link>
//     </section>

//     {/* Category Section */}
//      {/* <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
//       <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Shop by Category</h3>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
//         {['Groceries', 'Household', 'Beverages', 'Snacks'].map((category) => (
//           <Link
//             key={category}
//             to={`/category/${category.toLowerCase()}`}
//             className="bg-white p-8 rounded-lg shadow text-center hover:shadow-lg w-full max-w-[320px] mx-auto flex flex-col items-center"
//           >
//             <FaTags className="text-green-600 text-4xl mb-4" />
//             <span className="text-xl font-semibold">{category}</span>
//           </Link>
//         ))}
//       </div>
//     </section>  */}
//      <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
//         <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Shop by Category</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
//           {categories.length > 0 ? (
//             categories.map((category) => (
//               <Link
//                 key={category._id}
//                 to={`/category/${category._id}`}
//                 className="bg-white p-8 rounded-lg shadow text-center hover:shadow-lg w-full max-w-[320px] mx-auto flex flex-col items-center"
//               >
//                 <FaTags className="text-green-600 text-4xl mb-4" />
//                 <span className="text-xl font-semibold">{category.categoryName}</span>
//               </Link>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-4">No categories available.</p>
//           )}
//         </div>
//       </section>
  
//     {/* Featured Products */}
//     <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
//       <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Best Selling Products</h3>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
//         {[199, 299, 399, 499].map((price, index) => (
//           <div key={index} className="bg-white p-8 rounded-lg shadow hover:shadow-lg w-full max-w-[360px] mx-auto text-center">
//             <img src="https://via.placeholder.com/250" alt="Product" className="w-full mb-5 rounded-md" />
//             <h4 className="text-2xl font-bold">Premium Product</h4>
//             <p className="text-green-600 font-semibold text-3xl">₹{price}</p>
//             <button className="bg-green-600 text-white px-6 py-4 rounded mt-5 w-full text-xl hover:bg-green-700">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   </div>
// );
// };



// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { FaShoppingCart, FaSearch } from "react-icons/fa";

// // export const HomePage = () => {
// //   return (
// //     <div className="bg-gray-100 overflow-x-hidden w-full">
// //       {/* Navbar */}
// //       <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center max-w-screen-3xl mx-auto w-full">
// //         <h1 className="text-3xl font-bold text-green-600">FMCG Store</h1>
// //         <div className="flex items-center gap-6">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             className="border rounded-lg px-4 py-3 focus:outline-none w-96"
// //           />
// //           <FaSearch className="text-gray-600 cursor-pointer text-xl" />
// //           <Link to="/cart" className="text-green-600">
// //             <FaShoppingCart size={28} />
// //           </Link>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section className="bg-green-700 text-white py-24 px-10 text-center max-w-screen-3xl mx-auto w-full rounded-lg mt-8">
// //         <h2 className="text-5xl md:text-7xl font-bold mb-6">Your One-Stop FMCG Marketplace</h2>
// //         <p className="text-2xl mb-10">Shop fresh groceries, household essentials, and more.</p>
// //         <Link
// //           to="/shop"
// //           className="bg-white text-green-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200"
// //         >
// //           Shop Now
// //         </Link>
// //       </section>

// //       {/* Categories */}
// //       <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
// //         <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Shop by Category</h3>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
// //           {['Groceries', 'Household', 'Beverages', 'Snacks'].map((category) => (
// //             <Link
// //               key={category}
// //               to={`/category/${category.toLowerCase()}`}
// //               className="bg-white p-8 rounded-lg shadow text-center hover:shadow-lg w-full max-w-[320px] mx-auto"
// //             >
// //               {category}
// //             </Link>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Featured Products */}
// //       <section className="py-14 px-10 max-w-screen-3xl mx-auto w-full">
// //         <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">Featured Products</h3>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
// //           {[199, 299, 399, 499].map((price, index) => (
// //             <div key={index} className="bg-white p-8 rounded-lg shadow hover:shadow-lg w-full max-w-[360px] mx-auto text-center">
// //               <img src="https://via.placeholder.com/250" alt="Product" className="w-full mb-5 rounded-md" />
// //               <h4 className="text-2xl font-bold">Product Name</h4>
// //               <p className="text-green-600 font-semibold text-3xl">₹{price}</p>
// //               <button className="bg-green-600 text-white px-6 py-4 rounded mt-5 w-full text-xl hover:bg-green-700">
// //                 Add to Cart
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

