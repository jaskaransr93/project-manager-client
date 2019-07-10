import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    avatar: {
        margin: 10,
        width: 50,
        height: 50,
      },
    divider: {
        listStyleType: 'none'
    }
});

const ContactItem = (props) => {
    const classes = useStyles();

    return (
        <div>
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar alt={props.name} src={props.profile_picture} className={classes.avatar} />
            </ListItemAvatar>
            <ListItemText primary={props.name} />
        </ListItem>
        <Divider variant="inset" component="li" className={classes.divider} />
        </div>

    );
};

export default ContactItem;