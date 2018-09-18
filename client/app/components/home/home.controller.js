class HomeController {
  constructor($scope, GameService, $rootScope, $window) {
    this.name = 'home';
    this.$scope = $scope;
    this.GameService = GameService;
    GameService.reset(6, 6);
    // this.$scope.grid = GameService.getGrid();

    this.$scope.flip = (i, j) => GameService.flip(i, j);
    $scope.resize = () => {
      console.log($window.innerWidth, $window.innerHeight);
      $scope.cardHeight = (($window.innerHeight - 112) / GameService.height) - 18;
      $scope.cardStyle = {
        'height': $scope.cardHeight + 'px',
        'width': 'auto'
      };
    };

    $scope.resize();


    var appWindow = angular.element($window);

    appWindow.bind('resize', () => {
      $scope.$apply(() => {
        $scope.resize();
      })
    });
  }
}

HomeController.$inject = ['$scope', 'GameService', '$rootScope', '$window'];
export default HomeController;
