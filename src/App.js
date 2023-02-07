import logo from './logo.svg';
import './App.css';
import Product from './Components/Product';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Receipt from './Components/Receipt';
import { createContext } from 'react';
import { useState } from 'react';
import Filter from './Components/Filter';
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



  return (
    <div className='app'>
      <dataContext.Provider value={{ data, setData, data2 }}>
        <Filter />
        <div style={{ display: 'grid', gridTemplateColumns: "2.5fr 0.5fr" }} className="App">
          <Routes>

            <Route path="/" element={<dataContext.Provider value={{ data, setData, data2 }}><Product /></dataContext.Provider>} />
          </Routes>
          <div  >
            <Receipt />
          </div>

        </div>

      </dataContext.Provider>


    </div>

  );
}

export default App;
