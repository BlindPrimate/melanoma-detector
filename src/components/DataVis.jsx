import React, { useState, useEffect } from 'react'
import axios from '../services/axios.jsx'
import Plot from 'react-plotly.js';
import "./DataVis.scss"


const baseLayout = {
    autosize: true
}

const baseConfig = {
    responsive: true
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
        <div id="charts">
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
                    xaxis: { title: "Age of Patient"},
                    yaxis: { title: "Number of Melanoma Cases"},
                }}

                config = {{...baseConfig}}
            />
            <Plot 
                data = {[
                    {
                        x: charts.location.labels,
                        y: charts.location.count,
                        type: 'bar',
                    }
                ]}

                layout = {{
                    ...baseLayout, 
                    title: "Cancer Location Distribution",
                    xaxis: { title: "Location of Lesion"},
                    yaxis: { title: "Number of Melanoma Cases"},
                }}
                config = {{...baseConfig}}
            />
            <Plot 
                data = {[
                    {
                        x: charts.details.count,
                        y: charts.details.labels,
                        type: 'bar',
                        orientation: 'h'
                    }
                ]}

                layout = {{
                    ...baseLayout, 
                    title: "Patient Details Model Accuracy",
                    xaxis: { title: "Accuracy", range: [0.9, 1]},
                    yaxis: { title: "Model Type"},

                }}
                config = {{...baseConfig}}
            />
            <Plot 
                data = {[
                    {
                        x: charts.images.count,
                        y: charts.images.labels,
                        type: 'bar',
                        orientation: 'h'
                    }
                ]}

                layout = {{
                    ...baseLayout, 
                    title: "Patient Image Model Accuracy",
                    xaxis: { title: "Accuracy", range: [0, 1]},
                    yaxis: { title: "Model Type"},
                }}
                config = {{...baseConfig}}
            />
        </div>
    )
    } else {
        return <div></div>
    }
}


export default DataVis;