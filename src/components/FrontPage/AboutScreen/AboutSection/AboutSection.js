import React, { Component } from 'react';
import styles from './AboutSection.module.css';

class AboutSection extends Component {

  render() {
    return (
      <div className={`container ${styles.container}`}>
        <h2>
        About Us
        </h2>
        <p>
          StanPlan consolidates the information students need to organize and
          create their four-year course plan into one convenient UI. Our web app
          automatically generates a schedule for students based on the courses
          they select and helps students make sure they satisfy necessary
          prerequisites in the right order. With StanPlan, the quarterly
          course-picking scramble currently experienced by so many
          undergraduates will be transformed into one smooth, long-term planning
          experience.
        </p>
        <p>
          StanPlan began as a project in CS 294W, a project-based course taught
          by Dr. Monica Lam at Stanford University. Excitement over StanPlan
          convinced us to release StanPlan to the entire Stanford community.
          We are quickly expanding and developing new features to help students
          plan out their college experience. We look forward to reaching more
          universities and are excited that you can join us on this journey!
        </p>
      </div>
    );
  }
}

export default AboutSection;
