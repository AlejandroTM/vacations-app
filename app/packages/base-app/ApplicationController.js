import VacationsSummaryView from 'packages/vacations-summary/VacationsSummaryView';
import LoginView from 'packages/login/LoginView';
import TakeVacationsView from 'packages/take-vacations/TakeVacationsView';
import Radio from 'backbone.radio';
import Backbone from 'backbone';

const channel = Radio.channel('app:channel');

export default {

    ROUTES_RESOLVER:  {
        VIEW_BY_ROUTE: {
            'login': LoginView,
            'main-view': VacationsSummaryView,
            'take-vacations': TakeVacationsView,
            'my-profile': VacationsSummaryView
        },
    
        getCallbackByRoute: function(route){
            let constructor = this.VIEW_BY_ROUTE[route] || this.VIEW_BY_ROUTE['login'];
            return constructor;
        }
        
    },

    onRoute: function (route, subroute, uuid) {
        if( route === null ){
            this.onEmptyRoute();
        }else{
            this.navigateTo(route, subroute, uuid);
        }
    },

    navigateTo: function (route, subroute, uuid){
        const viewConstructor = this.ROUTES_RESOLVER.getCallbackByRoute(route);
        channel.trigger( 'app:change:route', { view: viewConstructor, viewOptions: {subroute: subroute, uuid: uuid, route: route } } );
    },

    onEmptyRoute: function(){
        Backbone.history.navigate('login', {trigger: true});
    }
    
};
