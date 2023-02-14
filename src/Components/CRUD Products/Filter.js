import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../../App'
import TextField from '@mui/material/TextField';
import { fullLink } from '../link';

function Filter() {
  //usecontext method used
  const { data, setData } = useContext(dataContext)
  //for authentiction
  const token = localStorage.getItem("token")
  // it is for after full backspace to show full data in the page
  const filterRefresh = () => {
    fetch(`${fullLink}/kkproducts/products`, {
      headers: {
        "x-auth-token": token
      }
    })
      .then(res => res.json())
      .then(data => { setData(data.products) })
  }
  // getting value from form
  const handleChange = (e) => {
    const value = e.target.value
    const valueSplit = value.split("")

    if (valueSplit.length) {
      //filtering using includes and map into new array to show the datas which has same letter
      //word
      let filterData = data.filter(res => {
        return (res.name.toLowerCase().includes(value))
      }).map(filteredName => {
        return filteredName
      })
      setData(filterData)

    } else {
      // it is for after full backspace to show full data in the page
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