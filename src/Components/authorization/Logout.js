import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function Logout() {
    const navigate = useNavigate()
    //for loading
    const [load, setLoad] = useState(false)
    //removing all authentication
    const logout = () => {
        setLoad(true)
        localStorage.removeItem('token')
        localStorage.removeItem("role_id")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        navigate("/")
    }
    return (

        <div >
            <Button style={{ margin: "10px", }}
                sx={{
                    color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} onClick={() => logout()} color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}logout</Button>
        </div>

    )
}

export default Logout