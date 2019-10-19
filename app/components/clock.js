// Need to check this for memory leaks

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class ClockComponent extends Component {
  constructor () {
    super(...arguments)

    this.startTicking();
  }

  @tracked currentTime = new Date().toLocaleTimeString('en-US');

  startTicking() {
    this.currentTime = new Date().toLocaleTimeString('en-US');
    later(this, this.startTicking, 1000);
  }
}
