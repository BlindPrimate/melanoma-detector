import React, { useState } from 'react'
import axios from '../services/axios.jsx'
import { useFormik } from 'Formik'
import * as Yup from 'yup'
import "./Diagnostic.scss"



const validationSchema = Yup.object().shape({
    age: Yup.number().required("Required").positive().integer(),
    sex: Yup.string().required(),
    location: Yup.string().required(),
})

const DiagnosticFormDetails = (props) => {
    const formik = useFormik({
        initialValues: {sex: 0, age: "", location: 0, diagnosis: 0},
        validationSchema,
        onSubmit: (values) => {
            let formdata = new FormData()
            formdata.append("patientData", JSON.stringify(values))
            axios.post('/api/details/submit', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    props.cb(response.data.result)
                })
        }
    })
    return (
        <div className="diagnostic-form">
            <h3>Patient Details Model</h3>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="age">Age</label>
                <input name="age" value={formik.values.age} onChange={formik.handleChange} />
                <div className="error">{formik.errors.age}</div> 
                <label htmlFor="sex">Sex</label>
                <select name="sex" value={formik.values.sex} onChange={formik.handleChange}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>
                <label htmlFor="location">Location</label>
                <select name="location" value={formik.values.location} onChange={formik.handleChange}>
                    <option value="0">Head</option>
                    <option value="1">Arm</option>
                    <option value="2">Torso</option>
                    <option value="3">Leg</option>
                </select>
                {/* <label htmlFor="diagnosis">Diagnosis</label>
                <select name="diagnosis" value={formik.values.diagnosis} onChange={formik.handleChange}>
                    <option value="0">Unknown</option>
                    <option value="1">Nevus</option>
                    <option value="2">Melanoma</option>
                </select> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}


export default DiagnosticFormDetails;