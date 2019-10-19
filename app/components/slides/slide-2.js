import Component from '@glimmer/component';
import outdent from 'outdent';

export default class SlidesSlide2Component extends Component {
  notes = outdent`
    * Fork the [project on GitHub](https://github.com/astronomersiva/ember-keynote).
    * Add slides as components under \`slides\`. For example, \`slides/slides-1\`.
    * Write templates as you please. Just remember to copy the boilerplate for speaker
      controls on each template. Looking for suggestions on improving this.
    * Run \`ember s\`.
    * Visit the app using the public IP address.
    * On the laptop(or, phone) that you are using to project the presentation, add the
      \`speaker=true\` query param.
    * A weird behavior -> you need to set the \`slides\` property on the application
      controller to the number of slides that you have. I am looking for ideas on how
      to improve this. Maybe this can also be a QP?
  `
}
