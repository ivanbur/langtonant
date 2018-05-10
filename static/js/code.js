var randomNames = [];
var allNames = [];
var amountOfPeople = 1;


function enterButton() {

  randomNames = [];
  allNames = [];

  for (var names = 1; names <= amountOfPeople; names++) {
    allNames.push($("#text" + names).val());
  }

  for (var i = 0; i < amountOfPeople; i++) {
    var arrayNumber = Math.floor(Math.random() * allNames.length);

    randomNames.push(allNames[arrayNumber]);

    allNames.splice(arrayNumber, 1);
  }

  console.log(randomNames);

  for (var j = 0; j < randomNames.length; j++) {
    if (j != (randomNames.length - 1) ) {
      console.log(randomNames[j] + "-" + randomNames[j + 1]);
    } else {
      console.log(randomNames[j] + "-" + randomNames[0]);
    }
  }

  sendMail();
};


function sendMail() {
  for (var k = 0; k < randomNames.length; k++) {
    if (k != (randomNames.length - 1) ) {
        emailjs.send("default_service","secret_santa",{
        email: randomNames[k], 
        bodyText: randomNames[k + 1]
      });
    } else {
      emailjs.send("default_service","secret_santa",{
        email: randomNames[k], 
        bodyText: randomNames[0]
      });
    }
  }

  console.log("Sent!");
  displaySent();
    
}


function displaySent() {
  $("button").remove();
  $("body").append("<br/><h1 font-family = 'Verdana' style = 'text-align:center'>Sent!</h1>")
}


$(document).ready(function() {

  $("#numberOfPeopleButton").click(function() {
    do {
      amountOfPeople = prompt("How many people are participating?");
    } while (amountOfPeople <= 0 || amountOfPeople > 20 || isNaN(amountOfPeople))

    for (var i = 1; i <= amountOfPeople; i++) {
        $("body").append("<br/><div>Person " + i + "\'s email: <input id = 'text" + i + "' type = 'text' align = 'center'/></div><br/><br/>")
    }

    $("button").remove();
    $("body").append("<br/><br/><button id = 'enterButton' type = 'button' align = 'center' onclick='enterButton()'>Enter</button>")
  });
});