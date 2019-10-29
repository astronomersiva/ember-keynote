import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { bind } from '@ember/runloop';

export default class PresentationService extends Service {
  @service socketManager;
  @service router;

  @tracked isRunning = 1;
  @tracked slide = 1;
  @tracked slides = 0;

  @tracked hasStarted = false;
  @tracked startTime = null;
  @tracked elapsedTime = null;
  @tracked canShowAdjacentSlides = false;

  init() {
    super.init(...arguments);

    // dynamically populate the number of slides
    let owner = getOwner(this);
    let i = this.slide;
    while(owner.hasRegistration(`component:slides/slide-${i++}`)) {
      this.slides++;
    }

    // this is to reset the timer on all tabs of the speaker
    this.socketManager.socket.on('sync-time', this.syncTime, this);

    this.set('keyPressHandler', bind(this, 'respondToKeyPress'));
    document.addEventListener('keydown', this.keyPressHandler);
  }

  get isPaused() {
    return !this.isRunning;
  }

  get isNextSlidePossible() {
    return +this.slide !== this.slides;
  }

  get isPrevSlidePossible() {
    return +this.slide !== 1;
  }

  goToPrevSlide() {
    let isSpeaker = this.router.currentRoute.queryParams.speaker;
    if (isSpeaker && this.isPrevSlidePossible) {
      this.slide--;
      this.router.transitionTo({ queryParams: { slide: this.slide } });

      this.emitTransition();
    }
  }

  goToNextSlide() {
    let isSpeaker = this.router.currentRoute.queryParams.speaker;
    if (isSpeaker && this.isNextSlidePossible) {
      this.slide++;
      this.router.transitionTo({ queryParams: { slide: this.slide } });

      this.emitTransition();
    }
  }

  goToSlide(slide) {
    let isSpeaker = this.router.currentRoute && this.router.currentRoute.queryParams.speaker;

    // this is to ensure slides don't transition for the audience when
    // the presentation is paused
    let canTransition = isSpeaker ? true : this.isRunning;
    if (canTransition) {
      this.slide = +slide;
      this.router.transitionTo({ queryParams: { slide } });
    }
  }

  emitTransition() {
    this.socketManager.socket.emit('transition', this.slide);
  }

  togglePlayState() {
    this.isRunning = !this.isRunning;
    this.socketManager.socket.emit('play-state', this.isRunning);
    // Sync all audience slides to the current slide
    if (this.isRunning) {
      this.emitTransition();
    }
  }

  syncTime(newStartTime) {
    this.startTime = new Date(newStartTime);
  }

  // Need to check this for memory leaks
  startTicking() {
    this.elapsedTime = new Date() - this.startTime;
    later(this, this.startTicking, 1000);
  }

  toggleAdjacentSlides() {
    this.canShowAdjacentSlides = !this.canShowAdjacentSlides;
  }

  respondToKeyPress({ keyCode }) {
    // left arrow or A key
    let isLeft = [37, 65].includes(keyCode);
    // right arrow or D key
    let isRight = [39, 68].includes(keyCode);

    if (isLeft) {
      this.goToPrevSlide();
    }

    if (isRight) {
      this.goToNextSlide()
    }
  }

  @action
  startPresentation() {
    this.hasStarted = true;
    this.startTime = new Date();
    this.startTicking();

    this.socketManager.socket.emit('reset-time', this.startTime);
  }

  willDestroy() {
    this.socketManager.socket.off('sync-time', this.syncTime);
    document.removeEventListener('keydown', this.keyPressHandler);

    super.willDestroy(...arguments);
  }
}
