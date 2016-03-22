(function() {
  'use strict';

  angular
    .module('photoGallery')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login-view></login-view>'
      })
      .state('photoView', {
        url: '/photo-view',
        template: '<photo-view></photo-view>',
        onEnter: function (LoginService, $state) {
          LoginService.checkCurrentTokenForAccessToState('photoView',
            function () {
              $state.go('login');
            },
            function () {
              $state.go('error');
            }
          );
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
