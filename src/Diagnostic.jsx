import React from 'react'
import axios from './axios.js'
import { useFormik } from 'Formik'
import * as Yup from 'yup'
import Base64 from 'base-64'



const validationSchema = Yup.object().shape({
    age: Yup.number().required("Required").positive().integer(),
    sex: Yup.string().required(),
    location: Yup.string().required(),
    image: Yup.mixed().required("Required")
})

const DiagnosticForm = () => {
    const formik = useFormik({
        initialValues: {sex: "male" , age: "", location: "head"},
        validationSchema,
        onSubmit: (values) => {
            // values.image = Base64.encode(values.image)
            let formdata = new FormData()
            formdata.append("patientData", JSON.stringify(values))
            formdata.append("image", formik.values.image)
            axios.post('/api/submit', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response) => console.log(response))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
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
    )

}


export default DiagnosticForm;