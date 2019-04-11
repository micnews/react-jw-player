"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function shouldComponentUpdate(prevProps, nextProps) {
  var hasFileChanged = prevProps.file !== nextProps.file;
  var hasPlaylistChanged = prevProps.playlist !== nextProps.playlist;

  return hasFileChanged || hasPlaylistChanged;
}

exports.default = shouldComponentUpdate;