# Lz4.js [![NPM version](https://badge.fury.io/js/lz4js.svg)](https://www.npmjs.com/package/lz4js)
Lz4.js is an implementation of Lz4 designed to be used in web browsers. It contains no dependencies on external libraries or Node.JS, though it is organized as a set of CommonJS modules. It is recommended to use Browserify or WebPack to bundle this for the web browser.

## Usage
```javascript
var lz4 = require("lz4");
var fs = require("fs");

// Compress 128 bytes of zero.
var compressed = lz4.compress(new Array(128));

// Uncompress.
var uncompressed = lz4.uncompress(compressed);

// Compress file.bin to file.lz4.
var data = fs.readFileSync("file.bin");
compressed = Buffer.from(lz4.compress(data));
fs.writeFileSync('file.lz4', compressed);
```

> **Note**: The high-level `compress` and `uncompress` functions deal with framed Lz4 data and do not support raw block data nor legacy Lz4 blocks.

## API
The API accepts either `Array`s or `Uint8Array`s. Arrays are expected to be arrays of unsigned 8-bit values. The API will return `Uint8Array`s if the browser supports them, or `Array`s otherwise.

  - `compress(buffer: Array, maxSize: Number): Array`

    Compresses a buffer using Lz4. maxSize sets bounds on the output length; it is recommended to not specify this unless you know what you're doing.
    Any unused buffer data will be sliced before the buffer is returned.

  - `uncompress(buffer: Array, maxSize: Number): Array`

    Uncompresses a buffer using Lz4. maxSize sets bounds on the output length; if you know the output length, this will reduce memory usage somewhat.
    Any unused buffer data will be sliced before the buffer is returned.