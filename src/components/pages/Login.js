import React, { useContext } from "react";
import { Link } from "react-router-dom";
import red from '@material-ui/core/colors/red';
import ImgUser from "../../assets/images/user.svg";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/styles";
import ApiRoutes from '../helpers/ApiRoutes';
import axios from 'axios';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import UserContext from '../contexts/UserContext';
import {Redirect} from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

const useStyles = makeStyles({
  error: {
    color: red[500]
  }
});

const Login = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const parseError = (serrors) => {
    let serverErrors = {}
    serrors.map((value, index) => {
       if (value.param === 'email') {
        serverErrors.email = value.msg
      } else if (value.param === 'password') {
        serverErrors.password = value.msg
      } else {
        serverErrors.msg = value.msg;
      }
      return value;
    })
    return serverErrors;
  };


  if (userContext.user.token) {
    return (<Redirect to='/'/>);
  }

  return (
    <div className="c-login formContent block-center fadeIn first">
      <h2>Contact Manager App</h2>
      <img src={ImgUser} id="icon" alt="User Icon" />

      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={(values, actions) => {
          axios
            .post(ApiRoutes.auth, values)
            .then(response => {
              actions.setSubmitting(false);
              userContext.setUser(response.data);
            })
            .catch(function(error) {
              actions.setSubmitting(false);
              actions.setErrors(parseError(error.response.data.errors));
            });
        }}
        validationSchema={LoginSchema}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <Field
              type="text"
              placeholder="Email"
              className="fadeIn second"
              name="email"
            />
            <ErrorMessage
              name="email"
              className={classes.error}
              component="div"
            />
            <Field
              type="password"
              placeholder="Password"
              className="fadeIn third"
              name="password"
            />
            <ErrorMessage
              name="password"
              className={classes.error}
              component="div"
            />
            {errors.msg && <div className={classes.error}>{errors.msg}</div>}
            <button
              className="fadeIn fourth"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        )}
      />
      <div className="formFooter">
        <Link className="underlineHover" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
