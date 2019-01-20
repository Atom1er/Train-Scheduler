//Variables Initialization
var submit = $("#submit");
var TrainElements = $(".TrainElements");
var adminEntry = $(".adminEntry");
var NewTrainName = $("#NewTrainName");
var NewTrainDestination = $("#NewTrainDestination");
var NewTrainFirstTime = $("#NewTrainFirstTime");
var NewTrainFrequency = $("#NewTrainFrequency");
var trainDisplay = $("#trainDisplay");

var newTrain;
var newDestination;
var newTime;
var newFrequency;

//Live moment var
// var moment = moment();

// console.log(moment.format('MMMM Do YYYY, h:mm:ss a'));


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

var rootRef = firebase.database().ref();

AddTrain();
setInterval(scheduler, 1000);
// scheduler();


function AddTrain() {
  submit.on('click', function (even) {
    event.preventDefault();

    // console.log('New train added');
    newTrain = NewTrainName.val();
    // console.log(newTrain);
    newDestination = NewTrainDestination.val();
    // console.log(newDestination);
    newTime = NewTrainFirstTime.val();
    // console.log(newTime);
    newFrequency = NewTrainFrequency.val();
    // console.log(newFrequency);

    // FireBase data pushing
    rootRef.push({
      TrainName: newTrain,
      Destination: newDestination,
      FirstTime: newTime,
      Frequence: newFrequency
    });
    

  });
};

function scheduler() {

  //// Getting data from Firebase

  rootRef.on('value', function (snapshot) {
    trainDisplay.empty();
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      // console.log(childData);

      // console.log('Getting Train from Firebase');
      var Train = childData.TrainName;
      // console.log(Train);
      var Dest = childData.Destination;
      // console.log(Dest);
      var Time = childData.FirstTime;
      // console.log(Time);
      var Freq = childData.Frequence;
      // console.log(Freq); 

      var name = $("<div>");
      name.attr('class', 'col-3 Newtrain');
      name.append(Train);
      var destination = $("<div>");
      destination.attr('class', 'col-3 Newtrain');
      destination.append(Dest);
      var time = $("<div>");
      time.attr('class', 'col-3 Newtrain');

      
      var frequency = $("<div>");
      frequency.attr('class', 'col-3 Newtrain');
      
      var newrow = $("<div>");
      newrow.attr('class', 'row');
      
      ////////
     
      var hour = Time.slice(0, 2);
      var minute = Time.slice(2, 4);
      var T = ""+hour+':'+minute+"";
      var FormatFisrtT = moment(T, "HH:mm").subtract(1, "years");
      var diffTime = moment().diff(moment(FormatFisrtT), "minutes");
      var tMemory = diffTime % Freq;
      var WaitT = Freq - tMemory;
      var CommingTrain = moment().add(WaitT, "minutes");
      console.log("ARRIVAL TIME: " + moment(CommingTrain).format("hh:mm a"));
      frequency.append(WaitT);
      time.append(moment(CommingTrain).format("hh:mm a"));
      trainDisplay.append(name, destination, time, frequency);


    });
  });
}



