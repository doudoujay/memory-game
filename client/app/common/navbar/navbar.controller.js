class NavbarController {
  constructor($rootScope, GameService, $scope) {
    this.name = 'navbar';
    $scope.reset = () => {
      GameService.showToast("Reset the game");
      GameService.reset(6, 6);
    };
  }
}

NavbarController.$inject = ["$rootScope", "GameService", "$scope"];
export default NavbarController;
