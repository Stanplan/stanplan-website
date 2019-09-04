import React, { Component } from 'react';
import { connect } from 'react-redux';
import Course from 'utils/Course';
import Section from './Section';
import Subsection from './Subsection';
import PageNavigator from './PageNavigator';
import PreferenceSection from './PreferenceSection';
import OpenEndedSubsection from './OpenEndedSubsection';
import WelcomePage from './WelcomePage';
import Schedule from './Schedule';

// Asynchronously get page data from the server, then generate
// appropriate sections UI.
class AsyncSections extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseOptions: []
    };
  }

  componentDidMount() {
    const { track, major } = this.props;
    getCourseOptions("", "")
    .then( (courseOptions) => this.setState( {courseOptions: courseOptions} ));
  }

  componentDidUpdate(prevProps) {
    const { track, major } = this.props;
    if (prevProps.track === track && prevProps.major === major) {
      return;
    }
    getCourseOptions(major, track)
    .then( (courseOptions) => this.setState( {courseOptions: courseOptions} ));
  }

  render() {
    if (this.state.courseOptions.length === 0) {
      return (
        <PageNavigator>
          <WelcomePage />
        </PageNavigator>
      );
    }

    return (
      <PageNavigator>
        <WelcomePage />
        { this.renderSections(this.state.courseOptions) }
        <PreferenceSection
          title={"Your Preferences"}
          instructions={"Please indicate your preferences below. Your selections will be considered during the creation of your four-year plan."}
        />
        <Schedule />
      </PageNavigator>
    );
  }

  renderSubsection(subsectionCourseOptions, sectionId, type, instructions,
                   numDefaultRows, subsectionId) {
    if (type === "radio") {
      // Radio group subsection
      return (
        <Subsection
          id={sectionId}
          courseOptions={subsectionCourseOptions}
          instructions={instructions}
          type={type}
          key={subsectionId}
        />
      );
    } else if (type === "open-ended") {
      // Open ended subsection
      return (
        <OpenEndedSubsection
          id={sectionId}
          instructions={instructions}
          subsectionId={subsectionId}
          numDefaultRows={numDefaultRows}
          key={subsectionId}
        />
      );
    } else {
      // Check group subsection
      return (
        <Subsection
          id={sectionId}
          courseOptions={subsectionCourseOptions}
          instructions={instructions}
          key={subsectionId}
        />
      );
    }
  }

  renderSection(subsections, sectionId, title, instructions) {
    let subsectionComponents = [];
    for (let i = 0; i < subsections.length; i++) {
      let subsectionCourseOptions = subsections[i].courses;
      let type = subsections[i].type;
      let instructions = subsections[i].instructions;
      let subsectionId = i;
      let numDefaultRows = subsections[i].numDefaultRows;
      subsectionComponents.push(this.renderSubsection(subsectionCourseOptions,
                                                      sectionId,
                                                      type,
                                                      instructions,
                                                      numDefaultRows,
                                                      subsectionId));
    }

    return (
      <Section
        id={sectionId}
        title={title}
        instructions={instructions}
        key={sectionId}
      >
        {subsectionComponents}
      </Section>
    );
  }

  renderSections(sections) {
    let sectionComponents = [];
    for(let i = 0; i < sections.length; i++) {
      let sectionCourseOptions = sections[i].courses;
      let title = sections[i].title;
      let instructions = sections[i].instructions;

      sectionComponents.push(this.renderSection(sectionCourseOptions, i, title, instructions));
    }
    return sectionComponents;
  }
}

async function getCourseOptions(major, track) {
  console.log("Getting course options for: " + major + " : " + track);

  if (major === "" || track === "") {
    return [];
  }

  var response = await fetch(process.env.REACT_APP_SERVER_URL + "/courseoptions?major=" + major + "&track=" + track, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(error => {
    console.log('Error: Request for course options failed', error)
  });

  if (response.ok === false) {
    return [];
  }

  let json = await response.json();
  let sections = loadSections(json.generalEdReqs, [])
  sections = loadSections(json.generalReqs, sections);
  return loadSections(json.trackReqs, sections);
}

// Load the course options array from the information provided in
// the JSON file returned from the server.
function loadSections(pagesJson, sections) {
  for(let i = 0; i < pagesJson.length; i++) {
    let section = pagesJson[i].section;
    let sectionTitle = pagesJson[i].title;
    let sectionInstructions = pagesJson[i].instructions;
    let sectionCourseOptions = [];

    for(let j = 0; j < section.length; j++) {
      let subsection = section[j].subsection;
      let subsectionInstructions = section[j].instructions;
      let subsectionType = section[j].type;
      let subsectionCourseOptions = [];

      for(let k = 0; k < subsection.length; k++) {
        let courseJson = subsection[k];
        let course = new Course(courseJson.id, courseJson.title, courseJson.units,
                                courseJson.description, courseJson.required);
        subsectionCourseOptions.push(course);
      }
      if (subsectionType === "open-ended") {
        sectionCourseOptions.push({"type" : subsectionType,
                                    "instructions" : subsectionInstructions,
                                    "numDefaultRows" : section[j].numDefaultRows});
      } else {
        sectionCourseOptions.push({"courses" : subsectionCourseOptions,
                                   "type" : subsectionType,
                                   "instructions" : subsectionInstructions});
      }
    }
    sections.push({"courses" : sectionCourseOptions,
                   "title" : sectionTitle,
                   "instructions" : sectionInstructions});
  }
  return sections;
}

function mapStateToProps(state) {
  const { track, major } = state;
  return {
    track,
    major
  };
}

export default connect(mapStateToProps)(AsyncSections);
