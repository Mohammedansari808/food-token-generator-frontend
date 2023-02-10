import React from 'react';
import "../styles/chart.css"
import { dataContext } from '../App';
import { useContext } from 'react';
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

const date = new Date()

console.log(date.toLocaleString())

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

);




export function Chart() {
    const role_id = localStorage.getItem("role_id")
    const { statusOrderData, setstatusOrderData } = useContext(dataContext)
    const date = new Date(statusOrderData[1].date)
    console.log(date.toLocaleDateString("en-US", { month: "long" }))
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    };

    const labels = statusOrderData.map((res) => {
        let date = new Date(res.date)
        return (date.toLocaleDateString())
    });
    console.log(labels)


    const data = {
        labels,
        datasets: [
            {
                label: 'EARNINGS MONTHLY',
                data: statusOrderData.map((res) => res.gst_total),
                borderColor: "rgb(240, 125, 161)",
                backgroundColor: 'rgb(1, 16, 34)',


            }

        ],
    };
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>

            {role_id === 6298 ? (<div className='whole-chart'>
                <Line className='chart' options={options} data={data} />;
            </div>) : <h3 style={{ color: "white", textAlign: "center" }}>Only accessible to Admin</h3>}

        </div>
    )


}


