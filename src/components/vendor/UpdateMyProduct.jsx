import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const UpdateMyProduct = () => {

    const id = useParams().id;

    const [categories, setcategories] = useState([])
    const [subCategories, setsubCategories] = useState([])
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

    const { register, handleSubmit } = useForm({
        defaultValues:async() =>{
            const res = await axios.get("/product/getproductbyid/"+id)
            return res.data.data;
        }
    })

    const submitHandler = async(data) =>{
        data.userId = localStorage.getItem("id");
        delete data._id;

      try {
            const res = await axios.put("/product/updateproduct/"+id,data);
           //await axios.put(`/product/updateproduct/${id}`, data);
           alert("Product updated successfully!");
           navigate("/vendor/myproducts");
         } catch (error) {
             console.error("Error updating product:", error);
             alert("Failed to update product. Try again!");
      }
        console.log(data);
        const res =await axios.put("/product/updateproduct/"+id,data);
        console.log(res.data);
        alert("Product updated successfully!");
        navigate("/vendor/myproducts");
    }

    // const {id} = useParams(); //get product id from url

    // const [categories, setcategories] = useState([])
    // const [subCategories, setsubCategories] = useState([])
    // const navigate = useNavigate();

    // const { register, handleSubmit, setValue, reset } = useForm();

    // useEffect(() =>{
    //     getAllCategories();
    //     fetchProduct();
    // },[id])
 

    // const getAllCategories = async() =>{
    //     const res = await axios.get("/category/getcategories")
    //     console.log(res.data)
    //     setcategories(res.data.data)
    // }

    // const getSubCategoryByCategoryId = async(id) =>{
    //    //alert(id);
    //    //api calling
    //         const res = await axios.get("/subcategory/getsubcategorybycategory/"+id)
    //         console.log("Sub category response: ",res.data)
    //         setsubCategories(res.data.data)
       
    // }

    // const fetchProduct = async() => {
    //     const res = await axios.get(`/product/getproductbyid/${id}`);
    //     if(res.data && res.data.data) {
    //         reset(res.data.data);
    //         setValue("categoryId", res.data.data.categoryId);
    //         setValue("subCategoryId", res.data.data.subCategoryId);
    //         getSubCategoryByCategoryId(res.data.data.categoryId);
    //     }
    // }

    // const submitHandler = async (data) => {
    //     data.userId = localStorage.getItem("id");
    //     delete data._id;

    //     try {
    //         await axios.put(`/product/updateproduct/${id}`, data);
    //         alert("Product updated successfully!");
    //         navigate("/vendor/myproducts");
    //         window.location.reload(); // Force update on navigation
    //     } catch (error) {
    //         console.error("Error updating product:", error);
    //         alert("Failed to update product. Try again!");
    //     }
    // };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4">UPDATE PRODUCT</h2>
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
                        <input type='text' className="form-control" {...register("productImages")} />
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

//     <div style={{textAlign:"center"}}>
//     <h1>UPDATE PRODUCT</h1>
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
//             <input type='text' {...register("productImages")}></input>
//         </div>
//         <div>
//             <label>quantity:</label>
//             <input type='Number' {...register("quantity")}></input>
//         </div>
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
