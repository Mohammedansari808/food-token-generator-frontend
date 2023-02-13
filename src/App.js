import logo from './logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Components/authorization/Signup';
import './App.css';
import Product from './Components/CRUD Products/Product';
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom"
import Receipt from './Components/Receipt';
import { createContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Kitchen from './Components/Kitchen';
import StatusBoard from './Components/StatusBoard';
import { Chart } from './Components/Chart';
import EditProduct from './Components/CRUD Products/EditProduct';
import AddProduct from './Components/CRUD Products/AddProduct';
import Login from './Components/authorization/Login';
import VerifyComplete from './Components/authorization/VerifyComplete';
import Verification from './Components/Forget Password/Verification';
import Forget from "./Components/Forget Password/Forget";
import PasswordChange from './Components/Forget Password/PasswordChange';
import Logout from './Components/authorization/Logout';
import PrintProvider, { NoPrint } from 'react-easy-print';
import AllOrders from './Components/AllOrders';
import NotFound from './Components/NotFound';
export const dataContext = createContext()
export let userData = createContext()
function App() {
  const role_id = localStorage.getItem("role_id")
  const navigate = useNavigate()
  const [data, setData] = useState([])


  return (
    <>
      <PrintProvider>

        <NoPrint>
          <ToastContainer />

          <nav className="navibar navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">

              <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" to="/">Home</Link>
                  {role_id ? (
                    <>
                      {role_id == 6298 ? <Link className="nav-link active" to="/addproduct">AddProduct</Link> : null}
                      <Link className="nav-link active" to="/products">Products</Link>
                      {role_id == 6298 || 1 ? <Link className="nav-link active" to="/kitchen">Kitchen</Link> : null}
                      {role_id == 6298 ? <Link className="nav-link active" to="/charts">Charts</Link> : null}
                      {role_id == 6298 ? <Link className="nav-link active" to="/allorders">All Orders</Link> : null}
                    </>) : null}


                </div>
              </div>
              <h1 style={{ marginTop: "8px" }} className="navbar-brand nv-color" href="#">KK Restaurant</h1>
              {!role_id ? (
                <div>
                  <Button onClick={() => navigate("/")} sx={{ color: "white", border: "1px solid rgb(240, 112, 152)", margin: "10px" }} variant="outlined">Login</Button>
                  <Button onClick={() => navigate("/signup")} sx={{
                    color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                      backgroundColor: "black", color: "whitesmoke"
                    }
                  }} variant="contained">Signup</Button>
                </div>) : <Logout />}

            </div>
          </nav>
        </NoPrint>
        <div className='app'>
          <dataContext.Provider value={{ data, setData }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/verification-link/:username/:id" element={<Verification />} />
              <Route path="/password-change/:username" element={<Protectedroute><PasswordChange /></Protectedroute>} />
              <Route path="/forgetpassword" element={<Forget />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify_link/:username/:id" element={<VerifyComplete />} />
              <Route path="products" element={<Protectedroute><Product /></Protectedroute>} />
              <Route path="kitchen" element={<Protectedroute><Kitchen /></Protectedroute>} />
              <Route path="statusboard" element={<Protectedroute><StatusBoard /></Protectedroute>} />
              <Route path="charts" element={<Protectedroute><Chart /></Protectedroute>} />
              <Route path="edit/:id" element={<Protectedroute>
                <EditProduct /></Protectedroute>} />
              <Route path="addproduct" element={<Protectedroute>
                <AddProduct /></Protectedroute>} />
              <Route path="allorders" element={<Protectedroute>
                <AllOrders /></Protectedroute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </dataContext.Provider>
        </div>
      </PrintProvider>
    </>


  );
}

function Protectedroute({ children }) {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem('token')
  if (isAuth) {
    return (
      children
    )
  } else {
    navigate("/login")
  }

}

export default App;
