import Marionette from 'backbone.marionette';
import template from './templates/order-details-view.jst';

export default Marionette.View.extend({

  className: 'row',
      
  template: template,

  initialize: function(options){
    this.model = options.resModel;
  }

});
