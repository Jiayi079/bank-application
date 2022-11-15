import { Button, FormControl, Grid, InputAdornment, MenuItem, Snackbar, TextField } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import loginImg from '../../assets/moneytransfer.jpg';
import Header from '../../common/header/Header';
import { getAllUsers, savePayment } from '../../util/apiCalls';
import './send.css';


export default function Send() {
  //This js is to handle transfer money to registered users
  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [type, setType] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [accountError, setAccountError] = React.useState('');
  if (localStorage.getItem('username') === "" || localStorage.getItem('username') === null) {
    window.location.replace("/");
    handleLogUser();
  }
  React.useEffect(() => {


    getAllUsers().then(res => {
      let data = res.json();
      let allUsers = [];
      data.then(user => {
        console.log(user);
        user.map(e => {
          if (localStorage.getItem('username') !== e.name) {
            allUsers.push(e.name);
          }

        })
        setUsers(allUsers);
      });
    })
      .catch(error => {
        console.log("Error during get all users failed" + error);
      })
  }, []);



  function handleLogUser() {
    const history = createBrowserHistory();
    history.push({
      pathname: "/home",
    });
  }
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const sendMoney = () => {
    if (account === "" || account === undefined || amount === "" || amount === undefined ||
      type === "" || type === undefined || notes === ""
      || notes === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else {
      savePayment(account, amount,type, notes ).then(res => {
        res.json().then(data => {
          console.log(data.error);
          if(data.error === "Account not found"){
            setAccountError('Account number invalid');
            setSnackMessage('Payment failed!!');
            setOpenSnack(true);
          } else if(data.error === "from & to user cannot be same"){
            setAccountError('From & To user cannot be same!');
            setSnackMessage('Payment failed!!');
            setOpenSnack(true);
          } else if(res.status !== 201){
            setAccountError('Invalid inputs!');
            setSnackMessage('Payment failed!!');
            setOpenSnack(true);
          } else {
            setSnackMessage('Payment success!!');
            setAccountError('');
            setOpenSnack(true);
            setAmount('');
            setAccount('');
            setNotes('');
            setType('');
          }
         
        });
      })
        .catch(error => {
          setAccountError('Account number invalid');
          setSnackMessage('Payment failed!!');
          setOpenSnack(true);
        })
    }
  }

  const modeOfPay = [
    {
      value: 'cash',
      label: 'cash',
    },
    {
      value: 'credit card',
      label: 'credit card',
    },
    {
      value: 'debit card',
      label: 'debit card',
    },
    {
      value: 'e-wallet',
      label: 'e-wallet',
    }
  ];

  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }
  React.useEffect(() => {
    getLoggedInStatus();
  }, [value]);

  function getLoggedInStatus() {
    if (localStorage.getItem("username") !== "" && localStorage.getItem("username") !== undefined
      && localStorage.getItem("username") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  return (
    <React.Fragment>
      <div >
        <Header loginHandler={loginHandler} />

        <Grid container style={{ marginTop: '100px' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={5} style={{ marginTop: '100px' }}>
            <img
              //src={require("../../assets/img/pattern_react.png").default}
              src={loginImg}

              alt="..."
            />

          </Grid>
          <Grid item xs={5} style={{ marginTop: '100px' }}>
            <FormControl fullWidth variant="">

              <TextField id="outlined-basic" label="Enter Username"
                value={account}
                onChange={handleAccountChange}
                variant="outlined" />
            </FormControl>
            <br></br>
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{accountError}</span>
            <br></br><br></br>
            <FormControl fullWidth variant="standard">

              <TextField id="outlined-basic" label="Enter Ammount in ($)"
                value={amount}
                type="number"
                onChange={handleAmountChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                variant="outlined" />

            </FormControl>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <FormControl fullWidth variant="standard">
              <TextField
                id="outlined-select-currency"
                select
                label="Select Mode of Payment"
                value={type}
                onChange={handleTypeChange}
                variant="outlined"
              >
                {modeOfPay.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

            </FormControl>
            <br></br><br></br>

            <FormControl required={true} fullWidth style={{ textAlign: 'center' }}>
              <TextField
                id="outlined-multiline-static"
                label="Description:"
                multiline
                rows={4}
                //defaultValue="Default Value"
                value={notes}
                onChange={handleNotesChange}
                variant="outlined"
              /> </FormControl>
            <Grid container style={{ marginTop: '10px' }}>
              <Grid item xs={2}></Grid><Grid item xs={6}><Button variant="contained" style={{ justifyContent: 'center', backgroundColor: 'orange', width: "150%" }} onClick={sendMoney}  >SEND</Button>
              </Grid><Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Snackbar
          style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          open={openSnack}
          onClose={handleSnackClose}
          message={snackMessage}
        />
      </div>
    </React.Fragment>
  );
}