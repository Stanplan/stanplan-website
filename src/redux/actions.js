// Authentication
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

// Scheduling
export const ADD_COURSE = 'ADD_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const OPT_OUT_OF_COURSE = 'OPT_OUT_OF_COURSE';
export const ADD_OPEN_ENDED_COURSE = 'ADD_OPEN_ENDED_COURSE';
export const REMOVE_OPEN_ENDED_COURSE = 'REMOVE_OPEN_ENDED_COURSE';
export const UPDATE_OPEN_ENDED_COURSE = 'UPDATE_OPEN_ENDED_COURSE';
export const UPDATE_MAX_UNITS = 'UPDATE_MAX_UNITS';
export const UPDATE_MIN_UNITS = 'UPDATE_MIN_UNITS';
export const UPDATE_SUMMER_PREF = 'UPDATE_SUMMER_PREF';
export const UPDATE_PREREQ_PREF = 'UPDATE_PREREQ_PREF';
export const UPDATE_MAJOR = 'UPDATE_MAJOR';
export const UPDATE_TRACK = 'UPDATE_TRACK';

// ----------------
// Authentication
// ----------------
export function loggedIn(email) {
  return { type: LOGGED_IN, email }
}

export function loggedOut() {
  return { type: LOGGED_OUT }
}

// -------------
// Scheduling
// -------------
export function addCourse(course) {
  return { type: ADD_COURSE, course }
};

export function removeCourse(course) {
  return { type: REMOVE_COURSE, course }
};

export function optOutOfCourse(course) {
  return { type: OPT_OUT_OF_COURSE, course }
};

export function addOpenEndedCourse(course) {
  return { type: ADD_OPEN_ENDED_COURSE, course }
};

export function removeOpenEndedCourse(course) {
  return { type: REMOVE_OPEN_ENDED_COURSE, course }
};

export function updateOpenEndedCourse(course) {
  return { type: UPDATE_OPEN_ENDED_COURSE, course }
};

export function updateMaxUnits(units) {
  return { type: UPDATE_MAX_UNITS, units }
};

export function updateMinUnits(units) {
  return { type: UPDATE_MIN_UNITS, units }
};

export function updateSummerPreference(isWilling) {
  return { type: UPDATE_SUMMER_PREF, isWilling }
};

export function updatePrereqPreference(shouldConsider) {
  return { type: UPDATE_PREREQ_PREF, shouldConsider }
};

export function updateMajor(major) {
  return { type: UPDATE_MAJOR, major }
};

export function updateTrack(track) {
  return { type: UPDATE_TRACK, track }
};
