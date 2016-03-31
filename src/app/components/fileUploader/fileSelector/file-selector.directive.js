(function(){
    angular.module('angularUploaderPanel')
        .directive('fileSelector', function(){
            return{
                restrict: 'E',
                require: ['^uploaderPanel', '^fileForm'],
                scope: {},
                templateUrl: '/app/components/fileUploader/fileSelector/file-selector.html',
                link: function ($scope, element, attributes, Controllers) {
                    var UploaderPanelController = Controllers[0];
                    var FileFormController = Controllers[1];
                    var sibling;

                    $scope.clickSelectFileButton = function (el) {
                        sibling = el.currentTarget.nextElementSibling;
                        sibling.click();
                    };

                    $scope.$watch('files', function () {
                        FileFormController.setFile($scope.file);
                    });

                    $scope.scroll = function ($event, $delta, $deltaX, $deltaY) {
                        UploaderPanelController.horizontalScroll($event, $delta, $deltaX, $deltaY);
                    }
                }
            }
        });
})();
