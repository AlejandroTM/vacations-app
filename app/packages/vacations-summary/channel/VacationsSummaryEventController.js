import Marionette from 'backbone.marionette';
import MenuModel from './../models/VacationsSummaryModel';

export default Marionette.Object.extend({ 

    channelName: 'vacations-summary:channel',

    radioRequests: {
        'request:vacations:summary': 'onVacationsRequest',
        'request:client:info': 'onRetrieveClientData'
    },

    radioResponses: {
        clientRequest: 'reply:client:info',
        vacationsRequest: 'reply:vacations:summary'
    },

    onVacationsRequest: function(data){
        console.log('Asking your vacations...');
        this.doRequest(data, this.onSummarySuccess, this.onSummaryError);
    },

    onRetrieveClientData: function(data){
        console.log('Retrieve client data...');
        this.doRequest(data, this.onClientSuccess, this.onClientError);
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
        console.log('Default success method');
    },

    onError: function(xhr){
        console.log('Default error method');
    },

    onClientSuccess: function(data){
        this.triggerByChannel(this.radioResponses.clientRequest, data);
    },

    onClientError: function(xhr){
        //this.triggerByChannel(this.radioResponses.tokenKO, xhr);
        console.error('[ERROR] Error getting client information.');
    },

    onSummarySuccess: function(data){
        this.triggerByChannel(this.radioResponses.vacationsRequest, data);
    },

    onSummaryError: function(xhr){
        console.error('[ERROR] Error getting client vacations info.');
    }
});