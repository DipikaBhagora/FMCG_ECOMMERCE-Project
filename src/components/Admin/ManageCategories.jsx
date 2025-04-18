import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

export const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editSubcategoryMode, setEditSubcategoryMode] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryCategory, setSubcategoryCategory] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/category/getcategories");
      const categoriesWithSubcategories = await Promise.all(
        res.data.data.map(async (cat) => {
          const subRes = await axios.get(`/subcategory/getsubcategorybycategory/${cat._id}`);
          return {
            ...cat,
            subcategories: subRes.data.data,
          };
        })
      );
      setCategories(categoriesWithSubcategories);
    } catch (error) {
      console.error("Error fetching categories or subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/category/deletecategory/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleDeleteSubcategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`/subcategory/deletesubcategory/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting subcategory:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setEditMode(true);
  };

  const handleEditSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSubcategoryName(subcategory.name);
    setSubcategoryCategory(subcategory.categoryId?._id || "");
    setEditSubcategoryMode(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`/category/updatecategory/${selectedCategory._id}`, {
        name: categoryName,
      });
      setEditMode(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleUpdateSubcategory = async () => {
    try {
      await axios.put(`/subcategory/updatesubcategory/${selectedSubcategory._id}`, {
        name: subcategoryName,
        //categoryId: subcategoryCategory,
      });
      setEditSubcategoryMode(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Categories</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-6 py-4 font-medium">Sr.</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Sub-Category</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {categories.map((category, index) => (
              <tr key={category._id} className="border-t">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 flex items-center mt-3 gap-2">
                  {category.name}

                </td>
                <td className="px-6 py-4">
                  {category.subcategories.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {category.subcategories.map((subcat) => (
                        //<div key={subcat._id} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        <div key={subcat._id} className="flex items-center justify-between bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium w-full max-w-[250px]">
                        {subcat.name}
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEditSubcategory(subcat)}
                          >
                            <FaEdit size={12} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteSubcategory(subcat._id)}
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                        </div>
                      ))}
                    </div>
                   
                  ) : (
                    <span className="text-gray-400 italic">No subcategories</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 ml-2"
                    onClick={() => handleEditCategory(category)}
                  >
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteCategory(category._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode && (
        <div className="fixed inset-0 bg-gray bg-opacity-40 backdrop-blur-md z-[1000] flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Category</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleUpdateCategory}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {editSubcategoryMode && (
        <div className="fixed inset-0 bg-gray bg-opacity-40 backdrop-blur-md z-[1000] flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Subcategory</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={subcategoryCategory}
                onChange={(e) => setSubcategoryCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditSubcategoryMode(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleUpdateSubcategory}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
