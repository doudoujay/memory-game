import angular from 'angular';
import Navbar from './navbar/navbar';
import Bottom from './bottom/bottom';

let commonModule = angular.module('app.common', [
  Navbar,
  Bottom
])
  
.name;

export default commonModule;
