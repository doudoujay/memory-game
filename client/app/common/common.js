import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import Bottom from './bottom/bottom';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
  Bottom
])
  
.name;

export default commonModule;
