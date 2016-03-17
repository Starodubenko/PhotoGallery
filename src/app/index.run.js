(function() {
  'use strict';

  angular
    .module('photoGallery')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
