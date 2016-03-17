import { FlowRouter } from 'meteor/kadira:flow-router';

import 'babel-core/register'
import 'babel-polyfill'

import './client/main'

Meteor.startup(function() {
  FlowRouter.initialize();
});
