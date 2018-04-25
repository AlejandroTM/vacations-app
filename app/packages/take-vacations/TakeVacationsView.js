import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import TakeVacationsEventController from './channel/TakeVacationsEventController';
import TakeVacationsModel from './models/TakeVacationsModel';
import template from './templates/take-vacations-view.jst';


const channel = Radio.channel('take-vacations:channel');

export default Marionette.View.extend({

  // It could be a piece in our core.
  channelEvents: [
    {
      channel: channel,
      events: {
        'reply:vacations:request': 'onVacationsRequested'
      }
    }
  ],

  // It could be a piece in our core.
  initChannelEvents: function(){
    this.channelEvents.forEach(function(channelData) {
      let channel = channelData.channel, currentEv;
      for( currentEv in channelData.events ){
        let callback = channelData.events[currentEv];
        channel.on(currentEv, this[callback].bind(this));
      }
    }, this);
  },

  // It could be a piece in our core.
  removeChannelEvents: function(){
    this.channelEvents.forEach(function(channelData) {
      let channel = channelData.channel, currentEv;
      for( currentEv in channelData.events ){
        let callback = channelData.events[currentEv];
        channel.off(currentEv);
      }
    }, this);
  },

  className: 'row',
      
  template: template,

  events: {
    'click @ui.takeVacationsBtn': 'onRequestVacations',
    'change @ui.startDateInput': 'onChangeStartDate',
    'change @ui.endDateInput': 'onChangeEndDate'
  },

  ui: {
    takeVacationsBtn: '[data-selector="takeVacationsBtn"]',
    startDateInput: '[data-selector="startDate"]',
    endDateInput: '[data-selector="endDate"]'
  },
  
  initialize: function(options){
    debugger;
    this.model = new TakeVacationsModel();
    this.channelController();
    this.initChannelEvents();
    this.userId = options.subroute;
  },

  // It could be a piece in our core on create Layout
  channelController: function(){
    this.channelController = new TakeVacationsEventController();
  },

  onRender: function(){
  },

  onDestroy: function(){
    this.removeChannelEvents();
  },

  onRequestVacations: function(){
    debugger;
    const body = Object.assign(this.model.getRequestBody(), {teamMate: this.userId});
    channel.request('vacations:request', { url: 'http://localhost:9080/vacations', method: 'POST', body: body});
  },

  onVacationsRequested: function(data){
    const message = data.status === 'OK' ? 'Se han solicitado tus vacaciones correctamente' : 'Error solicitando vacaciones';   
    alert(message);
  },

  onChangeStartDate: function(ev){
    const value = ev.target.value;
    this.ui.endDateInput.attr('min', value);
    this.ui.endDateInput.removeAttr('disabled');
    this.model.set('startDate', value);
  },

  onChangeEndDate: function(ev){
    const value = ev.target.value;
    this.model.set('endDate', value);
    if( this.model.isValid() ){
      this.ui.takeVacationsBtn.removeAttr('disabled');
    }
  }

});
