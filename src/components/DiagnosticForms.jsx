import React, { useState } from 'react'
import "./Diagnostic.scss"
import DiagnosticFormDetails from './DiagnosticFormDetails.jsx'
import DiagnosticFormImage from './DiagnosticFormImage.jsx'


const benignInfo = () => {
    return (
        <div>
            <h3>Likely Benign</h3>
            <p>The model predicts the lesion is likely to be benign. </p>
        </div>
    )
} 

const maligInfo = () => {
    return (
        <div>
            <h3>Likely Malignant</h3>
            <p>The model predicts the lesion is likely to be malignant. </p>
        </div>
    )
} 

const DiagnosticForms = () => {
    const [ diagnosis, setDiagnosis ] = useState();
    return (
        <div>
            {diagnosis ?
            <div className="diagnostic-forms">
                <button onClick={() => setDiagnosis(null)}> &lt; Back</button>
                {Number(diagnosis) ?  maligInfo()  : benignInfo() }
            </div>
            :
            <div className="diagnostic-forms">
                <DiagnosticFormDetails cb={setDiagnosis} />
                <DiagnosticFormImage cb={setDiagnosis} /> 
            </div>
            }
        </div>
    )

}


export default DiagnosticForms;