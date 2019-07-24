import React, {useEffect, useContext, useState , useRef } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ImgUser from '../../assets/images/user.svg';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import Phone from '@material-ui/icons/Phone';
import Mail from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ApiRoutes from '../helpers/ApiRoutes';
import UserContext from '../contexts/UserContext';



const useStyles = makeStyles(theme => ({
    userImg: {
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer',
        height: '150px'
    },
    field: {
        marginBottom: "20px",
    },
    divider: {
        listStyleType: 'none'
    },
    title: {
        fontWeight: 100,
        textAlign: 'center'
    },
    activeFavourite: {
        color: red[500]
    },
    listItem: {
        textAlign: 'center',
        "& a": {
            color: blue[900],
            textDecoration: 'none'
        }
    }
}));

const ContactDetails = (props) => {
    const classes = useStyles();
    const userContext = useContext(UserContext);

    const noteTextElement = useRef(null);
    const [contact,
        setContact] = useState({});
    useEffect(() => {
        setContact(props.contact);
    }, [props.contact])

    const addNote = () => {
        let note = noteTextElement.current.querySelector('input').value;
        if (note) {
            const data = {
                contactId: contact._id,
                note: note
            };
            axios.post(ApiRoutes.notes, data, {
                headers: {
                  'x-auth-token': userContext.user.token
                }
              })
              .then((response) => {
                props.callReload();
              })
              .catch((error) => {
                console.log(error);
              })
        }
    }

    return (
        <React.Fragment>
            <Grid container direction="column" justify="center" alignItems="center">
                {!contact || Object
                    .keys(contact)
                    .length === 0
                    ? <h1 className={classes.title}>Please select a contact for more details</h1>
                    : <React.Fragment>

                        <div className={classes.field}>
                            {contact.profile_picture && <img className={classes.userImg} src={contact.profile_picture} alt="User Icon"/>}
                            {!contact.profile_picture && <img className={classes.userImg} src={ImgUser} id="icon" alt="User Icon"/>}
                        </div>
                        <div className={classes.field}>
                            <Typography className={classes.title} variant="h4" component="h2">
                            {contact.name}
                            </Typography>
                        </div>
                        <Divider variant="inset" component="li" className={classes.divider} />
                        <div className={classes.field}>
                            <Typography className={classes.title} variant="h6" component="h2">
                            Phone Numbers
                            </Typography>
                            {
                                contact.phoneNumbers.map((phone) => 
                                    <React.Fragment>
                                    <Typography className={classes.listItem}>
                                        <IconButton color="inherit" className={(phone.primary ? classes.activeFavourite : "") } >
                                            <Phone />
                                        </IconButton>
                                        <a href={`tel:${phone.number}`} >
                                        {phone.number}
                                        </a>
                                        <IconButton color="inherit" className={(phone.primary ? classes.activeFavourite : "") } >
                                                            <Favorite />
                                        </IconButton>
                                    </Typography>
                                    </React.Fragment>
                                )

                            }
                        </div>
                        <div className={classes.field}>
                            <Typography className={classes.title} variant="h6" component="h2">
                            Emails
                            </Typography>
                            {
                                contact.emails.map((email) => 
                                    <React.Fragment>
                                    <Typography className={classes.listItem}>
                                        <IconButton color="inherit" className={(email.primary ? classes.activeFavourite : "") } >
                                            <Mail />
                                        </IconButton>
                                        <a href={`tel:${email.email}`} >
                                         {email.email}
                                        </a>
                                        <IconButton color="inherit" className={(email.primary ? classes.activeFavourite : "") } >
                                                            <Favorite />
                                        </IconButton>

                                    </Typography>
                                    </React.Fragment>
                                )

                            }
                        </div>
                        <div className={classes.field}>
                            <Typography className={classes.title} variant="h6" component="h2">
                            Notes
                            </Typography>
                            <List style={{ listStyleType: 'disc'}}>

                            {contact.notes &&
                                contact.notes.map((note) => 
                                    <ListItem >
                                    <ListItemText primary={note} />
                                    </ListItem>
                                )
                            }
                            </List>
                            <div>
                            <TextField
                                    label="Enter the note"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    ref={noteTextElement}
                                />
                                <Button color="primary" onClick={()=>addNote()}>Add Note</Button>
                            </div>
                        </div>
                    </React.Fragment>
}
            </Grid>
        </React.Fragment>

    )
}

export default ContactDetails;