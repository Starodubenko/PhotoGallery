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
                    haveBeenCollapsed: false,
                    file: item,
                    imageFileSrc: result,
                    havePhotoBeenShown: false,
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
        setCollapsed: function (id, value) {
          service.selectedFiles[id].haveBeenCollapsed = value;
        },
        startShowingPhoto: function (itemId) {
          if (!service.selectedFiles[itemId].havePhotoBeenShown){
            var image = document.getElementById('admin-list-item-image-' + itemId);
            if(!image.src){
              var file = service.selectedFiles[itemId];
              image.src = file.imageFileSrc;
              if (image.src){
                service.selectedFiles[itemId].havePhotoBeenShown = true;
              }
            }
          }
        },
        uploadAll: function () {

        }
      }
    });

})();
