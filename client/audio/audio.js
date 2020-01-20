// GLOBALS
let MELODIES = []; // [ { melody, loop }, ... ]
let EIGHTH = Tone.Time('4n').toSeconds();
let PAUSED = false;
let BPM = 60;

// RUN AT LOAD

let vae = new mm.MusicVAE('https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_vae/mel_2bar_small');
vae.initialize();

let reverb = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/icel.wav').toMaster()
let instruments = {
    "piano": new Tone.Sampler({
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
    }).connect(reverb),
    violin: new Tone.Sampler({
        "A#4" : "violin_As4_025_piano_pizz-normal.mp3",
        "A#5" : "violin_As5_025_piano_pizz-normal.mp3",
        "B4" : "violin_B4_025_piano_pizz-normal.mp3",
        "B5" : "violin_B5_025_piano_pizz-normal.mp3",
        "C5" : "violin_C5_025_piano_pizz-normal.mp3",
        "C#4" : "violin_Cs4_025_piano_pizz-normal.mp3",
        "C#5" : "violin_Cs5_025_piano_pizz-normal.mp3",
        "C#6" : "violin_Cs6_025_piano_pizz-normal.mp3",
        "D4" : "violin_D4_025_piano_pizz-normal.mp3",
        "D6" : "violin_D6_025_piano_pizz-normal.mp3",
        "D#5" : "violin_Ds5_025_piano_pizz-normal.mp3",
        "E4" : "violin_E4_025_piano_pizz-normal.mp3",
        "E5" : "violin_E5_025_piano_pizz-normal.mp3",
        "F4" : "violin_F4_025_piano_pizz-normal.mp3",
        "F#4" : "violin_Fs4_025_piano_pizz-normal.mp3",
        "G3" : "violin_G3_025_piano_pizz-normal.mp3",
        "G4" : "violin_G4_025_piano_pizz-normal.mp3",
        "G6" : "violin_G6_025_piano_pizz-normal.mp3",
        "G#3" : "violin_Gs3_025_piano_pizz-normal.mp3",
        "G#5" : "violin_Gs5_025_piano_pizz-normal.mp3",
        "G#6" : "violin_Gs6_025_piano_pizz-normal.mp3"
    }, {
        "release" : 1,
        "baseUrl" : "./audio/samples/violin/"        
    }).connect(reverb),
    flute: new Tone.Sampler({
        "E6" : "flute_E6_15_piano_normal.mp3",
        "A4" : "flute_A4_15_piano_normal.mp3",
        "A5" : "flute_A5_15_piano_normal.mp3",
        "A6" : "flute_A6_15_piano_normal.mp3",
        "A#4" : "flute_As4_15_piano_normal.mp3",
        "A#5" : "flute_As5_15_piano_normal.mp3",
        "A#6" : "flute_As6_15_piano_normal.mp3",
        "B4" : "flute_B4_15_piano_normal.mp3",
        "B5" : "flute_B5_15_piano_normal.mp3",
        "B6" : "flute_B6_15_piano_normal.mp3",
        "C4" : "flute_C4_15_piano_normal.mp3",
        "C5" : "flute_C5_15_piano_normal.mp3",
        "C7" : "flute_C7_15_piano_normal.mp3",
        "C#4" : "flute_Cs4_15_piano_normal.mp3",
        "C#5" : "flute_Cs5_15_piano_normal.mp3",
        "C#6" : "flute_Cs6_15_piano_normal.mp3",
        "C#7" : "flute_Cs7_15_piano_normal.mp3",
        "D4" : "flute_D4_15_piano_normal.mp3",
        "D5" : "flute_D5_15_piano_normal.mp3",
        "D6" : "flute_D6_15_piano_normal.mp3",
        "D7" : "flute_D7_15_piano_normal.mp3",
        "D#4" : "flute_Ds4_15_piano_normal.mp3",
        "D#5" : "flute_Ds5_15_piano_normal.mp3",
        "D#6" : "flute_Ds6_15_piano_normal.mp3",
        "D#7" : "flute_Ds7_15_piano_normal.mp3",
        "E4" : "flute_E4_15_piano_normal.mp3",
        "E5" : "flute_E5_15_piano_normal.mp3",
        "E7" : "flute_E7_15_piano_normal.mp3",
        "F4" : "flute_F4_15_piano_normal.mp3",
        "F5" : "flute_F5_15_piano_normal.mp3",
        "F6" : "flute_F6_15_piano_normal.mp3",
        "F#4" : "flute_Fs4_15_piano_normal.mp3",
        "F#5" : "flute_Fs5_15_piano_normal.mp3",
        "F#6" : "flute_Fs6_15_piano_normal.mp3",
        "G4" : "flute_G4_15_piano_normal.mp3",
        "G5" : "flute_G5_15_piano_normal.mp3",
        "G6" : "flute_G6_15_piano_normal.mp3",
        "G#4" : "flute_Gs4_15_piano_normal.mp3",
        "G#5" : "flute_Gs5_15_piano_normal.mp3",
        "G#6" : "flute_Gs6_15_piano_normal.mp3"
    }, {
        "release" : 1,
        "baseUrl" : "./audio/samples/flute/"        
    }).connect(reverb)
};
Tone.Transport.bpm = BPM;
instruments.flute.volume.value = 8;
console.log("Starting transport");
Tone.Transport.start();

// PUBLIC FUNCTIONS

// play note immediately and trigger draw circle
function playNote(note) {
    Tone.start();
    let freq = noteToFreq(note.pitch);
    console.log("Playing " + note.pitch + ", " + freq);
    instruments[note.instrument].triggerAttackRelease(freq);
    Tone.Draw.schedule(() => {
        drawShape(note);
    }); 
}

// add new melody to be looped
function addMelody(melody, isClientSide = false) {
    if (!melody || melody.length === 0) {
        return;
    }
    Tone.start();
    let melodyObj = {
        melody: melody,
    };
    let loop = new Tone.Loop((time) => {
        let melodyPromise = Promise.resolve(melody);
        if (melodyObj.index && melodyObj.index > 0 && Math.random() < 0.3) {
            console.log("Interpolating");
            melodyPromise = getAlternate(
                MELODIES[melodyObj.index - 1].melody,
                MELODIES[melodyObj.index].melody
            );
        }

        melodyPromise.then((melodyToPlay) => {
            let offset = time;
            for (let note of melodyToPlay) {
                let pitch = note.pitch;
                let freq = noteToFreq(pitch);
                // console.log("Playing " + pitch + ", " + freq);
                instruments[melody[0].instrument].triggerAttackRelease(freq, "8n", offset);
                Tone.Draw.schedule(() => {
                    drawShape(note);
                }, offset);
                offset += EIGHTH;
            }
        });
    });
    loop.interval = (EIGHTH * melody.length) + 2 + (Math.random() * EIGHTH);
    if (isClientSide) {
        loop.start("+2");
    } else {
        loop.start();
    }

    melodyObj.loop = loop;
    melodyObj.index = MELODIES.length;
    MELODIES.push(melodyObj);
}

// MAGENTA
async function getAlternate(melody1, melody2) {
    let seq1 = convertMelody(melody1);
    let seq2 = convertMelody(melody2);
    seq1 = mm.sequences.quantizeNoteSequence(seq1, 4);
    seq2 = mm.sequences.quantizeNoteSequence(seq2, 4);
    let newSeq = await vae.interpolate(
        [seq1, seq2],
        1
    );
    return convertNoteSequence(newSeq, melody1);
}

function convertMelody(melody) {
    let seq = {
        notes: []
    };
    let startTime = 0.0;
    for (let note of melody) {
        seq.notes.push({
            pitch: note.pitch,
            startTime: startTime,
            endTime: startTime + 0.5
        })
        startTime += 0.5;
    }
    seq.totalTime = startTime;
    return seq;
}

function convertNoteSequence(seq, melody) {
    let result = [];
    for (let i=0; i<melody.length; i++) {
        result[i] = JSON.parse(JSON.stringify(melody[i]));
        result[i].pitch = seq[0].notes[i].pitch;
    }
    return result;
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
