import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { fullLink } from './link';
import "../styles/allorders.css"
import FilterAllOrders from './FilterAllOrders';
//copied from mui site
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: 0
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function AllOrders() {
    const [data, setData] = useState([])
    //for authenticaton 
    const role_id = localStorage.getItem("role_id")
    const token = localStorage.getItem("token")
    //getting all orders 
    useEffect(() => {
        fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": token
            }
        })
            .then(orders => orders.json())
            .then(result => { (setData(result.getOrders)) })

    }, [])
    return (
        <>
            <FilterAllOrders data={data} setData={setData} />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>All Orders</h2>
            </div>
            <TableContainer sx={{ backgroundColor: "none" }} className='table-box' component={Paper}>
                <Table className="inner-table" sx={{ width: "700px" }} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Token</StyledTableCell>
                            <StyledTableCell align="right">Cust Name</StyledTableCell>
                            <StyledTableCell align="right">Serv Name</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Orders</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((res, index) => {
                                return (
                                    <>
                                        {role_id == 6298 ? (

                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">
                                                    {res.token_no}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{res.dine_name}</StyledTableCell>
                                                <StyledTableCell align="right">{res.server_name}</StyledTableCell>
                                                <StyledTableCell align="right">{data.orders}</StyledTableCell>
                                                <StyledTableCell align="right">{res.only_date}</StyledTableCell>
                                                <StyledTableCell align="right">{res.gst_total}</StyledTableCell>
                                            </StyledTableRow>


                                        ) : <h3 style={{ color: "white", textAlign: "center" }}>Only accessible to Admin</h3>}
                                    </>


                                )

                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>



        </>
    )
}

export default AllOrders