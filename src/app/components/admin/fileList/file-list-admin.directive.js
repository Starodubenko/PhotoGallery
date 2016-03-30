(function(){
  angular.module('photo')
    .directive('fileListAdmin', function(AdminService){
      return{
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileList/file-list.html',
        link: function ($scope, element, attributes) {
          
          $scope.$watch('AdminService.getFiles()', function (newValue, oldValue) {
            $scope.files = AdminService.getFiles();
          })
        }
      }
    });
})();
