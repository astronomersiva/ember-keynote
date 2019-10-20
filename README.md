# ember-keynote

This was built as a demo for my talk on using WebSockets with Ember.
If you would like to use this, feel free to fork this repo and add
your slides as components.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-keynote`
* `npm install`

## Running / Development

* `ember serve`
* For the speaker view, visit `publicip:4200/?speaker=true`.
* For the audience view, visit `publicip:4200/`.

### Usage

![ember-keynote](screenshots/app.jpg)

You can switch between the slides by making use of the arrow keys
or the `A` and `D` keys. You can also use the control buttons on the screen.

![Controls](screenshots/controls.png)

Use the Screen icon to toggle fullscreen view. This is also possible in the
audience view but you will have to hover on the bottom right corner to see
the toggle as it is hidden by default. I am open to improving the UX aspect of this.

If you pause the presentation, you will be able to navigate the slides but the
slides will remain frozen for the audience. It will get synced again when you
resume the presentation.

You can add slide notes by adding them to the respective slide component's class.

### Deploying

This app makes use of WebSockets. You will have to deploy a Node.js
app that behaves similar to the middleware in `lib/slide-controller`
and configure the WebSocket server URL in this app.

Having said that, I guess just running `ember serve` should be sufficient
for what this app was designed to do.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
