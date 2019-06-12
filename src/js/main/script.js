var audio = document.getElementById("audio");
var el = Object.values(document.querySelectorAll("span"));
var times = el.map(span => Number(span.dataset.timing));
var previousDialogueTime = -1;

// Every time the audio time updates, run the function
audio.ontimeupdate = function() {
  playTranscript();
};

function playTranscript() {
  // Show current audio time
  document.getElementById("pre").innerHTML = audio.currentTime;

  // Determine the current dialogue time window
  // The approach is filter the array of timings based on the current audio time, and then take the max of those values,
  var currentDialogueTime = Math.max.apply(
    Math,
    times.filter(function(v) {
      return v <= audio.currentTime;
    })
  );

  if (previousDialogueTime !== currentDialogueTime) {
    previousDialogueTime = currentDialogueTime;
    // Based on the assumption that the array of times, and array of elements is in the same order,
    // grab the corresponding element based on where the current audio time is.
    var currentDialogue = el[times.indexOf(currentDialogueTime)];
    var previousDialogue = document.getElementsByClassName("active")[0];
    if (previousDialogue !== undefined)
      previousDialogue.className = previousDialogue.className.replace(
        "active",
        ""
      );
    currentDialogue.className += " active";
  }
}
