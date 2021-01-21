import React, { useState } from 'react'
import axios from '../services/axios.jsx'
import { useFormik } from 'Formik'
import * as Yup from 'yup'
import "./Diagnostic.scss"



const validationSchema = Yup.object().shape({
    image: Yup.mixed().required("Required")
})

const DiagnosticFormImage = (props) => {
    const [ diagnosis, setDiagnosis ] = useState();
    const formik = useFormik({
        initialValues: {sex: "male" , age: "", location: "head"},
        validationSchema,
        onSubmit: (values) => {
            let formdata = new FormData()
            formdata.append("image", formik.values.image)
            axios.post('/api/image/submit', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    props.cb(response.data)
                })
        }
    })
    return (
        <form className="diagnostic-form" onSubmit={formik.handleSubmit}>
            <label htmlFor="">Lesion Image</label>
            <input name="image" type="File" onChange={e => {
                formik.setFieldValue("image", e.currentTarget.files[0]);
            }} />

            <button type="submit">Submit</button>
        </form>
    )

}


export default DiagnosticFormImage;