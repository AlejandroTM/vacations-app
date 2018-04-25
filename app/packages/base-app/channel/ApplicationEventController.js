import Marionette from 'backbone.marionette';

export default Marionette.Object.extend({ 

    channelName: 'app:channel',

    radioRequests: {
        'app:login:user': 'onLoginUser',
        'app:logout:user': 'onLogoutUser'
    },

    radioEvents: {
        'app:change:route': 'onLocationChange'    
    },

    onLoginUser: function(){
        console.log('[APP_REQUEST] Login user...');
    },

    onLogoutUser: function(){
        console.log('[APP_REQUEST] Logout user...');
    },

    onLocationChange: function(data){
        this.triggerByChannel( 'app:change:layout', data );
    },

    triggerByChannel: function( triggerEvent, data ){
        this.getChannel().trigger(triggerEvent, data);
    }
});