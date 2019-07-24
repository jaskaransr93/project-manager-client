import React, {useContext} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonAdd from '@material-ui/icons/PersonAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import UserContext from './contexts/UserContext';
import {light} from '@material-ui/core/styles/createPalette';
import blue from '@material-ui/core/colors/blue';
import SearchContext from './contexts/SearchContext';


const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: blue[800]
  },
  grow: {
    flexGrow: 1
  },
  addIcon: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      display: 'block'
    }
  },
  name: {
    display: 'none',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      display: 'block',
      fontWeight: 100,
      marginTop: '0.5rem'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme
      .transitions
      .create('width'),
    width: '100%',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      width: 500
    }
  },
  sectionDesktop: {
    display: 'none',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'none'
    }
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const searchContext = useContext(SearchContext);
  const [anchorEl,
    setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl,
    setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handlerLogout(event) {
    userContext.setUser({
          name: '',
          token: ''
        });
    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
      id={menuId}
      keepMounted
      transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem
        onClick={handlerLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handlerLogout}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle/>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Contact Manager
          </Typography>
          {/* <IconButton color="inherit" className={classes.addIcon}>
              <Badge color="secondary">
                <PersonAdd />
              </Badge>
          </IconButton> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(e) => {
                searchContext.setSearch(e.target.value)
                }}
              classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
              inputProps={{
              'aria-label': 'Search'
            }}/>
          </div>
          <div className={classes.grow}/>
          <div className={classes.sectionDesktop}>
            {userContext.user && <Typography variant="h6" noWrap className={classes.name}>
              {userContext.user.name}
            </Typography>}
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
