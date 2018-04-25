import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import MenuModel from './../models/MenuModel';

export default Marionette.Object.extend({ 

    channelName: 'menu-list:channel',

    radioRequests: {
        'retrieve:menu:list': 'onRetrieveMenuList'    
    },

    onRetrieveMenuList: function(data){
        let collection = this.fakeMenuList();
        this.triggerByChannel('reply:menu:list', {collection: collection});
    },

    triggerByChannel: function( triggerEvent, data ){
        this.getChannel().trigger(triggerEvent, data);
    },

    fakeMenuList: function(){
        // Should be an async task to go to API and retrive menu information
        let collection = new Backbone.Collection();
        collection.add(new MenuModel({
            rid: '1',
            restName: 'La Puerta',
            distance: '1km',
            price: '10,90 €'
        }));
        collection.add(new MenuModel({
            rid: '2',
            restName: 'Mesón El Ocho',
            distance: '2km',
            price: '11,90 €',
            picture: 'http://www.mesonelocho.com/templates/biojazzard/images/mesonelocho.png'
        }));
        collection.add(new MenuModel({
            rid: '3',
            restName: 'Garvo Fusión',
            distance: '2.1km',
            price: '12,00 €',
            picture: 'http://www.garvofusion.com/assets/img/gallery/small/8.jpg'
        }));
        collection.add(new MenuModel({
            rid: '4',
            restName: 'La pitarra',
            distance: '500 m',
            price: '10,00 €',
            picture: ''
        }));
        collection.add(new MenuModel({rid: '5'}));
        return collection;
    }
});