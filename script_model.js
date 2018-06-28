try {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 var words = ['company name is' , 'model is','manufacturing is']

 function randomWord() {
   var number = Math.floor(Math.random() * words.length);
   return number;
 }
   var word = words[randomWord()];

var grammar = '#JSGF V1.0; grammar word; public <word> = '+ word + ';'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
// recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var noteTextarea = $('#note-textarea');
var noteTextarea1 = $('#note-textarea1');
var noteTextarea2 = $('#note-textarea2');
var instructions = $('#recording-instructions');
var word_get = $('#rec-word');
var noteContent = '';


/*-----------------------------
      Voice Recognition
------------------------------*/


recognition.continuous = true;

// This block is called every time the Speech APi captures a line.
recognition.onresult = function(event) {

  // var current = event.resultIndex;

  // Get a transcript of what was said.

    var transcript = event.results[0][0].transcript;
    // word_get.text(transcript + " ; "+ word);
    var field = transcript.substr(0, transcript.indexOf(" is"));
    var fieldValue = transcript.substr(transcript.indexOf(" is") + 4);
    if(field ==='company name'){
      noteTextarea.val(fieldValue)
      recognition.stop();
    }
    else if (field ==='model name') {
      noteTextarea1.val(fieldValue)
      recognition.stop();
    }
    else if (field ==='manufacturing') {
      noteTextarea2.val(fieldValue)
      recognition.stop();
    }

    else {
      instructions.text('Please specify the field correctly');
      recognition.stop();
    }
};

recognition.onstart = function() {
  instructions.text('Speak to convert speech into text.');
}

// recognition.onspeechend = function() {
//   instructions.text('Done!');
// }

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
  };
}


$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});


$('#stop-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Stopped');
});

// Sync the text inside the text area with the noteContent variable.
// noteTextarea.on('input', function() {
//   noteContent = $(this).val();
// })
