import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavigationComponent extends Component {
  @service presentation;

  get paginationString() {
    return `${this.presentation.slide} / ${this.presentation.slides}`;
  }

  @action
  goToPrevSlide() {
    this.presentation.goToPrevSlide();
  }

  @action
  goToNextSlide() {
    this.presentation.goToNextSlide();
  }
}
