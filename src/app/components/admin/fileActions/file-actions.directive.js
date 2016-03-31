(function(){
  angular.module('photo')
    .directive('fileActions', function(AdminService){
      return{
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileActions/file-actions.html',
        link: function ($scope, element, attributes) {

          $scope.clickSelectFileButton = function (el) {
            var sibling = el.currentTarget.nextElementSibling;
            sibling.click();
          };

          $scope.$watch('files', function () {
            AdminService.setFiles($scope , function () {
              $scope.$parent.$broadcast('fileAddedSuccessful')
            });
          });

          $scope.uploadAllFiles = function () {
            AdminService.uploadAll();
          };
        }
      }
    });
})();
