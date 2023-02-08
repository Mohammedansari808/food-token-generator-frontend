import React, { useContext } from 'react'
import "../styles/kitchen.css"
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { dataContext } from '../App';
import StatusBoard from './StatusBoard';
function Kitchen() {
    const { statusOrderData, setstatusOrderData } = useContext(dataContext)

    const data1 = [{
        token_no: 1,
        order_status: false,
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
        order_status: false,
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
    {
        token_no: 3,
        order_status: false,
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
    const [data, setData] = useState(data1)
    let arr = []
    const handleOrderReady = (orderData) => {
        console.log(orderData)
        const filterData = data.filter((res) => (
            res.token_no != orderData.token_no
        ))
        setData(filterData)
        arr.push()
        setstatusOrderData([...statusOrderData, { orderData }])
    }
    return (
        <div >
            <h2>ORDERS</h2>
            <div class="all-orders">
                {
                    data.map(res => {
                        return (
                            <>
                                {!res.order_status ? (<div className='per-kitchen-order' >
                                    <h2>TOKEN_NO  {res.token_no}</h2>
                                    <div className='table-box'>
                                        <table>
                                            <tr>
                                                <th>Food</th>
                                                <th>Quantity</th>
                                            </tr>
                                            {
                                                res.orders.map((orders => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{orders.name}</td>
                                                                <td>{orders.quantity}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                }))
                                            }
                                        </table>
                                    </div>
                                    <div className='button-section'>
                                        {
                                            <Button style={{ margin: "15px" }} sx={{
                                                color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                                                    backgroundColor: "black", color: "white"
                                                }
                                            }} variant='contained' onClick={() => { handleOrderReady(res) }}>ready</Button>

                                        }

                                    </div>
                                </div>) : null}
                            </>


                        )

                    })
                }
            </div>
        </div >

    )
}

export default Kitchen