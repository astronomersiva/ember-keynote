import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { bind } from '@ember/runloop';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  queryParams = [
    'slide',
    'speaker'
  ];

  @service socketManager;
  @service presentation;
  @service router;

  @tracked speaker;
  @tracked slide;
  @tracked transitionDirection = 'crossFade';

  init() {
    super.init(...arguments);

    this.set('keyPressHandler', bind(this, 'respondToKeyPress'));
    document.addEventListener('keydown', this.keyPressHandler);

    this.addSocketHandlers();
  }

  addSocketHandlers() {
    this.socketManager.socket.on('transition-to', this.transitionSlides, this);
    this.socketManager.socket.on('play-state', this.handlePlayStateChange, this);
  }

  respondToKeyPress({ keyCode }) {
    let isLeft = [37, 65].includes(keyCode);
    let isRight = [39, 68].includes(keyCode);

    if (isLeft) {
      this.presentation.goToPrevSlide();
    }

    if (isRight) {
      this.presentation.goToNextSlide()
    }
  }

  transitionSlides(targetSlide) {
    this.presentation.goToSlide(targetSlide);
  }

  handlePlayStateChange(status) {
    this.presentation.isRunning = status;
  }

  @action
  startTicking() {
    this.presentation.startPresentation();
  }

  willDestroy() {
    document.addEventListener('keydown', this.keyPressHandler);

    this.socketManager.socket.off('transition-to', this.transitionSlides);
    this.socketManager.socket.off('play-state', this.handlePlayStateChange);

    super.willDestroy(...arguments);
  }
}
