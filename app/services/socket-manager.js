import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SocketManagerService extends Service {
  @service('socket-io') socketIOService;
  @service presentation;

  init() {
    super.init(...arguments);
    this.socket = this.socketIOService.socketFor(`http://${location.hostname}:1512/`);

    this.addSocketHandlers();
  }

  addSocketHandlers() {
    this.socket.on('transition-to', this.transitionToSlide, this);
    this.socket.on('play-state', this.handlePlayStateChange, this);
  }

  transitionToSlide(targetSlide) {
    this.presentation.goToSlide(targetSlide);
  }

  handlePlayStateChange(status) {
    this.presentation.isRunning = status;
  }

  willDestroy() {
    this.socket.off('transition-to', this.transitionToSlide);
    this.socket.off('play-state', this.handlePlayStateChange);

    super.willDestroy(...arguments);
  }
}
