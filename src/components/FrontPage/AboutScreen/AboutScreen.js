import React, { Component } from 'react';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import AboutSection from './AboutSection';
import JobsSection from './JobsSection';
import TeamSection from './TeamSection';
import styles from './AboutScreen.module.css';

class AboutScreen extends Component {

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar variant='grey'/>
        <AboutSection/>
        <JobsSection/>
        <TeamSection/>
        <Footer/>
      </div>
    );
  }
}

export default AboutScreen;
