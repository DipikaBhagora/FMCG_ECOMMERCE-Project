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

}

    return (
    <div style={{textAlign:"center"}}>
        <h1>ADD PRODUCT</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
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
        </form>
    </div>
  )
}
