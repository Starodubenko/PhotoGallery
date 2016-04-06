(function () {

  angular.module('photo')
    .animation('.collapsed-item', function ($animateCss, AdminService) {
      return {
        addClass: function (element,className, done, properties) {
          AdminService.setCollapsed(properties.itemId, true);
          var animator = $animateCss(element, {
            to: {height: '380px'},
            duration: 0.3
          });
          animator.start().finally(function () {
            done();
            AdminService.startShowingPhoto(properties.itemId);
          });
        },
        removeClass: function (element, className, done, properties) {
          var animator = $animateCss(element, {
            to: {height: '0px'},
            duration: 0.3
          });
          animator.start().finally(function () {
            done();
            AdminService.setCollapsed(properties.itemId, false);
          });
        }
      }
    });

  angular.module('photo')
    .directive('fileListAdmin', function (AdminService, fileReader, $timeout, $rootScope, $q, $animate) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileList/file-list.html',
        link: function ($scope, element, attributes) {
          $scope.horizontalScroll = function (element) {
            var deltaY = element.deltaY;
            element = element.target.parentElement.parentElement.parentElement;
            element.scrollLeft = element.scrollLeft + deltaY / 3 * 20;
            event.preventDefault();
          };

          $scope.$on('fileAddedSuccessful', function () {
            $scope.files = AdminService.getFiles();
          });
          $rootScope.$on("fileProgress", function (e, progress) {
            // $scope.progress = 1.0 * progress.loaded / progress.total;
            // console.log($scope.progress);
          });

          $scope.collapseContent = function (event, index) {
            var itemId = event.currentTarget.attributes.id.value;
            var listItemElement = angular.element(event.currentTarget.parentElement.parentElement);
            var content = angular.element(event.currentTarget.parentElement.nextElementSibling);

            if (!listItemElement.hasClass('collapsed-item')){
              $animate.addClass(listItemElement, 'collapsed-item', {itemId: itemId});
            } else {
              $animate.removeClass(listItemElement, 'collapsed-item', {itemId: itemId});
            }
          };
        }
      }
    });
})();
