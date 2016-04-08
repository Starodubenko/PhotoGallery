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
        // template: '<login-view></login-view>',
        data: {
          requireLogin: false
        }
      })
      .state('photoView', {
        url: '/photo-view',
        template: '<photo-view></photo-view>',
        data: {
          requireLogin: true
        }
      })
      .state('admin', {
        url: '/admin',
        // template: '<admin-view></admin-view>',
        template: '<photo-view></photo-view><admin-view></admin-view>',
        data: {
          requireLogin: true
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
