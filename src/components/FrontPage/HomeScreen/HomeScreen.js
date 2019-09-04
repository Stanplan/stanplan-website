import React, { Component } from 'react';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import IntroSection from './IntroSection';
import WhatWeDoSection from './WhatWeDoSection';
import styles from './HomeScreen.module.css';

class HomeScreen extends Component {

  render() {
    return(
      <div className={`container-fluid ${styles.container}`}>
        <Navbar/>
        <IntroSection/>
        <WhatWeDoSection/>
        <Footer/>
      </div>
    );
  }
}

export default HomeScreen;
