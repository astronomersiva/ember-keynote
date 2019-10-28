import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AdjacentSlidesToggleComponent extends Component {
  @service presentation;

  @action
  toggleAdjacentSlides() {
    this.presentation.toggleAdjacentSlides();
  }
}
