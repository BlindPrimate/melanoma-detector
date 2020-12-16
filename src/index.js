
import React from 'react';
import ReactDOM from 'react-dom';
import DiagnosticForm from './Diagnostic.jsx'


class App extends React.Component {
    render() {
        return (
            <DiagnosticForm />
        )
    }
}




ReactDOM.render(<App/>, document.getElementById('app'))