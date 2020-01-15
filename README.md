# BubbleCompose

Real-time collaborative canvas that generates an evolving musical landscape.

![Actual footage of BubbleCompose](https://thumbs.gfycat.com/DelayedIdealisticAsianelephant-size_restricted.gif)

## About

BubbleCompose lets anyone collaborate on a beautiful piece of music with nothing more than a web browser and a mouse. You draw animated patterns on a shared canvas which is synced in real-time with other users. These patterns are translated to melodies and played back to all as a combined piece of music. The melodies have a random chance to mutate and acquire the traits of other melodies.

## Getting Started

To host your own instance of BubbleCompose:

1. Install Node.js.
2. In the terminal, enter:

```
git clone https://github.com/iamtrex/BubbleCompose.git
cd BubbleCompose/server
npm install
node app.js
```

3. Go to [localhost:3000](localhost:3000) on your browser and start composing!
4. Other computers in your network can join your canvas using your host computer's local IP address (for example: 192.168.1.32:3000).
5. To clear the canvas, enter the following in the browser console:

```
myReset()
```

## Built With

* [PTS.js](https://ptsjs.org/) - To render the graphics
* [Socket.io](https://socket.io/) - To sync client and server
* [Tone.js](https://tonejs.github.io/) - To render the audio
* [Magenta.js](https://magenta.tensorflow.org/get-started/#magenta-js) - To make the melodies evolve intelligently
* [SemanticUI](https://semantic-ui.com/) - To make it look beautiful

# Team

| <img src="https://avatars2.githubusercontent.com/u/11649092?s=460&v=4" width="144" /> | <img src="https://avatars0.githubusercontent.com/u/38742521?s=460&v=4" width="144" /> | <img src="https://avatars1.githubusercontent.com/u/32021102?s=460&v=4" width="144" /> | <img src="https://avatars3.githubusercontent.com/u/32286298?s=460&v=4" width="144" /> |
| --- | --- | --- | --- |
| [Chauncey Liu](https://github.com/ChaunceyKiwi) | [James Zang](https://github.com/jameszang) | [Rex Lin](https://github.com/iamtrex) | [Benjamin Kwok](https://github.com/benkwokcy)
