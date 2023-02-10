import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function Logout() {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const logout = () => {
        setLoad(true)
        localStorage.removeItem('token')
        localStorage.removeItem("role_id")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        navigate("/")
    }
    return (

        <div style={{ backgroundColor: "lightgrey", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ marginLeft: "10px", }} >Bookmyshow</h4>
            <Button style={{ margin: "10px", }} onClick={() => logout()} color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}logout</Button>
        </div>

    )
}

export default Logout