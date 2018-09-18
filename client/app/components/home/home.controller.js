class HomeController {
  constructor($scope,GameService,$rootScope) {
    this.name = 'home';
    this.$scope = $scope;
    this.GameService = GameService;
    GameService.reset(6,6);
    // this.$scope.grid = GameService.getGrid();

    this.$scope.flip = (i, j) => GameService.flip(i,j);


  }
}
HomeController.$inject = ['$scope','GameService', '$rootScope'];
export default HomeController;
