class rankingController{
  constructor($rootScope,FirebaseService, $scope){
    FirebaseService.getRanking().then(ranks => $scope.ranks = ranks);
  }
}
rankingController.$inject = ['$rootScope','FirebaseService','$scope'];
export default rankingController;
