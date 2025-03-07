import { UserSidebar } from './components/layouts/UserSidebar'
import { Route,Routes } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import './assets/adminlte.css'
import './assets/adminlte.min.css'
import { Signup } from './components/common/Signup'
import { Login } from './components/common/Login'

function App() {

  return (
<>
    <body className="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
      <div className="app-wrapper">

  <Routes>

    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>

    <Route path='/user' element={<UserSidebar/>}>
    <Route path='profile' element={<UserProfile/>}></Route>
    </Route>
  </Routes>

    </div>
    </body>
    </>
  )
}

export default App
