import Component from '@glimmer/component';
import outdent from 'outdent';

export default class SlidesSlide2Component extends Component {
  notes = outdent`
    * Fork the [project on GitHub](https://github.com/astronomersiva/ember-keynote).
    * Add slides as components under \`slides\`. For example, \`slides/slide-1\`.
    * Write templates as you please.
    * Run \`ember s\`.
    * Visit the app using the public IP address. Remember to add the
      \`speaker\` query param.
    * Click on the \`Open Presenter View\` icon to toggle the Presentation view. Drag
      and drop the popup window on the projector display.
    * Just make sure you have the slides numbered sequentially.
  `
}
