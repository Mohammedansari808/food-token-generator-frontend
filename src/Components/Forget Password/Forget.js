import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { display } from '@mui/system';
import { fullLink } from '../link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Forget() {
    // in here verification will be sent to email
    //for loading
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    //formik form
    const formik = useFormik({
        initialValues: {
            username: "",
            email: ""
        }, onSubmit: async (values) => {
            const userData = {
                username: values.username,
                email: values.email
            }
            setLoad(true)

            let data = await fetch(`${fullLink}/forgetpassword`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json",

                }
            })

            const result = await data.json()
            console.log(result)

            if (result.message == "link sent") {
                toast.success("Verification sent to your mail please check", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                })
            } else {
                setLoad(false)
                toast.error("Please give correct email and username or check your email", {
                    position: toast.POSITION.TOP_LEFT,

                })

                navigate("/forgetpassword")
            }



        }
    })
    return (
        <>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Verification Link</h2>
            </div>
            <div className='form-box' onSubmit={formik.handleSubmit}>
                <form className='edit-form' onSubmit={formik.handleSubmit}>
                    <TextField style={{ marginRight: "15px" }} id="standard-basic"
                        name="username" label="Enter username" onChange={formik.handleChange} value={formik.values.username}
                        variant="standard" /><br />
                    <TextField style={{ marginRight: "15px" }} id="standard-basic"
                        name="email" label="Enter email" onChange={formik.handleChange} value={formik.values.email}
                        variant="standard" />
                    <Button sx={{
                        color: "white", margin: "15px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                            backgroundColor: "black", color: "whitesmoke"
                        }
                    }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        send verification link</Button>
                </form>
            </div>
        </>

    )
}

export default Forget