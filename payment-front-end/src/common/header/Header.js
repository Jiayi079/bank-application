import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import ReceiptLongIcon from '@material-ui/icons/ReceiptRounded';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  NavLink
} from 'react-router-dom';
import image from '../../assets/logo.png';
import Login from '../../screens/login/Login';
import ViewProfile from '../../screens/profile/ViewProfile';
import "./Header.css";

export default function Header({ loginHandler }) {

  //This js file is to design & api calls related to header section in ui screen

  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const [value, setValue] = React.useState(1);
  const [logButtonName, setlogButtonName] = React.useState(isUserSessionAlreadyExist());


  //This function is to validate user session exists or not
  function isUserSessionAlreadyExist() {
    if (localStorage.getItem("username") !== "" && localStorage.getItem("username") !== undefined
      && localStorage.getItem("username") !== null) {
      loginHandler(true);
      return "LOGOUT";
    } else {
      loginHandler(false);
      return "LOGIN";
    }
  }

  function toggleModal() {
    if (logButtonName === 'LOGOUT') {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      setlogButtonName("LOGIN");
      window.location.replace("/")
    } else {
      setIsOpen(!isOpen);
    }
  }

  function toggleProfileModal() {
    setIsProfileOpen(!isProfileOpen);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
      minWidth: '500px'
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="static"  >
        <Toolbar className="toolBar" position="static" style={{ backgroundColor: 'white', height: '100px', width: '100%', position: 'fixed', borderBottom: '0.1em solid #B1F4F1', padding: '0.5em' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={image} className="img" style={{ height: '45px' }} />
          </IconButton>
          <Typography variant="h6" component="div" style={{ color: '#373C83', fontFamily: 'fantasy' }} >
            DIGITAL PAYMENTS
          </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{ flex: '1' }}></div>
          <NavLink className="navbar-item" to="/home" style={{ color: '#373C83', textDecoration: 'none' }}>
            <IconButton>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '19px',
                color: '#373C83',
              }}><HomeIcon />&nbsp;<span>Home</span>
              </div>
            </IconButton>
          </NavLink>
          {
            (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null && localStorage.getItem("username").trim() !== "") ? (

              <NavLink className="navbar-item" to="/activity" style={{ color: '#373C83', textDecoration: 'none' }}>
                <IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: '19px',
                    color: '#373C83',
                  }}><ReceiptLongIcon />&nbsp;<span>ACTIVITY</span>
                  </div>
                </IconButton>
              </NavLink>
            ) : ""
          }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


          {
            (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null && localStorage.getItem("username").trim() !== "") ? (
              <NavLink className="navbar-item" to="/send" style={{ color: '#373C83', textDecoration: 'none' }}>
                <IconButton>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: '19px',
                    color: '#373C83',
                  }}><MobileScreenShareIcon />&nbsp;<span>SEND</span>
                  </div>
                </IconButton>
              </NavLink>
            ) : ""
          }


          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null && localStorage.getItem("username").trim() !== "") ? (
              <div style={{ cursor: 'pointer', color: '#373C83', fontSize: '19px' }}><AccountCircleIcon /><span> {localStorage.getItem("username")}</span>&nbsp;&nbsp;</div>
            ) : ""
          }

          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={toggleModal} >{logButtonName}</Button>
          <BootstrapDialog
            onClose={toggleModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'orange', color: 'white' }}>
              SIGN IN
            </BootstrapDialogTitle>

            <Login toggleModal={toggleModal} loginButton={setlogButtonName} />
          </BootstrapDialog>

          {/* <BootstrapProfileDialog
            onClose={toggleProfileModal}
            aria-labelledby="customized-dialog-title"
            open={isProfileOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleProfileModal} style={{ backgroundColor: 'orange', textAlign: 'center', color: 'white' }}>
              MY PROFILE
            </BootstrapDialogTitle>

            <ViewProfile toggleModal={toggleProfileModal} />
          </BootstrapProfileDialog> */}


        </Toolbar>
      </AppBar>
    </Box>
  );
}