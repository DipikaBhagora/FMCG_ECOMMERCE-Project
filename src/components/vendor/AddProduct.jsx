import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const AddProduct = () => {
 
    const [categories, setcategories] = useState([])
    const [subCategories, setsubCategories] = useState([])
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

    useEffect(() =>{
        getAllCategories()
    },[])
 
const {register,handleSubmit} = useForm()

const submitHandler = async(data) =>{
    //console.log(data);
    const sellerId = localStorage.getItem("id")
    data.sellerId = sellerId;
    //console.log(data)
    const res =  await axios.post("/product/addproduct",data)
    console.log(res)

}

    return (
    <div style={{textAlign:"center"}}>
        <h1>ADD PRODUCT</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label>Product Name:</label>
                <input type='text' {...register("productName")}></input>
            </div>
            <div>
                <label>Base Price:</label>
                <input type='Number' {...register("basePrice")}></input>
            </div>
            <div>
                <label>Offer Price:</label>
                <input type='NUmber' {...register("offerPrice")}></input>
            </div>
            <div>
                <label>Offer Percentage:</label>
                <input type='Number' {...register("offerPercentage")}></input>
            </div>
            <div>
                <label>Product Detail:</label>
                <input type='text' {...register("productDetail")}></input>
            </div>
            <div>
                <label>Product Images:</label>
                <input type='text' {...register("productImages")}></input>
            </div>
            <div>
                <label>quantity:</label>
                <input type='Number' {...register("quantity")}></input>
            </div>
            {/* <div>
                <label></label>
                <input type='' {...register("")}></input>
            </div> */}
        <div>
            <label>Category: </label>
            <select {...register("categoryId")} onChange={(event)=>{getSubCategoryByCategoryId(event.target.value)}}> //id name from model table
                {
                    categories?.map((category) =>{
                        return <option value={category._id}>{category.name}</option>
                    })
                }
            </select>
        </div>
        <div>
            <label>Sub-Category: </label>
            <select {...register("subCategoryId")}>
                {
                    subCategories?.map((subCategory) =>{
                        return <option value={subCategory._id}>{subCategory.name}</option>
                    })
                }
            </select>
        </div>
        <div>
            <input type='submit'></input>
        </div>
        </form>
    </div>
  )
}
