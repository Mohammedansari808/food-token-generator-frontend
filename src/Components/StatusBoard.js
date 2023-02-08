import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { dataContext } from '../App'
function StatusBoard() {
    const { statusOrderData, setstatusOrderData } = useContext(dataContext)
    console.log(statusOrderData)
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
    const [data, setData] = useState(data2)
    const handleTokenClear = (orderData) => {
        console.log(orderData)
        const filterData = data.filter((res) => (
            res.token_no != orderData.token_no
        ))
        setData(filterData)

    }
    return (
        <div>
            <div>StatusBoard</div>
            {
                statusOrderData.map(res => {
                    return (
                        <div>
                            {

                                res.order_status ? (<div style={{ backgroundColor: "white" }}>
                                    <div>{res.token_no}</div>
                                    <button onClick={() => { handleTokenClear(res.token_no) }}>clear</button>

                                </div>) : null
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}

export default StatusBoard