(function () {
  angular.module('admin', []);

  // angular.module('photo')
  //   .factory('AdminService', function () {
  //     var service = {};
  //
  //     var currentLoggedInUser;
  //     return {
  //
  //     }
  //   });


  angular.module('photo')
    .directive('adminView', function (LoginService, $animateCss) {
      return {
        restrict: 'E',
        templateUrl: '/app/components/admin/admin.html',
        link: function ($scope, element) {

          // $scope.collapseContent = function (event) {
          //   var itemId =  event.currentTarget.attributes.id.value;
          //   $scope.testList[itemId].isCollapsed = !$scope.testList[itemId].isCollapsed;
          // };
          //
          // $scope.testList = [
          //   {
          //     title: 'item_1',
          //     isCollapsed: true,
          //     content: {
          //         imageName: 'photo_1',
          //         section: 'section_1'
          //       }
          //   },
          //   {
          //     title: 'item_2',
          //     isCollapsed: true,
          //     content: {
          //       imageName: 'photo_2',
          //       section: 'section_2'
          //     }
          //   },
          //   {
          //     title: 'item_3',
          //     isCollapsed: true,
          //     content: {
          //       imageName: 'photo_3',
          //       section: 'section_3'
          //     }
          //   },
          //   {
          //     title: 'item_4',
          //     isCollapsed: true,
          //     content: {
          //       imageName: 'photo_4',
          //       section: 'section_4'
          //     }
          //   }
          // ]
        }
      }
    });
})();
