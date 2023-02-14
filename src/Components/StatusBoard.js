import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import "../styles/statusboard.css"

import RefreshIcon from '@mui/icons-material/Refresh';
import { fullLink } from './link'
import { toast } from 'react-toastify'
function StatusBoard() {
    // this BOARD shows the TOKEN whose is ORDER READY it can can be removed only by the admin

    const role_id = localStorage.getItem('role_id')
    const authToken = localStorage.getItem("token")
    const [data, setData] = useState([])
    //fetching the data
    useEffect(() => {

        const fetchOrders = fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": authToken
            }
        })
            .then(data => data.json())
            .then(result => { setData(result.getOrders) })

    }, [])
    //for refresh button
    const handleRefresh = () => {
        fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": authToken
            }

        })
            .then(data => data.json())
            .then(result => { setData(result.getOrders) })
    }
    //to remove token from visibility
    const handleTokenClear = async (token) => {

        const filterData = data.filter((res) => (
            res.token_no != token
        ))
        const datas = await fetch(`${fullLink}/kkorders/orders`, {
            method: 'PUT',
            body: JSON.stringify({ token }),
            headers: {
                "x-auth-token": authToken,
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
                            <div>
                                {
                                    !res.order_status && res.kitchen_orders ? (
                                        <div className="per-token-no" style={{ backgroundColor: "white", margin: "20px" }}>
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

                            </div>
                        )
                    })) : <h3>No Pending tokens</h3>
                }
            </div>
        </div>
    )
}

export default StatusBoard