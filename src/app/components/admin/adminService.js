(function () {

  angular.module('photo')
    .factory('AdminService', function (fileReader, $q, Upload, $log) {
      var service = {};
      service.selectedFiles = [];
      service.currentSection = 'section_1';
      service.openAdmin = false;

      return {
        toggleAdmin: function () {
          service.openAdmin = !service.openAdmin;
        },
        isAdminOpen: function () {
          return service.openAdmin;
        },
        setFiles: function ($scope, callback) {
          if ($scope.files) {
            var filteredFiles = $scope.files.filter(function (item) {
              return item.type.substring(0, item.type.indexOf('/')) == 'image';
            });
            filteredFiles.forEach(function (item) {
              fileReader.readAsDataUrl(item, $scope)
                .then(function (result) {
                  service.selectedFiles.push({
                    file: item,
                    title: item.name,
                    section: service.currentSection,
                    imageFileSrc: result,
                    downloadProgress: 0,
                    haveBeenCollapsed: false,
                    havePhotoBeenShown: false
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
          service.selectedFiles.forEach(function (file,index) {
            if (file.downloadProgress == 0){
              Upload.upload({
                url: 'http://localhost:8080/api/upload-file',
                data: {
                  file: file.file,
                  section: file.section
                }
              }).then(function (resp) {
                if (resp.status == 200) {
                }
              }, function (resp) {
                // $log.log('Error status: ' + resp.status);
              }, function (evt) {
                service.selectedFiles[index].downloadProgress = parseInt(100.0 * evt.loaded / evt.total);
              });
            }
          })
        },
        uploadFile: function (index) {
          var file = service.selectedFiles[index];

          Upload.upload({
            url: 'http://localhost:8080/api/upload-file',
            data: {
              file: file.file,
              section: file.section
            }
          }).then(function (resp) {
              if (resp.status == 200) {
              }
            }, function (resp) {
              // $log.log('Error status: ' + resp.status);
            }, function (evt) {
              service.selectedFiles[index].downloadProgress = parseInt(100.0 * evt.loaded / evt.total);
            });
        },
        removeFile: function (index) {
          service.selectedFiles.splice(index, 1);
        }
      }
    });

})();
