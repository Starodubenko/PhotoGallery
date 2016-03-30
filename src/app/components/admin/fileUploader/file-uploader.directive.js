(function(){
  angular.module('photo')
    .directive('fileUploader', function(AdminService){
      return{
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileUploader/file-uploader.html',
        link: function ($scope, element, attributes) {

        }
      }
    });
})();
