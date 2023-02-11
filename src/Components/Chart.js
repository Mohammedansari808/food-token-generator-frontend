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
    const [show, setShow] = useState(true)
    const [dateData, setDateData] = useState([]);
    const [rateData, setRateData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([])
    const role_id = localStorage.getItem("role_id")


    useEffect(() => {
        fetch(`${fullLink}/kkorders/orders`)
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

    const daily = rateData.map((res) => {
        let date = new Date(res.date).toLocaleDateString()
        return (date.toString())
    });

    const monthly = monthlyData.map((res) => {
        let month = new Date(res.month).toLocaleString("default", { month: "short" })
        return (month)
    });

    const daily_earns = rateData.map((res) => {
        return (res.total)
    })


    const monthly_earns = monthlyData.map((res) => {
        return (res.total)
    })

    const labels = (!show ? daily : monthly)






    const data = {
        labels,
        datasets: [
            {
                label: !show ? 'DAILY EARNINGS' : "MONTHLY EARNINGS",
                data: !show ? daily_earns : monthly_earns,
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

            {role_id === "6298" ? (
                <>
                    <div style={{ textAlign: "center" }}>
                        <Button style={{ margin: "15px" }} sx={{
                            color: "white", backgroundColor: "rgb(240, 125, 161)", '&:hover': {
                                backgroundColor: "black", color: "white"
                            }
                        }} variant='contained' onClick={() => { setShow(!show) }}>{!show ? "CLICK FOR MONTHLY" : "CLICK FOR DAILY"}</Button>

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


