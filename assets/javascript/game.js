//Variables Initialization
var submit = $("#submit");
var TrainElements = $(".TrainElements");
var adminEntry = $(".adminEntry");
var NewTrainName = $("#NewTrainName");
var NewTrainDestination = $("#NewTrainDestination");
var NewTrainFirstTime = $("#NewTrainFirstTime");
var NewTrainFrequency = $("#NewTrainFrequency");
var trainDisplay = $("#trainDisplay");
//Firebase Initialization 
var config = {
    apiKey: "AIzaSyDm2oO8wMBiTUpR60mJtuuCtna9gmSWMTo",
    authDomain: "train-scheduler-8b572.firebaseapp.com",
    databaseURL: "https://train-scheduler-8b572.firebaseio.com",
    projectId: "train-scheduler-8b572",
    storageBucket: "train-scheduler-8b572.appspot.com",
    messagingSenderId: "988482597839"
  };
  firebase.initializeApp(config);

  //New train adding function

  function AddTrain(){
      submit.on('click', function(even){
        event.preventDefault();
        console.log('New train added');
        var newTrain = NewTrainName.val();
        console.log(newTrain);
        var newDestination = NewTrainDestination.val();
        console.log(newDestination);
        var newTime = NewTrainFirstTime.val();
        console.log(newTime);
        var newFrequency = NewTrainFrequency.val();
        console.log(newFrequency);
        var name = $("<div>");
        name.attr('class', 'col-3');
        name.append(newTrain);
        var destination = $("<div>");
        destination.attr('class', 'col-3');
        destination.append(newDestination);
        var time = $("<div>");
        time.attr('class', 'col-3');
        time.append(newTime);
        var frequency = $("<div>");
        frequency.attr('class', 'col-3');
        frequency.append(newFrequency);
        var newrow = $("<div>");
        newrow.attr('class', 'row');
        trainDisplay.append(name, destination, time, frequency);
        // trainDisplay.append(newrow);

      });
  };

  AddTrain();
