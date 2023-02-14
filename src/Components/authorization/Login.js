import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { fullLink } from '../link';
import { toast } from 'react-toastify';

const bookVali = Yup.object({
    username: Yup.string().min(3, "username or password is incorrect").required("Please fill the username"),
    password: Yup.string().min(4, "username or password is incorrect").required("Please fill the password")
})
function Login() {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "admin",
            password: "admin"
        }, validationSchema: bookVali, onSubmit: async (values) => {
            setLoad(true)
            const loginInfo = {
                username: values.username,
                password: values.password
            }
            let data = await fetch(`${fullLink}/login`, {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { "Content-type": "application/json" }
            })
            let result = await data.json()
            if (result.message == "successful login") {
                toast.success("login success")
                localStorage.setItem("token", result.token)
                localStorage.setItem('role_id', result.role_id)
                localStorage.setItem("username", loginInfo.username)
                localStorage.setItem("email", result.email)
                navigate("/products")
            } else {
                setLoad(false)
                toast.error("username or password is incorrect please try again ")


                navigate("/")
            }
        }
    })
    return (

        <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Login</h2>
            </div>

            <div className='form-box'>

                <div>
                    <form className='edit-form' onSubmit={formik.handleSubmit}>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="username" label="Username" onChange={formik.handleChange}
                            value={formik.values.username} variant="standard" />
                        <div className="formik-errors">
                            {formik.touched.username && formik.errors.username ? formik.errors.username : null}

                        </div>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="password" label="Password" onChange={formik.handleChange}
                            value={formik.values.password} variant="standard" />
                        <div className="formik-errors">
                            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                        </div>
                        <Button sx={{
                            color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                                backgroundColor: "black", color: "whitesmoke"
                            }
                        }}
                            type="submit" variant="contained">{load ? <i style={{ marginRight: "5px", marginLeft: "0" }} className="fa fa-circle-o-notch fa-spin"></i> : null}login</Button>

                    </form>
                    <Button style={{ marginTop: "8px" }} sx={{ color: "white" }} onClick={() => navigate("/forgetpassword")}  >Forget Password</Button>
                </div>

            </div>

        </div>
    )
}

export default Login