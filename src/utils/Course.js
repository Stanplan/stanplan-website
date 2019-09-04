// Class representing a course.
class Course {
  constructor(code, title, units, description, required) {
    this.code = code;
    this.title = title;
    this.units = units;
    this.description = description;
    this.required = required;
  }
}

export default Course;
