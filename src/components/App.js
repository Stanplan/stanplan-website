import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AsyncSections from 'components/scheduler/AsyncSections';
import HomeScreen from 'components/FrontPage/HomeScreen';
import AboutScreen from 'components/FrontPage/AboutScreen';
import SignupScreen from 'components/FrontPage/SignupScreen';
import SuccessScreen from 'components/FrontPage/SignupScreen/SuccessScreen';
import VerifiedScreen from 'components/FrontPage/SignupScreen/VerifiedScreen';
import Dashboard from 'components/Dashboard';
import Page404Screen from 'components/Page404Screen';

function App() {

  return (
    /*<div className="App">
      <div style={decorativeBanner}></div>
      <AsyncSections />
    </div>*/
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/signup' component={SignupScreen} />
          <Route path='/success' component={SuccessScreen} />
          <Route path='/verified' component={VerifiedScreen} />
          <Route path='/dashboard' component={Dashboard} />
          <Route component={Page404Screen} />
        </Switch>
      </div>
    </Router>
  );
}

const decorativeBanner = {
  background: '#8c1515',
  border: '10pt solid #8c1515',
  width: '100%',
  margin: '0px',
  padding: '0px'
}

export default App;
