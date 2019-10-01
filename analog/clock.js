function transform(rotation) {
  return ["rotate(", rotation, ")"].join("");
}

function hoursToDegrees(hours) {
  return 360 * (hours / 24);
}

function sexagesimalToDegrees(sexagesimal) {
  return 360 * (sexagesimal / 60);
}

var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");

function updateClock() {
  var date = new Date();
  hours.setAttribute("transform", transform(hoursToDegrees(date.getHours())));
  minutes.setAttribute("transform", transform(sexagesimalToDegrees(date.getMinutes())));
  seconds.setAttribute("transform", transform(sexagesimalToDegrees(date.getSeconds())));
}

updateClock();
window.setInterval(updateClock, 500);
