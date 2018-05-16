import Marionette from 'backbone.marionette';
import MenuModel from './../models/LoginModel';

export default Marionette.Object.extend({ 

    channelName: 'login:channel',

    radioRequests: {
        'validate:token': 'onValidateToken'
    },

    radioResponses: {
        tokenOK: 'validate:token:ok',
        tokenKO: 'validate:token:ko'
    },

    onValidateToken: function(data){
        console.log('[Login] Validate google token');
        this.doRequest(data);
        this.triggerByChannel(this.radioResponses.vacationsRequest, {status: 'OK'});
    },

    triggerByChannel: function( triggerEvent, data ){
        this.getChannel().trigger(triggerEvent, data);
    },

    doRequest: function( requestData ){
        const method = requestData.method || 'GET';
        $.ajax({
            url: requestData.url,
            method: method,
            data: method === 'POST' ? JSON.stringify(requestData.body) : requestData.params,
            contentType: method !== 'GET' ? 'application/json' : undefined,
            success: this.onSuccess.bind(this),
            error: this.onError.bind(this)
          });
    },

    onSuccess: function(response){
        debugger;
        this.triggerByChannel(this.radioResponses.tokenOK, response.data);
    },

    onError: function(xhr){
        this.triggerByChannel(this.radioResponses.tokenKO, xhr);
    }

});