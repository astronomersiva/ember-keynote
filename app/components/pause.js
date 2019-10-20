import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class PauseComponent extends Component {
  @service presentation;

  @action
  togglePlayState() {
    this.presentation.togglePlayState();
  }
}
