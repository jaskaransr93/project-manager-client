import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import ImgUser from "../../assets/images/user.svg";
import red from '@material-ui/core/colors/red';
import ApiRoutes from '../helpers/ApiRoutes';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import {Redirect} from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';



const useStyles = makeStyles({
  error: {
    color: red[500]
  },
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});


const Register = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const parseError = (serrors) => {
    let serverErrors = {}
    serrors.map((value, index) => {
      if (value.param === 'name') {
        serverErrors.name = value.msg
      } else if (value.param === 'email') {
        serverErrors.email = value.msg
      } else if (value.param === 'password') {
        serverErrors.password = value.msg
      } else {
        serverErrors.msg = value.msg;
      }
    })
    return serverErrors;
  };

  if (userContext.user.token) {
    return (<Redirect to='/'/>);
  }

  return (
    <div className="c-login formContent block-center fadeIn first">
      <h2>Register</h2>
      <img src={ImgUser} id="icon" alt="User Icon" />
      
      <Formik
      initialValues={{
        email: '',
        password: '',
        name: ''
      }}
        onSubmit={(values, actions) => {
          axios.post(ApiRoutes.user, values)
            .then((response) => {
              actions.setSubmitting(false);
              userContext.setUser(response.data);
            }).catch(function (error) {
              actions.setSubmitting(false);
              actions.setErrors(parseError(error.response.data.errors));
            });
        }}
        validationSchema={RegisterSchema}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <Field type="text" placeholder="Name" className="fadeIn second" name="name" />
            <ErrorMessage name="name"className={classes.error}  component="div" />  
            <Field type="text" placeholder="Email" className="fadeIn third" name="email" />
            <ErrorMessage name="email" className={classes.error} component="div" />  
            <Field type="password" placeholder="Password" className="fadeIn fourth" name="password" />
            <ErrorMessage name="password" className={classes.error} component="div"/>  
            {errors.msg && <div className={classes.error}>{errors.msg}</div>}
            <button className="fadeIn fifth" type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      />

      <div className="formFooter">
        <Link className="underlineHover" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
