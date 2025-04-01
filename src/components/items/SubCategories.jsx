import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaTags, FaHome } from "react-icons/fa";

export const SubCategories = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("Subcategories");

  useEffect(() => {
    console.log("categoryId from URL:", categoryId); // Debugging log
    if (categoryId) {
      fetchSubcategories(categoryId);
      fetchCategoryName(categoryId);
    }
  }, [categoryId]);

  // Fetch subcategories based on categoryId
  const fetchSubcategories = async (id) => {
    try {
      console.log("Fetching subcategories for categoryId:", id); // Debugging log
      const res = await axios.get(`/subcategory/getsubcategorybycategory/${id}`);
      console.log("Subcategories API Response:", res.data); // Debugging log
      setSubcategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch category name separately
  const fetchCategoryName = async (id) => {
    try {
      console.log("Fetching category name for categoryId:", id); // Debugging log
      const res = await axios.get(`/category/getcategory/${id}`);
      console.log("Category API Response:", res.data); // Debugging log
      if (res.data && res.data.name) {
        setCategoryName(res.data.name);
      }
    } catch (error) {
      console.error("Error fetching category name:", error);
    }
  };

  return (
    <div className="bg-blue-50 w-full min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center max-w-screen-3xl mx-auto w-full ">
        <h1 className="text-2xl font-bold text-blue-900">FMCG Hub</h1>
        <Link to="/" className="text-blue-900 flex items-center gap-2 text-lg font-semibold hover:text-blue-400">
          <FaHome  size={25}/> 
        </Link>
      </nav>

      {/* Header Section */}
      {/* <section className="bg-blue-400 text-white py-16 px-8 text-center w-full rounded-lg mt-6 shadow-lg shadow-blue-500/50"> */}
      <section className="bg-gradient-to-r from-blue-300 to-blue-500 text-white py-16 px-8 text-center w-full rounded-lg mt-6">

        <h2 className="text-4xl font-bold">Explore {categoryName}</h2>
      </section>

      {/* Subcategories Section */}
      <div className="pt-10 pb-16 w-full">
        <div className="max-w-[1200px] w-full mx-auto px-6">
          {/* <h3 className="text-center mb-6 font-bold text-4xl">Subcategories</h3> */}

          {subcategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory._id}
                  to={`/subcategory/${subcategory._id}/products`} 
                  className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all text-center flex flex-col items-center"
                >
                  <FaTags className="text-blue-900 text-4xl mb-4" />
                  <span className="text-xl font-semibold">{subcategory.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <p className="text-gray-500 text-lg">No subcategories available. Please check back later.</p>
              <Link
                to="/"
                className="mt-6 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Go to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;

