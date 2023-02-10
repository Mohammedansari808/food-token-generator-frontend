import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../App'
import TextField from '@mui/material/TextField';

function Filter() {
  const { data, setData, data2 } = useContext(dataContext)
  const handleChange = (e) => {
    const value = e.target.value
    const valueSplit = value.split("")
    if (valueSplit.length) {
      let filterData = data.filter(res => res.name.includes(value)).map(filteredName => {
        return filteredName
      })
      setData(filterData)
    } else {
      setData(data2)
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