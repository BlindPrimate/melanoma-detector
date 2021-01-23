import React, { useState, useEffect } from 'react'
import axios from '../services/axios.jsx'
import Plot from 'react-plotly.js';
import "./DataVis.scss"


const baseLayout = {
    autosize: true,
    automargin: true,
    title: {
        font: { size: 14}
    }
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
            <div className="chart-block">
                <Plot 
                    className="chart"
                    data = {[
                        {
                            x: charts.age.labels,
                            y: charts.age.count,
                            type: 'bar',
                        }
                    ]}

                    layout = {{
                        ...baseLayout, 
                        title: {
                            ...baseLayout.title,
                            text: "Cancer Patient Age Distribution",
                        },
                        xaxis: { title: "Age of Patient"},
                        yaxis: { title: "Number of Melanoma Cases"},
                    }}

                    config = {{...baseConfig}}
                />
                <Plot 
                    className="chart"
                    data = {[
                        {
                            x: charts.location.labels,
                            y: charts.location.count,
                            type: 'bar',
                        }
                    ]}

                    layout = {{
                        ...baseLayout, 
                        title: {
                            ...baseLayout.title,
                            text: "Cancer Location Distribution",
                        },
                        xaxis: { title: "Location of Lesion"},
                        yaxis: { title: "Number of Melanoma Cases"},
                    }}
                    config = {{...baseConfig}}
                />
            </div>
            <p>Some simple analysis of the data reveals that the risk of melanoma rises with age.  Because the data is not normalized for population numbers, we cannot say for sure if cancer risk does in fact decline with age after 65.  As for lesion location, it is clear that the most likely sites for cancer development is the head, torso, arm, and leg.  Therefore our model will disregard the sites that are at lower risk, such as feet and oral/genital areas. </p>
            <p>Data was prepared by balancing the benign/malignant patient entries to prevent overfitting.  Extraneous columns were removed from the data set leaving only the following: Lesion Location, Patient Age, and Patient Sex.  Dataset was encoded with dummy data to suit ML training process.  </p>
            <div className="chart-block">
                <Plot 
                    className="chart"
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
                        title: {
                            ...baseLayout.title,
                            text: "Patient Details Model Accuracies",
                        },
                        xaxis: { title: "Accuracy(%)", range: [50, 80]},
                        yaxis: { title: "Model Type", automargin: true},

                    }}
                    config = {{...baseConfig}}
                />
                <Plot 
                    className="chart"
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
                        title: {
                            ...baseLayout.title,
                            text: "Patient Image Model Accuracies",
                        },
                        xaxis: { title: "Accuracy(%)", range: [50, 80]},
                        yaxis: { title: "Model Type", automargin: true},
                    }}
                    config = {{...baseConfig}}
                />
            </div>
            <p>Models were tested using a kfold method on each to render accuracy results.  The data was split into two datasets - one for images, and one for patient details.  These data sets were used to create the two independent models based on each type.  For the purposes of this proof-of-concept, the models will remain separate, but will be compiled together with a final ML estimator when the final pipeline is completed.  </p>
            <p>As you can see, both data sets had similar performance with the available ML model types, at around 65% accuracy.  The final pipeline will increase accuracy  However, our proof-of-concept model shown here gives what we consider to be a reasonably-achievable accuracy for our final pipeline.</p>
            <p>Given our initial results, it is possible to achieve a high enough accuracy in our model to justify the development expense of a more refined and accurate data pipeline.  </p>
            <p>For the purposes of the form below, the models chosen for the patient details and image forms were both Random Forest. </p>
        </div>
    )
    } else {
        return <div></div>
    }
}


export default DataVis;