import * as Collections from '../../lib/collections';
//import { Meteor } from 'meteor/meteor';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
//import { FlowRouter } from 'meteor/kadira:flow-router';
//import { ReactiveDict } from 'meteor/reactive-dict';
//import { Tracker } from 'meteor/tracker';

var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ["profile.lastName", "profile.firstName"];



export default function (reducer) {
    return {
        Meteor,
        FlowRouter,
        Collections,
        UserSearch: new SearchSource('users', fields, options),
        LocalState: new ReactiveDict(),
        Store: createStore(
          reducer,
          applyMiddleware(thunk, createLogger())),
        Tracker
    }
}
