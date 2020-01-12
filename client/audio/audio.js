// GLOBALS
// const MIN_NOTE = 48;
// const MAX_NOTE = 84;
// let INTERVALS = [3, 2, 2, 3, 2];
// let MELODIES = [];
let eighth = Tone.Time('4n').toSeconds();
let PAUSED = false;

// DATA STRUCTURES
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }

// class Shape {
//     constructor() {
//         this.client = 0;
//         this.instrument = "piano";
//         this.color = "color";
//         this.points = [];
//         this.notes = [];
//     }
// }

// PUBLIC FUNCTIONS

// play note immediately and trigger draw circle
function playNote() {
    console.log("Play note");
    let note = {
        pitch: "C4"
    }
    piano.triggerAttackRelease(note.pitch);
    // Tone.Draw(draw(note)); // TODO - Add draw function here
}

function newMelody() {
    console.log("New melody");
    let melody = {
        pitches: ["C4", "Eb4", "F4", "G4", "Bb4", "C5"]
    }
    melody.loop = new Tone.Loop((time) => {
        let offset = time;
        for (let pitch of melody.pitches) {
            console.log(pitch, offset);
            piano.triggerAttackRelease(pitch, "8n", offset);
            offset += eighth;
        }
        // Tone.Draw(draw(note)); // TODO - Add draw function here
    }, 7)
    melody.loop.start();
    // MELODIES.push(melody);
}

// PRIVATE FUNCTIONS
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

// AT LOAD
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
    "baseUrl" : "./samples/salamander/"
}).connect(reverb);
reverb.generate();
Tone.Transport.bpm = 60;
Tone.Transport.start();
console.log("Starting transport");