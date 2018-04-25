import Marionette from 'backbone.marionette';
import template from './templates/vacations-pending-view.jst';


export default Marionette.View.extend({

  template: template,

  templateContext: function(){
    return{
      pendingHolidays: this.options.pendingHolidays
    };
  }
});
