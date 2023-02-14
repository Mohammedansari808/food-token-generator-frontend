import React, { useEffect } from 'react'
import { fullLink } from '../link'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
//verifcation link after signup
function VerifyComplete() {
    //gettting data from the link as params
    const { username, id } = useParams()
    const navigate = useNavigate()
    //after sign success this link will expire

    let vdata = fetch(`${fullLink}/verify_link/${username}/${id}`)
        .then(data => data.json())
        .then(result => {
            if (result.message == "sign success") {

                toast.success("verification success redirecting to login page")
                setTimeout(() => {
                    navigate("/")
                }, 5000);


            } else if (result.message == "error") {
                toast.error("verification link expired")
                navigate("/")
            }
        })




    return (
        <div>

        </div>
    )
}

export default VerifyComplete