import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import VacationsSummaryEventController from './channel/VacationsSummaryEventController';
import VacationsUsedHolidaysView from './VacationsUsedHolidaysView';
import VacationsPendingHolidaysView from './VacationsPendingHolidaysView';
import template from './templates/vacations-summary-view.jst';
import VacationsSpentHolidaysView from './VacationsSpentHolidaysView';


const channel = Radio.channel('vacations-summary:channel');

export default Marionette.View.extend({

  // It could be a piece in our core.
  channelEvents: [
    {
      channel: channel,
      events: {
        'reply:vacations:summary': 'onSummaryRetrieved',
        'reply:client:info': 'onClientInfoRetrieved'
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

  regions: {
    summaryRegion: '#usedHolidaysRegion',
    pendingRegion: '#pedingHolidaysRegion',
    spentRegion: '#spentHolidaysRegion'
  },
      
  template: template,

  events: {
    'click [data-selector="vacationsBtn"]': 'onClickVacationsBtn'
  },
  
  initialize: function(options){
    this.channelController();
    this.initChannelEvents();
    this.userEmail = options.subroute;
  },

  // It could be a piece in our core on create Layout
  channelController: function(){
    this.channelController = new VacationsSummaryEventController();
  },

  onRender: function(){
    this.retrieveClientData();
  },

  retrieveClientData: function(){
    channel.request('request:client:info', { url: 'http://localhost:9080/client', method: 'GET', params: { userEmail: this.userEmail } });
  },

  onClientInfoRetrieved: function(response){
    this.clientInfo = response.data;
    this.onRequestVacations();
  },

  onSummaryRetrieved: function(response){
    const data = response.data;
    this.showChildView('summaryRegion', new VacationsUsedHolidaysView(data));
    /*this.showChildView('pendingRegion', new VacationsPendingHolidaysView({    
      pendingHolidays: [
        {startDate: '30/04/2018', endDate: '04/05/2018'},
        {startDate: '01/08/2018', endDate: '10/08/2018'}
      ]}));
    this.showChildView('spentRegion', new VacationsSpentHolidaysView({
      spentHolidays: [
        {startDate: '01/01/2018', endDate: '04/01/2018'},
        {startDate: '01/03/2018', endDate: '03/03/2018'}
      ]
    }));
    */
  },

  onDestroy: function(){
    this.removeChannelEvents();
  },

  onRequestVacations: function(){
    const today = new Date(),
      currentYear = today.getUTCFullYear(),
      startDate = '01/01/2018', endDate = today.toLocaleDateString('es-ES');

    channel.request('request:vacations:summary', { url: 'http://localhost:9080/vacations', method: 'GET', params: { employeeId: this.clientInfo.email}});
  },

  onVacationsRequested: function(data){
    const message = data.status === 'OK' ? 'Se han solicitado tus vacaciones correctamente' : 'Error solicitando vacaciones';   
    alert(message);
  },

  onClickVacationsBtn: function(){
    Backbone.history.navigate(`take-vacations/${this.clientInfo.email}`, { trigger: true });
  }

});
