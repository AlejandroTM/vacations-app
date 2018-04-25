import Marionette from 'backbone.marionette';
import template from './templates/vacations-spent-view.jst';


export default Marionette.View.extend({

  template: template,

  templateContext: function(){
    return{
      spentHolidays: this.options.spentHolidays
    };
  }
});
