class HomeController {
  constructor($scope, GameService, $rootScope, $window, FirebaseService) {
    this.name = 'home';
    this.$scope = $scope;
    this.GameService = GameService;
    $rootScope.difficultyChosed = 6;
    $rootScope.difficulties = {"easy": 4, "medium": 6, "hard": 8};
    GameService.reset($rootScope.difficultyChosed, $rootScope.difficultyChosed);
    // this.$scope.grid = GameService.getGrid();

    $scope.flip = (i, j) => GameService.flip(i, j);

    $scope.resize = () => {
      // console.log($window.innerWidth, $window.innerHeight);
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

    $rootScope.$watch('difficultyChosed',()=>{
      GameService.reset($rootScope.difficultyChosed, $rootScope.difficultyChosed);
      GameService.showToast("Changed difficulty");
      $scope.resize();
    })

  }
}

HomeController.$inject = ['$scope', 'GameService', '$rootScope', '$window', 'FirebaseService'];
export default HomeController;
