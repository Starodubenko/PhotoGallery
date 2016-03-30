(function(){
    angular.module('angularUploaderPanel', [])
        .directive('uploaderPanel', function(){
            return{
                restrict: 'E',
                template: '/app/components/fileUploader/uploaderPanel/uploader-panel.html',
                controller: function () {
                    this.horizontalScroll = function (element) {
                        var deltaY = element.deltaY;
                        element.target.scrollLeft = element.target.scrollLeft + deltaY / 3 * 5;
                        event.preventDefault();
                    };
                }
            }
        });
})();
