(function () {
  angular.module('login', ['ngAnimate']);

  angular.module('photo')
    .factory('LoginService', function ($sessionService) {
      var service = {};
      service.users = [
        {
          firstname: 'Rodion',
          lastname: 'Starodubenko',
          login: 'Rody',
          password: '1'
        }
      ];
      var checkUserInSession = function () {
        var isThere = false;
        isThere = $sessionService.user != null;
        if (isThere){

        }
        return isThere;
      };

      var getUserFromSession = function () {
        return $sessionService.user;
      };

      var setUserInSession = function (user) {
        $sessionService.user = user;
      };
      var currentLoggedInUser;
      return {
        getUserByCredentials: function (login, password) {
          service.users.forEach(function (item, index) {
            if (item.login == login && item.password == password){
              currentLoggedInUser = item;
            }
          });
          return currentLoggedInUser;
        },
        getCurrentLoggedInUser: function () {
          return getUserFromSession();
          // return currentLoggedInUser;
        },
        logOut: function () {
          // currentLoggedInUser = null;
          setUserInSession(null);
        }
      }
    });


  angular.module('photo')
    .directive('loginView', function (LoginService) {
      return {
        restrict: 'E',
        template:
        '<div class="login-view" layout="column" layout-wrap layout-align="end none" ng-class="{\'raised\': LoginService.getCurrentLoggedInUser()}">' +
          '<login-form layout="row" flex="auto"></login-form>' +
          '<navigation></navigation>' +
        '</div>',
        link: function ($scope) {

        }
      }
    });

  angular.module('photo')
    .directive('loginForm', function (LoginService) {
      return {
        restrict: 'E',
        template:
        '<div class="login-form" layout="row" flex="auto" layout-wrap layout-align="center center">' +
          '<form>' +
            '<div layout-gt-sm="column">' +
              '<md-input-container class="md-block" flex-gt-sm>' +
                '<label>User name</label>' +
                '<input ng-model="user.userName" value="Rody">' +
              '</md-input-container>' +
              '<md-input-container class="md-block" flex-gt-sm>' +
                '<label>Password</label>' +
                '<input ng-model="user.password" value="1">' +
              '</md-input-container>' +
            '</div>' +
            '<md-button class="md-raised md-primary" ng-click="logInSystem()">Log in</md-button>' +
          '</form>' +
        '</div>',
        link: function ($scope) {
          $scope.LoginService = LoginService;

          $scope.logInSystem = function(){
            $scope.foundUser = LoginService.getUserByCredentials($scope.user.userName,$scope.user.password)
          };
        }
      }
    });

  angular.module('photo')
    .directive('navigation', function (LoginService) {
      return {
        restrict: 'E',
        template:
        '<div class="navigation" layout="row" layout-align="space-between none" ng-class="{\'logged-in\': LoginService.getCurrentLoggedInUser()}">' +
          '<div class="nav-panel"  flex="70">' +

          '</div>' +
          '<div class="user-card" flex="30" ng-click="LoginService.logOut()">' +
            '{{LoginService.getCurrentLoggedInUser().firstname}}' +
            '{{LoginService.getCurrentLoggedInUser().lastname}}' +
          '</div>' +
        '</div>',
        link: function ($scope) {
          $scope.LoginService = LoginService;
        }
      }
    });
})();
