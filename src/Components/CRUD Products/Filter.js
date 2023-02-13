import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../../App'
import TextField from '@mui/material/TextField';

function Filter() {
  const { data, setData } = useContext(dataContext)
  const token = localStorage.getItem("token")
  const filterRefresh = () => {
    fetch("http://localhost:4000/kkproducts/products", {
      headers: {
        "x-auth-token": token
      }
    })
      .then(res => res.json())
      .then(data => { setData(data.products) })
  }
  const handleChange = (e) => {
    const value = e.target.value
    const valueSplit = value.split("")

    if (valueSplit.length) {
      let filterData = data.filter(res => {
        return (res.name.toLowerCase().includes(value))
      }).map(filteredName => {
        return filteredName
      })
      setData(filterData)

    } else {
      filterRefresh()
    }
  }

  return (

    <TextField label="Filter"
      id="outlined-size-small"
      size="small"
      sx={{ backgroundColor: "white", border: "1px solid white", borderRadius: "5px", width: "500px" }}
      type="text" onChange={handleChange} />


  )
}

export default Filter