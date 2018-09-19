class NavbarController {
  constructor($rootScope, GameService, $scope, FirebaseService,$state) {
    this.name = 'navbar';
    var auth = FirebaseService.auth();
    $scope.ranking = () => GameService.showRanking();
    $scope.reset = () => {
      GameService.showToast("Reset the game");
      GameService.reset($rootScope.difficultyChosed, $rootScope.difficultyChosed);
    };
    $scope.signout = () => {
      GameService.showToast("Signed Out");
      GameService.resetWithoutStartingGame();
      $rootScope.user = null;
      auth.$signOut();
      $state.go('auth');
    }
  }
}

NavbarController.$inject = ["$rootScope", "GameService", "$scope","FirebaseService",'$state'];
export default NavbarController;
