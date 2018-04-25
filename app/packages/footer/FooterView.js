import Marionette from 'backbone.marionette';
import footerTmpl from './templates/footer-view.jst';

export default Marionette.View.extend({

  className: 'bg-dark',

  template: footerTmpl

});
