import React from 'react';
import DiagnosticForm from './components/Diagnostic.jsx'
import DataVis from './components/DataVis.jsx'


class App extends React.Component {
    render() {
        return (
            <div className="main-container">
                <h1 id="title">Melanoma Machine Learning Models</h1>
                <p>Due to Favra Biomedical’s need for a more efficient means of identifying likely melanoma tumors based on simple data acquired from our partner Tumors R’ Us, a machine learning model will be chosen and implemented based on testing performance on provided training and testing data.  The initial analysis of the data and model testing is below.  The final model results can be seen by using the provided form below.  </p>
                <DataVis />
                <DiagnosticForm />
                <h3>References</h3>
                <ul id="references">
                    <li>
                        <a href="#">Jupyter Notebook of ML work</a>
                    </li>
                    <li>
                        <a href="https://www.kaggle.com/c/siim-isic-melanoma-classification">SIIM-ISIIC Sample Data</a>
                    </li>
                </ul>
            </div>
        )
    }
}


export default App;
