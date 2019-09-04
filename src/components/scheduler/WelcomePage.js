import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMajor, updateTrack } from 'redux/actions';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './styles/WelcomePage.css';
import logo from 'assets/images/Logo.png';

class WelcomePage extends Component {
  constructor(props) {
    super(props);

    var trackFileMap = new Map();
    trackFileMap.set("Artificial Intelligence", "ai");
    trackFileMap.set("Biocomputation", "biocomputation");
    trackFileMap.set("Computer Engineering", "engineering");
    trackFileMap.set("Graphics", "graphics");
    trackFileMap.set("Human-Computer Interaction", "hci");
    trackFileMap.set("Information", "information");
    trackFileMap.set("Systems", "systems");
    trackFileMap.set("Theory", "theory");
    trackFileMap.set("Unspecialized", "unspecialized");
    trackFileMap.set("Individually Designed", "individual");

    var trackFileMap2 = new Map();
    trackFileMap2.set("ai", "Artificial Intelligence");
    trackFileMap2.set("biocomputation", "Biocomputation");
    trackFileMap2.set("engineering", "Computer Engineering");
    trackFileMap2.set("graphics", "Graphics");
    trackFileMap2.set("hci", "Human-Computer Interaction");
    trackFileMap2.set("information", "Information");
    trackFileMap2.set("systems", "Systems");
    trackFileMap2.set("theory", "Theory");
    trackFileMap2.set("unspecialized", "Unspecialized");
    trackFileMap2.set("individual", "Individually Designed");

    var majorFileMap = new Map();
    majorFileMap.set("Computer Science", "cs");

    var majorFileMap2 = new Map();
    majorFileMap2.set("cs", "Computer Science");

    this.state = {
      tracks: [ "Artificial Intelligence", "Biocomputation", "Computer Engineering", "Graphics",
    "Human-Computer Interaction", "Information", "Systems", "Theory", "Unspecialized", "Individually Designed"],
      trackFileMap,
      trackFileMap2,
      majors: [ "Computer Science" ],
      majorFileMap,
      majorFileMap2
    };
  }

  renderOption(title, key) {
    return (
      <Dropdown.Item
        className="dropdownItem"
        key={key}
        eventKey={title}
      >
        {title}
      </Dropdown.Item>
    );
  }

  renderTrackOptions() {
    let tracks = this.state.tracks;
    let options = [];
    for (let i = 0; i < tracks.length; i++) {
      options.push(this.renderOption(tracks[i], i));
    }
    return options;
  }

  renderMajorOptions() {
    let majors = this.state.majors;
    let options = [];
    for (let i = 0; i < majors.length; i++) {
      options.push(this.renderOption(majors[i], i));
    }
    return options;
  }

  handleMajorSelection(major, event) {
    const { dispatch } = this.props;
    dispatch(updateMajor(this.state.majorFileMap.get(major)));
  }

  handleTrackSelection(track, event) {
    const { dispatch } = this.props;
    dispatch(updateTrack(this.state.trackFileMap.get(track)));
  }

  render() {
    const { major, track } = this.props;
    return (
      <Container>
        <Row className='logo'>
          <img src={logo} alt="Logo" />
        </Row>
        <Row className='instructions'>
          <p>StanPlan is a tool designed to help you organize and schedule your Stanford 4-year plan. Simply select a major and track (if applicable), then click the right arrow at the bottom of the screen to begin entering your course selections. We hope we can help you make the most of your time at Stanford! Please note that StanPlan is meant to be a helpful organizational tool, but it is not a substitute for consulting with appropriate academic advisors. Please consult an actual advisor before finalizing your degree plan.</p>
        </Row>
        <Row className='dropdownRow'>
          <Dropdown
            onSelect={ (eventKey, e) => {this.handleMajorSelection(eventKey, e)} }
          >
            <Dropdown.Toggle className='dropdownToggle' variant="danger">
              {major === "" ? "Select a Major" : this.state.majorFileMap2.get(major)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.renderMajorOptions()}
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Row className='dropdownRow'>
          <Dropdown
            onSelect={ (eventKey, e) => {this.handleTrackSelection(eventKey, e)} }
          >
            <Dropdown.Toggle className='dropdownToggle' variant="danger" drop="down">
              {track === "" ? "Select a Track" : this.state.trackFileMap2.get(track)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.renderTrackOptions()}
            </Dropdown.Menu>
          </Dropdown>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { track, major } = state;
  return {
    track,
    major
  };
}

export default connect(mapStateToProps)(WelcomePage);
