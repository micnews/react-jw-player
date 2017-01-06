# react-jw-player

`<ReactJWPlayer>` is a React Component for initializing client-side instances of JW Player. Simply give `<ReactJWPlayer>` the id of your player script, and the id of a JW Player video or playlist. The component comes with several event hooks that can be accessed through component props.

# Contents
* [Usage](#usage)
* Props
  * [Required Props](#required-props)
  * Optional Props
    * [Configuration](#optional-configuration-props)
    * Event Hooks
      * [Advertising](#optional-advertising-event-hook-props)
      * [Player Events](#optional-player-event-hook-props)
      * [Time Events](#optional-time-event-hook-props)
## Usage

```
<ReactJWPlayer

>
```

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
* `playlist`
  * Link to a valid JW Player video or playlist. Cool tip: JW Player automatically generates JSON feeds for individual videos if you use the video id in place of `abCD1234`. You can use this to get meta data on the videos without loading an actual playlist.
  * Type: `string`
  * Example: `https//content.jwplatform.com/feeds/abCD1234.json`

## Optional Configuration Props
* `className`
  * An optional class name to give the container div.
  * Type: `string`
* `isMuted`
  * Determines whether the player starts muted or not.
  * Type: `boolean`
* `generatePrerollUrl(video)`
  * Supply a function that returns a VAST or GOOGIMA tag for use in generating a preroll advertisement.
  * Arguments:
    * `video`
      * This is a video object for the current item loaded in the player. You can use it to help generate your preroll tags.

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
* `onFiftyPercent(event)`
  * A function that is run when the playhead reaches passed the 50% mark.
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


