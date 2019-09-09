import React, { Component } from 'react';
import styles from './JobsSection.module.css';

class JobsSection extends Component {

  render() {
    return (
      <div className={`container ${styles.container}`}>
        <h4>
          Jobs
        </h4>
        <p>
          We are very excited to continue expanding StanPlan and are looking for
          teammates who are just as excited as us to join our team! If you are
          interested in joining the StanPlan team, send us an e-mail at
          <i> contact@stanplan.com</i> with the subject line
          `Job Application: [Your name here]`. Please attach your resume as well
          as the position(s) you would like to be considered for. We are currently
          looking to fill the following positions:<br/><br/>
          <strong>Web developer</strong><br/>
           - Palo Alto, CA<br/>
          <strong>Full-stack developer</strong><br/>
           - Palo Alto, CA<br/>
          <strong>UI / UX designer</strong><br/>
           - Palo Alto, CA
        </p>
      </div>
    );
  }
}

export default JobsSection;
