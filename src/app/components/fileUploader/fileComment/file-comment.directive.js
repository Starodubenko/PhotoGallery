(function () {
    angular.module('angularUploaderPanel')
        .directive('fileComment', function(){
            return{
                restrict: 'E',
                require: '^fileForm',
                templateUrl: '/app/components/fileUploader/fileComment/file-comment.html',
                link: function ($scope, element, attributes, FileFormController) {
                    $scope.$watch('comment', function () {
                        FileFormController.setComment($scope.comment);
                    });
                }
            }
        });
})();
