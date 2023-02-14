import React, { useState } from 'react';
import "../styles/chart.css"
import { Filler } from 'chart.js';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fullLink } from './link';


//These are datas of DAILY AND MONTHLY EARNINGS fetched from DATABASE
//using AGGREGATE method IN MONGODB

const date = new Date()
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,

);




export function Chart() {
    //to toggle monthly and daily earnings button
    const [show, setShow] = useState(true)
    //to store daily earnings in state
    const [rateData, setRateData] = useState([]);
    //to store monthly earnings in state
    const [monthlyData, setMonthlyData] = useState([])
    //for authentication
    const role_id = localStorage.getItem("role_id")
    const token = localStorage.getItem('token')
    //fetching orders and storing in two states
    useEffect(() => {
        fetch(`${fullLink}/kkorders/orders`, {
            headers: {
                "x-auth-token": token
            }
        })
            .then(orders => orders.json())
            .then(result => { setRateData(result.getDailyChart); setMonthlyData(result.getMonthlyChart) })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    };

    //fetched data of dates was not in order so SORTED
    const dailyEarnDateSort = rateData.sort((a, b) => {
        return (
            new Date(a.date) - new Date(b.date)
        )
    });
    const daily = dailyEarnDateSort.map((res) => {
        let date = new Date(res.date).toLocaleDateString()
        return (date.toString())
    });

    //fetched data of months was not in order so SORTED
    const monthlyEarnSort = monthlyData.sort((a, b) => {
        return (
            new Date(a.date) - new Date(b.date)
        )
    });
    const monthly = monthlyEarnSort.map((res) => {
        let month = new Date(res.month).toLocaleString("default", { month: "short" })
        return (month)
    });


    //daily total earns which will be in y axis
    const daily_earns = rateData.map((res) => {
        return (res.total)
    })

    //monthly total earns which will be in y axis
    const monthly_earns = monthlyData.map((res) => {
        return (res.total)
    })

    const labels = (show ? daily : monthly)

    const data = {
        labels,
        datasets: [
            {
                label: show ? 'DAILY EARNINGS' : "MONTHLY EARNINGS",
                data: show ? daily_earns : monthly_earns,
                borderColor: "rgb(240, 125, 161)",
                backgroundColor: 'rgb(240, 125, 161,0.5)',
                tension: 0.15,
                borderWidth: 1,
                fill: true
            }

        ],
    };

    return (
        <div >

            {role_id == 6298 ? (
                <>
                    <div style={{ textAlign: "center" }}>
                        <Button style={{ margin: "15px" }} sx={{
                            color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                                backgroundColor: "black", color: "white"
                            }
                        }} variant='contained' onClick={() => { setShow(!show) }}>{show ? "CLICK FOR MONTHLY" : "CLICK FOR DAILY"}</Button>

                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className='whole-chart'>
                            <Line className='chart' options={options} data={data} />
                        </div>
                    </div>
                </>) : <h3 style={{ color: "white", textAlign: "center" }}>Only accessible to Admin</h3>}

        </div>
    )


}


