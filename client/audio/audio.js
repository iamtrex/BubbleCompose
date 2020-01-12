// GLOBALS
let MELODIES = [];
let EIGHTH = Tone.Time('4n').toSeconds();
let PAUSED = false;
let BPM = 60;

// PUBLIC FUNCTIONS

// play note immediately and trigger draw circle
function playNote(note) {
    console.log("Playing " + note.pitch);
    piano.triggerAttackRelease(note.pitch);
    // Tone.Draw(() => {
    //     drawShape() // TODO - Add draw function here
    // }); 
}

// add new melody to be looped
function addMelody(melody) {
    let loop = new Tone.Loop((time) => {
        let offset = time;
        for (let note of melody) {
            let pitch = note.pitch;
            console.log("Playing " + pitch);
            piano.triggerAttackRelease(pitch, "8n", offset);
            // Tone.Draw(() => {
            //     drawShape() // TODO - Add draw function here
            // }); 
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

// function getInstrument(name) {
//     instruments = new Map([
//         ["piano", piano]
//     ]);

//     return instruments[name];
// }

// function scheduleNotes() {
    // for (let loop in LOOPS) {
        // TODO
    // }
// }

// let sequence = new Tone.Sequence(
//     (time, note) => {
//         piano.triggerAttack(note);
//     },
//     notes,
//     "8n"
//     );
// sequence.start();

// function playSequences() {
//     let sequences = [
//         ["C4", "Eb4", "F4", "G4", "Bb4", "C5"],
//         ["Eb4", "Bb4", "C5", "F4", "C4", "G4"]
//     ];
//     sequences.forEach(playSequence);
// }

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