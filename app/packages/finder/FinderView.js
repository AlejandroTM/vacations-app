import Marionette from 'backbone.marionette';
import finderTmpl from './templates/finder-view.jst';

export default Marionette.View.extend({

  className: 'bg-dark',

  template: finderTmpl,

  templateContext: {
    text: 'Aquí va el Footer'
  }

});
