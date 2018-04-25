import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import ApplicationLayout from './packages/base-app/ApplicationLayout';
import AppRouter from './packages/base-app/ApplicationRouter';

export default Marionette.Application.extend({
  
  region: '#app',

  onStart() {
    this.showView(new ApplicationLayout ());
    this.startRouter();
    this.startBackboneHistory();
    this.initializeConfig();
    //this.showView(new ApplicationLayout ());
  },

  startRouter: function(){
    this.router = new AppRouter();
  },

  startBackboneHistory: function(){
    Backbone.history.start();
  },

  initializeConfig: function(){
    window.CONFIG = window.CONFIG || {};
    window.CONFIG.loggedIn = false;
  }
});
