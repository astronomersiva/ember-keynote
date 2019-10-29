import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  queryParams = [
    'slide',
    'speaker',
    'download'
  ];

  @service presentation;

  @tracked speaker;
  @tracked slide;
  @tracked download;
}
