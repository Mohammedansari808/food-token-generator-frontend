import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { increment, decrement, removeOrder } from '../Redux/Reducers/Order.Slice'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../styles/receipt.css"
import { toast } from 'react-toastify';
function Receipt({ props }) {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.order.orders)
    let arr = []
    let total = 0
    let gst = 0
    const [cust_name, setCust_name] = useState("")
    const [confirm, setConfirm] = useState(false)
    const date = new Date()
    const dateTime = date.toLocaleString()
    const handleChange = (e) => {

        setCust_name(e.target.value)
    }
    const handleSubmit = () => {

        const finaldata = {
            dine_name: cust_name,
            token_no: 1,
            order_status: false,
            sub_total: total,
            date_Time: date,
            gst_total: gst,
            orders: [
                data
            ]
        }

        toast.success("order sent to kitchen successfully")
        console.log(finaldata)
    }
    return (
        <>

            <div className="token-list">
                <h2>kk Restaurant</h2>
                <div>chennai</div>
                <h2>Token NO : 01</h2>
                <div>{dateTime}</div>

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
                {
                    !confirm ? <Button style={{ margin: "15px" }} sx={{
                        color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                            backgroundColor: "black", color: "white"
                        }
                    }} variant='contained' onClick={() => { setConfirm(true) }}>submit</Button> :
                        (
                            <div>
                                <Button style={{ margin: "15px" }} color="success" variant='contained' onClick={() => { handleSubmit(); setConfirm(false) }}>yes</Button>
                                <Button style={{ margin: "15px" }} color="error" variant='contained' onClick={() => { setConfirm(false) }}>no</Button>
                            </div>
                        )
                }
            </div>


        </>

    )
}

export default Receipt