(function(){
  angular.module('photo')
    .directive('fileEditor', function(AdminService, $rootScope){
      return{
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileEditor/file-editor.html',
        link: function ($scope, element, attributes) {
          $rootScope.$on('newPhotoHasBeenSelected', function (photo) {
            $scope.editingPhoto = photo;
          })
        }
      }
    });
})();
