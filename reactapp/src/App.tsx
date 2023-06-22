import { DASHBOARD_PATH, PRODUCT_PATH, REPORT_PATH, SETTING_PATH } from "./config/constants"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./router/ProtectedRoute"
import BackendLayout from './layouts/BackendLayout'
import AuthLayout from './layouts/AuthLayout'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Report from './pages/Report'
import Setting from './pages/Setting'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<AuthLayout />}>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute><BackendLayout /></ProtectedRoute>}>
            <Route path={DASHBOARD_PATH} element={<Dashboard />} />
            <Route path={PRODUCT_PATH} element={<Product />} />
            <Route path={REPORT_PATH} element={<Report />} />
            <Route path={SETTING_PATH} element={<Setting />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
