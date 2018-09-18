import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bottomComponent from './bottom.component';

let bottomModule = angular.module('bottom', [
  uiRouter
])

.component('bottom', bottomComponent)

.name;

export default bottomModule;
