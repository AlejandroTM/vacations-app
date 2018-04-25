import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import MenuDetailsModel from './../models/MenuDetailsModel';

export default Marionette.Object.extend({ 

    channelName: 'menu-details:channel',

    radioRequests: {
        'retrieve:restaurant:info': 'onRetrieveRestaurantInfo'    
    },

    onRetrieveRestaurantInfo: function(data){
        let restaurantModel  = new MenuDetailsModel({
            rid: '1',
            restName: 'La Puerta',
            distance: '1km',
            price: '10,90 €'
        });
        this.triggerByChannel('restaurant:info:ok', { resModel: restaurantModel } );

    },

    triggerByChannel: function( triggerEvent, data ){
        this.getChannel().trigger(triggerEvent, data);
    },

    fakeMenuList: function(){
        // Should be an async task to go to API and retrive menu information
        let collection = new Backbone.Collection();
        collection.add(new MenuDetailsModel({
            rid: '1',
            restName: 'La Puerta',
            distance: '1km',
            price: '10,90 €'
        }));
        collection.add(new MenuDetailsModel({
            rid: '2',
            restName: 'Mesón El Ocho',
            distance: '2km',
            price: '11,90 €'
        }));
        collection.add(new MenuDetailsModel({
            rid: '3',
            restName: 'Garvo Fusión',
            distance: '2.1km',
            price: '12,00 €'
        }));
        collection.add(new MenuDetailsModel({
            rid: '4',
            restName: 'La pitarra',
            distance: '500 m',
            price: '10,00 €'
        }));
        collection.add(new MenuDetailsModel({rid: '5'}));
        return collection;
    }
});