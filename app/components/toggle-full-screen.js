import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ToggleFullScreenComponent extends Component {
  @action
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }
}
