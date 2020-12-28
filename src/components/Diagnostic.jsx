import React, { useState } from 'react'
import axios from '../services/axios.jsx'
import { useFormik } from 'Formik'
import * as Yup from 'yup'
import "./Diagnostic.scss"



const validationSchema = Yup.object().shape({
    age: Yup.number().required("Required").positive().integer(),
    sex: Yup.string().required(),
    location: Yup.string().required(),
    image: Yup.mixed().required("Required")
})

const DiagnosticForm = () => {
    const [ diagnosis, setDiagnosis ] = useState();
    const formik = useFormik({
        initialValues: {sex: "male" , age: "", location: "head"},
        validationSchema,
        onSubmit: (values) => {
            let formdata = new FormData()
            formdata.append("patientData", JSON.stringify(values))
            formdata.append("image", formik.values.image)
            axios.post('/api/submit', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    setDiagnosis(response.data)
                })
        }
    })
    return (
        <div>
            {diagnosis ?
                Number(diagnosis.result) ? <h1>Malignant</h1>  : <h1>Benign</h1>
            :
            <form id="diagnostic-form" onSubmit={formik.handleSubmit}>
                <label htmlFor="">Lesion Image</label>
                <input name="image" type="File" onChange={e => {
                    formik.setFieldValue("image", e.currentTarget.files[0]);
                }} />
                <div className="error">{formik.errors.age}</div> 
                <label htmlFor="age">Age</label>
                <input name="age" value={formik.values.age} onChange={formik.handleChange} />
                <div className="error">{formik.errors.age}</div> 
                <label htmlFor="sex">Sex</label>
                <select name="sex" value={formik.values.sex} onChange={formik.handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label htmlFor="location">Location</label>
                <select name="location" value={formik.values.location} onChange={formik.handleChange}>
                    <option value="head">Head</option>
                    <option value="torso">Torso</option>
                    <option value="leg">Leg</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            }
        </div>
    )

}


export default DiagnosticForm;