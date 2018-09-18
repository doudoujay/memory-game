import firebase from 'firebase';
class FirebaseService {
  constructor(
    $firebaseObject, $firebaseArray, $firebaseAuth, $firebaseStorage) {
    // firebase init
    var config = {
      apiKey: "AIzaSyCGJhhdrdC0WKD2vC4iLXxgthZMwUpYlPM",
      authDomain: "memory-game-us.firebaseapp.com",
      databaseURL: "https://memory-game-us.firebaseio.com",
      projectId: "memory-game-us",
      storageBucket: "memory-game-us.appspot.com",
      messagingSenderId: "370105281638"
    };
    firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
    this.array = $firebaseArray;
    this.auth = $firebaseAuth;
    this.obj = $firebaseObject;
    this.storage = $firebaseStorage;
  }
  getAuth() {
    return this.auth();
  }
  getLabs() {
    var ref = firebase.database().ref().child('labs');
    return this.array(ref);
  }
  getYoloStorage(fileName) {
    var storageRef = firebase.storage().ref(fileName);
    return this.storage(storageRef);
  }
  phoneNumbers(lab) {
    var ref = firebase.database().ref().child("phoneNumbers/"+lab.name);
    return this.array(ref);
  }
}

FirebaseService.$inject =
  ['$firebaseObject', '$firebaseArray', '$firebaseAuth', '$firebaseStorage'];
export default FirebaseService;
