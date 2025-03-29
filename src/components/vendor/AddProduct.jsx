import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const AddProduct = () => {
 
    const [categories, setcategories] = useState([])
    const [subCategories, setsubCategories] = useState([])
    const [basePrice, setBasePrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [offerPercentage, setOfferPercentage] = useState(0);

    const {register,handleSubmit, setValue} = useForm();
    const navigate = useNavigate();

    useEffect(() =>{
        getAllCategories();
    },[])
 

    const getAllCategories = async() =>{
        const res = await axios.get("/category/getcategories")
        console.log(res.data)
        setcategories(res.data.data)
    }

    const getSubCategoryByCategoryId = async(id) =>{
       //alert(id);
       //api calling
            const res = await axios.get("/subcategory/getsubcategorybycategory/"+id)
            console.log("Sub category response: ",res.data)
            setsubCategories(res.data.data)
       
    }
     // Function to calculate offer percentage
     useEffect(() => {
        if (basePrice && offerPrice) {
            const percentage = ((basePrice - offerPrice) / basePrice) * 100;
            setOfferPercentage(percentage.toFixed(2)); // Keeping 2 decimal places
            setValue("offerPercentage", percentage.toFixed(2)); // Set in form data
        }
    }, [basePrice, offerPrice, setValue]);

    const submitHandler = async (data) => {
        try {
          const userId = localStorage.getItem("id");
          data.userId = userId;
          data.offerPercentage = offerPercentage; // Use dynamically calculated value

      
          const formData = new FormData();
          formData.append("productName", data.productName);
          formData.append("categoryId", data.categoryId);
          formData.append("subCategoryId", data.subCategoryId);
          formData.append("userId", data.userId);
          formData.append("basePrice", data.basePrice);
          formData.append("offerPrice", data.offerPrice);
          formData.append("offerPercentage", data.offerPercentage);
          formData.append("productDetail", data.productDetail);
          formData.append("image", data.image[0]);
          formData.append("quantity", data.quantity);
      
          const res = await axios.post("/product/addproductwithfile", formData);
          
          console.log("API Response:", res.data);
      
          if (res.data.message.includes("successfully")) {
            alert("Product added successfully!");
            //navigate("/vendor/myproducts");
          } else {
            alert(`Error: ${res.data.message || "Failed to add product"}`);
          }
        } catch (error) {
          console.error("Error:", error);
          alert(`Something went wrong: ${error.response?.data?.message || error.message}`);
        }
      };
      
    return (
        <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4">ADD PRODUCT</h2>
                <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
                    <div className="mb-3">
                        <label className="form-label">Product Name:</label>
                        <input type='text' className="form-control" {...register("productName")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Base Price:</label>
                        {/* <input type='Number' className="form-control" {...register("basePrice")} /> */}
                        <input 
                                    type='number' 
                                    className="form-control" 
                                    {...register("basePrice")} 
                                    value={basePrice}
                                    onChange={(e) => setBasePrice(e.target.value)}
                                    required 
                                />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Offer Price:</label>
                        {/* <input type='Number' className="form-control" {...register("offerPrice")} /> */}
                        <input 
                                    type='number' 
                                    className="form-control" 
                                    {...register("offerPrice")} 
                                    value={offerPrice}
                                    onChange={(e) => setOfferPrice(e.target.value)}
                                    required 
                                />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Offer Percentage:</label>
                        {/* <input type='Number' className="form-control" {...register("offerPercentage")} /> */}
                        <input 
                                    type='text' 
                                    className="form-control" 
                                    value={offerPercentage} 
                                    disabled 
                                />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Detail:</label>
                        <input type='text' className="form-control" {...register("productDetail")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Images:</label>
                        <input type='file' className="form-control" {...register("image")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input type='text' className="form-control" {...register("quantity")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <select className="form-select" {...register("categoryId")} onChange={(event)=>{getSubCategoryByCategoryId(event.target.value)}}>
                            <option>SELECT CATEGORY</option>
                            {categories?.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Sub-Category:</label>
                        <select className="form-select" {...register("subCategoryId")}>
                            <option>SELECT SUB-CATEGORY</option>
                            {subCategories?.map((subCategory) => (
                                <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type='submit' className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

  )
}
