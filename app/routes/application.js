import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service presentation;

  // This is to maintain the current slide on reload.
  // If any of you know a better way to do this, please raise a PR.
  @action didTransition() {
    this.presentation.goToSlide(this.controller.slide || 1);
  }
}
