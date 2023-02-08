import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '../Redux/Reducers/Order.Slice'
import { useContext } from 'react'
import { dataContext } from '../App'
import { ToastContainer } from 'react-toastify'
import Button from '@mui/material/Button';

import "../styles/product.css"
import Receipt from './Receipt'
function Product() {
    const { data, setData } = useContext(dataContext)
    const dispatch = useDispatch()


    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: "2.5fr 0.5fr" }} >

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
                                                color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                                                    backgroundColor: "black", color: "white"
                                                }
                                            }}
                                            className="btn btn-primary"
                                            disabled={false}
                                            variant="contained"
                                            onClick={() => { dispatch(addOrder(data)) }}
                                        >
                                            Add
                                        </Button>


                                    </div>
                                </div>
                            </div>
                        )
                    })

                    }
                </div>
                <div >
                    <Receipt />
                </div>

            </div>
        </>




    )
}

export default Product