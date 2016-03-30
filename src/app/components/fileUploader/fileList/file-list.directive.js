(function () {
    angular.module('angularUploaderPanel')
        .directive('fileList', function($http, $log){
            return{
                restrict: 'E',
                templateUrl: '/app/components/fileUploader/fileList/file-list.html',
                controller: function ($scope) {
                    var vm = this;
                    vm.removeFile = function (el) {
                        var removeElement = angular.element(el)[0].currentTarget;
                        var id = removeElement.attributes['value'].value;

                      $http({
                        method: 'POST',
                        url: 'http://localhost:8282/delete-file',
                        headers : {
                          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        data: {id: id}
                      }).then(function successCallback(resp) {
                        if (resp.status == 200){
                          $scope.files = $scope.files.filter(function (el) {
                            return el.id != id;
                          });
                        }
                      }, function errorCallback(response) {
                        $log.log(response);
                      });
                    };
                },
                link: function ($scope) {
                    $scope.files = [];

                    $scope.$on('fileIsUploaded', function (e, data) {
                        $scope.files.push({
                            id: data.id,
                            name: data.name,
                            comment: data.comment,
                            date: data.date
                        })
                    });
                }
            }
        });
})();
