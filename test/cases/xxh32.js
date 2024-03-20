/* eslint-env node, mocha */
var expect = require('chai').expect;
var xxh32 = require('../../src/xxh32');

describe('xxh32', function () {
  describe('#hash', function () {
    it('passes the github.com/pierrec/xxHash tests', function () {
      /** @type {[number, number[]][]} */
      var tests = [
        [0x02cc5d05, []],
        [0x550d7456, [0x61]],
        [0x4999fc53, [0x61, 0x62]],
        [0x32d153ff, [0x61, 0x62, 0x63]],
        [0xa3643705, [0x61, 0x62, 0x63, 0x64]],
        [0x9738f19b, [0x61, 0x62, 0x63, 0x64, 0x65]],
        [0x8b7cd587, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66]],
        [0x9dd093b3, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67]],
        [0x0bb3c6bb, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68]],
        [0xd03c13fd, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
                      0x69]],
        [0x8b988cfe, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
                      0x69, 0x6a]],
        [0x9d2d8b62, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
                      0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70]],
        [0x42ae804d, [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
                      0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70,
                      0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78,
                      0x79, 0x7a, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35,
                      0x36, 0x37, 0x38, 0x39]],
        [0x62b4ed00, [0x4c, 0x6f, 0x72, 0x65, 0x6d, 0x20, 0x69, 0x70,
                      0x73, 0x75, 0x6d, 0x20, 0x64, 0x6f, 0x6c, 0x6f,
                      0x72, 0x20, 0x73, 0x69, 0x74, 0x20, 0x61, 0x6d,
                      0x65, 0x74, 0x2c, 0x20, 0x63, 0x6f, 0x6e, 0x73,
                      0x65, 0x63, 0x74, 0x65, 0x74, 0x75, 0x72, 0x20,
                      0x61, 0x64, 0x69, 0x70, 0x69, 0x73, 0x63, 0x69,
                      0x6e, 0x67, 0x20, 0x65, 0x6c, 0x69, 0x74, 0x2c,
                      0x20, 0x73, 0x65, 0x64, 0x20, 0x64, 0x6f, 0x20,
                      0x65, 0x69, 0x75, 0x73, 0x6d, 0x6f, 0x64, 0x20,
                      0x74, 0x65, 0x6d, 0x70, 0x6f, 0x72, 0x20, 0x69,
                      0x6e, 0x63, 0x69, 0x64, 0x69, 0x64, 0x75, 0x6e,
                      0x74, 0x20, 0x75, 0x74, 0x20, 0x6c, 0x61, 0x62,
                      0x6f, 0x72, 0x65, 0x20, 0x65, 0x74, 0x20, 0x64,
                      0x6f, 0x6c, 0x6f, 0x72, 0x65, 0x20, 0x6d, 0x61,
                      0x67, 0x6e, 0x61, 0x20, 0x61, 0x6c, 0x69, 0x71,
                      0x75, 0x61, 0x2e, 0x20, 0x55, 0x74, 0x20, 0x65,
                      0x6e, 0x69, 0x6d, 0x20, 0x61, 0x64, 0x20, 0x6d,
                      0x69, 0x6e, 0x69, 0x6d, 0x20, 0x76, 0x65, 0x6e,
                      0x69, 0x61, 0x6d, 0x2c, 0x20, 0x71, 0x75, 0x69,
                      0x73, 0x20, 0x6e, 0x6f, 0x73, 0x74, 0x72, 0x75,
                      0x64, 0x20, 0x65, 0x78, 0x65, 0x72, 0x63, 0x69,
                      0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x75,
                      0x6c, 0x6c, 0x61, 0x6d, 0x63, 0x6f, 0x20, 0x6c,
                      0x61, 0x62, 0x6f, 0x72, 0x69, 0x73, 0x20, 0x6e,
                      0x69, 0x73, 0x69, 0x20, 0x75, 0x74, 0x20, 0x61,
                      0x6c, 0x69, 0x71, 0x75, 0x69, 0x70, 0x20, 0x65,
                      0x78, 0x20, 0x65, 0x61, 0x20, 0x63, 0x6f, 0x6d,
                      0x6d, 0x6f, 0x64, 0x6f, 0x20, 0x63, 0x6f, 0x6e,
                      0x73, 0x65, 0x71, 0x75, 0x61, 0x74, 0x2e, 0x20,
                      0x44, 0x75, 0x69, 0x73, 0x20, 0x61, 0x75, 0x74,
                      0x65, 0x20, 0x69, 0x72, 0x75, 0x72, 0x65, 0x20,
                      0x64, 0x6f, 0x6c, 0x6f, 0x72, 0x20, 0x69, 0x6e,
                      0x20, 0x72, 0x65, 0x70, 0x72, 0x65, 0x68, 0x65,
                      0x6e, 0x64, 0x65, 0x72, 0x69, 0x74, 0x20, 0x69,
                      0x6e, 0x20, 0x76, 0x6f, 0x6c, 0x75, 0x70, 0x74,
                      0x61, 0x74, 0x65, 0x20, 0x76, 0x65, 0x6c, 0x69,
                      0x74, 0x20, 0x65, 0x73, 0x73, 0x65, 0x20, 0x63,
                      0x69, 0x6c, 0x6c, 0x75, 0x6d, 0x20, 0x64, 0x6f,
                      0x6c, 0x6f, 0x72, 0x65, 0x20, 0x65, 0x75, 0x20,
                      0x66, 0x75, 0x67, 0x69, 0x61, 0x74, 0x20, 0x6e,
                      0x75, 0x6c, 0x6c, 0x61, 0x20, 0x70, 0x61, 0x72,
                      0x69, 0x61, 0x74, 0x75, 0x72, 0x2e, 0x20, 0x45,
                      0x78, 0x63, 0x65, 0x70, 0x74, 0x65, 0x75, 0x72,
                      0x20, 0x73, 0x69, 0x6e, 0x74, 0x20, 0x6f, 0x63,
                      0x63, 0x61, 0x65, 0x63, 0x61, 0x74, 0x20, 0x63,
                      0x75, 0x70, 0x69, 0x64, 0x61, 0x74, 0x61, 0x74,
                      0x20, 0x6e, 0x6f, 0x6e, 0x20, 0x70, 0x72, 0x6f,
                      0x69, 0x64, 0x65, 0x6e, 0x74, 0x2c, 0x20, 0x73,
                      0x75, 0x6e, 0x74, 0x20, 0x69, 0x6e, 0x20, 0x63,
                      0x75, 0x6c, 0x70, 0x61, 0x20, 0x71, 0x75, 0x69,
                      0x20, 0x6f, 0x66, 0x66, 0x69, 0x63, 0x69, 0x61,
                      0x20, 0x64, 0x65, 0x73, 0x65, 0x72, 0x75, 0x6e,
                      0x74, 0x20, 0x6d, 0x6f, 0x6c, 0x6c, 0x69, 0x74,
                      0x20, 0x61, 0x6e, 0x69, 0x6d, 0x20, 0x69, 0x64,
                      0x20, 0x65, 0x73, 0x74, 0x20, 0x6c, 0x61, 0x62,
                      0x6f, 0x72, 0x75, 0x6d, 0x2e]]
      ];

      for (var i = 0; i < tests.length; ++i) {
        var expected = tests[i][0];
        var vector = tests[i][1];
        expect(xxh32.hash(0, vector, 0, vector.length)).to.be.equal(expected);
      }
    });
  });
});
