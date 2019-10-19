import Component from '@glimmer/component';
import outdent from 'outdent';

export default class SlidesSlide1Component extends Component {
  notes = outdent`
    This was built for my talk on **Building real time
    applications with Ember** that I gave in the **EmberJS Chennai Meetup**.

    * Built the Octane way.
    * Uses websockets(with socket.io) to sync slides across the audience.
    * Code Embeds
    * Supports Presenter Notes. Use even markdown!
    * Styled with Tailwind.
    * A Clock to keep track of your progress.
    * Supports pausing the presentation for the audience.
    * Control the slides with your phone!
  `;
}
