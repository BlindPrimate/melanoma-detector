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
                        title: "Cancer Patient Age Distribution",
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
                        title: "Cancer Location Distribution",
                        xaxis: { title: "Location of Lesion"},
                        yaxis: { title: "Number of Melanoma Cases"},
                    }}
                    config = {{...baseConfig}}
                />
            </div>
            <p>Some simple analysis of the data reveals that the risk of melanoma rises with age.  Because the data is not normalized for population numbers, we cannot say for sure if cancer risk does in fact decline with age after 65.  As for lesion location, it is clear that the most likely sites for cancer development is the head, torso, arm, and leg.  Therefore our model will disregard the sites that are at lower risk, such as feet and oral/genital areas. </p>
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
                        title: "Patient Details Model Accuracy",
                        xaxis: { title: "Accuracy", range: [0.9, 1]},
                        yaxis: { title: "Model Type"},

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
                        title: "Patient Image Model Accuracy",
                        xaxis: { title: "Accuracy", range: [0, .8]},
                        yaxis: { title: "Model Type"},
                    }}
                    config = {{...baseConfig}}
                />
            </div>
            <p>Models were tested using a kfold method on each to render accuracy results.  The data was split into two datasets - one for images, and one for patient details.  These data sets were used to create the two independent models based on each type.  For the purposes of this proof-of-concept, the models will remain separate, but will be compiled together with a final ML estimator when the final pipeline is completed.  </p>
            <p>As you can see, for the patient details model, nearly all ML model types performed similarly at around 98% accuracy.  It is possible we are overfitting the data given how it was processed for our purposes.  The final pipeline will eliminate this bias.  However, our proof-of-concept model shown here gives what we consider to be a reasonably-achievable accuracy for our final pipeline. </p>
            <p>The lesion image model, we achieved a lower accuracy of 64.5% using a Support Vector model type.  This model was generated using fairly primitive pre-processing of the data.  We believe this accuracy can be improved with additional time and expertise from our data team.  We hope to achieve a minimum of 70% accuracy with the model. </p>
            <p>Given our initial results, it is possible to achieve a high enough accuracy in our model to justify the development expense of a more refined and accurate data pipeline.  </p>

        </div>
    )
    } else {
        return <div></div>
    }
}


export default DataVis;