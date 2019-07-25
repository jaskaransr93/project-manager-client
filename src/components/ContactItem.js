import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles({
    'listItem':{
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: blue[50]
        }
    },
    avatar: {
        margin: 10,
        width: 50,
        height: 50,
      },
    divider: {
        listStyleType: 'none'
    },
    selected: {
        backgroundColor: blue[700],
        color: '#ffffff'
    }
});

const ContactItem = (props) => {
    const classes = useStyles();

    return (
        <div onClick={props.onClick}>
        <ListItem alignItems="center" className={classes.listItem + " " + (props.isSelected ? classes.selected: "")}>
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