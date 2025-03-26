import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product/getproducts"); // Replace with actual API endpoint
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-10 flex justify-between items-center w-full fixed top-0 left-0 z-50">
        <h1 className="text-3xl font-bold text-green-600">FMCG Hub</h1>
        <div className="flex items-center gap-6">
          {/* Search Input */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-lg px-4 py-3 focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-600 cursor-pointer text-xl" />
          </div>
          {/* Cart Link */}
          <Link to="/cart" className="text-green-600">
            <FaShoppingCart size={28} />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-10 w-full mt-20">
        <div className="max-w-[1200px] w-full mx-auto px-6">
          {/* Shop Products Heading */}
          <h2 className="text-center mb-6 font-bold text-4xl">SHOP PRODUCTS</h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg w-full text-center"
                >
                  <img
                    className="w-full h-auto max-h-44 object-cover rounded-md mb-3"
                    src={product.productImages || "https://via.placeholder.com/200"}
                    alt={product.productName}
                  />
                  <h4 className="text-lg font-bold">{product.productName}</h4>
                  <p className="text-green-600 font-semibold text-xl">₹{product.offerPrice || product.basePrice}</p>
                  <div className="flex justify-center gap-3 mt-3">
                    {/* <Link
                      to={`/product/${product._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                    >
                      <FaSearch /> View
                    </Link> */}
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              ))
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


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaShoppingCart, FaSearch } from "react-icons/fa";

// export const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("/product/getall"); // Replace with actual API endpoint
//       setProducts(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const filteredProducts = products.filter((product) =>
//     product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-100 w-full min-h-screen">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md py-4 px-10 flex justify-between items-center w-full fixed top-0 left-0 z-50">
//         <h1 className="text-3xl font-bold text-green-600">FMCG Hub</h1>
//         <div className="flex items-center gap-6">
//           {/* Search Input */}
//           <div className="relative w-80">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="border rounded-lg px-4 py-3 focus:outline-none w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute right-3 top-3 text-gray-600 cursor-pointer text-xl" />
//           </div>
//           {/* Cart Link */}
//           <Link to="/cart" className="text-green-600">
//             <FaShoppingCart size={28} />
//           </Link>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="pt-24 pb-10 w-full mt-20">
//         <div className="max-w-[1200px] w-full mx-auto px-6">
//           {/* Shop Products Heading */}
//           <h2 className="text-center mb-6 font-bold text-4xl">SHOP PRODUCTS</h2>

//           {/* Product Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white p-5 rounded-lg shadow hover:shadow-lg w-full text-center"
//                 >
//                   <img
//                     className="w-full h-auto max-h-44 object-cover rounded-md mb-3"
//                     src={
//                       Array.isArray(product.productImages) &&
//                       product.productImages.length > 0
//                         ? product.productImages[0]
//                         : "https://via.placeholder.com/200"
//                     }
//                     alt={product.productName}
//                   />
//                   <h4 className="text-lg font-bold">{product.productName}</h4>
//                   <p className="text-green-600 font-semibold text-xl">₹{product.price}</p>
//                   <div className="flex justify-center gap-3 mt-3">
//                     <Link
//                       to={`/product/${product._id}`}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
//                     >
//                       <FaSearch /> View
//                     </Link>
//                     <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
//                       <FaShoppingCart /> Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 col-span-4">No products available.</p>
//             )}
//           </div>
//         </div>

//         {/* Featured Products Section */}
//         <section className="py-10 px-8 max-w-[1200px] w-full mx-auto mt-10">
//           <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center">
//             Best Selling Products
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full px-4">
//             {[199, 299, 399, 499, 599, 799,899,600,555,444].map((price, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-5 rounded-lg shadow hover:shadow-lg w-full text-center"
//               >
//                 <img
//                   src="https://via.placeholder.com/250"
//                   alt="Product"
//                   className="w-full h-auto max-h-44 object-cover mb-3 rounded-md"
//                 />
//                 <h4 className="text-lg font-bold">Premium Product</h4>
//                 <p className="text-green-600 font-semibold text-xl">₹{price}</p>
//                 <button className="bg-green-600 text-white px-6 py-3 rounded mt-3 w-full text-lg hover:bg-green-700">
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Shop;

