export function getLastMonth() {
    const now = new Date();
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
      .split("/")
      .join("-");
  }
  export function getLastWeek() {
    const now = new Date();
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
      .split("/")
      .join("-");
  }
  export function getLastYear() {
    const now = new Date();
    return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
      .split("/")
      .join("-");
  }
  export function getDashedFormateDate(date:any) {
    return new Date(date).toLocaleDateString().split("/").join("-");
  }
  export function monthArrayFromRange(startDate:any, endDate:any) {
    var start = startDate.split("-");
    var end = endDate.split("-");
    var startYear = parseInt(start[0]);
    var endYear = parseInt(end[0]);
    var dates = [];
  
    for (var i = startYear; i <= endYear; i++) {
      var endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        var displayMonth = month < 10 ? "0" + month : month;
        dates.push([i, displayMonth, "01"].join("-"));
      }
    }
    return dates;
  }