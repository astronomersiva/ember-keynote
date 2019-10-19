import Controller from '@ember/controller';
import { bind } from '@ember/runloop';

export default class ApplicationController extends Controller {
  queryParams = ['slide'];

  init() {
    super.init(...arguments);

    this.set('keyPressHandler', bind(this, 'respondToKeyPress'));
    document.addEventListener('keydown', this.keyPressHandler);

    this.slides = [
      {
        title: 'Hello',
        bg: 'images/time.jpg'
      }, {
        title: 'Test 2',
        bg: 'images/time.jpg'
      }
    ];
    
  }
}
