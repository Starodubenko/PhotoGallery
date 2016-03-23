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
        LoginService.checkCurrentTokenForAccessToState(toState.name)
          .then(function (access) {
            if (access){
              $state.transitionTo(toState.name);
            }else {
              $state.transitionTo('login');
            }
          })
          .catch(function (error) {
            $state.transitionTo('error');
          });
        event.preventDefault();
      }
    });
  }
})();
