import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Radio from 'backbone.radio';
import MenuListChildView from './MenuListChildView';
import MenuListEventController from './channel/MenuListEventController';


const channel = Radio.channel('menu-list:channel');

export default Marionette.CompositeView.extend({

  // It could be a piece in our core.
  channelEvents: [
    {
      channel: channel,
      events: {
        'reply:menu:list': 'onMenuList'
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
      
  template: '<div data-selector="child-container" class="row"></div>',

  childView: MenuListChildView,

  childViewContainer: '[data-selector="child-container"]',

  initialize: function(){
    this.collection = new Backbone.Collection();
    this.channelController();
    this.initChannelEvents();
    channel.request('retrieve:menu:list', {data: 'a'});
  },

  // It could be a piece in our core on create Layout
  channelController: function(){
    this.channelController = new MenuListEventController();
  },

  onRender: function(){
    //channel.request('retrieve:menu:list', {data: 'a'});
  },

  onDestroy: function(){
    this.removeChannelEvents();
  },

  onMenuList: function(data){
    this.collection.add(data.collection.models);
    this.render();
  }

});
