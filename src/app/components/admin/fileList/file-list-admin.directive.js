(function () {
  angular.module('photo')
    .directive('fileListAdmin', function (AdminService, fileReader, $timeout, $rootScope) {
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
            $scope.progress = 1.0 * progress.loaded / progress.total;
            console.log($scope.progress);
          });

          $scope.collapseContent = function (event, index) {
            var itemId = event.currentTarget.attributes.id.value;
            AdminService.colapseListElement(itemId,
              function () {
                var image = document.getElementById('admin-item-' + index);

                image.onload = function () {
                  var array = new Array(1000000);
                  for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = new Object();
                  };
                  console.timeEnd("imageLouded");
                };
                console.time("imageLouded");
                image.src = $scope.files[index].imageFileSrc;


                angular.element(event.currentTarget.parentElement.nextElementSibling).removeClass('hidden-content');
              },
              function () {
                $timeout(function () {
                  angular.element(event.currentTarget.parentElement.nextElementSibling).addClass('hidden-content');
                }, 400)
              });
          };
        }
      }
    });
})();
