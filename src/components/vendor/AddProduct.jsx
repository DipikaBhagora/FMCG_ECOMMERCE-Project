import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const AddProduct = () => {
 
    const [categories, setcategories] = useState([])
    const [subCategories, setsubCategories] = useState([])
    

    const {register,handleSubmit} = useForm();
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
    const submitHandler = async (data) => {
        try {
          const userId = localStorage.getItem("id");
          data.userId = userId;
      
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
            navigate("/vendor/myproducts");
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
                        <input type='Number' className="form-control" {...register("basePrice")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Offer Price:</label>
                        <input type='Number' className="form-control" {...register("offerPrice")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Offer Percentage:</label>
                        <input type='Number' className="form-control" {...register("offerPercentage")} />
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
                        <input type='Number' className="form-control" {...register("quantity")} />
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

    // <div style={{textAlign:"center"}}>
    //     <h1>ADD PRODUCT</h1>
    //     <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
    //         <div>
    //             <label>Product Name:</label>
    //             <input type='text' {...register("productName")}></input>
    //         </div>
    //         <div>
    //             <label>Base Price:</label>
    //             <input type='Number' {...register("basePrice")}></input>
    //         </div>
    //         <div>
    //             <label>Offer Price:</label>
    //             <input type='NUmber' {...register("offerPrice")}></input>
    //         </div>
    //         <div>
    //             <label>Offer Percentage:</label>
    //             <input type='Number' {...register("offerPercentage")}></input>
    //         </div>
    //         <div>
    //             <label>Product Detail:</label>
    //             <input type='text' {...register("productDetail")}></input>
    //         </div>
    //         <div>
    //             <label>Product Images:</label>
    //             <input type='file' {...register("image")}></input>
    //         </div>
    //         <div>
    //             <label>quantity:</label>
    //             <input type='Number' {...register("quantity")}></input>
    //         </div>
    //         {/* <div>
    //             <label></label>
    //             <input type='' {...register("")}></input>
    //         </div> */}
    //     <div>
    //         <label>Category: </label>
    //         <select {...register("categoryId")} onChange={(event)=>{getSubCategoryByCategoryId(event.target.value)}}> //id name from model table
    //             {
    //                 categories?.map((category) =>{
    //                     return <option value={category._id}>{category.name}</option>
    //                 })
    //             }
    //         </select>
    //     </div>
    //     <div>
    //         <label>Sub-Category: </label>
    //         <select {...register("subCategoryId")}>
    //             {
    //                 subCategories?.map((subCategory) =>{
    //                     return <option value={subCategory._id}>{subCategory.name}</option>
    //                 })
    //             }
    //         </select>
    //     </div>
    //     <div>
    //         <input type='submit'></input>
    //     </div>
    //     </form>
    // </div>
  )
}
