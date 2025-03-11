import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const ViewMyProducts = () => {

    const [products, setproducts] = useState([])
    const getMyAllProducts = async() =>{

        const res = await axios.get("/product/getproductsbyuserid/"+localStorage.getItem("id"));
        console.log(res.data); //api res
        setproducts(res.data.data);
    }

    useEffect(() =>{
        getMyAllProducts();
    }, [])

  return (
    <div style={{textAlign:"center"}}>
        MY PRODUCTS
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>IMAGE</th>
                </tr>
            </thead>
            <tbody>
                {
                   products?.map((product)=>{
                    return<tr>
                        <td>{product.productName}</td>
                        <td>
                            <img  style ={{height:100,width:100}}src={product?.productImages}></img>
                        </td>
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}
