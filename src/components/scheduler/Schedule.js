import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from 'utils/Plan';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from 'assets/images/Logo.png';
import './styles/Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: null,
      maxUnitsScheduled: 0,
      maxUnitsQuarter: "",
      minUnitsScheduled: -1,
      minUnitsQuarter: "",
      totalUnits: 0
    }
  }

  componentDidMount() {
    this.updateSchedule();
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }
    this.updateSchedule();
  }

  updateSchedule() {
    const { minUnitsPerQuarter, maxUnitsPerQuarter,
      scheduleInSummer, considerPrereqs } = this.props;

    let infoForScheduler = JSON.stringify({ courses: this.getCourses(),
                                       minUnitsPerQuarter: minUnitsPerQuarter,
                                       maxUnitsPerQuarter: maxUnitsPerQuarter,
                                       scheduleInSummer: scheduleInSummer,
                                       considerPrereqs: considerPrereqs });

    console.log(infoForScheduler);

    getSchedule(infoForScheduler)
    .then( (schedule) => {
      console.log(schedule);
      let maxUnitsScheduled = 0;
      let maxUnitsQuarter = "";
      let minUnitsScheduled = -1;
      let minUnitsQuarter = "";
      let totalUnits = 0;

      for (let i = 0; i < schedule.years.length; i++) {
        let year = schedule.years[i];
        for (let j = 0; j < year.quarters.length; j++) {
          let quarter = year.quarters[j];
          totalUnits += quarter.totalUnits;

          if (quarter.totalUnits < minUnitsScheduled || minUnitsScheduled === -1) {
            minUnitsScheduled = quarter.totalUnits;
            minUnitsQuarter = quarter.label + " " + year.label;
          }

          if (quarter.totalUnits > maxUnitsScheduled) {
            maxUnitsScheduled = quarter.totalUnits;
            maxUnitsQuarter = quarter.label + " " + year.label;
          }
        }
      }

      this.setState({
        schedule: schedule,
        maxUnitsScheduled: maxUnitsScheduled,
        maxUnitsQuarter: maxUnitsQuarter,
        minUnitsScheduled: minUnitsScheduled,
        minUnitsQuarter: minUnitsQuarter,
        totalUnits: totalUnits
      });
    });
  }

  getCourses() {
    const { selectedCourses, openEndedCourses } = this.props;

    let courses = [];
    for (let i = 0; i < selectedCourses.length; i++) {
      let course = selectedCourses[i];
      courses.push({ code: course.code, units: course.units });
    }
    for (let i = 0; i < openEndedCourses.length; i++) {
      let course = openEndedCourses[i];
      if (course.units > 0 && course.code !== "") {
        courses.push({ code: course.code, units: course.units });
      }
    }

    return courses;
  }

  renderCourses(coursesList, maxCoursesPerQuarter) {
    let courses = [];
    let key = 0;
    for (let i = 0; i < coursesList.length; i++) {
      let course = coursesList[i];
      courses.push(
        <Row key={key} className='course'>
          <p>{course.code}...........{course.units} units</p>
        </Row>
      );
      key++;
    }

    for (let i = 0; i < maxCoursesPerQuarter - coursesList.length; i++) {
      // Add filler row for spacing.
      courses.push(
        <Row key={key} className='course'>
          <p className='filler'>FILLER</p>
        </Row>
      );
      key++;
    }

    return courses;
  }

  renderQuarters(quartersList, maxQuartersPerYear) {
    let quarters = [];
    let key = 0;
    let maxCoursesPerQuarter = 0;
    for (let i = 0; i < quartersList.length; i++) {
      let quarter = quartersList[i];
      if (quarter.courses.length > maxCoursesPerQuarter) {
        maxCoursesPerQuarter = quarter.courses.length;
      }
    }

    for (let i = 0; i < quartersList.length; i++) {
      let quarter = quartersList[i];
      quarters.push(
        <Col key={key}>
          <Row className='quarter'>
            <h4>{quarter.label}</h4>
          </Row>
          {this.renderCourses(quarter.courses, maxCoursesPerQuarter)}
          <div className='div'>
            <div className='horizontalDivider'/>
            <p className='units'>
              <b>Total</b>..........{quarter.totalUnits} units
            </p>
          </div>
        </Col>
      );
      key++;
    }

    for (let i = 0; i < maxQuartersPerYear - quartersList.length; i++) {
      // Add filler column for spacing
      quarters.push(
        <Col key={key} className='filler'>
          <Row className='quarter'>
            <h4>FILLER</h4>
          </Row>
          {this.renderCourses([], maxCoursesPerQuarter)}
          <div className='div'>
            <div className='horizontalDivider'/>
            <p className='units'>
              FILLER
            </p>
          </div>
        </Col>
      );
      key++;
    }

    return quarters;
  }

  renderDownloadButton() {
    const { schedule } = this.state;
    let year = schedule.years[0];
    let file = new Blob([schedule.getCSV()], {type: "text/csv"});
    return (
      <Button
        href={URL.createObjectURL(file)}
        download={"StanPlan Schedule"}
        className="downloadButton"
        variant="danger"
        block
      >
        Download Schedule
      </Button>
    );
  }

  renderYears() {
    const { schedule } = this.state;
    let years = [];
    let maxQuartersPerYear = 0;
    for (let i = 0; i < schedule.years.length; i++) {
      let year = schedule.years[i];
      if (year.quarters.length > maxQuartersPerYear) {
        maxQuartersPerYear = year.quarters.length;
      }
    }

    for (let i = 0; i < schedule.years.length; i++) {
      let year = schedule.years[i];
      years.push(
        <Row key={i}>
          <Col xs="auto" className='year'>
            <h3 className='yearLabel'>{year.label}</h3>
          </Col>
          {this.renderQuarters(year.quarters, maxQuartersPerYear)}
        </Row>
      );
    }
    return years;
  }

  render() {
    const { maxUnitsQuarter, maxUnitsScheduled,
            minUnitsScheduled, minUnitsQuarter, totalUnits } = this.state;

    if (this.state.schedule === null) {
      return (
        <Container className='spinnerContainer'>
          <Row>
            <h1>Generating Your Schedule...</h1>
          </Row>
          <Row className='spinner'>
            <div>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row className='logoRow'>
          <img src={logo} alt="Logo" />
        </Row>
        {this.renderYears()}
        <div className='bottomDivider' />
        <Row className='statsRow'>
          <h4>Total Units Scheduled: &nbsp;&nbsp;</h4>
          <h4 className='unbolded'>{totalUnits}</h4>
        </Row>
        <Row className='statsRow'>
          <h4>Quarter With Most Units: &nbsp;&nbsp;</h4>
          <h4 className='unbolded'>{maxUnitsQuarter}&nbsp;&nbsp;({maxUnitsScheduled} units)</h4>
        </Row>
        <Row className='statsRow'>
          <h4>Quarter With Least Units: &nbsp;&nbsp;</h4>
          <h4 className='unbolded'>{minUnitsQuarter}&nbsp;&nbsp;({minUnitsScheduled} units)</h4>
        </Row>
        <Row className='downloadButtonContainer'>
          {this.renderDownloadButton()}
        </Row>
      </Container>
    );
  }
}

async function getSchedule(infoForScheduler) {
  var response = await fetch(process.env.REACT_APP_SERVER_URL + "/scheduler", {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: infoForScheduler
  })
  .catch(error => {
    console.log('Error: Request for four year plan failed', error)
  });

  let json = await response.json();
  return new Plan(json.plan);
}

function mapStateToProps(state) {
  const { selectedCourses, openEndedCourses, minUnitsPerQuarter, maxUnitsPerQuarter,
          scheduleInSummer, considerPrereqs } = state;
  return {
    selectedCourses,
    openEndedCourses,
    minUnitsPerQuarter,
    maxUnitsPerQuarter,
    scheduleInSummer,
    considerPrereqs
  };
}

export default connect(mapStateToProps)(Schedule);
