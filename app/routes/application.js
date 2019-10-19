import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  // TODO check this
  @action
  willTransition(transition) {
    if (!this.controller.speaker) {
      transition.abort();
    }
  }
}
