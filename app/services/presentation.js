import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PresentationService extends Service {
  @service socketManager;
  @service router;

  @tracked isRunning = 1;
  @tracked slide = 1;

  // Need to find a way do this dynamically
  slides = 5;

  get isPaused() {
    return !this.isRunning;
  }

  goToPrevSlide() {
    let isSpeaker = this.router.currentRoute.queryParams.speaker;
    if (isSpeaker && this.slide !== 1) {
      this.slide--;
      this.router.transitionTo({ queryParams: { slide: this.slide } });

      this.emitTransition();
    }
  }

  goToNextSlide() {
    let isSpeaker = this.router.currentRoute.queryParams.speaker;
    if (isSpeaker && this.slide !== this.slides) {
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
}
