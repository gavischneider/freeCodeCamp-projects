// Global Variables
let timeAfterPause;
let myTimer;
let myBreakTimer;
let startingTime = '25:00';
let breakTime = '5:00';
let breakTimeLeft;

// Flags
let sessionStarted = false;
let paused = false;
let breakFlag = false;
let clockRunningFlag = false;


// Add event listener to start/stop button
$('#start_stop').on('click', function () {
  console.log('made it here....');
  if (breakFlag && !paused) {
    // We need to pause a break
    breakTimeLeft = $('#time-left').text();
    paused = true;
    clockRunningFlag = false;
    clearInterval(myBreakTimer);
    return;
  }
  if (breakFlag && paused) {
    // We need to resume a break;
    paused = false;
    clockRunningFlag = true;
    breakTime = breakTimeLeft;
    handleBreak();
  }
  if (sessionStarted && !paused) {
    // We need to pause a session
    paused = true;
    clockRunningFlag = false;
    handlePause();
  } else if (sessionStarted && paused) {
    // We need to resume a session
    paused = false;
    clockRunningFlag = true;
    handleStart();
  } else {
    // We need to start a session
    sessionStarted = true;
    clockRunningFlag = true;
    handleStart();
  }
});


// Start a new session
function handleStart() {
  clockRunningFlag = true;
  $('#timer-label').text('Session');
  // Update the count down every 1 second
  myTimer = setInterval(function () {
    let timeLeft = $('#time-left').text();
    let timeArray = timeLeft.split(/[:]+/);
    let minutes = timeArray[0];
    let seconds = checkSecond(timeArray[1] - 1);
    if (seconds == 59) {
      minutes = minutes - 1;
    }

    if (minutes == 0 && seconds == 0) {
      playAudio();
    }
    //Check if timer is done
    if (minutes == -1 && seconds == 59) {
      sessionStarted = false;
      clearInterval(myTimer);
      handleBreak();
      return;
    }
    $('#time-left').text(minutes + ":" + seconds);
    console.log('mins:secs ' + minutes + ' : ' + seconds);
  }, 1000);
};

// When the user pauses a session
function handlePause() {
  // Store how much time is left
  timeAfterPause = $('#time-left').text();
  clearInterval(myTimer); //-//-//
};

// Add event listener to reset button
$('#reset').on('click', function () {
  $('#session-length').text(25);
  $('#break-length').text(5);
  sessionStarted = false;
  paused = false;
  breakFlag = false;
  clearInterval(myTimer);
  clockRunningFlag = false;
  $('#time-left').text('25:00');
});

// When a session ends and a break starts
function handleBreak() {
  clockRunningFlag = true;
  breakFlag = true;
  $('#timer-label').text('Break');
  sessionStarted = true;
  $('#time-left').text($('#break-length').text() + ':00');
  // Update the count down every 1 second
  myBreakTimer = setInterval(function () {
    let timeLeft = $('#time-left').text();
    let timeArray = timeLeft.split(/[:]+/);
    let minutes = timeArray[0];
    let seconds = checkSecond(timeArray[1] - 1);
    if (seconds == 59) {
      minutes = minutes - 1;
    }
    if (minutes == 0 && seconds == 0) {
      playAudio();
    }
    //Check if timer is done
    if (minutes == -1 && seconds == 59) {
      //sessionStarted = false;
      clearInterval(myBreakTimer);
      $('#time-left').text(startingTime);
      breakFlag = false;
      handleStart();
      return;
    }
    $('#time-left').text(minutes + ":" + seconds);
    console.log('Break mins:secs ' + minutes + ' : ' + seconds);
  }, 1000);
};

// Check the second
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }; // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  };
  return sec;
}

// Add event listener to the break decrement button
$('#break-decrement').on('click', function () {
  if (!clockRunningFlag) {
    let cur = $('#break-length').text();
    if (cur > 1) {
      $('#break-length').text(cur - 1);
    }
  }
});

// Add event listener to the break increment button
$('#break-increment').on('click', function () {
  if (!clockRunningFlag) {
    let cur = $('#break-length').text();
    if (cur < 60) {
      $('#break-length').text(Number(cur) + 1);
    }
  }
});

// Add event listener to the session decrement button
$('#session-decrement').on('click', function () {
  if (!clockRunningFlag) {
    let cur = $('#session-length').text();
    if (cur > 1) {
      $('#session-length').text(cur - 1);
      $('#time-left').text(cur - 1 + ':00');
      startingTime = cur - 1 + ':00';
    }
  }
});

// Add event listener to the session increment button
$('#session-increment').on('click', function () {
  if (!clockRunningFlag) {
    let cur = $('#session-length').text();
    if (cur < 60) {
      $('#session-length').text(Number(cur) + 1);
      $('#time-left').text(Number(cur) + 1 + ':00');
      startingTime = Number(cur) + 1 + ':00';
    }
  }
});

// Function to play the audio
function playAudio() {
  let audio = $('#beep');
  audio.trigger("play");

  setTimeout(function () {
    audio.trigger("pause");
  }, 2000);
}