(function () {

  angular.module('photo')
    .controller('AdminPageController', function ($scope, AdminService) {
      var vm = this;

      vm.isAdminOpen = AdminService.isAdminOpen;

      vm.toggleAdmin = AdminService.toggleAdmin;
  })
})();
