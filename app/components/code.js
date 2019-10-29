import Component from '@glimmer/component';

export default class CodeComponent extends Component {
  get language() {
    let snippet = this.args.snippet;
    let languages = {
      js: 'javascript',
      html: 'html',
      // while this is supported by prism,
      // ember-prism is returning an empty string, need to check
      // hbs: 'handlebars'
    };

    let extension = snippet.split('.').pop();
    return languages[extension] || '';
  }
}
