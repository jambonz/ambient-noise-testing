const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `Hi there, and welcome to jambones! 
jambones is the voice gateway designed with the needs
of communication service providers in mind.
This is an example of simple text-to-speech, but there is so much more you can do.
Try us out!  We think you'll like what you see.  Really, we do.`;

// babbling brook url: 'https://www.gstatic.com/voice_delight/sounds/long/brook.mp3'
// office: https://voicegateway-test.s3.eu-central-1.amazonaws.com/office-sounds.mp3
// typing: https://voicegateway-test.s3.eu-central-1.amazonaws.com/keyboard-typing.mp3

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /hello-world');
  try {
    const app = new WebhookResponse();
    app

      .say({text: 'hello world, this is in the foreground.  This is normal volume'})
      .config({
        boostAudioSignal: '-10 dB'
      })
      .say({text: 'hello world, this is in the foreground.  This is -10 decibels'})
      .dub({
        action: 'addTrack',
        track: 'talkover',
        say: text,
        gain: '0 dB'
      })
      .dub({
        action: 'addTrack',
        track: 'background-music',
        play: 'https://voicegateway-test.s3.eu-central-1.amazonaws.com/office-sounds.mp3',
        gain: '-1 dB'
      })
      .dub({
        action: 'playOnTrack',
        track: 'background-music',
        play: 'https://voicegateway-test.s3.eu-central-1.amazonaws.com/office-sounds.mp3',
        gain: '-1 dB'
      })
      .pause({length: 5})
      .say({text: 'hello world, this is in the foreground.  Can you hear the foreground'})
      .pause({length: 10})
      .say({text: 'I\'m sorry Dave, I\'m afraid I can\'t do that. This is also in the foreground with -10 volume.'})
      .dub({
        action: 'removeTrack',
        track: 'background-music'
      });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

/*
router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /hello-world');
  try {
    const app = new WebhookResponse();
    app
      .say({text: 'Hi there!  I am speaking to you with normal gain.  Can you hear me?  I hope so!'})
      .config({
        boostAudioSignal: '+3 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of 3 decibels.  Can you hear me?  I hope so!'})
      .config({
        boostAudioSignal: '+6 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of 6 decibels.  Can you hear me?  I hope so!'})
      .config({
        boostAudioSignal: '+10 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of 10 decibels.  Can you hear me?  I hope so!'})
      .config({
        boostAudioSignal: '+15 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of 15 decibels.  Can you hear me?  I hope so!'})
      .config({
        boostAudioSignal: '-3 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of minus 3 decibels.  Can you still hear me?  I hope so!'})
      .config({
        boostAudioSignal: '-6 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of minus 6 decibels.  Can you still hear me?  I hope so!'})
      .config({
        boostAudioSignal: '-10 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of minus 10 decibels.  Can you still hear me?  I hope so!'})
      .config({
        boostAudioSignal: '-15 dB'
      })
      .say({text: 'Now I am speaking to you at a gain of minus 15 decibels.  Can you still hear me?  I hope so!'})
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});
*/

module.exports = router;
