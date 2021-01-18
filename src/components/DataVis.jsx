import React, { useState, useEffect } from 'react'
import axios from '../services/axios.jsx'
import Plot from 'react-plotly.js';
import "./DataVis.scss"


const baseLayout = {
    width: 600,
}

const DataVis = () => {
    const [charts, setCharts] = useState()
    useEffect(() => {
        axios.get('api/charts').then((res) => {
            setCharts(res.data)
            console.log(res.data)
        })
    }, [])

    if (charts) {

    return (
        <div>
            <Plot 
                data = {[
                    {
                        x: charts.age.labels,
                        y: charts.age.count,
                        type: 'bar',
                    }
                ]}

                layout = {{
                    ...baseLayout, 
                    title: "Cancer Patient Age Distribution",

                }}
            />
        </div>
    )
    } else {
        return <div></div>
    }
}


export default DataVis;