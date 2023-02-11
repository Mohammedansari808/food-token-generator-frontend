import React, { useContext, useEffect } from 'react'
import "../styles/kitchen.css"
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { dataContext } from '../App';
import StatusBoard from './StatusBoard';
import { fullLink } from './link';
function Kitchen() {
    const { statusOrderData, setstatusOrderData } = useContext(dataContext)
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${fullLink}/kkorders/orders`)
            .then(orders => orders.json())
            .then(result => { (setData(result.getOrders)); console.log(result.getOrders) })

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
                "Content-type": "application/json"
            },
        })
        const result = await datas.json()



        if (result.message === "success") {
            toast.success("order ready token sent to Token board")
            setData(filterData)
        } else {
            toast.success("order not sentplease try again")
        }


    }
    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Orders</h2>
            </div>            <div class="all-orders">
                {
                    data.map(res => {
                        return (
                            <>
                                {!res.kitchen_orders && !res.order_status ? (<div className='per-kitchen-order' >
                                    <h2>TOKEN_NO  {res.token_no}</h2>
                                    <div className='table-box'>
                                        <table>
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
                            </>


                        )

                    })
                }
            </div>
        </div >

    )
}

export default Kitchen