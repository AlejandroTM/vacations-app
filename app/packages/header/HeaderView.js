import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Radio from 'backbone.radio';
import headerTmpl from './templates/header-view.jst';

const appChannel = Radio.channel('app:channel');

export default Marionette.View.extend({


  // It could be a piece in our core.
  channelEvents: [
    {
      channel: appChannel,
      events: {
        'app:change:route': 'onChangeAppRouter'
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

  events: {
    'click .link-page': 'onChangePage',
    'click [data-selector="close-session"]': 'onCloseSession'
  },

  ui: {
    navItems: '.link-page',
    menuBtn: '#menuBtn'
  },

  template: headerTmpl,

  initialize: function(){
    this.initChannelEvents();
  },

  onDestroy: function(){
    this.removeChannelEvents();
  },

  onChangeAppRouter: function(data){
    const func = data.viewOptions.route === 'login' ? 'attr' : 'removeAttr';
    this.ui.menuBtn[func]('hidden', true);
  },

  onChangePage: function(ev){
    this.ui.navItems.removeClass('active');
    ev.target.closest('.nav-item').classList.add("active");
  },

  onCloseSession: function(){
    this.onSignOut();
  },

  onSignOut: function(){
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      window.CONFIG.loggedIn = false;
      Backbone.history.navigate('login', { trigger: true });
    });
  }

});
