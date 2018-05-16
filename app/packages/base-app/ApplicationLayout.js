import Marionette from 'backbone.marionette';
import HeaderView from 'packages/header/HeaderView';
import FooterView from 'packages/footer/FooterView';
import ApplicationEventController from './channel/ApplicationEventController';
import appTemplate from './templates/app-layout.jst';
import Radio from 'backbone.radio';

const channel = Radio.channel('app:channel');

export default Marionette.View.extend({
  
  // It could be a piece in our core.
  channelEvents: [
    {
      channel: channel,
      events: {
        'app:change:layout': 'onChangeMainLayout'
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

  regions: {
    headerRegion: '[data-region="header"]',
    menuRegion: '[data-region="menu"]',
    contentRegion: '[data-region="content"]',
    footerRegion: '[data-region="footer"]'
  },

  template: appTemplate,

  initialize: function(){
    this.channelController();
    this.initChannelEvents();
  },

  // It could be a piece in our core on create Layout
  channelController: function(){
    this.channelController = new ApplicationEventController();
  },

  onRender: function(){
    this.showBaseApp();
  },

  showBaseApp: function(){
    this.showView( HeaderView, 'headerRegion' );
    this.showView( FooterView, 'footerRegion' );
  },

  showView: function( View, region, viewOptions ){
    let view = new View(viewOptions || {} );  
    this.showChildView( region, view);
  },

  onChangeMainLayout: function(data){
    this.showView( data.view, 'contentRegion', data.viewOptions );
  }

});
