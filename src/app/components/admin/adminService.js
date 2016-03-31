(function () {

  angular.module('photo')
    .factory('AdminService', function (fileReader) {
      var service = {};
      service.selectedFiles = [];
      service.currentSection = 'section_1';

      return {
        setFiles: function ($scope, callback) {
          if ($scope.files) {
            var filteredFiles = $scope.files.filter(function (item) {
              return item.type.substring(0, item.type.indexOf('/')) == 'image';
            });
            filteredFiles.forEach(function (item) {
              fileReader.readAsDataUrl(item, $scope)
                .then(function (result) {
                  service.selectedFiles.push({
                    title: item.name,
                    isCollapsed: true,
                    file: item,
                    imageFileSrc: result,
                    section: service.currentSection
                  });
                });
            });
            callback();
          }
        },
        getFiles: function () {
          return service.selectedFiles;
        },
        colapseListElement: function (itemId, beforeOpen, beforeClose) {
          if (service.selectedFiles[itemId].isCollapsed){
            beforeOpen();
          }
          service.selectedFiles[itemId].isCollapsed = !service.selectedFiles[itemId].isCollapsed;
          if (service.selectedFiles[itemId].isCollapsed){
            beforeClose();
          }
        },
        uploadAll: function () {

        }
      }
    });

})();
