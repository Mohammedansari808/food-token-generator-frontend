
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import "../../styles/form.css"
import { fullLink } from '../link';

const bookVali = Yup.object({
    name: Yup.string().min(1, "please enter a product").required("Please fill Product Field"),
    image: Yup.string().min(10, "Please copy and paste the valid image address").required("Copy and paste the image address"),
    pieces: Yup.number().min(0, "please enter pieces").required("Please fill Pieces Field"),
    rate: Yup.number().min(1, "please enter rate").required("Please fill Rate Field"),
})
function AddProduct() {
    const role_id = localStorage.getItem("role_id")

    const [load, setLoad] = useState(false)

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            pieces: "",
            rate: "",
        }, validationSchema: bookVali, onSubmit: async (values) => {
            setLoad(true)
            const productInfo = {
                name: values.name,
                image: values.image,
                rate: values.rate,
                quantity: 1,
                pieces: values.pieces,
            }
            const kkProducts = await fetch(`${fullLink}/kkproducts/products`, {
                method: "POST",
                body: JSON.stringify(productInfo),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const result = kkProducts.json()
            if (result.message === "success") {
                toast.success("Product Added")
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            } else {
                toast.error("Please try again")
            }

            console.log(productInfo)

        }
    })

    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Add Product</h2>
            </div>

            {role_id == 6298 ? (<div className='form-box'>

                <div>
                    <form className='edit-form' onSubmit={formik.handleSubmit}>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="name" label="name" onChange={formik.handleChange}
                            value={formik.values.name} variant="standard" />
                        <div className='formik-errors'>
                            {formik.touched.name && formik.errors.name ? formik.errors.name : null}

                        </div>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="image" label="image" onChange={formik.handleChange}
                            value={formik.values.image} variant="standard" />
                        <div className='formik-errors'>
                            {formik.touched.image && formik.errors.image ? formik.errors.image : null}
                        </div>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="pieces" label="pieces" onChange={formik.handleChange}
                            value={formik.values.pieces} variant="standard" />
                        <div className='formik-errors'>
                            {formik.touched.pieces && formik.errors.pieces ? formik.errors.pieces : null}
                        </div>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="rate" label="rate" onChange={formik.handleChange}
                            value={formik.values.rate} variant="standard" />
                        <div className='formik-errors'>
                            {formik.touched.rate && formik.errors.rate ? formik.errors.rate : null}
                        </div>
                        <Button
                            sx={{
                                color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                                    backgroundColor: "black", color: "whitesmoke"
                                }
                            }}
                            type="submit"
                            className="btn btn-primary"
                            disabled={false}
                            variant="contained"
                        > {load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}Add Product
                        </Button>
                    </form>
                </div>

            </div>) : <h3 style={{ color: "white", textAlign: "center" }}>Only accessible to Admin</h3>}

        </div>
    )
}

export default AddProduct