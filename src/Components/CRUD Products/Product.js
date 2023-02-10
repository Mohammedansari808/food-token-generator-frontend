import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '../../Redux/Reducers/Order.Slice'
import { useContext } from 'react'
import { dataContext } from '../../App'
import { ToastContainer } from 'react-toastify'
import Button from '@mui/material/Button';
import "../../styles/product.css"
import Receipt from '../Receipt'
import StatusBoard from '../StatusBoard'
import { useNavigate } from 'react-router-dom'
import Filter from '../Filter'
import { useState } from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
function Product() {
    const role_id = localStorage.getItem("role_id")
    const navigate = useNavigate()
    const { data, setData, data2 } = useContext(dataContext)

    const [showBill, setShowBill] = useState(true)
    const dispatch = useDispatch()
    const handleDelete = (name) => {
        const deleteData = data.filter((res) => (res.name != name))
        setData(deleteData)
    }

    return (
        <>

            <div className='filter-token-board'>
                <Filter />
                <Button sx={{
                    color: "white", margin: "20px", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                        backgroundColor: "white", color: "black"

                    }
                }}
                    className="btn btn-primary"
                    disabled={false}
                    variant="contained"
                    onClick={() => { navigate("/statusboard") }}
                >Token Board</Button>
                <Button variant="contained" sx={{
                    color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                        backgroundColor: "white", color: "black"
                    }
                }} onClick={() => { setShowBill(!showBill) }}>{showBill ? "hide bill" : "show bill"}</Button>

            </div>

            <div className={showBill ? 'all-cards-1' : "all-cards-2"} >

                <div className="card-group" style={{ display: "flex" }}>
                    {data.map(data => {
                        return (
                            <div>
                                <div className="card">

                                    <img
                                        src={data.image}
                                        className="card-img-top"
                                        alt={`${data.name}-pizza`}
                                    />
                                    <div className="flash"></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}</h5>
                                        <p className="card-text">Rate : {data.rate}/-</p>
                                        <Button
                                            sx={{
                                                color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                                                    backgroundColor: "black", color: "whitesmoke"
                                                }
                                            }}
                                            className="btn btn-primary"
                                            disabled={false}
                                            variant="contained"
                                            onClick={() => { dispatch(addOrder(data)) }}
                                        >
                                            Add
                                        </Button>
                                        {role_id === 6298 ? (
                                            <><Button
                                                sx={{
                                                    color: "white", marginRight: "10px", '&:hover': {
                                                        backgroundColor: "black", color: "white"
                                                    }
                                                }}
                                                className="btn btn-primary"
                                                disabled={false}
                                                variant="contained"
                                                onClick={() => { navigate(`/edit/${data.name}`) }}
                                            >
                                                Edit
                                            </Button>
                                                <Button
                                                    sx={{
                                                        color: "white", marginRight: "10px", '&:hover': {
                                                            backgroundColor: "black", color: "white"
                                                        }
                                                    }}
                                                    className="btn btn-primary"
                                                    disabled={false}
                                                    color="error"
                                                    variant="contained"
                                                    onClick={() => { handleDelete(data.name) }}
                                                >
                                                    Delete
                                                </Button>
                                            </>) : null}

                                    </div>
                                </div>
                            </div>
                        )
                    })

                    }
                </div>
                <div>

                    {
                        showBill ? (<div>
                            <Receipt />
                        </div>) : null
                    }
                </div>



            </div>
        </>




    )
}

export default Product