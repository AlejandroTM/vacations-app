import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import MenuModel from './../models/OrderMenuModel';

export default Marionette.Object.extend({ 

    channelName: 'order-menu:channel',

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
            rid: '6',
            restName: 'El lindo tenedor',
            distance: '1km',
            price: '10,90 €',
            picture: 'http://1.bp.blogspot.com/-Ye0oKypBPMQ/VKpL791Jk9I/AAAAAAAAAHk/7thAs1slen0/s1600/logoheader.png'
        }));
        collection.add(new MenuModel({
            rid: '7',
            restName: 'Healthy Food',
            distance: '2km',
            price: '11,90 €',
            picture: 'https://www.healthyfood.co.nz/wp-content/uploads/2016/10/logo.png'
        }));
        collection.add(new MenuModel({
            rid: '8',
            restName: 'La cacerola',
            distance: '2.1km',
            price: '12,00 €',
            picture: 'http://www.lacacerolacomoencasa.com/img/logo.svg'
        }));
        collection.add(new MenuModel({
            rid: '9',
            restName: 'La cocina de lilibet',
            distance: '500 m',
            price: '10,00 €',
            picture: 'https://image.jimcdn.com/app/cms/image/transf/dimension=320x10000:format=jpg/path/s0f7aa2aec3d9185b/image/i9dd61acb92a62835/version/1330794341/image.jpg'
        }));
        return collection;
    }
});