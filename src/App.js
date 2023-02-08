import logo from './logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Product from './Components/Product';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Receipt from './Components/Receipt';
import { createContext } from 'react';
import { useState } from 'react';
import Filter from './Components/Filter';
import Kitchen from './Components/Kitchen';
import StatusBoard from './Components/StatusBoard';
export const dataContext = createContext()
function App() {
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
    quantity: 1

  }, {
    name: "goat",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    quantity: 1

  }, {
    name: "chicken",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    quantity: 1

  }, {
    name: "beef",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    rate: 100,
    quantity: 1

  }]
  const [data, setData] = useState(data2)
  const data3 = [{
    token_no: 1,
    order_status: true,
    token_clear: false,
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


  const [statusOrderData, setstatusOrderData] = useState([])


  return (
    <>
      <ToastContainer />
      <div className='app'>
        <dataContext.Provider value={{ data, setData, data2 }}>
          <Filter />
          <Routes>
            <Route path="/" element={<dataContext.Provider value={{ data, setData, data2 }}><Product /></dataContext.Provider>} />
            <Route path="/kitchen" element={<dataContext.Provider value={{ statusOrderData, setstatusOrderData }}><Kitchen /></dataContext.Provider>} />
            <Route path="/statusboard" element={<dataContext.Provider value={{ statusOrderData, setstatusOrderData }}><StatusBoard /></dataContext.Provider>} />
          </Routes>
        </dataContext.Provider>


      </div>
    </>


  );
}

export default App;
