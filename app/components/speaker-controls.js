import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SpeakerControlsComponent extends Component {
  @service presentation;

  get nextSlide() {
    if (this.presentation.slide !== this.presentation.slides) {
      return Number(this.presentation.slide) + 1;
    }

    return Number(this.presentation.slide);
  }
}
