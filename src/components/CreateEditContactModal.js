import React, {useEffect, useContext, useState, useRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Favorite from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import ContactSchema from './schemas/Contact';
import ImgUser from '../assets/images/user.svg';
import Thumb from './Thumb';
import red from '@material-ui/core/colors/red';
import axios from 'axios';
import ApiRoutes from './helpers/ApiRoutes';
import UserContext from './contexts/UserContext';

const useStyles = makeStyles(theme => ({

    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%'
    },
    dialog: {
        minWidth: '480px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      userImg: {
          display: 'block',
          margin: '0 auto',
          cursor: 'pointer'
      },
      userImgFld: {
          display: 'none'
      },
      activeFavourite: {
          color: red[500]
      }
  }))

const CreateEditContactModal = (props) => {
    const [intialValues, setInitialValues] = useState({
        avatar: '',
        name: '',
        phoneNumbers: [],
        emails: [],
        favourite: false
    });
    const userContext = useContext(UserContext);
    const inputImage = useRef(null);
    const handleClose = () => {
        props.handleClose();
    }
    const handleSave = (values) => {}
    const onImgClick = () => {
        inputImage.current.querySelector('input').click();
    }
    const classes = useStyles();

    return (
        <Dialog
            className={classes.dialog}
            open={props.open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth={true}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={props.isEditing ? props.contact : intialValues }
                    validationSchema={ContactSchema}
                    onSubmit={(values, actions) => { 
                        if (!props.isEditing) {
                            axios.post(ApiRoutes.contact, {
                                name: values.name,
                                phoneNumbers: values.phoneNumbers,
                                emails: values.emails,
                                favourite: values.favourite
                            }, {
                                headers: {
                                'x-auth-token': userContext.user.token,
                                }
                            })
                            .then((response) => {
                                props.callReload();
                                handleClose();
                            })
                            .catch((error) => {
                                actions.setFieldError('general', error.response);
                            })
                        } else {
                            axios.post(ApiRoutes.updateContact(props.contact._id), {
                                name: values.name,
                                phoneNumbers: values.phoneNumbers,
                                emails: values.emails,
                                favourite: values.favourite
                            }, {
                                headers: {
                                'x-auth-token': userContext.user.token,
                                }
                            })
                            .then((response) => {
                                props.callReload();
                                handleClose();
                            })
                            .catch((error) => {
                                actions.setFieldError('general', error.response);
                            })
                        }
                    }}>
                    {({errors, touched, values, handleChange, setFieldValue}) => (
                        <Form className = {classes.form} encType="multipart/form-data">
                            <div>
                            {values.avatar && <Thumb file={values.avatar} onClick={() => onImgClick()} /> }
                            {!values.avatar && <img onClick={() => onImgClick()} className={classes.userImg} src={ImgUser} id="icon" alt="User Icon" />}
                            <TextField
                                ref={inputImage}
                                label="Photo"
                                name="avatar"
                                type="file"
                                className={classes.textField + " " + classes.userImgFld}
     
                                onChange={(event) => {
                                    setFieldValue("avatar", event.currentTarget.files[0]);
                                }}
                                margin="normal"
                            />
                            </div>
                            <div>
                            <TextField
                                label="Name"
                                name="name"
                                className={classes.textField}
                                value={values.name}
                                onChange={handleChange}
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name : ''}
                            />
                            </div>
                            <FieldArray name="phoneNumbers" 
                                    render={arrayHelpers => (
                                        <div>
                                            {values.phoneNumbers && values.phoneNumbers.length > 0 && 
                                                values.phoneNumbers.map((phoneNumber, index) => (
                                                    <div key={index}>
                                                        <TextField
                                                            label={`Phone Number ${(index+1)}`}
                                                            name={`phoneNumbers.${index}.number`}
                                                            className={classes.textField}
                                                            value={phoneNumber.number}
                                                            onChange={handleChange}
                                                            margin="normal"
                                                            error={errors.phoneNumbers && errors.phoneNumbers[index] && errors.phoneNumbers[index].number}
                                                            helperText={errors.phoneNumbers && errors.phoneNumbers[index] && errors.phoneNumbers[index].number ? errors.phoneNumbers[index].number : ''}
                                                        />

                                                        <IconButton color="inherit" className={classes.addIcon} onClick={() => arrayHelpers.remove(index)}>
                                                         <Delete />
                                                        </IconButton>
                                                        <IconButton color="inherit" className={classes.addIcon + " " + (phoneNumber.primary ? classes.activeFavourite : "") } onClick={() => {
                                                            setFieldValue(`phoneNumbers.${index}.primary`, !phoneNumber.primary);
                                                            }} >
                                                            <Favorite />
                                                        </IconButton>
                                                    </div>
                                                ))
 
                                            }
                                            <Button type="button" onClick={() => arrayHelpers.push({ number: '', primary: false })}>
                                                        {/* show this when user has removed all friends from the list */}
                                                        Add Phone number
                                            </Button>
                                        </div>
                                    )
                                }
                            />
                            <FieldArray name="emails" 
                                    render={arrayHelpers => (
                                        <div>
                                            {values.emails && values.emails.length > 0 && 
                                                values.emails.map((emails, index) => (
                                                    <div key={index}>
                                                        <TextField
                                                            label={`Email ${(index+1)}`}
                                                            name={`emails.${index}.email`}
                                                            className={classes.textField}
                                                            value={emails.email}
                                                            onChange={handleChange}
                                                            margin="normal"
                                                            error={errors.emails && errors.emails[index] && errors.emails[index].email}
                                                            helperText={errors.emails && errors.emails[index] && errors.emails[index].email ? errors.emails[index].email : ''}
                                                        />
                                                        <IconButton color="inherit" className={classes.addIcon} onClick={() => arrayHelpers.remove(index)}>
                                                            <Delete />
                                                        </IconButton>
                                                        <IconButton color="inherit" className={classes.addIcon + " " + (emails.primary ? classes.activeFavourite : "") } onClick={() => {
                                                            setFieldValue(`emails.${index}.primary`, !emails.primary);
                                                            }} >
                                                            <Favorite />
                                                        </IconButton>
                                                    </div>
                                                ))

                                            }
                                            <Button type="button" onClick={() => arrayHelpers.push({ email: '', primary: false })}>
                                                        {/* show this when user has removed all friends from the list */}
                                                        Add Email
                                            </Button>
                                        </div>
                                    )
                                }
                            />
                            <Button type="submit" color="primary">Submit</Button>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={props.handleClose} color="primary">
                    Close
                </Button> */}
                {/* <Button onClick={props.handleSave} color="primary">
                    Save
                </Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default CreateEditContactModal;