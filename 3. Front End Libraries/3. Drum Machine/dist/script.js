const letters = [
{
  letter: "Q",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  description: "Heater-1" },

{
  letter: "W",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  description: "Heater-2" },

{
  letter: "E",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  description: "Heater-3" },

{
  letter: "A",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  description: "Heater-4" },

{
  letter: "S",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  description: "Heater-6" },

{
  letter: "D",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  description: "Dsc-Oh" },

{
  letter: "Z",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  description: "Kick-n-Hat" },

{
  letter: "X",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  description: "Chord-1" },

{
  letter: "C",
  source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  description: "Cev-H2" }];



class App extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "title-text" },
      React.createElement("h1", null, "Drum Machine")),

      React.createElement(DrumSet, null)));


  }}


class DrumSet extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "display" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("div", { className: "drum-container" },
      React.createElement("div", { className: "row" },
      React.createElement(DrumPad, { letter: letters[0].letter }),
      React.createElement(DrumPad, { letter: letters[1].letter }),
      React.createElement(DrumPad, { letter: letters[2].letter })),

      React.createElement("div", { className: "row" },
      React.createElement(DrumPad, { letter: letters[3].letter }),
      React.createElement(DrumPad, { letter: letters[4].letter }),
      React.createElement(DrumPad, { letter: letters[5].letter })),

      React.createElement("div", { className: "row" },
      React.createElement(DrumPad, { letter: letters[6].letter }),
      React.createElement(DrumPad, { letter: letters[7].letter }),
      React.createElement(DrumPad, { letter: letters[8].letter })))));




  }}


class DrumPad extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "drum-pad", id: this.props.letter },
      React.createElement("button", { className: "drum-btn", id: this.props.letter }, this.props.letter)));


  }}


// Adding event listeners for when the user clicks on the drums
$(document).ready(function () {
  const buttons = document.querySelectorAll('.drum-pad');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mousedown', function () {
      let drumSelected = this.id;
      for (let j = 0; j < letters.length; j++) {
        if (drumSelected === letters[j].letter) {
          let dr = document.createElement('audio');
          dr.src = letters[j].source;
          $('#display').html(letters[j].description);
          dr.play();
        }
      }
    });
  }
});

// Empty the display after a click
$(document).ready(function () {
  document.addEventListener('mouseup', function () {
    $("#display").empty();
  });
});

// Adding event listeners for when the user presses on the keyboard
$(document).ready(function () {
  document.addEventListener("keydown", function (event) {
    let keyPressed = event.key;
    for (let k = 0; k < letters.length; k++) {
      let btn = letters[k].letter.toString().toLowerCase();
      if (keyPressed === btn) {
        let dr = document.createElement('audio');
        dr.src = letters[k].source;
        dr.play();
      }
    }
  });
});

// Empty the display after a keypress
$(document).ready(function () {
  document.addEventListener('keyup', function () {
    $("#display").empty();
  });
});

React.render(React.createElement(App, null), document.getElementById('root'));