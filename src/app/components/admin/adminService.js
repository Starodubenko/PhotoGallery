(function () {

  angular.module('photo')
    .factory('AdminService', function () {
      var service = {};


      return {
        setFiles: function (files) {
          service.selectedFiles = files;
        },
        getFiles: function () {
          return [
            {
              title: 'item_1',
              isCollapsed: true,
              content: {
                imageName: 'photo_1',
                section: 'section_1'
              }
            },
            {
              title: 'item_2',
              isCollapsed: true,
              content: {
                imageName: 'photo_2',
                section: 'section_2'
              }
            },
            {
              title: 'item_3',
              isCollapsed: true,
              content: {
                imageName: 'photo_3',
                section: 'section_3'
              }
            },
            {
              title: 'item_4',
              isCollapsed: true,
              content: {
                imageName: 'photo_4',
                section: 'section_4'
              }
            }
          ]
        },
        uploadAll: function () {

        }
      }
    });

})();
