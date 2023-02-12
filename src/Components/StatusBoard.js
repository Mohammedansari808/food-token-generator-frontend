import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { dataContext } from '../App'
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import "../styles/statusboard.css"

import RefreshIcon from '@mui/icons-material/Refresh';
import { fullLink } from './link'
import { toast } from 'react-toastify'
function StatusBoard() {
    const role_id = localStorage.getItem('role_id')
    const [data, setData] = useState([])

    const data2 = [{
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


    useEffect(() => {

        const fetchOrders = fetch(`${fullLink}/kkorders/orders`)
            .then(data => data.json())
            .then(result => { setData(result.getOrders) })

        console.log(data)

    }, [])

    const handleRefresh = () => {
        fetch(`${fullLink}/kkorders/orders`)
            .then(data => data.json())
            .then(result => { setData(result.getOrders) })
    }

    const handleTokenClear = async (token) => {

        const filterData = data.filter((res) => (
            res.token_no != token
        ))
        const datas = await fetch(`${fullLink}/kkorders/orders`, {
            method: 'PUT',
            body: JSON.stringify({ token }),
            headers: {
                "Content-type": "application/json"
            },
        })
        const result = await datas.json()

        if (result.message === "success") {
            setData(filterData)
            toast.success("token removed")
        } else {
            toast.error("token not removed please refresh");

        }

    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>StatusBoard</h2>
            </div>
            <div style={{ marginLeft: "20px" }}>
                <Button variant='contained' color="success" onClick={() => { handleRefresh() }}>refresh
                    <RefreshIcon /></Button>
            </div>

            <div className='total-token'>
                {
                    data ? (data.map(res => {
                        return (
                            <>
                                {
                                    !res.order_status && res.kitchen_orders ? (<div className="per-token-no" style={{ backgroundColor: "white", margin: "20px" }}>
                                        <h1>{res.token_no}</h1>
                                        {
                                            role_id == 6298 ? (<Button style={{ margin: "15px" }} sx={{
                                                color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                                                    backgroundColor: "black", color: "white"
                                                }
                                            }} variant='contained' onClick={() => { handleTokenClear(res.token_no) }}>remove</Button>) : null
                                        }

                                    </div>) : null
                                }

                            </>
                        )
                    })) : <h3>No Pending tokens</h3>
                }
            </div>
        </div>
    )
}

export default StatusBoard