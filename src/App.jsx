import { UserSidebar } from './components/layouts/UserSidebar'
import { Route,Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
// import './assets/adminlte.css'
// import './assets/adminlte.min.css'
import { Signup } from './components/common/Signup'
import { Login } from './components/common/Login'
import axios from 'axios'
import { useEffect } from "react";
import { VendorSidebar } from './components/vendor/VendorSidebar'
import { AddProduct } from './components/vendor/AddProduct'
import PrivateRoutes from './hooks/PrivateRoutes'
import { HomePage } from './components/common/HomePage'
import { ViewMyProducts } from './components/vendor/ViewMyProducts'
import { UpdateMyProduct } from './components/vendor/UpdateMyProduct'
import { Shop } from './components/common/Shop'
import { UserAddress } from './components/user/UserAddress'
import { Cart } from './components/user/Cart'
import { UpdateUserAddress } from './components/user/UpdateUserAddress'
import { ViewUserAddress } from './components/user/ViewUserAddress'
import { SubCategories } from './components/items/SubCategories'
import { SubCategoryProducts } from './components/items/SubCategoryProducts'
import { ViewProductById } from './components/items/ViewProductById'


function App() {

  axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
<>
<div
      className={
        location.pathname === "/login" || location.pathname === "/signup"
          ? ""
          : "app-wrapper"
      }
    >

  <Routes>

    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/shop' element={<Shop/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/subcategory/:categoryId' element={<SubCategories/>}/>
    <Route path='/subcategory/:subCategoryId/products' element={<SubCategoryProducts/>}/>
    <Route path='/product/getproductbyid/:id' element={<ViewProductById/>}/>
    

    <Route path='' element={<PrivateRoutes/>}>
    <Route path='/user' element={<UserSidebar/>}>
    <Route path='profile' element={<UserProfile/>} ></Route>
    <Route path='address' element={<UserAddress/>} />
    <Route path='updateaddress/:id' element={<UpdateUserAddress/>}/>
    <Route path='viewaddress' element={<ViewUserAddress/>}/>

    </Route>
      
    <Route path='/vendor' element={<VendorSidebar/>}> 
    <Route path='addproduct' element={<AddProduct/>} />
    <Route path='myproducts' element={<ViewMyProducts/>}></Route>
    <Route path='updateproduct/:id' element={<UpdateMyProduct/>}></Route>
    <Route path='profile' element={<UserProfile/>}/>
   
    </Route>

    </Route>
  </Routes>

    </div>
    </>
  )
}

export default App
