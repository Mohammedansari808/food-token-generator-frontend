import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fullLink } from '../link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const valiBook = Yup.object({
    fullname: Yup.string().min(3, "Please type username").required("Please fill the fullname"),
    username: Yup.string().min(5, "Please type username").required("Please fill the username"),
    password: Yup.string().min(6, "Please type the password").required("Please fill the password"),
    email: Yup.string().min(7, "please enter valid email").required("Please fill the email")
})

function Signup() {
    const [load, setLoad] = useState(false)
    const [Sload, setSLoad] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
            email: ""
        }, validationSchema: valiBook, onSubmit: async (values) => {
            setLoad(true)
            const signInfo = {
                fullname: values.fullname,
                username: values.username,
                password: values.password,
                email: values.email
            }
            let data = await fetch(`${fullLink}/signup`, {
                method: 'POST',
                body: JSON.stringify(signInfo),
                headers: { "Content-type": "application/json" }

            })
            let result = await data.json()
            if (result.message == "sign verify sent") {
                toast.success('verification sent to your mail please verify', { position: toast.POSITION.TOP_CENTER })
            } else {
                setLoad(false)
                alert("please try another username or email")
            }
        }
    })
    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Signup</h2>
            </div>

            <div className="form-box">


                <form className='edit-form' onSubmit={formik.handleSubmit}>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="fullname" label="Full Name" onChange={formik.handleChange}
                        value={formik.values.fullname} variant="standard" />
                    <div className="formik-errors">
                        {formik.touched.fullname && formik.errors.fullname ? formik.errors.fullname : null}

                    </div>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="username" label="Username" onChange={formik.handleChange}
                        value={formik.values.username} variant="standard" />
                    <div className="formik-errors">
                        {formik.touched.username && formik.errors.username ? formik.errors.username : null}

                    </div>
                    <TextField type="password" onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="password" label="Password" onChange={formik.handleChange}
                        value={formik.values.password} variant="standard" />
                    <div className="formik-errors">
                        {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    </div>

                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="email" label="Email" onChange={formik.handleChange}
                        value={formik.values.email} variant="standard" />
                    <div className="formik-errors">
                        {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button sx={{
                            color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                                backgroundColor: "black", color: "whitesmoke"
                            }
                        }} type="submit" color="primary" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}signup</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup