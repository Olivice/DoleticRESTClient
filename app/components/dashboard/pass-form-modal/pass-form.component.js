(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('passFormComponent', passFormComponent());

    function passFormComponent() {
        return {
            bindings: {},
            controller: "PassFormController",
            templateUrl: "app/components/dashboard/pass-form-modal/pass-form-modal.template.html"
        }
    }
})();