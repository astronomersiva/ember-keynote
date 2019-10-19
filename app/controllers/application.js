import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { bind } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  queryParams = [
    'slide',
    'speaker'
  ];

  name = 'Siva';

  @tracked slide = 1;
  @tracked speaker = false;
  @tracked isPaused = false;
  @service socketManager;

  init() {
    super.init(...arguments);

    // Need to find a way do this dynamically
    this.slides = 5;

    this.set('keyPressHandler', bind(this, 'respondToKeyPress'));
    document.addEventListener('keydown', this.keyPressHandler);

    this.initialiseSockets();
  }

  initialiseSockets() {
    this.socketManager.socket.on('transition-to', this.transitionSlides, this);
    this.socketManager.socket.on('reveal-speaker', this.revealSpeaker, this);
  }

  get canGoToPrevSlide() {
    return this.speaker && this.slide !== 1;
  }

  get canGoToNextSlide() {
    return this.speaker && this.slide !== (this.slides);
  }

  get paginationString() {
    return `${this.slide} / ${this.slides}`;
  }

  respondToKeyPress({keyCode}) {
    let isLeft = [37, 65].includes(keyCode);
    let isRight = [39, 68].includes(keyCode);

    if (isLeft) {
      this.goToPrevSlide();
    }

    if (isRight) {
      this.goToNextSlide()
    }
  }

  transitionSlides(targetSlide) {
    this.slide = targetSlide;
  }

  revealSpeaker() {
    this.speaker = true;
  }

  emitTransition() {
    this.socketManager.socket.emit('transition', this.slide);
  }

  @action
  goToPrevSlide() {
    if (this.canGoToPrevSlide) {
      --this.slide;

      let canEmitTransition = this.speaker && !this.isPaused;
      canEmitTransition && this.emitTransition();
    }
  }

  @action
  goToNextSlide() {
    if (this.canGoToNextSlide) {
      ++this.slide;

      let canEmitTransition = this.speaker && !this.isPaused;
      canEmitTransition && this.emitTransition();
    }
  }

  @action
  togglePlayState() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.emitTransition();
    }
  }

  willDestroy() {
    document.addEventListener('keydown', this.keyPressHandler);

    this.socketManager.socket.off('transition-to', this.transitionSlides);
    this.socketManager.socket.off('reveal-speaker', this.revealSpeaker);

    super.willDestroy(...arguments);
  }
}
