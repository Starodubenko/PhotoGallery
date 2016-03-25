(function() {
  'use strict';

  angular
    .module('photoGallery')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, LoginService, $state, $window) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.loggedUser = LoginService.getCurrentUser();

      if (toState.name == 'login' && $window.sessionStorage.token){
        event.preventDefault();
      } else if (toState.data.requireLogin){
        LoginService.checkCurrentTokenForAccessToState(toState.name)
          .then(function (access) {
            if (access){
              if ($rootScope.haveAllowedState != toState.name){
                $rootScope.haveAllowedState = toState.name;
                $state.transitionTo(toState.name);
                event.preventDefault();
              }
            }else {
              $rootScope.haveAllowedState = null;
              $state.transitionTo('login');
              event.preventDefault();
            }
          })
          .catch(function (error) {
            $rootScope.haveAllowedState = null;
            $state.transitionTo('error');
            event.preventDefault();
          });
      }
    });
  }
})();
