(function () {

  angular.module('photo')
    .animation('.test-collapse', function ($animateCss) {
      return {
        addClass: function (element,className, done, options) {
          // element.removeClass(options.addClass);

          var height = element[0].offsetHeight;
          var animator = $animateCss(element, {
            // addClass: options.addClass,
            // from: {height: '10px'},
            to: {height: '100px'},
            duration: 0.5
          });
          animator.start().finally(function () {
            alert('wqeqe');
            done();
          });
        },
        removeClass: function (element, className, done) {
          var animator = $animateCss(element, {
            to: {height: '10px'},
            duration: 0.5
          });
          animator.start().finally(done);
        }
      }
    });

  angular.module('photo')
    .directive('animateTest', function ($animate) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/animateTest/animate-test.html',
        link: function ($scope, element, attributes) {

          $scope.isColapsed = false;

          $scope.collapseToggle = function () {
            // $scope.isTestCollapsed = !$scope.isTestCollapsed;
            var e = angular.element('.container-content');
            $animate.addClass(e, 'test-collapse', {id: 1});
          }

        }
      }
    });
})();
