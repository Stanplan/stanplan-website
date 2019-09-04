class Quarter {
  constructor (obj) {
    this.label = obj["quarter"];
    this.totalUnits = obj["units"];
    let courses = [];
    for (let i = 0; i < obj["courses"].length; i++) {
      courses.push(obj["courses"][i]);
    }
    this.courses = courses;
    this.json = obj;
  }
}

export default Quarter;
