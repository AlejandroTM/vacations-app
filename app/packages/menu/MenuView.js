import Marionette from 'backbone.marionette';
import menuTmpl from './templates/menu-view.jst';

export default Marionette.View.extend({

  template: menuTmpl,

  templateContext: {
    text: 'Aquí va el Menu'
  }

});
