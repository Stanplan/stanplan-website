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
          teammates who are just as excited to join our team! If you are
          interested in joining the StanPlan team, please reach out to us!
        </p>
      </div>
    );
  }
}

export default JobsSection;
