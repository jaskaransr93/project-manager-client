import React, {useEffect, useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ContactItem from '../ContactItem';
import CreateEditContactModal from '../CreateEditContactModal';
import axios from 'axios';
import ApiRoutes from '../helpers/ApiRoutes';
import UserContext from '../contexts/UserContext';
import SearchContext from '../contexts/SearchContext';

import ContactDetails from './ContactDetails';

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
    //backgroundColor: red[500]
    color: blue[800]
  },
  contact_details: {
    // backgroundColor: blue[500]
  }
}));

const ContactPage = (props) => {
  const userContext = useContext(UserContext);
  const searchContext = useContext(SearchContext);

  const [contacts,
    setContacts] = useState([]);
  const initalModalProps = {
    open: false,
    title: '',
    isEditing: false,
    closeCallback: () => {}
  };
  const [modalProps,
    setModalProps] = useState(initalModalProps);
  const [reload,
    setReload] = useState(false);
  const [currentContact,
    setCurrentContact] = useState({})

  useEffect(() => {
    axios
      .get(ApiRoutes.contact, {
      headers: {
        'x-auth-token': userContext.user.token
      }
    })
      .then(response => {
        if (response.data.length > 0) {
          setCurrentContact(response.data[0])
        }
        setContacts(response.data);
      })
      .catch(error => {
        if (error.status === 401) {
          props
            .history
            .push('/login');
        }
        console.log('Couldnt grab contacts', error);
      });
  }, [reload]);

  const callReload = () => {
    setReload(!reload);
  }

  const onAddClick = () => {
    setModalProps({open: true, title: 'Add Contact', isEditing: false, closeCallback: closeCallback})
  };

  const onEditClick = () => {
    if (currentContact) {
      setModalProps({
        open: true, 
        title: 'Edit Contact', 
        isEditing: true, 
        closeCallback: closeCallback})
    }
  }

  const onDeleteClick = () => {
    if (currentContact) {
      axios.delete(ApiRoutes.deleteContact(currentContact._id), {
        headers: {
          'x-auth-token': userContext.user.token
        }
      })
      .then(response => {
        callReload();
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
  const onContactClick = (contact) => {
    setCurrentContact(contact)
  }

  const closeCallback = () => {
    setModalProps(initalModalProps);
  }

  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="lg">

        <Grid container direction="row" justify="center" alignItems="stretch">

          <Grid item className={classes.contact_list} md={4} xs={12}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid container justify="center">
                <IconButton color="inherit" className={classes.addIcon} onClick={onAddClick}>
                  <PersonAdd/>
                </IconButton>
                <IconButton color="inherit" className={classes.addIcon} onClick={onEditClick}>
                  <Edit/>
                </IconButton>
                <IconButton color="inherit" className={classes.addIcon} onClick={onDeleteClick}> 
                  <Delete/>
                </IconButton>
              </Grid>
            </Grid>
            <div>
              {contacts.map((contact) =>{ 
                if (!searchContext.search || contact.name.toLocaleLowerCase().indexOf(searchContext.search.toLocaleLowerCase()) > -1){
                  return (<ContactItem
                  key={contact._id}
                name={contact.name}
                isSelected={currentContact._id === contact._id}
                profile_picture={contact.profile_picture}
                onClick={() => onContactClick(contact)}
                />)
                }
                return null;
                })}
            </div>
          </Grid>
          <Grid item className={classes.contact_details} md={8}>
            <ContactDetails contact={currentContact} callReload={callReload} />
          </Grid>
        </Grid>
      </Container>
      <CreateEditContactModal
        open={modalProps.open}
        title={modalProps.title}
        isEditing={modalProps.isEditing}
        handleClose={modalProps.closeCallback}
        contact={currentContact}
        callReload={callReload}/>
    </div>
  );
};

export default ContactPage;