import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { increment, decrement, removeOrder } from '../Redux/Reducers/Order.Slice'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../styles/receipt.css"
function Receipt() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.order.orders)
    let arr = []
    let total = 0
    let gst = 0
    const [Total, setTotal] = useState(0)
    const [Gst, setGst] = useState(0)
    const [cust_name, setCust_name] = useState("")

    const handleChange = (e) => {
        setCust_name(e.target.value)
    }

    const handleSubmit = () => {
        setTotal(total)
        setGst(gst)

        const finaldata = {
            dine_name: cust_name,
            sub_total: Total,
            gst_total: Gst,
            orders: [
                data
            ]
        }
        console.log(finaldata)
    }
    return (
        <>
            <div className='token-list'>
                <h2>kk Restaurant</h2>
                <div>chennai</div>
                <h2>Token NO : 01</h2>
                <hr />
                <div>
                    <h3>
                        Dine in
                    </h3>
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>


                <br />
                {
                    data.map(res => {
                        const rate = res.rate * res.quantity
                        arr.push(rate)
                        total = arr.reduce((acc, ini) => acc + ini)
                        gst = total + (total * (5 / 100))

                        return (
                            <div>
                                <div className='per-order' >
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100px", fontSize: "14px" }}>

                                        <div>
                                            {res.name}
                                        </div>
                                        <div>
                                            ₹{rate}
                                        </div>
                                    </div>


                                    <div style={{ display: "flex" }}>
                                        <button className='inde-button' onClick={() => { dispatch(decrement(res.name)) }}>-</button>
                                        <div style={{ margin: "10px" }}>{res.quantity}</div>
                                        <button className='inde-button' onClick={() => { dispatch(increment(res.name)) }}>+</button>
                                    </div>
                                    <Button variant="contained" color="error" onClick={() => { dispatch(removeOrder(res.name)) }}>remove</Button>
                                </div>

                            </div>

                        )
                    })
                }
                <hr />

                <h2>subTotal : <strong>₹{total}</strong></h2>
                <div>
                    <div className='gst-list'>
                        <div>cgst @2.5%</div> <div>₹{(gst - total) / 2}</div>
                    </div>
                    <div className='gst-list'>
                        <div>sgst @2.5%</div> <div> ₹{(gst - total) / 2}</div>
                    </div>
                </div>
                <hr />

                <h2>Total : <strong>₹{gst}</strong></h2>
            </div>

            <button onClick={() => { handleSubmit() }}>submit</button>
        </>

    )
}

export default Receipt