import React, {useEffect} from 'react';
import { Formik, Form, Field } from "formik";
import "./RegistrationForm.css";

type formContent = {fullname: string, email: string, pass: string};

const RegistrationForm = () => {
    const [values, setValues] = React.useState({fullname: '', email: '', pass: ''});
    const [errors, setErrors] = React.useState({fullname: '', email: '', pass: ''});

    useEffect(() => {console.log(values)}, [values])
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const err = validateForm(values);
        setErrors(err);
        if (!err.fullname && !err.email && !err.pass) {
            console.log("OK, formulario enviado");
        } else {
            console.log("debes solucionar los siguientes errores previo a enviar el formulario:");
            console.log(err);
        }
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))  
    }
    
    const validateForm = (values : formContent) : formContent => {
        let errors = {fullname: '', email: '', pass: ''};
        const alphabeticRegEx = /^[a-zA-Z]+$/;
        const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const passMinLenght = 8;
        if(!values.fullname) {
            errors.fullname = 'Ingresa tu nombre'; 
        } else if (!alphabeticRegEx.test(values.fullname)) {
            errors.fullname = 'Ingresa un nombre válido';
        }
        if(!values.email) {
            errors.email = 'Ingresa tu mail'; 
        } else if (!emailRegEx.test(values.email)) {
            errors.email = 'Ingresa un email válido';
        }
        if(!values.pass) {
            errors.pass = 'Ingresa tu contraseña'; 
        } else if (! (values.pass.length >= passMinLenght)) {
            errors.pass = `Tu contraseña debe contener al menos ${passMinLenght} caracteres`;
        }
        return errors;
    }

    //descomentando las próximas líneas, se realizan las validaciones de todos los input en el handleChange, de cada uno, y el onSubmit no hace nada
    return <Formik initialValues={{fullname: '', email: '', pass: ''}} /*onSubmit={(e) => handleSubmit(e)} validate={values => validateForm(values)}*/>
        {/*({
            values, errors, handleChange, handleSubmit
        }) => (*/
            <div>
                <Form onSubmit={(event) => handleSubmit(event)}>
                    <div className={errors.fullname && 'error'} >
                        <label> nombre</label>
                        <Field type="text" id='fullname' name='fullname' value={values.fullname} onChange={handleChange} />
                        {errors.fullname}
                    </div>
                    
                    <div className={errors.email && 'error'}>
                        <label> email</label>
                        <Field type="email" id='email' name='email' value={values.email} onChange={handleChange}/>
                        {errors.email}
                    </div>
                    
                    <div className={errors.pass && 'error'}>
                        <label> pass</label>
                        <Field type="password" id='pass' name='pass' value={values.pass}  onChange={handleChange}/>
                        {errors.pass}
                    </div>
                    <button type="submit" >Ingresar</button>
                </Form>
            </div>
        /*)*/}
    </Formik>
}

export default RegistrationForm;