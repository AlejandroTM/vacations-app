import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import LoginEventController from './channel/LoginEventController';
import template from './templates/login-view.jst';
import Backbone from 'backbone';


const channel = Radio.channel('login:channel');
const KAIROS_MAIL = "@kairosds.com";

/*window.onSignIn = function(googleUser) {
  if( googleUser ){
    var profile = googleUser.getBasicProfile();
    console.log('RESULT: ' + JSON.stringify(googleUser, null, 4));
    console.log('BASIC PROFILE: ' + JSON.stringify(profile, null, 4));
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }  
};*/

export default Marionette.View.extend({

  // It could be a piece in our core.
  channelEvents: [
    {
      channel: channel,
      events: {
        'validate:token:ok': 'onTokenOK',
        'validate:token:ko': 'onTokenKO'
        //'reply:vacations:request': 'onVacationsRequested'
      }
    }
  ],

  // It could be a piece in our core.
  initChannelEvents: function () {
    this.channelEvents.forEach(function (channelData) {
      let channel = channelData.channel, currentEv;
      for (currentEv in channelData.events) {
        let callback = channelData.events[currentEv];
        channel.on(currentEv, this[callback].bind(this));
      }
    }, this);
  },

  // It could be a piece in our core.
  removeChannelEvents: function () {
    this.channelEvents.forEach(function (channelData) {
      let channel = channelData.channel, currentEv;
      for (currentEv in channelData.events) {
        let callback = channelData.events[currentEv];
        channel.off(currentEv);
      }
    }, this);
  },

  className: 'row',

  template: template,

  initialize: function () {
    this.channelController();
    this.initChannelEvents();
    this.addGoogleSignInMethods();
  },

  addGoogleSignInMethods: function () {
    window.onSignIn = this.onSignIn.bind(this);
    window.onSignOut = this.onSignOut.bind(this);
  },

  // It could be a piece in our core on create Layout
  channelController: function () {
    this.channelController = new LoginEventController();
  },

  onDestroy: function () {
    this.removeChannelEvents();
  },

  onSignIn: function (googleUser) {
    if (googleUser) {
      const profile = googleUser.getBasicProfile();
      if (profile.getEmail().indexOf(KAIROS_MAIL) === -1) {
        this.onSignOut();
      } else {
        window.CONFIG.loggedIn = true;
        this.idToken = googleUser.getAuthResponse().id_token;
        channel.request('validate:token', { url: window.KAIROS_CONF.URL + '/login', method: 'POST', body: { idToken: this.idToken } });
      }
    }
  },

  onSignInFailure: function () {
    console.log('Fallo al logarse con KairosGoogle account.');
  },

  onSignOut: function () {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      this.onTokenKO();
      window.CONFIG.loggedIn = false;
    });
  },

  onTokenOK: function (data) {
    alert('Welcome. Your account has been validated');
    this.initializeFirebase();
    Backbone.history.navigate(`main-view/${data.email}`, { trigger: true });
  },

  initializeFirebase: function () {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      this.idToken);
    firebase.auth().signInWithCredential(credential).then((ok)=>{
      console.log('[Firebase] Connection done.');
    }).catch((err)=>{
      console.error(JSON.stringify(err, null, 4));
    });
  },

  onTokenKO: function () {
    alert('Sorry. You have to sign in using a KairosDS google account');
  }

});
