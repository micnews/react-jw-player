# react-jw-player :movie_camera: [![Build Status](https://travis-ci.com/micnews/react-jw-player.svg?token=oCXvx519mb3xud77T3xi&branch=master)](https://travis-ci.com/micnews/react-jw-player)

`<ReactJWPlayer>` is a React Component for initializing client-side instances of JW Player. Simply give `<ReactJWPlayer>` the id of your player script, and the id of a JW Player video or playlist. The component comes with several event hooks that can be accessed through component props.

## Contents

* [Installation](#installation)
* [Usage](#usage)
* Props
  * [Required Props](#required-props)
  * Optional Props
    * [Configuration](#optional-configuration-props)
    * [Event Hooks](#event-hooks)
      * [Advertising](#optional-advertising-event-hook-props)
      * [Player Events](#optional-player-event-hook-props)
      * [Time Events](#optional-time-event-hook-props)
* [Example Container Component](#example-container-component)
* [Contributing](#contributing)

## Installation

```shell
npm install react-jw-player
```

## Usage

At the mininum, you can just use something like the three following code snippets:

### Playing a JW Player JSON Playlist
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactJWPlayer from 'react-jw-player';

ReactDOM.render(
  <ReactJWPlayer
    playerId='my-unique-id'
    playerScript='https://link-to-my-jw-player/script.js'
    playlist='https://link-to-my-playlist.json'
  />,
  document.getElementById('my-root-div');
);
```

### Playing a custom Playlist
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactJWPlayer from 'react-jw-player';

const playlist = [{
  file: 'https://link-to-my-video.mp4',
  image: 'https://link-to-my-poster.jpg',
  tracks: [{
    file: 'https://link-to-subtitles.vtt',
    label: 'English',
    kind: 'captions',
    'default': true
  }],
},
{
  file: 'https://link-to-my-other-video.mp4',
  image: 'https://link-to-my-other-poster.jpg',
}];

ReactDOM.render(
  <ReactJWPlayer
    playerId='my-unique-id'
    playerScript='https://link-to-my-jw-player/script.js'
    playlist={playlist}
  />,
  document.getElementById('my-root-div');
);
```

### Playing a Specific File
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactJWPlayer from 'react-jw-player';

ReactDOM.render(
  <ReactJWPlayer
    playerId='my-unique-id'
    playerScript='https://link-to-my-jw-player/script.js'
    file='https://link-to-my-video.mp4'
  />,
  document.getElementById('my-root-div');
);
```

For more complex interaction, check out the container component example [here](#example-container-component)

To generate preroll, supply the player with the `generatePrerollUrl` prop. This prop just needs to be a function that returns a valid VAST tag! See [Optional Configuration Props](#optional-configuration-props) for more info.

## Required Props

These are props that modify the basic behavior of the component.
* `playerId`
  * A unique Id for the player instance. Used to distinguish the container divs.
  * Type: `string`
  * Example: `playerId="my-jw-player-instance"`
* `playerScript`
  * Link to a valid JW Player script.
  * Type: `string`
  * Example: `https://content.jwplatform.com/libraries/abCD1234.js`
* `playlist` OR `file`
  * Link to a valid JW Player playlist or video file, or playlist array. Cool tip: JW Player automatically generates JSON feeds for individual videos if you use the video id in place of `abCD1234`. You can use this to get meta data on the videos without loading an actual playlist.
  * Type: `string` (for `file` and `playlist`) or `array` (for `playlist`)
  * Example: `https//content.jwplatform.com/feeds/abCD1234.json`

## Optional Configuration Props
* `aspectRatio`
  * An optional aspect ratio to give the video player. Can be 'inherit', `1:1` or `16:9` currently.
  * Defaults to 'inherit'.
* `className`
  * An optional class name to give the container div.
  * Type: `string`
* `customProps`
  * An optional object containing properties to be applied directly to the JW Player instance. Add anything in the API, like skins, into this object. `customProps={{ skin: { name: 'six' } }}`.
  * Type: `object`
* `isAutoPlay`
  * Determines whether the player starts automatically or not.
  * Type: `boolean`
* `isMuted`
  * Determines whether the player starts muted or not.
  * Type: `boolean`
* `generatePrerollUrl(video)`
  * Supply a function that returns a VAST or GOOGIMA tag for use in generating a preroll advertisement.
  * Arguments:
    * `video`
      * This is a video object for the current item loaded in the player. You can use it to help generate your preroll tags.
* `image`
  * URL to a poster image to display before playback starts
  * Type: `string`
* `licenseKey`
  * License Key as supplied in the jwplayer dashboard, under: Players > Tools > Downloads > JW Player X (Self-Hosted)
  * Type: `string`
* `useMultiplePlayerScripts`
  * EXPERIMENTAL - Allows you to load multiple player scripts and still load the proper configuration. Expect bugs, but report them!
  * Type: `boolean`

# Event Hooks

`react-jw-player` dynamically supports all events in JW Player. Simply preface the event name with `on` and pass it in as a prop.

Examples:
* `ready` => `onReady`
* `setupError` => `onSetupError`

`react-jw-player` has layered some different functionality on some of these events, so please check the docs below if you find any unexpected behavior!

## Optional Advertising Event Hook Props
* `onAdPause(event)`
  * A function that is run when the user pauses the preroll advertisement.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onAdPlay(event)`
  * A function that is run once, when the preroll advertisement first starts to play.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onAdResume(event)`
  * A function that is run when the user resumes playing the preroll advertisement.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onAdSkipped(event)`
  * A function that is run when the user skips an advertisement.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onAdComplete(event)`
  * A function that is run when an ad has finished playing.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.

## Optional Player Event Hook Props
* `onAutoStart(event)`
  * A function that is run once, when an autoplaying player starts to play a video.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onEnterFullScreen(event)`
  * A function that is run when the user fullscreens a video.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onError(event)`
  * A function that is run when the player errors.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onExitFullScreen(event)`
  * A function that is run when the user un-fullscreens a video.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onMute(event)`
  * A function that is run when the user mutes the player.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onPause(event)`
  * A function that is run when the user pauses the player during a video.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onPlay(event)`
  * A function that is run when a video first starts to play.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onReady(event)`
  * A function that is run once when the video player is ready.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onResume(event)`
  * A function that is run when the user plays a video after pausing it.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onSetupError(event)`
  * A function that is run when the player errors during setup.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onTime(event)`
  * A function that is run whenever the playback position gets updated.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onUnmute(event)`
  * A function that is run when the user unmutes the player.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onVideoLoad(event)`
  * A function that is run whenever a new video is loaded into the player.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.

## Optional Time Event Hook Props
* `onThreeSeconds(event)`
  * A function that is run when the playhead reaches passed the 3 second mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onTenSeconds(event)`
  * A function that is run when the playhead reaches passed the 10 second mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onThirtySeconds(event)`
  * A function that is run when the playhead reaches passed the 30 second mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onTwentyFivePercent(event)`
  * A function that is run when the playhead reaches passed the 25% mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onFiftyPercent(event)`
  * A function that is run when the playhead reaches passed the 50% mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onSeventyFivePercent(event)`
  * A function that is run when the playhead reaches passed the 75% mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onNinetyFivePercent(event)`
  * A function that is run when the playhead reaches passed the 95% mark.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.
* `onOneHundredPercent(event)`
  * A function that is run when the a video ends.
  * Type: `function`
  * Arguments:
    * `event`
      * This is the event object passed back from JW Player itself.

## Example Container Component
``` javascript
import React from 'react';
import PropTypes from 'prop-types';

import ReactJWPlayer from 'react-jw-player';

const displayName = 'ReactJWPlayerContainer';

const propTypes = {
  playlist: PropTypes.string.isRequired,
  playerScript: PropTypes.string.isRequired
};

class ReactJWPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTitle: '',
    };

    this.onAdPlay = this.onAdPlay.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);

    // each instance of <ReactJWPlayer> needs a unique id.
    // we randomly generate it here and assign to the container instance.
    this.playerId = someFunctionToRandomlyGenerateId();
  }
  onReady(event) {
    // interact with JW Player API here
    const player = window.jwplayer(this.playerId);
  }
  onAdPlay(event) {
    // track the ad play here
  }
  onVideoLoad(event) {
    this.setState({
      videoTitle: event.item.description // this only works with json feeds!
    });
  }
  render() {
    return (
      <div className='react-jw-player-container'>
        <h1>{ this.state.videoTitle }</h1>
        <ReactJWPlayer
          playlist={this.props.playlist}
          licenseKey='your-license-key'
          onAdPlay={this.onAdPlay}
          onReady={this.onReady}
          onVideoLoad={this.onVideoLoad}
          playerId={this.playerId} // bring in the randomly generated playerId
          playerScript='https://link-to-your-jw-player-script.js'
        />
      </div>
    );
  }
}

ReactJWPlayerContainer.propTypes = propTypes;
ReactJWPlayerContainer.defaultProps = defaultProps;
ReactJWPlayerContainer.displayName = displayName;
export default ReactJWPlayerContainer;
```

## Contributing

**Just do it!**

![shia](https://media.giphy.com/media/87xihBthJ1DkA/giphy.gif)
