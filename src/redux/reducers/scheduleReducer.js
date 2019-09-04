import {
  ADD_COURSE,
  REMOVE_COURSE,
  OPT_OUT_OF_COURSE,
  ADD_OPEN_ENDED_COURSE,
  REMOVE_OPEN_ENDED_COURSE,
  UPDATE_OPEN_ENDED_COURSE,
  UPDATE_MAX_UNITS,
  UPDATE_MIN_UNITS,
  UPDATE_SUMMER_PREF,
  UPDATE_PREREQ_PREF,
  UPDATE_MAJOR,
  UPDATE_TRACK
} from '../actions';

const initialState = {
  selectedCourses: [],
  optedOutCourses: [],
  openEndedCourses: [],
  minUnitsPerQuarter: 0,
  maxUnitsPerQuarter: 22,
  scheduleInSummer: false,
  considerPrereqs: true,
  didEditMaxUnits: false,
  didEditMinUnits: false,
  major: "",
  track: ""
};

function scheduleReducer(state = initialState, action) {
  if (action.type === ADD_OPEN_ENDED_COURSE) {
    for (let i = 0; i < state.openEndedCourses.length; i++) {
      if (action.course.sectionId === state.openEndedCourses[i].sectionId &&
          action.course.subsectionId === state.openEndedCourses[i].subsectionId &&
          action.course.rowId === state.openEndedCourses[i].rowId) {
            return state;
      }
    }
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: [...state.openEndedCourses, action.course],
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    };
  } else if (action.type === REMOVE_OPEN_ENDED_COURSE) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses.filter((item, index) => {
        if(item.sectionId === action.course.sectionId &&
           item.subsectionId === action.course.subsectionId &&
           item.rowId === action.course.rowId) {
          return false;
        }
        return true;
      }),
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    };
  } else if (action.type === UPDATE_OPEN_ENDED_COURSE) {
    let updateIndex = -1;
    for (let i = 0; i < state.openEndedCourses.length; i++) {
      if (action.course.sectionId === state.openEndedCourses[i].sectionId &&
          action.course.subsectionId === state.openEndedCourses[i].subsectionId &&
          action.course.rowId === state.openEndedCourses[i].rowId) {
            updateIndex = i;
            break;
      }
    }
    if (updateIndex === -1) {
      return state;
    }
    let openEndedCourses = state.openEndedCourses.slice();
    openEndedCourses[updateIndex] = action.course;

    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    };
  } else if (action.type === ADD_COURSE) {
    for (let i = 0; i < state.selectedCourses.length; i++) {
      if (action.course.code === state.selectedCourses[i].code) {
        return state;
      }
    }
    return {
      selectedCourses: [...state.selectedCourses, action.course],
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    };
  } else if (action.type === REMOVE_COURSE) {
    return {
      selectedCourses: state.selectedCourses.filter((item, index) => {
        if(item.code === action.course.code) {
          return false;
        }
        return true;
      }),
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    }
  } else if (action.type === OPT_OUT_OF_COURSE) {
    for (let i = 0; i < state.optedOutCourses.length; i++) {
      if (action.course.code === state.optedOutCourses[i].code) {
        return state;
      }
    }
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: [...state.optedOutCourses, action.course],
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    };
  } else if (action.type === UPDATE_MAX_UNITS) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: action.units,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: true,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    }
  } else if (action.type === UPDATE_MIN_UNITS) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: action.units,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: true,
      major: state.major,
      track: state.track
    }
  } else if (action.type === UPDATE_SUMMER_PREF) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: action.isWilling,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    }
  } else if (action.type === UPDATE_PREREQ_PREF) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: action.shouldConsider,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: state.track
    }
  } else if (action.type === UPDATE_MAJOR) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: action.major,
      track: state.track
    }
  } else if (action.type === UPDATE_TRACK) {
    return {
      selectedCourses: state.selectedCourses,
      optedOutCourses: state.optedOutCourses,
      openEndedCourses: state.openEndedCourses,
      minUnitsPerQuarter: state.minUnitsPerQuarter,
      maxUnitsPerQuarter: state.maxUnitsPerQuarter,
      scheduleInSummer: state.scheduleInSummer,
      considerPrereqs: state.considerPrereqs,
      didEditMaxUnits: state.didEditMaxUnits,
      didEditMinUnits: state.didEditMinUnits,
      major: state.major,
      track: action.track
    }
  }
  return state;
};

export default scheduleReducer;
