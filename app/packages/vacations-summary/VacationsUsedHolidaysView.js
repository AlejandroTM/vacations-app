import Marionette from 'backbone.marionette';
import template from './templates/vacations-used-holidays-view.jst';


export default Marionette.View.extend({

  template: template,

  templateContext: function(){
    const year = new Date().getUTCFullYear();
    return{
      year: year,
      totalHolidays: this.options.total_vac,
      availableDays: this.options.available_vac,
      spentDays: this.options.spent_vac,
      permission: this.options.permission,
      training: this.options.training
    };
  }
});
