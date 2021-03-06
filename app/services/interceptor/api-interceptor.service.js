(function() {
    'use strict';

    angular
        .module('doleticApp')
        .service('APIInterceptorService', APIInterceptorService);

    APIInterceptorService.$inject = ['$rootScope', 'SharedVariables'];

    function APIInterceptorService($rootScope,SharedVariables) {
        var service = this;
        service.request = function(config) {
            /*var currentUser = UserService.getCurrentUser();
            var access_token = currentUser ? currentUser.access_token : null;
            if (access_token) {
                config.headers.authorization = "Bearer " + access_token;
            }*/
            var access_token = SharedVariables.session.accessToken;
            var token_type = SharedVariables.session.tokenType;
            if (access_token && token_type) {
                config.headers.authorization = token_type + " " + access_token;
            }
            return config;
        };
        service.responseError = function(response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return response;
        };
    }

})();