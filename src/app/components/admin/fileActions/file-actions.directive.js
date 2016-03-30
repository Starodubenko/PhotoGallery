(function(){
  angular.module('photo')
    .directive('fileActions', function(AdminService){
      return{
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileActions/file-actions.html',
        link: function ($scope, element, attributes) {

          $scope.selectFiles = function () {
            var files = [];
            AdminService.setFiles(files);
          };

          $scope.uploadAllFiles = function () {
            AdminService.uploadAll();
          };


        }
      }
    });
})();
