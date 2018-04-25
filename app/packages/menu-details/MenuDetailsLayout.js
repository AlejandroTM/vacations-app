import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Radio from 'backbone.radio';
import MenuDetailsEventController from './channel/MenuDetailsEventController';
import template from './templates/menu-details-layout.jst';
import MenuDetailsView from './details-view/MenuDetailsView';
import OrderDetailsView from './details-view/OrderDetailsView';


const channel = Radio.channel('menu-details:channel');

export default Marionette.View.extend({

  // It could be a piece in our core.
  channelEvents: [
    {
      channel: channel,
      events: {
        'restaurant:info:ok': 'onRetrieveRestInfo'
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

  regions: {
    detailsView: '[data-region="detailContent"]'
  },
  
  DETAILS_VIEW: {
    'menu': MenuDetailsView,
    'order': OrderDetailsView
  },
  
  initialize: function(){
    debugger;
    this.channelController();
    this.initChannelEvents();
  },

  // It could be a piece in our core on create Layout
  channelController: function(){
    this.channelController = new MenuDetailsEventController();
  },

  onRender: function(){
    channel.request('retrieve:restaurant:info', {uuid: this.options.uuid});
  },

  onDestroy: function(){
    this.removeChannelEvents();
  },

  onRetrieveRestInfo: function(data){
    let viewOptions = this.options,
      detailView = this.DETAILS_VIEW[viewOptions.subroute] || DETAILS_VIEW['menu'],
      viewOpts = {uuid: viewOptions.uuid, model: data.resModel};

    this.showChildView( 'detailsView', new detailView(viewOptions));
  }

});
