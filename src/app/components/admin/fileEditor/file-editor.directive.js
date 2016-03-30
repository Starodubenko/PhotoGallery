(function(){
  angular.module('photo')
    .directive('fileEditor', function(){
      return{
        restrict: 'E',
        scope: {},
        templateUrl: '/app/components/admin/fileEditor/file-editor.html',
        link: function ($scope, element, attributes, Controllers) {

        }
      }
    });
})();
