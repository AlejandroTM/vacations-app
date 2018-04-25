import Marionette from 'backbone.marionette';
import AppController from './ApplicationController';

export default Marionette.AppRouter.extend({

    controller: AppController,

    appRoutes: {
        '': 'onRoute',
        '/': 'onRoute',
        ':module': 'onRoute',
        ':module/': 'onRoute',
        ':module/:subroute': 'onRoute',
        ':module/:subroute/:uuid': 'onRoute'
    }
});
