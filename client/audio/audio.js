// GLOBALS
let MELODIES = []; // [ { melody, loop }, ... ]
let EIGHTH = Tone.Time('4n').toSeconds();
let PAUSED = false;
let BPM = 60;

// PUBLIC FUNCTIONS

// play note immediately and trigger draw circle
function playNote(note) {
    Tone.start();
    console.log("Playing " + note.pitch);
    let freq = noteToFreq(note.pitch);
    piano.triggerAttackRelease(freq);
    Tone.Draw.schedule(() => {
        drawShape(note);
    }); 
}

// add new melody to be looped
function addMelody(melody) {
    Tone.start();
    let loop = new Tone.Loop((time) => {
        let offset = time;
        for (let note of melody) {
            let pitch = note.pitch;
            console.log("Playing " + pitch);
            let freq = noteToFreq(note.pitch);
            piano.triggerAttackRelease(freq, "8n", offset);
            Tone.Draw.schedule(() => {
                drawShape(note);
            }); 
            offset += EIGHTH;
        }
    });
    loop.interval = (EIGHTH * melody.length) + 2 + (Math.random() * EIGHTH);
    loop.start();
    MELODIES.push({
        melody: melody,
        loop: loop 
    });
}

// pause/resume playing
function pause() {
    if (PAUSED) {
        console.log("Starting transport");
        Tone.Transport.start();
        PAUSED = false;
    } else {
        console.log("Stopping transport");
        Tone.Transport.pause();
        PAUSED = true;
    }
}

// TEST FUNCTIONS

// play note immediately and trigger draw circle
function testPlayNote() {
    let note = {
        pitch: "C4"
    }
    playNote(note);
}

function testNewMelody() {
    let pitches = ["C4", "Eb4", "F4", "G4", "Bb4", "C5"];
    let melodyLength = getRandomIntInclusive(4, 7);
    let melody = []
    for (let i=0; i < melodyLength; i++) {
        melody.push({pitch: pitches[getRandomIntInclusive(0, 5)]});
    }
    addMelody(melody);
    console.log(melody);
}

// PRIVATE FUNCTIONS
function getRandomIntInclusive(min, max) { // credit to MDN
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

function noteToFreq(noteNumber) {
    let mapping = {1: 16.35, 2: 17.32, 3: 18.35, 4: 19.45, 5: 20.6, 6: 21.83, 7: 23.12, 8: 24.5, 9: 25.96, 10: 27.5, 11: 29.14, 12: 30.87, 13: 32.7, 14: 34.65, 15: 36.71, 16: 38.89, 17: 41.2, 18: 43.65, 19: 46.25, 20: 49.0, 21: 51.91, 22: 55.0, 23: 58.27, 24: 61.74, 25: 65.41, 26: 69.3, 27: 73.42, 28: 77.78, 29: 82.41, 30: 87.31, 31: 92.5, 32: 98.0, 33: 103.83, 34: 110.0, 35: 116.54, 36: 123.47, 37: 130.81, 38: 138.59, 39: 146.83, 40: 155.56, 41: 164.81, 42: 174.61, 43: 185.0, 44: 196.0, 45: 207.65, 46: 220.0, 47: 233.08, 48: 246.94, 49: 261.63, 50: 277.18, 51: 293.66, 52: 311.13, 53: 329.63, 54: 349.23, 55: 369.99, 56: 392.0, 57: 415.3, 58: 440.0, 59: 466.16, 60: 493.88, 61: 523.25, 62: 554.37, 63: 587.33, 64: 622.25, 65: 659.25, 66: 698.46, 67: 739.99, 68: 783.99, 69: 830.61, 70: 880.0, 71: 932.33, 72: 987.77, 73: 1046.5, 74: 1108.73, 75: 1174.66, 76: 1244.51, 77: 1318.51, 78: 1396.91, 79: 1479.98, 80: 1567.98, 81: 1661.22, 82: 1760.0, 83: 1864.66, 84: 1975.53, 85: 2093.0, 86: 2217.46, 87: 2349.32, 88: 2489.02, 89: 2637.02, 90: 2793.83, 91: 2959.96, 92: 3135.96, 93: 3322.44, 94: 3520.0, 95: 3729.31, 96: 3951.07, 97: 4186.01, 98: 4434.92, 99: 4698.63, 100: 4978.03, 101: 5274.04, 102: 5587.65, 103: 5919.91, 104: 6271.93, 105: 6644.88, 106: 7040.0, 107: 7458.62, 108: 7902.13};
    return mapping[noteNumber];
}

// AT LOAD

// Convolver didn't make any noise
// let reverb = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/icel.wav').toMaster();
let reverb = new Tone.Reverb().toMaster();
let piano = new Tone.Sampler({
    "A0" : "A0.[mp3|ogg]",
    "C1" : "C1.[mp3|ogg]",
    "D#1" : "Ds1.[mp3|ogg]",
    "F#1" : "Fs1.[mp3|ogg]",
    "A1" : "A1.[mp3|ogg]",
    "C2" : "C2.[mp3|ogg]",
    "D#2" : "Ds2.[mp3|ogg]",
    "F#2" : "Fs2.[mp3|ogg]",
    "A2" : "A2.[mp3|ogg]",
    "C3" : "C3.[mp3|ogg]",
    "D#3" : "Ds3.[mp3|ogg]",
    "F#3" : "Fs3.[mp3|ogg]",
    "A3" : "A3.[mp3|ogg]",
    "C4" : "C4.[mp3|ogg]",
    "D#4" : "Ds4.[mp3|ogg]",
    "F#4" : "Fs4.[mp3|ogg]",
    "A4" : "A4.[mp3|ogg]",
    "C5" : "C5.[mp3|ogg]",
    "D#5" : "Ds5.[mp3|ogg]",
    "F#5" : "Fs5.[mp3|ogg]",
    "A5" : "A5.[mp3|ogg]",
    "C6" : "C6.[mp3|ogg]",
    "D#6" : "Ds6.[mp3|ogg]",
    "F#6" : "Fs6.[mp3|ogg]",
    "A6" : "A6.[mp3|ogg]",
    "C7" : "C7.[mp3|ogg]",
    "D#7" : "Ds7.[mp3|ogg]",
    "F#7" : "Fs7.[mp3|ogg]",
    "A7" : "A7.[mp3|ogg]",
    "C8" : "C8.[mp3|ogg]"
}, {
    "release" : 1,
    "baseUrl" : "./audio/samples/salamander/"
}).connect(reverb);
reverb.generate();
Tone.Transport.bpm = BPM;
Tone.Transport.start();
console.log("Starting transport");