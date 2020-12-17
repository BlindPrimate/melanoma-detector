import React from 'react';
import axios from './axios.js'


class DiagnosticForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                sex: "male",
                age: 18,
                location: "head"
            }
        }
    }

    generateAges() {
        let result = []
        for (let i = 18; i < 100; i++) {
            const option = <option>{i}</option>
            result.push(option)
        }
        return result
    }

    onSubmitHandler() {
        const req = axios.post('/api/submit', {...this.state.formData})
        req.then(console.log("boom"))
    }

    onChangeHanlder(event, fieldName) {
        this.setState({formData: { ...this.state.formData, [fieldName]: event.target.value} })
    }

    render() {
        return(
            <div>
            <form onSubmit={this.onSubmitHandler()}>
                <label htmlFor="">Lesion Image</label>
                <input type="File" />
                <label htmlFor="">Age</label>
                <select value={this.state.formData.age} onChange={(e) => this.onChangeHanlder(e, "age")}>
                    {this.generateAges()}
                </select>
                <label htmlFor="">Sex</label>
                <select value={this.state.formData.sex} onChange={(e) => this.onChangeHanlder(e, "sex")}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label htmlFor="">Location</label>
                <select value={this.state.formData.location} onChange={(e) => this.onChangeHanlder(e, "location")}>
                    <option value="head">Head</option>
                    <option value="torso">Torso</option>
                    <option value="leg">Leg</option>
                </select>
                <button>Submit</button>
            </form>
            <p>{this.state.formData.sex}</p>
            <p>{this.state.formData.age}</p>
            <p>{this.state.formData.location}</p>
            </div>
        )
    }
}

export default DiagnosticForm;