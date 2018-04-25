import Marionette from 'backbone.marionette';
import template from './templates/menu-details-view.jst';

export default Marionette.View.extend({

  className: 'row',
      
  template: template,

  initialize: function(options){
    debugger;
    this.model = options.resModel;
  }

});
