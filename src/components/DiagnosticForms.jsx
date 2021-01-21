import React, { useState } from 'react'
import "./Diagnostic.scss"
import DiagnosticFormDetails from './DiagnosticFormDetails.jsx'
import DiagnosticFormImage from './DiagnosticFormImage.jsx'



const DiagnosticForms = () => {
    const [ diagnosis, setDiagnosis ] = useState();
    return (
        <div>
            {diagnosis ?
                <div>
                    <button onClick={() => setDiagnosis(null)}> &lt; Back</button>
                    {Number(diagnosis.result) ? <h1>Malignant</h1>  : <h1>Benign</h1>}
                </div>
            :
            <div id="diagnostic-forms">
                <DiagnosticFormDetails cb={setDiagnosis} />
                <DiagnosticFormImage cb={setDiagnosis} /> 
            </div>
            }
        </div>
    )

}


export default DiagnosticForms;