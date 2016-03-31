(function () {
  angular.module('photo')
    .directive('fileListAdmin', function (AdminService, fileReader, $timeout) {
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

          $scope.collapseContent = function (event) {
            var itemId = event.currentTarget.attributes.id.value;
            AdminService.colapseListElement(itemId,
              function () {
                angular.element(event.currentTarget.nextElementSibling).removeClass('hidden-content');
              },
              function () {
                $timeout(function () {
                  angular.element(event.currentTarget.nextElementSibling).addClass('hidden-content');
                }, 400)
              });
          };
        }
      }
    });
})();
