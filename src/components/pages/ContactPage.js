import React, { useEffect, useContext, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import ContactItem from '../ContactItem';
import axios from 'axios';
import ApiRoutes from '../helpers/ApiRoutes';
import UserContext from '../contexts/UserContext';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  contact_list: {
    backgroundColor: red[500]
  },
  contact_details: {
    backgroundColor: blue[500]
  }
}));

const ContactPage = () => {
const userContext = useContext(UserContext);
const [contacts, setContacts] = useState([]);

useEffect(() =>{
  axios.get(ApiRoutes.contact, {
    headers: {
      'x-auth-token': userContext.user.token
    }
  })
  .then(response => {
    setContacts(response.data);
  })
  .catch(error => {
    console.log('Couldnt grab contacts', error);
  });
},[])

  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="stretch">
          <Grid item className={classes.contact_list} md={4} xs={12}>
            <div>
            {
              contacts.map((contact) => 
                <ContactItem name={contact.name} profile_picture={contact.profile_picture} />
              )
            }
            </div>
          </Grid>
          <Grid item className={classes.contact_details} md={8}>
            Grid Item 2
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactPage;