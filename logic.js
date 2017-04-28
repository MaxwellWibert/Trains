var sv;
var svArr;

var config = {
  apiKey: "AIzaSyDTUpTtuct3PPe0LGU5sE14RK-Kw0buFWk",
  authDomain: "trains-3abdf.firebaseapp.com",
  databaseURL: "https://trains-3abdf.firebaseio.com",
  projectId: "trains-3abdf",
  storageBucket: "trains-3abdf.appspot.com",
  messagingSenderId: "943288087751"
};

firebase.initializeApp(config);

var database = firebase.database();

var name;
var destination;
var frequency;
var firstTrain;
var nextArrival;
var minutesAway;

$("#add-train").on("click", function(event){
  event.preventDefault();

  name = $("#name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#start").val().trim();
  firstMoment = moment(firstTrain, "HH:mm");
  
  frequency = parseInt($("#rate").val().trim());
  nextArrival = firstMoment;
  console.log(difference());
  
  while(difference()<= 0){
    nextArrival = nextArrival.add(frequency, "minutes");
  }

  console.log(difference());

  database.ref().push({
    name,
    destination,
    frequency,
    firstTrain,
    nextArrival,
    minutesAway
  });
});

database.ref().on("child_added", function(childSnapshot){
  let name = childSnapshot.val().name;
  let role = childSnapshot.val().role; 
  let startDate = childSnapshot.val().startData; 
  let rate = childSnapshot.val().rate; 
  let elapsed = childSnapshot.val().elapsed;
  let totalBilled = childSnapshot.val().totalBilled;

  var newRow = $("<tr>");
  var newName = $("<td>");
  newName.html(name);
  var newRole = $("<td>");
  newRole.html(role);
  var newStart = $("<td>");
  newStart.html(startDate);
  var newRate = $("<td>");
  newRate.html(rate);
  var newElapsed = $("<td>");
  newElapsed.html(elapsed)
  var newTotal = $("<td>");
  newTotal.html(totalBilled);

  newRow.append(newName);
  newRow.append(newRole);
  newRow.append(newStart);
  newRow.append(newRate);
  newRow.append(newElapsed);
  newRow.append(newTotal);

  $("#squad-up").append(newRow);
});

function difference(){
  console.log(nextArrival);
  return nextArrival.subtract(moment(), "minutes");
}



