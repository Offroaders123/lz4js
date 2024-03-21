/* eslint-env node, mocha */
import { expect } from 'chai';
import * as lz4 from '../../src/lz4.js';

describe('lz4', function () {
  describe('#decompress', function () {
    it('should decompress empty lz4 Array correctly', function () {
      var emptyLz4 = [4, 34, 77, 24, 64, 112, 223, 0, 0, 0, 0] as Uint8Array;
      expect(lz4.decompress(emptyLz4)).to.be.deep.equal(new Uint8Array(0));
    });

    it('should decompress empty lz4 Uint8Array correctly', function () {
      var emptyLz4 = new Uint8Array([4, 34, 77, 24, 64, 112, 223, 0, 0, 0, 0]);
      expect(lz4.decompress(emptyLz4)).to.be.deep.equal(new Uint8Array(0));
    });

    it('should decompress data compressed with lz4c', function () {
      var output = new Uint8Array([
        0x54, 0x68, 0x65, 0x20, 0x77, 0x68, 0x6f, 0x6c,
        0x65, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x20,
        0x69, 0x73, 0x20, 0x65, 0x6e, 0x64, 0x69, 0x6e,
        0x67, 0x2e, 0x0a
      ]);
      var input = new Uint8Array([
        0x04, 0x22, 0x4d, 0x18, 0x64, 0x40, 0xa7, 0x1b,
        0x00, 0x00, 0x80, 0x54, 0x68, 0x65, 0x20, 0x77,
        0x68, 0x6f, 0x6c, 0x65, 0x20, 0x77, 0x6f, 0x72,
        0x6c, 0x64, 0x20, 0x69, 0x73, 0x20, 0x65, 0x6e,
        0x64, 0x69, 0x6e, 0x67, 0x2e, 0x0a, 0x00, 0x00,
        0x00, 0x00, 0xbc, 0xa8, 0x6b, 0xc5
      ]);
      expect(lz4.decompress(input)).to.be.deep.equal(output);
    });

    it('should decompress data compressed with lz4c (2)', function () {
      var output = new Uint8Array([
        0x49, 0x20, 0x66, 0x69, 0x6e, 0x64, 0x20, 0x69, 0x74, 0x20, 0x68, 0x61,
        0x72, 0x64, 0x20, 0x74, 0x6f, 0x20, 0x74, 0x65, 0x6c, 0x6c, 0x20, 0x79,
        0x6f, 0x75, 0x0a, 0x49, 0x20, 0x66, 0x69, 0x6e, 0x64, 0x20, 0x69, 0x74,
        0x20, 0x68, 0x61, 0x72, 0x64, 0x20, 0x74, 0x6f, 0x20, 0x74, 0x61, 0x6b,
        0x65, 0x0a, 0x57, 0x68, 0x65, 0x6e, 0x20, 0x70, 0x65, 0x6f, 0x70, 0x6c,
        0x65, 0x20, 0x72, 0x75, 0x6e, 0x20, 0x69, 0x6e, 0x20, 0x63, 0x69, 0x72,
        0x63, 0x6c, 0x65, 0x73, 0x0a, 0x49, 0x74, 0x27, 0x73, 0x20, 0x61, 0x20,
        0x76, 0x65, 0x72, 0x79, 0x2c, 0x20, 0x76, 0x65, 0x72, 0x79, 0x20, 0x6d,
        0x61, 0x64, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x2c, 0x20, 0x6d, 0x61,
        0x64, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x0a
      ]);
      var input = new Uint8Array([
        0x04, 0x22, 0x4d, 0x18, 0x64, 0x40, 0xa7, 0x67, 0x00, 0x00, 0x00, 0xff,
        0x0c, 0x49, 0x20, 0x66, 0x69, 0x6e, 0x64, 0x20, 0x69, 0x74, 0x20, 0x68,
        0x61, 0x72, 0x64, 0x20, 0x74, 0x6f, 0x20, 0x74, 0x65, 0x6c, 0x6c, 0x20,
        0x79, 0x6f, 0x75, 0x0a, 0x1b, 0x00, 0x00, 0xf1, 0x1c, 0x61, 0x6b, 0x65,
        0x0a, 0x57, 0x68, 0x65, 0x6e, 0x20, 0x70, 0x65, 0x6f, 0x70, 0x6c, 0x65,
        0x20, 0x72, 0x75, 0x6e, 0x20, 0x69, 0x6e, 0x20, 0x63, 0x69, 0x72, 0x63,
        0x6c, 0x65, 0x73, 0x0a, 0x49, 0x74, 0x27, 0x73, 0x20, 0x61, 0x20, 0x76,
        0x65, 0x72, 0x79, 0x2c, 0x06, 0x00, 0xf0, 0x07, 0x20, 0x6d, 0x61, 0x64,
        0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x2c, 0x20, 0x6d, 0x61, 0x64, 0x20,
        0x77, 0x6f, 0x72, 0x6c, 0x64, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x24, 0x2a,
        0xaf, 0xb9
      ]);
      expect(lz4.decompress(input)).to.be.deep.equal(output);
    });

    it('should decompress data containing content-size', function () {
      var output = new Uint8Array([
        0x49, 0x66, 0x20, 0x79, 0x6f, 0x75, 0x20, 0x22,
        0x77, 0x69, 0x6e, 0x2c, 0x22, 0x20, 0x79, 0x6f,
        0x75, 0x20, 0x77, 0x6f, 0x6e, 0x27, 0x74, 0x20,
        0x77, 0x61, 0x6e, 0x74, 0x20, 0x74, 0x6f, 0x20,
        0x22, 0x70, 0x6c, 0x61, 0x79, 0x22, 0x20, 0x77,
        0x69, 0x74, 0x68, 0x20, 0x6d, 0x65, 0x20, 0x61,
        0x6e, 0x79, 0x6d, 0x6f, 0x72, 0x65, 0x2e, 0x0a
      ]);
      var input = new Uint8Array([
        0x04, 0x22, 0x4d, 0x18, 0x6c, 0x40, 0x38, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x58, 0x38,
        0x00, 0x00, 0x80, 0x49, 0x66, 0x20, 0x79, 0x6f,
        0x75, 0x20, 0x22, 0x77, 0x69, 0x6e, 0x2c, 0x22,
        0x20, 0x79, 0x6f, 0x75, 0x20, 0x77, 0x6f, 0x6e,
        0x27, 0x74, 0x20, 0x77, 0x61, 0x6e, 0x74, 0x20,
        0x74, 0x6f, 0x20, 0x22, 0x70, 0x6c, 0x61, 0x79,
        0x22, 0x20, 0x77, 0x69, 0x74, 0x68, 0x20, 0x6d,
        0x65, 0x20, 0x61, 0x6e, 0x79, 0x6d, 0x6f, 0x72,
        0x65, 0x2e, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x9f,
        0xda, 0xad, 0x19
      ]);
      expect(lz4.decompress(input)).to.be.deep.equal(output);
    });

    it('should fail on bad header magic', function () {
      var input = new Uint8Array([5, 34, 77, 24, 64, 112, 223, 0, 0, 0, 0]);
      var fn = function () { return lz4.decompress(input); };
      expect(fn).to.throw(/invalid magic number/);
    });

    it('should fail on bad block size', function () {
      var input = new Uint8Array([4, 34, 77, 24, 64, 0, 223, 0, 0, 0, 0]);
      var fn = function () { return lz4.decompress(input); };
      expect(fn).to.throw(/invalid block size/);
    });
  });

  describe('#decompressBlock', function () {
    it('should pass the Linux kernel lz4 test vector', function () {
      // This test comes from the Linux kernel, crypto/testmgr.h.
      // It is the string, "Join us now and share the software ",
      // repeated twice. It is probably quoting Richard Stallman's
      // "Free Software Song." Lz4 is used in the Linux kernel to
      // compress kernel images.
      var linuxTestIn = new Uint8Array([
        0xf0, 0x10, 0x4a, 0x6f, 0x69, 0x6e, 0x20, 0x75,
        0x73, 0x20, 0x6e, 0x6f, 0x77, 0x20, 0x61, 0x6e,
        0x64, 0x20, 0x73, 0x68, 0x61, 0x72, 0x65, 0x20,
        0x74, 0x68, 0x65, 0x20, 0x73, 0x6f, 0x66, 0x74,
        0x77, 0x0d, 0x00, 0x0f, 0x23, 0x00, 0x0b, 0x50,
        0x77, 0x61, 0x72, 0x65, 0x20
      ]);
      var linuxTestOut = new Uint8Array([
        0x4a, 0x6f, 0x69, 0x6e, 0x20, 0x75, 0x73, 0x20,
        0x6e, 0x6f, 0x77, 0x20, 0x61, 0x6e, 0x64, 0x20,
        0x73, 0x68, 0x61, 0x72, 0x65, 0x20, 0x74, 0x68,
        0x65, 0x20, 0x73, 0x6f, 0x66, 0x74, 0x77, 0x61,
        0x72, 0x65, 0x20, 0x4a, 0x6f, 0x69, 0x6e, 0x20,
        0x75, 0x73, 0x20, 0x6e, 0x6f, 0x77, 0x20, 0x61,
        0x6e, 0x64, 0x20, 0x73, 0x68, 0x61, 0x72, 0x65,
        0x20, 0x74, 0x68, 0x65, 0x20, 0x73, 0x6f, 0x66,
        0x74, 0x77, 0x61, 0x72, 0x65, 0x20
      ]);
      var testOut = new Uint8Array(70);

      lz4.decompressBlock(linuxTestIn, testOut, 0, 45, 0);
      expect(testOut).to.be.deep.equal(linuxTestOut);
    });
  });

  describe('#compress', function () {
    it('should compress empty Array correctly', function () {
      var emptyLz4 = new Uint8Array([4, 34, 77, 24, 64, 112, 223, 0, 0, 0, 0]);
      expect(lz4.compress([] as Uint8Array)).to.be.deep.equal(emptyLz4);
    });

    it('should compress empty Uint8Array correctly', function () {
      var emptyLz4 = new Uint8Array([4, 34, 77, 24, 64, 112, 223, 0, 0, 0, 0]);
      expect(lz4.compress(new Uint8Array(0))).to.be.deep.equal(emptyLz4);
    });

    it('should output pseudo RLE', function () {
      var input = new Uint8Array([
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]);
      var output = new Uint8Array([
        0x04, 0x22, 0x4D, 0x18, 0x40, 0x70, 0xDF, 0x0B,
        0x00, 0x00, 0x00, 0x1F, 0x00, 0x01, 0x00, 0x07,
        0x50, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00
      ]);
      expect(lz4.compress(input)).to.be.deep.equal(output);
    });

    it('should find matches', function () {
      var input = new Uint8Array([
        0x74, 0x65, 0x73, 0x74, 0x74, 0x65, 0x73, 0x74,
        0x74, 0x65, 0x73, 0x74, 0x74, 0x65, 0x73, 0x74,
        0x74, 0x65, 0x73, 0x74, 0x74, 0x65, 0x73, 0x74,
        0x74, 0x65, 0x73, 0x74, 0x74, 0x65, 0x73, 0x74
      ]);

      // Psuedo-RLE describes when the length is greater than the offset,
      // i.e. the match goes beyond the cursor. This seems like non-sense, but
      // it works because this only occurs if there's a repeating pattern that
      // repeats _before_ the cursor - the match matches itself.
      var output = new Uint8Array([
        0x04, 0x22, 0x4d, 0x18, 0x40, 0x70, 0xDF, 0x0E,
        0x00, 0x00, 0x00, 0x4F, 0x74, 0x65, 0x73, 0x74,
        0x04, 0x00, 0x04, 0x50, 0x74, 0x74, 0x65, 0x73,
        0x74, 0x00, 0x00, 0x00, 0x00
      ]);

      expect(lz4.compress(input)).to.be.deep.equal(output);
    });

    it('should use maxSize', function () {
      var emptyLz4 = new Uint8Array([4, 34, 77, 24, 64, 112, 223, 0]);
      expect(lz4.compress([] as Uint8Array, 8)).to.be.deep.equal(emptyLz4);
    });

    it('should not compress uncompressible data', function () {
      var input = new Uint8Array([
        0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
        0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
        0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
        0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F
      ]);

      // Make note of the 0x80000020 frame size - that last bit marks it
      // as being uncompressed.
      var output = new Uint8Array([
        0x04, 0x22, 0x4d, 0x18, 0x40, 0x70, 0xdf, 0x20,
        0x00, 0x00, 0x80, 0x00, 0x01, 0x02, 0x03, 0x04,
        0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c,
        0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14,
        0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c,
        0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x00
      ]);

      expect(lz4.compress(input)).to.be.deep.equal(output);
    });
  });

  describe('#compressBlock', function () {
    it('should be able to output over 15 literals at end', function () {
      var input = new Uint8Array([
        0x4a, 0x6f, 0x69, 0x6e, 0x20, 0x75, 0x73, 0x20,
        0x6e, 0x6f, 0x77, 0x20, 0x61, 0x6e, 0x64, 0x20,
        0x73, 0x68, 0x61, 0x72, 0x65, 0x20, 0x74, 0x68,
        0x65, 0x20, 0x73, 0x6f, 0x66, 0x74, 0x77, 0x61,
        0x72, 0x65, 0x20, 0x4a, 0x6f, 0x69, 0x6e, 0x20,
        0x75, 0x73, 0x20, 0x6e, 0x6f, 0x77, 0x20, 0x61,
        0x6e, 0x64, 0x20, 0x73, 0x68, 0x61, 0x72, 0x65,
        0x20, 0x74, 0x68, 0x65, 0x20, 0x73, 0x6f, 0x66,
        0x74, 0x77, 0x61, 0x72, 0x65, 0x20, 0x01, 0x02,
        0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10,
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18
      ]);
      var output = new Uint8Array([
        0xf0, 0x10, 0x4a, 0x6f, 0x69, 0x6e, 0x20, 0x75,
        0x73, 0x20, 0x6e, 0x6f, 0x77, 0x20, 0x61, 0x6e,
        0x64, 0x20, 0x73, 0x68, 0x61, 0x72, 0x65, 0x20,
        0x74, 0x68, 0x65, 0x20, 0x73, 0x6f, 0x66, 0x74,
        0x77, 0x0d, 0x00, 0x0f, 0x23, 0x00, 0x10, 0xf0,
        0x03, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
        0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15,
        0x16, 0x17, 0x18
      ]);
      var testOut = new Uint8Array(59);
      var sz;

      sz = lz4.compressBlock(input, testOut, 0, input.length, new Uint8Array(1 << 16));

      expect(sz).to.be.equal(59);
      expect(testOut).to.be.deep.equal(output);
    });
  });
});