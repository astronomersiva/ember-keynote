import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AdjacentSlidesComponent extends Component {
  @service presentation;

  get previousSlide() {
    if (this.presentation.slide !== 1) {
      return Number(this.presentation.slide) - 1;
    }

    return Number(this.presentation.slide);
  }

  get nextSlide() {
    if (this.presentation.slide !== this.presentation.slides) {
      return Number(this.presentation.slide) + 1;
    }

    return Number(this.presentation.slide);
  }
}
