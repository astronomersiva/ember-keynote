import Component from '@glimmer/component';
import outdent from 'outdent';

export default class SlidesSlide2Component extends Component {
  notes = outdent`
    * Fork the [project on GitHub](https://github.com/astronomersiva/ember-keynote).
    * Add slides as components under \`slides\`. For example, \`slides/slides-1\`.
    * Write templates as you please.
    * Run \`ember s\`.
    * Visit the app using the public IP address. Remember to add the
      \`speaker=true\` query param.
    * Click on the \`Open Presenter View\` icon to toggle the Presentation view. Drag
      and drop the popup window on the projector display.
    * A weird behavior -> you need to set the \`slides\` property on the presentation
      service to the number of slides that you have. I am looking for ideas on how
      to improve this. Maybe this can also be a QP?
  `
}
