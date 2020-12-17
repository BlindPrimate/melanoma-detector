import React from 'react';
import Axios from 'axios';

class DiagnosticForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
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
        const postData = {

        }
        const req = Axios.post('/api/submit')
    }

    onChangeHanlder(event, fieldName) {
        this.setState({formData: { ...this.state.formData, [fieldName]: event.target.value} })
        console.log(this.state)
    }

    render() {
        return(
            <div>
            <form>
                <label htmlFor="">Lesion Image</label>
                <input type="File" />
                <label htmlFor="">Age</label>
                <select value={this.state.formData.age} onChange={(e) => this.onChangeHanlder(e, "age")}>
                    {this.generateAges()}
                </select>
                <label htmlFor="">Location</label>
                <select value={this.state.formData.location} onChange={(e) => this.onChangeHanlder(e, "location")}>
                    <option value="head">Head</option>
                    <option value="torso">Torso</option>
                    <option value="leg">Leg</option>
                </select>
                <button>Submit</button>
            </form>
            <p>{this.state.formData.age}</p>
            <p>{this.state.formData.location}</p>
            </div>
        )
    }
}

export default DiagnosticForm;