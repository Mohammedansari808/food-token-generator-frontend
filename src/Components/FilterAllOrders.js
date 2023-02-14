


import React, { useState } from 'react'
import { useContext } from 'react'
import { dataContext } from '../App'
import Button from '@mui/material/Button';
import "../styles/product.css"
import TextField from '@mui/material/TextField';
import { fullLink } from './link';

function FilterAllOrders({ data, setData }) {
    const token = localStorage.getItem("token")

    const [value, setValue] = useState(0)
    const handleChange = (e) => {
        setValue(e.target.value)
        if (!e.target.value) {
            filterRefreshAllOrders()
        }

    }
    const filterRefreshAllOrders = () => {
        fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => res.json())
            .then(data => { setData(data.getOrders) })
    }
    const filterSubmit = () => {

        if (value) {
            let filterData = data.filter(res => {
                return res.token_no == value
            }).map(filteredToken => {
                return filteredToken
            })
            setData(filterData)

        } else {
            filterRefreshAllOrders()
        }
    }

    return (
        <div className='filter-token-board'>
            <TextField label="Filter by Token NO"
                id="outlined-size-small"
                size="small"
                sx={{ backgroundColor: "white", border: "1px solid white", borderRadius: "5px", width: "500px" }}
                type="text" onChange={handleChange} />
            <Button onClick={() => { filterSubmit() }} sx={{
                color: "white", margin: "25px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                    backgroundColor: "black", color: "whitesmoke"
                }
            }}>filter</Button>
        </div>


    )
}

export default FilterAllOrders