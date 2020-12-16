import React from 'react';

const generateAges = () => {
    let result = []
    for (let i = 18; i < 100; i++) {
        result.push(<option>{i}</option>)
    }
    return result
}


class DiagnosticForm extends React.Component {
    render() {
        return(
            <form>
                <label htmlFor="">Lesion Image</label>
                <input type="File"/>
                <label htmlFor="">Age</label>
                <select>
                    {generateAges()}
                </select>
                <label htmlFor="">Location</label>
                <select>
                    <option value="head">Head</option>
                    <option value="torso">Torso</option>
                    <option value="leg">Leg</option>
                </select>
                <button>Submit</button>
            </form>

        )
    }
}

export default DiagnosticForm;