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
import { WishList } from './components/items/WishList'
import { LogoutIcon } from './components/common/LogoutIcon'
import { Orders } from './components/user/Orders'
import { PlaceOrder } from './components/user/PlaceOrder'
import { Inbox } from './components/vendor/Inbox'
import { AdminSidebar } from './components/layouts/AdminSidebar' 
import { Dashboard } from './components/Admin/Dashboard'
import { ManageUsers } from './components/Admin/ManageUsers'
import { ManageProducts } from './components/Admin/ManageProducts'
import { ManageCategories } from './components/Admin/ManageCategories'
import { ManageOrders } from './components/Admin/ManageOrders'
import { EditUserProfile } from "./components/user/EditUserProfile";
import { ViewOrderDetails } from './components/user/ViewOrderDetails'

function App() {

  axios.defaults.baseURL = "http://localhost:3000";

   const location = useLocation();

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
    <Route path='/logout' element={<LogoutIcon/>}/>
    <Route path='/editprofile' element={<EditUserProfile/>}/>
    

    <Route path='' element={<PrivateRoutes/>}>
    
    <Route path='/user' element={<UserSidebar/>}>
    <Route path='profile' element={<UserProfile/>} ></Route>
    <Route path='editprofile' element={<EditUserProfile/>}/>
    <Route path='address' element={<UserAddress/>} />
    <Route path='updateaddress/:id' element={<UpdateUserAddress/>}/>
    <Route path='viewaddress' element={<ViewUserAddress/>}/>
    <Route path='favourites' element={<WishList/>}/>
    <Route path='orders' element={<Orders/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='placeorder' element={<PlaceOrder/>}/>
    <Route path='orderdetails/:id' element={<ViewOrderDetails/>}/>

    </Route>

      
    <Route path='/vendor' element={<VendorSidebar/>}> 
    <Route path='addproduct' element={<AddProduct/>} />
    <Route path='myproducts' element={<ViewMyProducts/>}></Route>
    <Route path='updateproduct/:id' element={<UpdateMyProduct/>}></Route>
    <Route path='profile' element={<UserProfile/>}/>
    <Route path='editprofile' element={<EditUserProfile/>}/>
    <Route path='inbox' element={<Inbox/>}/>
   
    </Route>

    <Route path="/admin" element={<AdminSidebar/>}>
    <Route path='profile' element={<UserProfile/>}/>
    <Route path='editprofile' element={<EditUserProfile/>}/>
    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='manageusers' element={<ManageUsers/>}/>
    <Route path='manageproducts' element={<ManageProducts/>}/>
    <Route path='managecategory' element={<ManageCategories/>}/>
    <Route path='manageorders' element={<ManageOrders/>}/>

    </Route>

    </Route>
  </Routes>

    </div>
    </>
  )
}

export default App
