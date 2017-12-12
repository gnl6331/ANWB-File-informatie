/*
Variables for the time display
*/

let today = new Date();
let currentHours = (today.getHours()<10?'0':'') + today.getHours();
let currentMinutes = (today.getMinutes()<10?'0':'') + today.getMinutes();
let timeNow = "Laatste update " + currentHours + ":" + currentMinutes;

// Function for writing to the writeToDocument
function writeToDocument(idInTheDocument, variableInJsFile) {
  document.getElementById(idInTheDocument).innerHTML = variableInJsFile;
};
