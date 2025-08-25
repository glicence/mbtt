import '@testing-library/jest-dom';

const { TextDecoder, TextEncoder } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

const { Blob, File } = require('node:buffer');

function channelMock() {}
channelMock.prototype.onmessage = function () {};
channelMock.prototype.postMessage = function (data: any) {
  this.onmessage({ data });
};

function Transform() {}
Transform.prototype.readable = true;
Transform.prototype.writable = true;
Transform.prototype.write = function () {};
Transform.prototype.end = function () {};

Object.defineProperties(globalThis, {
  Blob: { value: Blob },
  File: { value: File },
  BroadcastChannel: { value: channelMock },
  TransformStream: { value: Transform },
});
