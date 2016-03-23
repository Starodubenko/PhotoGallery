(function () {
  angular.module('login', ['ngAnimate']);

  angular.module('photo')
    .factory('authInterceptor', function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.sessionStorage.token) {
            config.headers.Authorization = $window.sessionStorage.token;
          }
          return config;
        },
        response: function (response) {
          if (response.status === 401) {

          }
          return response || $q.when(response);
        }
      };
    });

  angular.module('photo').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

  angular.module('photo')
    .factory('LoginService', function ($http, $rootScope, $state) {
      var service = {};
      service.users = [
        {
          firstname: 'Rodion',
          lastname: 'Starodubenko',
          login: 'Rody',
          password: '1'
        }
      ];
      var currentLoggedInUser;
      var checkedState;

      var checkCurrentTokenForAccessToState = function (checkingStateName, allowCallback, refuseCallback, errorCallback) {
        $http({
          method: 'GET',
          url: 'http://localhost:8080/api/check-access?state='+checkingStateName
        }).success(function (data, status, headers, config) {
            if (data.access == true){
              allowCallback();
            } else {
              refuseCallback();
            }
          })
          .error(function (data, status, headers, config) {
            errorCallback();
          });
      };
      return {
        checkCurrentTokenForAccessToState: checkCurrentTokenForAccessToState,

        getUserByCredentials: function (login, password) {
          
        },
        getCurrentLoggedInUser: function () {

        },
        logOut: function () {

        }
      }
    });

  angular.module('photo')
    .factory('AuthenticateService', function () {
      var service = {};

      var currentLoggedInUser;
      return {

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
    .directive('loginForm', function (LoginService, $http, $window, $state) {
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
            '<md-button class="md-raised md-primary" ng-click="submit()">Log in</md-button>' +
          '</form>' +
        '</div>',
        link: function ($scope) {
          $scope.LoginService = LoginService;

          $scope.submit = function () {
            $http({
              method: 'POST',
              url: 'http://localhost:8080/api/authenticate',
              data: {name: $scope.user.userName, password: $scope.user.password},
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            }).success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $state.go('photoView');
              })
              .error(function (data, status, headers, config) {
                delete $window.sessionStorage.token;
              });
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
