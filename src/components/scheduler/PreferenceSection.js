import React, { Component } from 'react';
import PreferenceRow from './PreferenceRow';
import PreferenceRadio from './PreferenceRadio';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './styles/PreferenceSection.css';

// Class representing the app's "Preference" section where users indicate
// preferences that will be considered during scheduling.
class PreferenceSection extends Component {

  render() {
    return (
      <Container>
        <Row bsPrefix='default' className='title'>
          <h1>{this.props.title}</h1>
        </Row>
        <Row bsPrefix='default' className='instructions'>
          <h4>{this.props.instructions}</h4>
        </Row>
        <PreferenceRow
          title={"Minimum Units / Quarter:"}
          id="min"
        />
        <PreferenceRow
          title={"Maximum Units / Quarter:"}
          id="max"
        />
        <PreferenceRadio
          question={"Would you consider taking courses during summer quarter?"}
          id="summer"
        />
        <PreferenceRadio
          question={"Would you like to us to attempt to schedule prerequisite classes before a given course?"}
          id="prereqs"
        />
      </Container>
    );
  }
}

export default PreferenceSection;
