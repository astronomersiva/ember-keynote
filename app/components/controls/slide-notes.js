import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NotesComponent extends Component {
  @tracked isHidden = false;

  @action
  toggleNoteVisibility() {
    this.isHidden = !this.isHidden;
  }
}
