(function() {
  'use strict';

  angular
    .module('photoGallery')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, LoginService, $state, $window) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (toState.name == 'login' && $window.sessionStorage.token){
        event.preventDefault();
      } else if (toState.data.requireLogin && !$window.sessionStorage.token){
        LoginService.checkCurrentTokenForAccessToState(toState.name,
          function () {
            $state.transitionTo(toState.name);
            console.log("Success");
          },
          function () {
            $state.transitionTo('login');
            console.log("Denied");
          },
          function () {
            $state.transitionTo('error');
            console.log("Error");
          });
        event.preventDefault();
      }
    });
  }
})();
