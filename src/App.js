import logo from './logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Components/authorization/Signup';
import './App.css';
import Product from './Components/CRUD Products/Product';
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom"
import Receipt from './Components/Receipt';
import { createContext } from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Filter from './Components/Filter';
import Kitchen from './Components/Kitchen';
import StatusBoard from './Components/StatusBoard';
import { Chart } from './Components/Chart';
import EditProduct from './Components/CRUD Products/EditProduct';
import AddProduct from './Components/CRUD Products/AddProduct';
import Login from './Components/authorization/Login';
import VerifyComplete from './Components/authorization/VerifyComplete';
import Verification from './Components/Forget Password/Verification';
import Forget from "./Components/Forget Password/Forget"
import PasswordChange from './Components/Forget Password/PasswordChange'

export const dataContext = createContext()
export let userData = createContext()
function App() {
  const role_id = localStorage.getItem("role_id")
  console.log(typeof role_id, role_id)
  const navigate = useNavigate()
  const data2 = [{
    name: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 246,
    quantity: 1

  }, {
    name: "shwarma",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 130,
    quantity: 1


  }, {
    name: "fine",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    quantity: 1

  }, {
    name: "parrot",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    pieces: 0,
    quantity: 1

  }, {
    name: "goat",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    pieces: 0,
    quantity: 1

  }, {
    name: "chicken",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    pieces: 0,
    quantity: 1

  }, {
    name: "beef",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    pieces: 0,
    quantity: 1

  }]
  const [data, setData] = useState(data2)
  const data3 = [{
    token_no: 1,
    order_status: true,
    token_clear: false,
    date: "Thu Feb 09 2023 16:46:59 GMT+0530 (India Standard Time)",
    gst_total: 1000,
    orders: [
      {
        image: "http",
        name: "shwarma",
        quantity: 1,
        rate: 130
      },
      {
        image: "http",
        name: "pizza",
        quantity: 1,
        rate: 150
      }
    ]
  },
  {
    token_no: 2,
    order_status: true,
    token_clear: false,
    date: "Thu Mar 09 2023 16:46:59 GMT+0530 (India Standard Time)",
    gst_total: 4000,
    orders: [
      {
        image: "http",
        name: "chicken",
        quantity: 1,
        rate: 130
      },
      {
        image: "http",
        name: "rooll",
        quantity: 1,
        rate: 150
      }
    ]
  },
  ]

  const [useData, setUseData] = useState({})
  const [statusOrderData, setstatusOrderData] = useState(data3)


  return (
    <>
      <ToastContainer />
      <nav className="navibar navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">

          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/">Home</Link>

              {role_id === 6298 ? <Link className="nav-link active" to="/addproduct">AddProduct</Link> : null}
              <Link className="nav-link active" to="/products">Products</Link>
              <Link className="nav-link active" to="/kitchen">Kitchen</Link>
              {role_id === "6298" ? <Link className="nav-link active" to="/charts">Charts</Link> : null}

            </div>
          </div>

          <h1 style={{ marginTop: "8px" }} className="navbar-brand nv-color" href="#">KK Restaurant</h1>
          <div>
            <Button onClick={() => navigate("/")} sx={{ color: "white", border: "1px solid rgb(240, 112, 152)", margin: "10px" }} variant="outlined">Login</Button>
            <Button onClick={() => navigate("/signup")} sx={{
              color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                backgroundColor: "black", color: "whitesmoke"
              }
            }} variant="contained">Signup</Button>

          </div>


        </div>
      </nav>
      <div className='app'>
        <dataContext.Provider value={{ data, setData, data2 }}>
          <Routes>
            <Route path="/" element={<userData.Provider value={{ setUseData }}><Login /></userData.Provider>} />
            <Route path="/verification-link/:username/:id" element={<Verification />} />
            <Route path="/password-change/:username" element={<Protectedroute><PasswordChange /></Protectedroute>} />
            <Route path="/forgetpassword" element={<Forget />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify_link/:username/:id" element={<VerifyComplete />} />

            <Route path="products" element={<Product />} />
            <Route path="kitchen" element={<Kitchen />} />
            <Route path="statusboard" element={<StatusBoard />} />
            <Route path="charts" element={<Chart />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="addproduct" element={<AddProduct />} />

          </Routes>
        </dataContext.Provider>

      </div>
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
