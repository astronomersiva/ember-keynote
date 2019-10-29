import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PresentationViewComponent extends Component {
  @action openPresentationView() {
    window.open(
      `//${location.host}`,
      'Presentation View',
      'height=700, width=800'
    );
  }
}
