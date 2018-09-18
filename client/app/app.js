import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import firebase from 'firebase';
import "angularfire";

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import FirebaseService from './services/FirebaseService';
import GameService from './services/GameService';
import 'normalize.css';

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

angular.module('app', [
  ngMaterial,
  uiRouter,
  Common,
  Components
])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent)
  .service("FirebaseService", FirebaseService)
  .service("GameService", GameService);
