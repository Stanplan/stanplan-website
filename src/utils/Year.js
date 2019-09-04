import Quarter from './Quarter';

class Year {
  constructor (obj) {
    this.label = obj["year"];
    let quarters = [];
    for (let i = 0; i < obj["quarters"].length; i++) {
      quarters.push(new Quarter(obj["quarters"][i]));
    }
    this.quarters = quarters;
    this.json = obj;
  }

  getCSV() {
    let csv = "";
    let courseLists = [];
    let maxNumCourses = 0;
    for (let i = 0; i < this.quarters.length; i++) {
      csv += ("," + this.quarters[i].label + ",");
      courseLists.push(this.quarters[i].courses);
      if (this.quarters[i].courses.length > maxNumCourses) {
        maxNumCourses = this.quarters[i].courses.length;
      }
    }
    csv += "\n" + this.label + "\n";

    for (let i = 0; i < maxNumCourses; i++) {
      for (let j = 0; j < courseLists.length; j++) {
        let courseList = courseLists[j];
        if (i >= courseList.length) {
          csv += ", ,";
        } else {
          let course = courseList[i];
          csv += "," + course["code"] + "," + course["units"];
        }
      }
      csv += "\n";
    }
    console.log(csv);
    return csv;
  }
}

export default Year;
