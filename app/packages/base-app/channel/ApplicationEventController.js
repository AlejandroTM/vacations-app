import Marionette from 'backbone.marionette';

export default Marionette.Object.extend({

    channelName: 'app:channel',

    radioRequests: {
        'app:login:user': 'onLoginUser',
        'app:logout:user': 'onLogoutUser',
        'app:user:info': 'onGetUserInfo'
    },

    radioEvents: {
        'app:change:route': 'onLocationChange'
    },

    onLoginUser: function () {
        console.log('[APP_REQUEST] Login user...');
    },

    onLogoutUser: function () {
        console.log('[APP_REQUEST] Logout user...');
    },

    onLocationChange: function (data) {
        this.triggerByChannel('app:change:layout', data);
    },

    onGetUserInfo: function(data) {
        const db = firebase.database();
        const ref = db.ref('Employees');
        ref.orderByChild(data.key).limitToLast(1).equalTo(data.value).on("child_added", function (element, index) {
            const userInfo = element.toJSON();
            console.log(userInfo);
            this.triggerByChannel('reply:get:client:info', {data: userInfo});
        }.bind(this));
    },

    triggerByChannel: function (triggerEvent, data) {
        this.getChannel().trigger(triggerEvent, data);
    }
});