const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voicesSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init voices

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //Loop through voices
    voices.forEach(voice => {
        //Create option Element
        const option = document.createElement('option');
        //Fill option with voice and lang
        option.textContent = voice.name + '('+ voice.lang +')';
        //Set needed option attri
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voicesSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
    if(synth.speaking) {
        console.error('Already speeaking');
        return;
    }
    if(textInput.value !== ''){
        //Add background
        body.style.background = '#000 url(../Type-N-Speak
        /img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e => {
            console.log('Done Speaking');
            body.style.background = '#000';
        }

        //Speak error
        speakText.onerror = e => {
            console.error('Something went wrong');
        }

        //Selected voice
        const selectedVoice = voicesSelect.selectedOptions[0].getAttribute('data-name');
        //Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //Speak
        synth.speak(speakText);
    }
};

//Event Listener

//Text form submit
textForm.addEventListener('submit',e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate Value
rate.addEventListener('change',e => rateValue.textContent = rate.value);

//Pitch Value
pitch.addEventListener('change',e => pitchValue.textContent = pitch.value);

//voice select change
voicesSelect.addEventListener('change',e => speak());
