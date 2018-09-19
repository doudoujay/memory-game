class BottomController {
  constructor($rootScope, $scope, FirebaseService, GameService) {
    this.name = 'bottom';

  }
}
BottomController.$inject = ['$rootScope', '$scope','FirebaseService','GameService'];
export default BottomController;
