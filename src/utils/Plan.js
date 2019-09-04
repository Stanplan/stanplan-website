import Year from './Year';

class Plan {
  constructor (json) {
    let years = [];
    for (let i = 0; i < json.length; i++) {
      years.push(new Year(json[i]));
    }
    this.years = years;
    this.json = json;
  }

  getCSV() {
    let csv = "";
    for (let i = 0; i < this.years.length; i++) {
      csv += "\n" + this.years[i].getCSV();
    }
    return csv;
  }
}

export default Plan;
