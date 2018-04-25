import Marionette from 'backbone.marionette';
import menuTmpl from './templates/order-menu-item-view.jst';

export default Marionette.View.extend({

  className: 'col-sm-6 col-md-4',
  
  template: menuTmpl,

  templateContext: {
    text: 'Aquí va el Menu'
  }

});
