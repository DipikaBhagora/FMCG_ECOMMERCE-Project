import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ViewMyProducts = () => {

    const [products, setproducts] = useState([]);
    const [refresh, setrefresh] = useState(false);
    
        const getMyAllProducts = async() =>{
        const res = await axios.get("/product/getproductsbyuserid/"+localStorage.getItem("id"));
        console.log(res.data); //api res
        setproducts(res.data.data);
    }

    useEffect(() =>{
        getMyAllProducts();
    }, [refresh])

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">MY PRODUCTS</h2>
    <div className="table-responsive">
        <table className='table table-striped table-bordered text-center'>
            <thead className='table-dark'>
                <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product) => (
                    <tr key={product._id}>
                        <td className="align-middle">{product.productName}</td>
                        <td className="align-middle text-center">
                            <img className="img-fluid d-block mx-auto" style={{ height: "100px", width: "100px", objectFit: "cover"}} src={product?.productImages} alt="Product" />
                        </td>
                        <td className="align-middle">
                            <Link to={`/vendor/updateproduct/${product._id}`} className="btn btn-info">UPDATE</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    // <div style={{textAlign:"center"}}>
    //     MY PRODUCTS
    //     <table className='table table-dark'>
    //         <thead>
    //             <tr>
    //                 <th>Product Name</th>
    //                 <th>IMAGE</th>
    //                 <th>ACTION</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {
    //                products?.map((product)=>{
    //                 return<tr>
    //                     <td>{product.productName}</td>
    //                     <td>
    //                         <img  style ={{height:100,width:100}}src={product?.productImages}></img>
    //                     </td>
    //                     <td>
    //                         <Link to={`/vendor/updateproduct/${product._id}`} className = "btn btn-info">UPDATE</Link>
    //                     </td>
    //                 </tr>
    //                }) 
    //             }
    //         </tbody>
    //     </table>
    // </div>
  )
}
