import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ClockComponent extends Component {
  constructor () {
    super(...arguments)
  }

  @service presentation;

  get formattedTime() {
    let minutes = Math.floor(this.presentation.elapsedTime / 60000).toString() || '0';
    let seconds = ((this.presentation.elapsedTime % 60000) / 1000).toFixed(0).toString() || '0';

    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  @action
  startTicking() {
    this.presentation.startPresentation();
  }
}
