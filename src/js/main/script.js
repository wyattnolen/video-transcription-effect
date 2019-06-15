var playButton = document.getElementById("play");
var audio = document.getElementById("audio");
var pList = Object.values(document.querySelectorAll("p.speech"));
var pListTimes = pList.map(p => Number(p.lastElementChild.dataset.timing));
var spanList = Object.values(document.querySelectorAll("span"));
var spanListTimes = spanList.map(span => Number(span.dataset.timing));
var previousDialogueTime = -1;

playButton.addEventListener("click", function() {
  document.getElementsByClassName("header")[0].classList.add("header--pinned");
  document.getElementsByClassName("speech__holder")[0].classList.add("active");
  document
    .getElementsByClassName("audio-holder")[0]
    .classList.add("audio-holder--active");
  audio.play();
});

audio.ontimeupdate = function() {
  playTranscript();
};

function getCurrentDialogueTime(listOfTimes) {
  var currentDialogueTime = Math.max.apply(
    Math,
    listOfTimes.filter(function(v) {
      return v <= audio.currentTime;
    })
  );
  return currentDialogueTime;
}

function playTranscript() {
  var timeWindow = getCurrentDialogueTime(spanListTimes);
  if (previousDialogueTime !== timeWindow) {
    previousDialogueTime = timeWindow;
    var currentDialogue = spanList[spanListTimes.indexOf(timeWindow)];
    var previousDialogue = document.getElementsByClassName("current")[0];
    if (previousDialogue !== undefined) {
      previousDialogue.parentNode.parentNode.className = "speech";
      previousDialogue.className = previousDialogue.className.replace(
        "current",
        ""
      );
    }
    currentDialogue.parentNode.parentNode.className += " speech--current";
    currentDialogue.className += "current";
  }
}
