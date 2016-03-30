(function () {
  angular.module('login', ['ngAnimate']);

  angular.module('photo')
    .factory('authInterceptor', function ($q, $window) {
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
    .factory('LoginService', function ($http, $state, $q, $window, $timeout, jwtHelper) {
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

      var checkCurrentTokenForAccessToState = function (checkingStateName) {
        var q = $q.defer();
        $http({
          method: 'GET',
          url: 'http://localhost:8080/api/check-access?state='+checkingStateName
        }).success(function (data, status, headers, config) {
            if (data.access == true){
              q.resolve(true);
            } else {
              q.resolve(false);
            }
          })
          .error(function (data, status, headers, config) {
            q.reject(status);
          });
        return q.promise;
      };
      return {
        checkCurrentTokenForAccessToState: checkCurrentTokenForAccessToState,

        getUserByCredentials: function (login, password) {

        },
        isUserLoggedIn: function () {
          return !!$window.sessionStorage.token;
        },
        getCurrentUser: function () {
          var decodedToken;
          if ($window.sessionStorage.token){
            decodedToken = jwtHelper.decodeToken($window.sessionStorage.token);
          }
          return {
            getId: function () {
            return decodedToken ? decodedToken._doc._id : "";
            },
            getFirstName: function () {
              return decodedToken ? decodedToken._doc.firstname : "";
            },
            getLastName: function () {
              return decodedToken ? decodedToken._doc.lastname : "";
            }
          }
        },
        logOut: function () {
          delete $window.sessionStorage.token;
          $timeout(function () {
            $state.go('login');
          }, 600);

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
    .directive('loginView', function (LoginService, $animateCss) {
      return {
        restrict: 'E',
        template:
        '<div class="login-view" layout="column" layout-wrap layout-align="end none" ng-class="{\'raised\': LoginService.isUserLoggedIn()}">' +
          '<login-form layout="row" flex="auto"></login-form>' +
          '<navigation></navigation>' +
        '</div>',
        link: function ($scope, element) {
          // $scope.$watch('LoginService.isUserLoggedIn()', function () {
          //   $animate(element.firstChild, from, to, [className])
          // })
        }
      }
    });

  angular.module('photo')
    .directive('loginForm', function (LoginService, $http, $window, $state ) {
      return {
        restrict: 'E',
        templateUrl: '/app/components/login/login.html',
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
                $state.go(data.firstPage);
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
        '<div class="navigation" layout="row" layout-align="space-between none" ng-class="{\'logged-in\': LoginService.isUserLoggedIn()}">' +
          '<div class="nav-panel"  flex="70">' +

          '</div>' +
          '<div class="user-card" flex="30" ng-click="LoginService.logOut()">' +
            '{{loggedUser.getFirstName()}}' +
            '{{loggedUser.getLastName()}}' +
          '</div>' +
        '</div>',
        link: function ($scope) {
          $scope.LoginService = LoginService;
        }
      }
    });
})();
