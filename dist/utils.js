"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || WrappedComponent.type && WrappedComponent.type.displayName;
};