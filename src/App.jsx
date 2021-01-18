import React from 'react';
import DiagnosticForm from './components/Diagnostic.jsx'
import DataVis from './components/DataVis.jsx'


class App extends React.Component {
    render() {
        return (
            <div className="main-container">
                <DataVis />
                <DiagnosticForm />
            </div>
        )
    }
}


export default App;
