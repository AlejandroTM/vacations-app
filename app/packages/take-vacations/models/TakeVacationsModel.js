import Backbone from 'backbone';

export default Backbone.Model.extend({ 

    defaults: function(){
        return {
            startDate: null,
            endDate: null
        };
    },

    isValid: function(){
        return startDate !== null && endDate !== null;
    },

    getRequestBody: function(){
        return {
            startDate: this.get('startDate'),
            endDate: this.get('endDate')
        };
    }

});