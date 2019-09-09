import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import store from 'redux/store';

import HomeScreen from 'components/FrontPage/HomeScreen';
import AboutScreen from 'components/FrontPage/AboutScreen';
import SignupScreen from 'components/FrontPage/LoginScreen';
import SignupScreen from 'components/FrontPage/SignupScreen';
import SuccessScreen from 'components/FrontPage/SignupScreen/SuccessScreen';
import VerifiedScreen from 'components/FrontPage/SignupScreen/VerifiedScreen';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';

import Dashboard from 'components/Dashboard';
import Navbar_Dashboard from 'components/Dashboard/Navbar';

import Page404Screen from 'components/Page404Screen';

storiesOf('Front Page', module)
  .add('Home Screen', () => <Provider store={store}><Router><HomeScreen/></Router></Provider>)
  .add('About Screen', () => <Provider store={store}><Router><AboutScreen/></Router></Provider>)
  .add('Login Screen', () => <Provider store={store}><Router><LoginScreen/></Router></Provider>)
  .add('Signup Screen', () => <Provider store={store}><Router><SignupScreen/></Router></Provider>)
  .add('Success Screen', () => <Provider store={store}><Router><SuccessScreen/></Router></Provider>)
  .add('Verified Screen', () => <Provider store={store}><Router><VerifiedScreen/></Router></Provider>)
  .add('Navbar', () => <Provider store={store}><Router><Navbar/></Router></Provider>)
  .add('Footer', () => <Router><Footer/></Router>)

storiesOf('Dashboard', module)
  .add('Dashboard', () => <Router><Dashboard/></Router>)
  .add('Navbar_Dashboard', () => <Router><Navbar_Dashboard/></Router>)

storiesOf('404 Screen', module)
  .add('404 Screen', () => <Router><Page404Screen/></Router>)
