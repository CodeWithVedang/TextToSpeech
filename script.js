
const textToSpeechTextarea = document.getElementById('text-to-speech');
const speakButton = document.getElementById('speak-btn');
const voiceSelect = document.getElementById('voice-select');
const errorMsg = document.getElementById('error-msg');

// Check if speech synthesis is supported
if (!window.speechSynthesis) {
  errorMsg.textContent = 'Sorry, your browser does not support speech synthesis.';
  errorMsg.style.display = 'block';
}

// Populate voice selection dropdown
function populateVoiceList() {
  const voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Speak function
function speak(text) {
  const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  voices.forEach(voice => {
    if (voice.name === selectedVoice) {
      utterance.voice = voice;
    }
  });
  window.speechSynthesis.speak(utterance);
}

// Event listener for speak button
speakButton.addEventListener('click', () => {
  const text = textToSpeechTextarea.value;
  speak(text);
});
