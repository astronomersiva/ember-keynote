import Component from '@glimmer/component';
import outdent from 'outdent';

export default class SlidesSlide1Component extends Component {
  notes = outdent`
    This was built for my talk on **Building real time
    applications with Ember** that I gave in the **EmberJS Chennai Meetup**.

    * Built the Octane way.
    * Uses websockets(with socket.io) to sync slides across the audience.
    * Styled with Tailwind.
    * Code Embeds
    * Speaker mode with notes, timer and previews of the next and previous slides.
    * Write slides and notes in markdown.
    * Export slides as PDF.
    * Supports pausing the presentation for the audience.
  `;
}
