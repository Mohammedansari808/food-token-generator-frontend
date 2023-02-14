import React, { useContext, useEffect } from 'react'
import "../styles/kitchen.css"
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { dataContext } from '../App';
import { fullLink } from './link';
function Kitchen() {
    const authToken = localStorage.getItem("token")
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": authToken
            }

        })
            .then(orders => orders.json())
            .then(result => { (setData(result.getOrders)) })

    }, [])




    let arr = []
    const handleOrderReady = async (token) => {

        const filterData = data.filter((res) => (
            res.token_no != token
        ))
        const datas = await fetch(`${fullLink}/kkorders/kitchenorders`, {
            method: 'PUT',
            body: JSON.stringify({ token }),
            headers: {
                "x-auth-token": authToken,
                "Content-type": "application/json"

            },
        })
        const result = await datas.json()



        if (result.message === "success") {
            toast.success("Order ready check Token board located in products page")
            setData(filterData)
        } else {
            toast.success("order not sentplease try again")
        }


    }
    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Orders</h2>
            </div>
            <div className="all-orders">
                {
                    data.map(res => {
                        return (
                            <div>
                                {!res.kitchen_orders && !res.order_status ? (<div className='per-kitchen-order' >
                                    <h2>TOKEN NO <strong>{res.token_no}</strong> </h2>
                                    <div className='table-box'>
                                        <table >
                                            <tr>
                                                <th>Food</th>
                                                <th>Quantity</th>
                                            </tr>
                                            {
                                                res.orders[0].map((resu => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{resu.name}</td>
                                                                <td>{resu.quantity}</td>
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
                                            }} variant='contained' onClick={() => { handleOrderReady(res.token_no) }}>ready</Button>

                                        }

                                    </div>
                                </div>) : null}
                            </div>


                        )

                    })
                }
            </div>
        </div >

    )
}

export default Kitchen