(function () {
  angular.module('photo', ['ngAnimate']);

  angular.module('photo')
    .factory('PhotoService', function ($animate, $window) {
      var service = {};
      service.photos = [
        {
          name: 'Photo_1',
          photoSrc: '/assets/images/images_1.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_2',
          photoSrc: '/assets/images/images_2.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_3',
          photoSrc: '/assets/images/images_3.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_4',
          photoSrc: '/assets/images/images_4.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_5',
          photoSrc: '/assets/images/images_5.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_1',
          photoSrc: '/assets/images/images_1.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_2',
          photoSrc: '/assets/images/images_2.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_3',
          photoSrc: '/assets/images/images_3.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_4',
          photoSrc: '/assets/images/images_4.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_5',
          photoSrc: '/assets/images/images_5.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_1',
          photoSrc: '/assets/images/images_1.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_2',
          photoSrc: '/assets/images/images_2.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_3',
          photoSrc: '/assets/images/images_3.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_4',
          photoSrc: '/assets/images/images_4.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_5',
          photoSrc: '/assets/images/images_5.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_1',
          photoSrc: '/assets/images/images_1.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_2',
          photoSrc: '/assets/images/images_2.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_3',
          photoSrc: '/assets/images/images_3.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_4',
          photoSrc: '/assets/images/images_4.jpg',
          currentPhoto: false
        },
        {
          name: 'Photo_5',
          photoSrc: '/assets/images/images_7.jpg',
          currentPhoto: false
        }
      ];
      service.currentIndex = 0;
      service.shownSlider = false;

      // -----------------------------------------
      var setCurrentPhoto = function (index) {
        service.photos[index].currentPhoto = true;
      };
      var removeCurrentPhoto = function (index) {
        service.photos[index].currentPhoto = false;
      };
      var changePhotoOnSlider = function (index) {
        var previousIndex = service.currentIndex;
        removeCurrentPhoto(previousIndex);
        service.currentIndex = service.currentIndex + index;
        if (service.currentIndex >= service.photos.length && index > 0) {
          service.currentIndex = 0;
        }
        if (service.currentIndex <= -1 && index < 0) {
          service.currentIndex = service.photos.length - 1;
        }
        setCurrentPhoto(service.currentIndex);
        return previousIndex;
      };
      // -----------------------------------------
      var getScrolledPixels = function () {
        return $window.pageYOffset;
      };
      var highlightPhoto = function (currentIndex, nextIndex) {
        service.photos[currentIndex].currentPhoto = false;
        service.photos[nextIndex].currentPhoto = true;
      };
      var isCurrentPhoto = function (index) {
        return index == service.currentIndex
      };
      var getPhotoContainer = function (index) {
        return angular.element('#photo-' + index);
      };
      var getPhotoButtonsContainer = function (index) {
        return angular.element(getPhotoContainer(index)[0].lastChild);
      };
      var setCurrentPhotoOnSlider = function (index) {
        var previousIndex = service.currentIndex;
        if (index != null) {
          service.currentIndex = index;
        }
        if (service.shownSlider) {
          getPhotoContainer(service.currentIndex).addClass('photo-on-slider');
          if (previousIndex != service.currentIndex) {
            getPhotoContainer(previousIndex).removeClass('photo-on-slider');
          }
          removeCurrentPhoto(previousIndex);
          setCurrentPhoto(service.currentIndex);
        }
        return previousIndex;
      };
      var sliderModeAnimation = function (fromLeft, fromTop) {
        var element = getPhotoContainer(service.currentIndex);

        var scrolledY = $window.pageYOffset;
        var scrolledX = $window.pageXOffset;
        var targetLeft = element[0].parentElement.offsetLeft - scrolledX;
        var targetTop = element[0].parentElement.offsetTop - scrolledY;


        $animate.animate(element,
          {
            left: targetLeft + 'px',
            top: targetTop + 'px',
            width: '300px',
            height: '200px'
          },
          {
            left: fromLeft + 'px',
            top: fromTop + 'px',
            width: '100%',
            height: '100%'
          }
          , 'animate-photo'
        ).done(function () {
          element.removeAttr('style');
          service.shownSlider = true;
          var buttonsBlock = getPhotoButtonsContainer(service.currentIndex);
          buttonsBlock.addClass('visible-slider-buttons');
        });
      };
      return {
        getPhotoContainer: function (index) {
          return getPhotoContainer(index)
        },
        getPhotoButtonsContainer: function (index) {
          return getPhotoButtonsContainer(index)
        },

        setCurrentPhotoOnSlider: setCurrentPhotoOnSlider,
        getPhotos: function () {
          return service.photos;
        },
        getPhotoByIndex: function (index) {
          return service.photos[index];
        },
        getCurrentIndex: function () {
          return service.currentIndex;
        },

        showPrevious: function () {
          var previousIndex = changePhotoOnSlider(-1);
          if (service.shownSlider) {
            getPhotoContainer(service.currentIndex).addClass('photo-on-slider');
            getPhotoButtonsContainer(service.currentIndex).addClass('visible-slider-buttons');
            getPhotoContainer(previousIndex).removeClass('photo-on-slider');
            getPhotoButtonsContainer(previousIndex).removeClass('visible-slider-buttons');
          }
        },
        showNext: function () {
          var previousIndex = changePhotoOnSlider(1);
          if (service.shownSlider) {
            getPhotoContainer(service.currentIndex).addClass('photo-on-slider');
            getPhotoButtonsContainer(service.currentIndex).addClass('visible-slider-buttons');
            getPhotoContainer(previousIndex).removeClass('photo-on-slider');
            getPhotoButtonsContainer(previousIndex).removeClass('visible-slider-buttons');
          }
        },

        setShownSlider: function (val) {
          service.shownSlider = val;
        },
        isShownSlider: function () {
          return service.shownSlider;
        },
        sliderModeAnimation: sliderModeAnimation,
        sliderModeAnimationBack: function (fromLeft, fromTop) {
          if (service.shownSlider) {
            var element = getPhotoContainer(service.currentIndex);
            var scrolledY = $window.pageYOffset;
            var scrolledX = $window.pageXOffset;
            var buttonsBlock = angular.element(element[0].lastChild);
            var targetLeft = element[0].parentElement.offsetLeft - scrolledX;
            var targetTop = element[0].parentElement.offsetTop - scrolledY;


            buttonsBlock.removeClass('visible-slider-buttons');
            service.shownSlider = false;

            $animate.animate(element,
              {
                left: fromLeft + 'px',
                top: fromTop + 'px',
                width: '100%',
                height: '100%'
              },
              {
                left: targetLeft + 'px',
                top: targetTop + 'px',
                width: '300px',
                height: '200px'
              }
              , 'animate-photo'
            ).done(function () {
              element.removeAttr('style');
              element.toggleClass('photo-on-slider');
            });
          }
        },
        showSlider: function (newIndex, enterClick) {
          if (service.shownSlider == false) {
            service.shownSlider = true;
            if (enterClick) {
              setCurrentPhotoOnSlider(service.currentIndex);
            } else {
              setCurrentPhotoOnSlider(newIndex);
            }
            sliderModeAnimation(0, 0);
          }
        }
      }
    });


  angular.module('photo')
    .directive('photoView', function (PhotoService, $document, $location, $anchorScroll, anchorSmoothScroll) {
      return {
        restrict: 'E',
        template: '<div class="photo-view" layout="row" layout-wrap layout-align="center start">' +
        '<photo-panel index="$index" prefix="\'photo-\'" photo="photo" ng-repeat="photo in photos" tabindex="1"></photo-panel>' +
        '<photo-slider></photo-slider>' +
        '</div>',
        link: function ($scope) {
          $scope.PhotoService = PhotoService;
          $scope.photos = PhotoService.getPhotos();

          // $scope.$watch('PhotoService.getCurrentIndex()', function () {
          //   var element = angular.element('photo-' + PhotoService.getCurrentIndex());
          //   anchorSmoothScroll.scrollTo('photo-' + PhotoService.getCurrentIndex());
          // });

          $document.bind('keydown keypress', function (event) {
            if (event.which === 13) {
              $scope.$apply(PhotoService.showSlider(null, true));
              event.preventDefault();
            }
          });

          $document.bind('keydown keypress', function (event) {
            if (event.which === 27) {
              $scope.$apply(PhotoService.sliderModeAnimationBack(0, 0));
              event.preventDefault();
            }
          });

          $document.bind('keydown keypress', function (event) {
            if (event.which === 37) {
              $scope.$apply(PhotoService.showPrevious());
              event.preventDefault();
            }
          });

          $document.bind('keydown keypress', function (event) {
            if (event.which === 39) {
              $scope.$apply(PhotoService.showNext());
              event.preventDefault();
            }
          });
        }
      }
    });

  angular.module('photo')
    .directive('photoPanel', function ($log, PhotoService, $animate, $document) {
      return {
        restrict: 'E',
        scope: {
          photo: '=photo',
          index: '=index',
          prefix: '=prefix'
        },
        template: '<md-whiteframe class="md-whiteframe-12dp photo-panel" ng-class="{\'current-photo\': photo.currentPhoto}" layout="row">' +
        '<div id="{{prefix + index}}" class="photo" layout="row" layout-align="center center">' +
        '<img ng-src="{{photo.photoSrc}}" title="{{photo.name}}" ng-click="PhotoService.showSlider(index)">' +
        '<div class="slider-buttons" layout="row">' +
        '<label class="photo-slider-previous" flex="50" ng-click="PhotoService.showPrevious()"></label>' +
        '<label class="photo-slider-next" flex="50" ng-click="PhotoService.showNext()"></label>' +
        '</div>' +
        '</div>' +
        '</md-whiteframe>',
        link: function ($scope, element) {
          $scope.PhotoService = PhotoService;
          if (PhotoService.getPhotos().indexOf($scope.photo) == 0) {
            element[0].parentElement.focus();
            $scope.photo.currentPhoto = true;
          }
        }
      }
    });

  angular.module('photo')
    .directive('photoSlider', function (PhotoService) {
      return {
        restrict: 'E',
        scope: {},
        template: '<div class="photo-slider" ng-class="{\'show-mode\': PhotoService.isShownSlider()}" left-key="" right-key="">' +
        '<div class="slider-background"></div>' +
        '</div>',
        link: function ($scope) {
          $scope.PhotoService = PhotoService;
        }
      }
    });

  angular.module('photo')
    .directive('escKey', function () {
      return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if (event.which === 27) {
            $scope.$apply(function () {
              $scope.$eval(attrs.escKey);
            });

            event.preventDefault();
          }
        });
      };
    });


  angular.module('photo')
    .directive('enterKey', function () {
      return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if (event.which === 13) {
            $scope.$apply(function () {
              $scope.$eval(attrs.enterKey);
            });
            event.preventDefault();
          }
        });
      };
    });

  angular.module('photo')
    .directive('leftKey', function () {
      return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if (event.which === 37) {
            $scope.$apply(function () {
              $scope.$eval(attrs.leftKey);
            });
            event.preventDefault();
          }
        });
      };
    });

  angular.module('photo')
    .directive('rightKey', function () {
      return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if (event.which === 39) {
            $scope.$apply(function () {
              $scope.$eval(attrs.rightKey);
            });
            event.preventDefault();
          }
        });
      };
    });
})();
