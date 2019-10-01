function pad(value) {
  return value > 9 ? value : "0" + value;
}

function getTime() {
  var date = new Date();
  var hours = pad(date.getHours());
  var minutes = pad(date.getMinutes());
  var seconds = pad(date.getSeconds());
  var sep = date.getMilliseconds() >= 500 ? ":" : " ";
  return [hours, sep, minutes, sep, seconds].join("");
}

const node = document.getElementById("time");
function updateTimer() {
  node.innerHTML = getTime();
}

updateTimer();
window.setInterval(updateTimer, 300);
