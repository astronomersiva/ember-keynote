import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SocketManagerService extends Service {
  @service('socket-io') socketIOService;

  init() {
    super.init(...arguments);
    this.socket = this.socketIOService.socketFor(`http://${location.hostname}:1512/`);
  }
}
