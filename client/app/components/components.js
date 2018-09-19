import angular from 'angular';
import Home from './home/home';
import Auth from './auth/auth';

let componentModule = angular.module('app.components', [
  Home,
  Auth
])

.name;

export default componentModule;
