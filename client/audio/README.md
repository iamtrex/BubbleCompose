# Ben's Notes for the Audio/Music

## Ideas

Integrate with Microsoft Surface and turn it into a room-sized art installation.
Turn it into a game for switch motion controllers.

The music becomes bigger/grander as more people participate.
    Mirror this effect using visuals.
    Show the number of people participating.
    Random events - drones, beats, modulating, change key
    Can unlock new instruments.
    If you get 10 people, you unlock the mega instruments and a super event happens.

## Data Structures

Melody Shape
    Identifier - so I know to replace their last shape. Or can people has more than one shape?
                Start taking away shapes when it gets too full?
    Instrument
    Sequence of Pitches

## Logic

Import Magenta, Tone, Piano
Start AudioContext? Transport? Playlist?

Loop:
    Receive new shape objects
    Add/edit/remove them in the playlist

## Steps to Implement

Play One Sound DONE
Add Reverb DONE
Play Multiple Sounds DONE
Add Piano Sound DONE
Loop Piano DONE
Support Multiple Loops DONE

Delay between Loops
Interpolate Using VAE
Add Drones

## Music

Random Events:
Drone - random event
Modulation - as a milestone when more players join
Unlock New Instruments

Musical Variables:
Scale - allow multiple scales?
Range
Instrument
Note Length
Velocity
Reverb (and Other Effects)
Loudness
Vary Tempo
Randomized Overlap
MusicVAE interpolation/morphing

## Resources

Teropa using MusicVAE - <https://magenta.tensorflow.org/blog/2018/05/03/connecting-with-magenta-js/>
Teropa Tone.js Starter Pack - <https://github.com/teropa/generative-music-workshop>
Teropa Accompanying Slides on Tone.js - <https://teropa.info/generative-music-slides>
Teropa WebAudio - <http://teropa.info/blog/2016/07/28/javascript-systems-music.html>
