import { Avatar, Card, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import AccessTime from '@material-ui/icons/AccessTime';
import Payment from '@material-ui/icons/Payment';
import * as React from 'react';
import men from '../../assets/profile.png';
import transfer from '../../assets/transfer.png';
import Header from '../../common/header/Header';
import { getAllFeeds } from '../../util/apiCalls';
import './Activity.css';
export default function Activity() {

  //This js file is to handle all payments history -> to fetch based on type like SEND / RECIEVE  

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activity, setActivity] = React.useState([]);
  //const [recieveActivity, setRecieveActivity] = React.useState([]);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }

  //This blocks is React.useEffect to  trigger during page loading
  React.useEffect(() => {
    getLoggedInStatus();

  }, [1]);

  function getLoggedInStatus() {
    if (localStorage.getItem("username") !== "" && localStorage.getItem("username") !== undefined
      && localStorage.getItem("username") !== null) {
      setIsLoggedIn(true);
      getAllFeeds().then(res => {
        let data = res.json();
        data.then(feeds => {
          console.log(feeds);
          setActivity(feeds);
        });
      })
        .catch(error => {
          console.log("Error during get all users failed" + error);
        })

      // getAllFeeds("RECIEVE").then(res => {
      //   let data = res.json();
      //   data.then(feeds => {
      //     console.log(feeds);
      //     setRecieveActivity(feeds);
      //   });
      // })
      //   .catch(error => {
      //     console.log("Error during get all users failed" + error);
      //   })
    } else {
      setIsLoggedIn(false);
      window.location.replace("/");
    }
  }
  return (
    <React.Fragment >
      <div>
        <Header loginHandler={loginHandler} />
       
        <Grid container justify="flex-end" alignItems="center" style={{ flexWrap: 'nowrap', gap: 55, marginTop:'120px' }} direction={'row'}>
        <Grid item xs={2} ></Grid>
          {/* <Grid item xs={6} style={{ overflowY: 'scroll', maxHeight: '500px' }}> */}
          <Grid item xs={8} >
            {activity.length > 0 ? (activity.map((each, index) => (
              <>
                <Card key={index} style={{ backgroundColor: 'aliceblue' }}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} >
                        <span style={{flexDirection :'row',justifyContent: "space-between", color: 'rgb(55, 60, 131)', fontFamily: 'sans-serif'}}>
                          <p >
                            FROM:&nbsp; &nbsp;{each.from}
                          </p>
                          
                          </span>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                      <span style={{flexDirection :'row',justifyContent: "space-between", color: 'rgb(55, 60, 131)', fontFamily: 'sans-serif'}}>
                          <p >
                            TO:&nbsp; &nbsp;{each.to}
                          </p>
                          
                          </span>
                      </Grid>

                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                      <span style={{flexDirection :'row',justifyContent: "space-between", color: 'rgb(55, 60, 131)', fontFamily: 'sans-serif'}}>
                          <p >
                            NOTES:&nbsp; &nbsp;{each.notes}
                          </p>
                          
                          </span>
                      </Grid>

                    </Grid>
                    
                    <Grid container>
                      <Grid item xs={6}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}><AccessTime />&nbsp;<span>{each.date}</span>
                        </div>
                      </Grid>


                      <Grid item xs={3} style={{ alignItems: 'center' }}>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'center'
                        }}><Payment />&nbsp;<span>{each.mode}</span>
                        </div>
                      </Grid>

                      <Grid item xs={3}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          float: 'right',
                          fontWeight: '700'
                        }}>$&nbsp;<span>{each.amount}</span>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <br></br>
              </>
            ))) : <p style={{ textAlign: 'center' }}><font color={'red'}>No Record found</font></p>}
          </Grid>
          {/* <div style={{ marginLeft: '30px' }}></div>
          <Grid item xs={6} style={{ padding: '10px', overflowY: 'scroll', maxHeight: '500px' }}>

            {recieveActivity.length > 0 ? (recieveActivity.map((each, index) => (
              <>
                <Card sx={{ minWidth: 275 }} key={index} style={{ backgroundColor: '#c7e8f0' }}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={4}>
                        <IconButton>
                          <Avatar
                            src={men}
                            style={{
                              margin: "10px",
                              width: "60px",
                              height: "60px",
                            }}
                          />
                          <Typography variant="h5" style={{ color: 'orange', fontFamily: 'sans-serif' }} >
                            {each.from}
                          </Typography>
                        </IconButton>
                      </Grid>
                      <Grid item xs={4} style={{ alignItems: 'center' }}>
                        <img src={transfer} style={{ height: '60px', marginLeft: '40px', marginTop: '20px' }}></img>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ float: 'right' }}>
                          <IconButton >
                            <Avatar
                              src={men}
                              style={{
                                margin: "10px",
                                width: "60px",
                                height: "60px"
                              }}
                            />
                            <Typography variant="h5" style={{ color: 'orange', fontFamily: 'sans-serif' }} >
                              {each.to}
                            </Typography>
                          </IconButton>

                        </div>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" style={{ fontFamily: 'sans-serif' }} >
                          {each.notes}
                        </Typography>
                      </Grid>

                    </Grid>
                    <br></br><br></br>
                    <Grid container>
                      <Grid item xs={6}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}><AccessTime />&nbsp;<span>{each.date}</span>
                        </div>
                      </Grid>


                      <Grid item xs={3} style={{ alignItems: 'center' }}>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'center'
                        }}><Payment />&nbsp;<span>{each.type}</span>
                        </div>
                      </Grid>

                      <Grid item xs={3}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          float: 'right',
                          fontWeight: '700'
                        }}>$&nbsp;<span>{each.amount}</span>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <br></br>
              </>
            ))) : <p style={{ textAlign: 'center' }}><font color={'red'}>No Record found</font></p>}
          </Grid> <div style={{ marginLeft: '30px' }}></div> */}
           <Grid item xs={2} ></Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}