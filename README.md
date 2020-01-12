# BubbleCompose

## Inspiration

Last year we built [MusicHub](https://devpost.com/software/musichub-3rajf4), with the goal of providing version control to composers to encourage a software-development-esque workflow. This year, we're elaborating on that further with BubbleCompose, an app that lets anyone and everyone collaborate on beautiful pieces of music with nothing more than a web browser and a mouse. Software development and music are both collaborative by nature, and BubbleCompose seeks to unify these two worlds using the power of machine learning.

## What it does

BubbleCompose allows multiple users to draw animated patterns on a shared canvas. These patterns are translated to melodies and played back to all collaborators as a combined piece of music. The melodies have a random chance to mutate and acquire the traits of other melodies. As a result, we enable the texture of the music to slowly develop in a musical way.

## How we built it

The front end is built with the Semantic UI framework for a beautiful user experience, the PTS.js library for drawing shapes and animations, and the Tone.js library for playing audio. Socket.io on Node.js allows us synchronize the music between all the users. The logic layer is built with Google Magenta's MusicVAE model to evolve the music notes over time and our own proprietary algorithm to translate user-drawn patterns into music notes. Finally, the web app is hosted on the Google Cloud Platform and our domain was acquired through Domain.com.

## Challenges we ran into

PTS.js was a very difficult library to learn in such a short time frame. The documentation of Tone.js was confusing at times, resulting in a rough user experience. Finally, designing a clean and aesthetic UI is always a challenge, but we are happy with how this one turned out.

## Accomplishments that I'm proud of

We're extremely proud of what we were able to accomplish in such a short time. In particular, it was our first time using Tone.js, PTS.js, Google Magenta and hosting a site on Google Cloud Platform.

## What's next for BubbleCompose

The next big feature we hope to implement is separate sessions so groups of friends can collaborate in a private setting. We would like to make the music more dynamic by triggering musical modulations as the number of active users passes set thresholds.
