import Component from '@glimmer/component';

export default class BackgroundComponent extends Component {
  get style() {
    if (this.args.image) {
      return `background-image: url(${this.args.image})`;
    }

    if (this.args.color) {
      return `background-color: ${this.args.color}`;
    }

    if (this.args.gradient) {
      return `background-image: linear-gradient(${this.args.gradient})`;
    }

    if (this.args.radialGradient) {
      return `background-image: radial-gradient(${this.args.radialGradient})`;
    }

    return `background-color: black`;
  }
}
