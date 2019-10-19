import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ToggleFullScreenComponent extends Component {
  @tracked shouldHideToggle = this.args.speaker ? false : document.fullscreenElement;

  @action
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      if (!this.args.speaker) {
        this.shouldHideToggle = true;
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
        if (!this.args.speaker) {
          this.shouldHideToggle = false;
        }
      }
    }
  }
}
