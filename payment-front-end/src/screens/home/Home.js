import { Grid } from '@material-ui/core';
import * as React from 'react';
import bannerImg from '../../assets/banner1.png';
import cashImg from '../../assets/cash.png';
import creditcardImg from '../../assets/creditcard.png';
import debitcardImg from '../../assets/debitcard.png';
import ewalletImg from '../../assets/ewallet.png';
import homeImg from '../../assets/home.png';
import Header from '../../common/header/Header';
import './Home.css';

export default function Home() {

  //This js is home page, contains static data

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />

      <section className="mt-48 md:mt-40 pb-10 relative ">
        <div className="justify-center text-center flex flex-wrap">
          <div className="w-full">
            <h2 className="font-semibold text-4xl">We record all payments you made</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              Digital Payments app to transfer money to any registered users using credit card / debit card / wallets / cash.
            </p>
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="justify-center flex flex-wrap">
          <img
            className=""
            //src={require("../../assets/img/pattern_react.png").default}
            src={bannerImg}
            style={{ width: '80%', borderRadius: '15px' }}
            alt="..."
          />
        </div>
      </section>



      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Digital Payment App
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                A payment system is any system used to settle financial transactions through the transfer of monetary value. This includes the institutions, instruments, people, rules, procedures, standards, and technologies that make its exchange possible.A common type of payment system, called an operational network, links bank accounts and provides for monetary exchange using bank deposits. Some payment systems also include credit mechanisms, which are essentially a different aspect of payment.
              </p>
              <div className="mt-12">


              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          //src={require("../../assets/img/pattern_react.png").default}
          src={homeImg}
          alt="..."
        />
      </section>
      <section className="">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="pt-32 sm:pt-0">
            <h3 className="font-semibold text-4xl text-blueGray-600">
              Mode of transactions
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
              We accepts credit card, debit card, eWallets, cash. You can use any one of the mode to transfer money
            </p>
          </div>

          <Grid container style={{ padding: '10px' }}>
            <Grid item xs={3}>
              <a>
                <img
                  alt="..."
                  className="shadow-lg rounded-lg text-center p-8 mt-8"
                  style={{ height: '200px', width: '300px', backgroundColor: 'white' }}
                  src={cashImg}
                />
              </a>
            </Grid>

            <Grid item xs={3}>
              <a>
                <img
                  alt="..."
                  className="shadow-lg rounded-lg text-center p-8 mt-8"
                  style={{ height: '200px', width: '300px', backgroundColor: 'white' }}
                  src={debitcardImg}
                />
              </a>
            </Grid>

            <Grid item xs={3}>
              <a>
                <img
                  alt="..."
                  className="shadow-lg rounded-lg text-center p-8 mt-8"
                  style={{ height: '200px', width: '300px', backgroundColor: 'white' }}
                  src={creditcardImg}
                />
              </a>
            </Grid>

            <Grid item xs={3}>
              <a>
                <img
                  alt="..."
                  className="shadow-lg rounded-lg text-center p-8 mt-8"
                  style={{ height: '200px', width: '300px', backgroundColor: 'white' }}
                  src={ewalletImg}
                />
              </a>
            </Grid>
          </Grid>
        </div>
      </section>
      <section className="">


      </section>

    </React.Fragment>
  );
}