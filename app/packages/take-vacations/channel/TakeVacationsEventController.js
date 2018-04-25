import Marionette from 'backbone.marionette';
import MenuModel from './../models/TakeVacationsModel';

export default Marionette.Object.extend({ 

    channelName: 'take-vacations:channel',

    radioRequests: {
        'vacations:request': 'onVacationsRequest'
    },

    radioResponses: {
        vacationsRequest: 'reply:vacations:request'
    },

    onVacationsRequest: function(data){
        console.log('Asking your vacations...');
        this.doRequest(data, this.onSummarySuccess, this.onSummaryError);
    },

    triggerByChannel: function( triggerEvent, data ){
        this.getChannel().trigger(triggerEvent, data);
    },

    doRequest: function( requestData, onSuccess, onError ){
        const method = requestData.method || 'GET',
            successCallback = onSuccess ? onSuccess.bind(this) : this.onSuccess.bind(this),
            errorCallback = onError ? onError.bind(this) : this.onError.bind(this);
        $.ajax({
            url: requestData.url,
            method: method,
            data: method === 'POST' ? JSON.stringify(requestData.body) : requestData.params,
            contentType: method !== 'GET' ? 'application/json' : undefined,
            success: successCallback,
            error: errorCallback
          });
    },

    onSuccess: function(data){
        this.triggerByChannel(this.radioResponses.vacationsRequest, {status: 'OK'});
    },

    onError: function(xhr){
        console.error('[ERROR] Error in vacations request has occurred.');
    }
});