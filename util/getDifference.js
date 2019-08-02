function getDifference(date1, date2) {
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms/1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60;
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60;
    var hours = Math.floor(difference_ms % 24);
    var days = Math.floor(difference_ms/24);
  
    var output = "";
    output += (days > 0) ? days + " days" : "";
    output += hours + " hours, ";
    output += minutes + " minutes, and ";
    output += seconds + " seconds.";
  
    return output;
  }
  
  module.exports = getDifference;
  