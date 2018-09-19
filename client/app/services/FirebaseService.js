class FirebaseService {
  constructor(
    $firebaseObject, $firebaseArray, $firebaseAuth, $firebaseStorage, $rootScope) {
    this.array = $firebaseArray;
    this.auth = $firebaseAuth;
    this.obj = $firebaseObject;
    this.storage = $firebaseStorage;
    this.$rootScope=  $rootScope;

    var auth = this.auth();
    auth.$onAuthStateChanged((firebaseUser) => {
      $rootScope.user = firebaseUser;
    });
  }
  getAuth() {
    return this.auth();
  }
  saveHighestScore(score) {
    var ref = firebase.database().ref().child('scores');
    ref = this.obj(ref);
    ref[this.getUserEmailId()] = score;
    ref.$save().then(()=>{
      console.log('saved')
    });

  }
  getHighestScore() {
    var ref = firebase.database().ref('scores').child(this.getUserEmailId());
    ref = this.obj(ref);
    ref.$bindTo(this.$rootScope, "highScore").then(()=>{
      console.log("Binded high score to "+ this.$rootScope.highScore.$value);
    });

  }
  async getRanking() {
    var ref = firebase.database().ref().child('scores');
    ref = this.array(ref);
    await ref.$loaded();
    var result = [];
    angular.forEach(ref, e => e.$id = this.getEmailIdToEmail(e.$id));

    return ref;
  }

  getUserEmailId(){
    return this.$rootScope.user.email.replace(/\./g, ',');
  }
  getEmailIdToEmail(emailID){
    return emailID.replace(/,/g, '.');
  }
}

FirebaseService.$inject =
  ['$firebaseObject', '$firebaseArray', '$firebaseAuth', '$firebaseStorage','$rootScope'];
export default FirebaseService;
