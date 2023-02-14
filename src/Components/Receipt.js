import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { increment, decrement, removeOrder, clearOrders } from '../Redux/Reducers/Order.Slice'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../styles/receipt.css"
import { toast } from 'react-toastify';
import { fullLink } from './link';
import PrintProvider, { NoPrint, Print } from 'react-easy-print';
function Receipt() {
    const role_id = 1
    const dispatch = useDispatch()
    const data = useSelector((state) => state.order.orders)
    const authToken = localStorage.getItem("token")

    let arr = []
    let total = 0
    let gst = 0
    const [cust_name, setCust_name] = useState("")
    const [server, setServer] = useState("")
    const [token, setToken] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const dateTime = new Date()

    const date = dateTime.toLocaleString()
    const handleChange = (e) => {

        setCust_name(e.target.value)
    }
    const handleServerChange = (e) => {

        setServer(e.target.value)
    }
    useEffect(() => {
        fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": authToken
            }
        })
            .then(res => res.json())
            .then(orders => setToken(orders.getOrders.length))
    }, [])

    const handleSubmit = async () => {
        const finaldata = {
            dine_name: cust_name,
            token_no: token,
            server_name: server,
            order_status: false,
            kitchen_order: false,
            sub_total: total,
            gst_total: gst,
            only_date: date,
            date: dateTime,
            orders: [
                data
            ]
        }
        if (cust_name && server) {
            const postOrders = await fetch(`${fullLink}/kkorders/orders`, {
                method: "POST",
                body: JSON.stringify(finaldata),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const result = await postOrders.json()
            if (result.message === "success") {
                toast.success("order sent to kitchen successfully")
                window.print()
                setCust_name("")
                setToken(token + 1)
                dispatch(clearOrders())
            } else {
                toast.success("order not sent to kitchen please try again")
            }
        } else {
            toast.warning("Please fill the Customer name and Server name")
        }




    }

    const handleCustomerSubmit = async () => {

    }
    return (
        <div>
            <PrintProvider>
                <Print>
                    <div className="token-list" id="printable">
                        <h2>kk Restaurant</h2>
                        <p>chennai</p>
                        <h2>Token NO : {token}</h2>
                        <TextField
                            required
                            id="standard-required"
                            label="Server Name"
                            variant="standard"
                            onChange={handleServerChange}
                        />
                        <div>{date}</div>
                        <hr />
                        <div>
                            <h3>
                                Dine in
                            </h3>
                            <TextField
                                required
                                id="standard-required"
                                label="Customer Name"
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
                                                    {res.name} {res.quantity}
                                                </div>
                                                <div>
                                                    ₹{rate}
                                                </div>
                                            </div>

                                            <NoPrint>
                                                <div style={{ display: "flex" }}>
                                                    <button className='inde-button' onClick={() => { dispatch(decrement(res.name)) }}>-</button>
                                                    <div style={{ margin: "10px" }}>{res.quantity}</div>
                                                    <button className='inde-button' onClick={() => { dispatch(increment(res.name)) }}>+</button>
                                                </div>
                                            </NoPrint>
                                            <NoPrint>
                                                <Button variant="contained" color="error" onClick={() => { dispatch(removeOrder(res.name)) }}>remove</Button>
                                            </NoPrint>
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
                        <NoPrint>
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
                        </NoPrint>
                    </div>
                </Print>

            </PrintProvider >
        </div >

    )
}

export default Receipt