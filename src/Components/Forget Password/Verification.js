import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { fullLink } from '../link';
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const bookV = Yup.object({
    otp: Yup.string().min(4, "Please enter a valid OTP").required("Please enter the OTP")
})
function Verification() {
    //this is for forget password verification link
    //for loading
    const [load, setLoad] = useState(false)
    //getting data using params
    const { username, id } = useParams()
    const navigate = useNavigate()
    //formik forms
    const formik = useFormik({
        initialValues: {
            otp: "",
        }, validationSchema: bookV, onSubmit: async (values) => {
            setLoad(true)
            //this otp will be deleted after uploading to database within 2 minutes
            const otp = { otp: values.otp }

            let data = await fetch(`${fullLink}/verification-link/${username}/${id}`, {
                method: 'POST',
                body: JSON.stringify(otp),
                headers: {
                    "Content-type": "application/json",

                }
            })

            const result = await data.json()
            if (result.message == "otp success") {
                //if otp confirmed it will redirect to password change
                toast.success("OTP Confirmed", { position: toast.POSITION.TOP_CENTER })
                localStorage.setItem("token", result.token)
                navigate(`/password-change/${result.username}/`)
            } else {
                setLoad(false)
                navigate("/login")
            }



        }
    })
    return (
        <>

            <div style={{ textAlign: "center" }}>
                <h1 style={{ textAlign: "center", marginTop: "15px" }}>Verification Link</h1>
            </div>
            <div className='form-box'>
                <form className='edit-form' onSubmit={formik.handleSubmit}>

                    <TextField onBlur={formik.handleBlur} style={{ marginRight: "15px" }} id="standard-basic" name="otp"
                        label="Enter otp" onChange={formik.handleChange} value={formik.values.otp} variant="standard" />
                    <div className='formik-errors'>
                        {formik.touched.otp && formik.errors.otp ? formik.errors.otp : null}

                    </div>
                    <Button sx={{
                        color: "white", margin: "15px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                            backgroundColor: "black", color: "whitesmoke"
                        }
                    }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}Verify</Button>
                </form>
            </div>
        </>

    )
}

export default Verification