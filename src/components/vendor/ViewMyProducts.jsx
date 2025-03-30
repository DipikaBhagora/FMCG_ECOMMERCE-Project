import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ViewMyProducts = () => {
    const [products, setProducts] = useState([]);
    const [isDeleting, setIsDeleting] = useState(null);

    // Fetch products
    const getMyAllProducts = async () => {
        try {
            const userId = localStorage.getItem("id");
            if (!userId) {
                toast.error("User not found. Please log in again.", { position: "top-center" });
                return;
            }

            const res = await axios.get(`/product/getproductsbyuserid/${userId}`);
            setProducts(res.data.data || []); // Ensure products array is never undefined
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products!", { position: "top-center" });
        }
    };

    // Handle product deletion
    const handleDelete = async (productId) => {
        //if (!window.confirm("Are you sure you want to delete this product?")) return;

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

                await getMyAllProducts(); // Ensure state updates properly
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

    // Fetch products on component mount
    useEffect(() => {
        getMyAllProducts();
    }, []);

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h1 className="text-center mb-4 fw-bold text-4xl">MY PRODUCTS</h1>
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Update Product</th>
                            <th>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td className="align-middle">{product.productName}</td>
                                    <td className="align-middle text-center">
                                        <img
                                            className="img-fluid d-block mx-auto"
                                            style={{ height: "100px", width: "100px", objectFit: "cover" }}
                                            src={product?.productImages}
                                            alt="Product"
                                        />
                                    </td>
                                    <td className="align-middle">
                                        <Link to={`/vendor/updateproduct/${product._id}`} className="btn btn-info">
                                            UPDATE
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-danger"
                                            disabled={isDeleting === product._id}
                                        >
                                            {isDeleting === product._id ? "Deleting..." : "DELETE"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
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
