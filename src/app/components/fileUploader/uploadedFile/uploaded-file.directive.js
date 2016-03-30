(function(){
    angular.module('angularUploaderPanel')
        .directive('uploadedFile', function(){
            return{
                restrict: 'E',
                require: '^fileList',
                scope: {
                    file: '=file'
                },
                template: '/app/components/fileUploader/uploadedFile/uploaded-file.html',
                link: function ($scope, element, attributes, FileListController) {
                    $scope.removeFile = function (el) {
                        FileListController.removeFile(el)
                    }
                }
            }
        });
})();
