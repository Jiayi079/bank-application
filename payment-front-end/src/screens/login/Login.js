import {
  FormControl, Grid, Input,
  InputLabel, Snackbar
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import VpnKey from '@material-ui/icons/VpnKey';
import PropTypes from 'prop-types';
import * as React from 'react';
import loginImg from '../../assets/login.png';
import { loginUser } from '../../util/apiCalls';
import Register from '../register/Register';
export default function Login({ toggleModal, loginButton }) {


  //This js file is to handle login user related design & backend API calls
  const [openSnack, setOpenSnack] = React.useState(false);
  const [lusername, setLUsername] = React.useState("");
  const [lpassword, setLPassword] = React.useState("");
  const [invalidError, setInvalidError] = React.useState('');
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const lpasswordChange = (event) => {
    setLPassword(event.target.value);
  }

  const lusernameChange = (event) => {
    setLUsername(event.target.value);
  }

  //This method is to call backend, once all validations success
  const clickSignUp = () => {

    toggleSignUpModal();
    //toggleModal();
    //setIsSignUpOpen(!isSignUpOpen);
  }


  const clickLogin = () => {
    if (lusername === "" || lusername === undefined || lpassword === "" || lpassword === undefined) {
      setOpenSnack(true);
    } else {
      loginUser(lusername, lpassword).then(resp => {
        resp.json().then(data => {
          console.log(data);

          if (data !== null && data.username !== undefined && data.username !== "" && data.username !== "undefined"
            && data.username !== null) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", data._id);
            loginButton("LOGOUT");
            toggleModal();

          } else {
            setInvalidError('Invalid credentials!');
          }
        });
      }).catch(error => {
        console.log("login user err " + error);
      })
    }
  }

  const toggleSignUpModal = () => {
    setIsSignUpOpen(!isSignUpOpen);

  }
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
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
    <React.Fragment>
      <Grid container style={{ minWidth: '1500px !important' }}>

        <Grid xs={6}>
          <img
            className="shadow-lg rounded-lg text-center p-8 mt-8"
            //src={require("../../assets/img/pattern_react.png").default}
            src={loginImg}

            alt="..."
          />


        </Grid>
        <Grid xs={6}>
          <DialogContent>
            <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
              <InputLabel htmlFor="standard-adornment-lusername">Username</InputLabel>
              <Input
                id="standard-adornment-lusername"
                type={'text'}
                defaultValue={lusername}
                onBlur={lusernameChange}
              />
            </FormControl><br></br><br></br>
            <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
              <InputLabel htmlFor="standard-adornment-lpassword">Password</InputLabel>
              <Input
                id="standard-adornment-lpassword"
                type={'password'}
                defaultValue={lpassword}
                onBlur={lpasswordChange}
              />
            </FormControl>
            <br></br>
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{invalidError}</span>

          </DialogContent>
          <DialogActions >
            <Grid >
              <Grid xs={12}>
                <Button fullWidth sx={{ m: 1 }} variant="contained" style={{ backgroundColor: "orange", marginLeft: '-15px' }} onClick={clickLogin}><VpnKey />&nbsp;SIGN IN</Button>
              </Grid>
              <br></br>
              <Grid xs={12}>
                Dont have an account? <Button color="primary" onClick={clickSignUp}>Sign up</Button>
              </Grid>
            </Grid>
          </DialogActions>

          <Snackbar
            style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
            autoHideDuration={1300}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            open={openSnack}
            onClose={handleSnackClose}
            message="Please fill out this field"
          />
          <BootstrapDialog
            onClose={toggleSignUpModal}
            aria-labelledby="customized-dialog-title"
            open={isSignUpOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleSignUpModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'orange', color: 'white' }}>
              SIGN UP
            </BootstrapDialogTitle>


            <Register toggleModal={toggleSignUpModal} />

          </BootstrapDialog>
        </Grid>
      </Grid>
    </React.Fragment>

  );
}