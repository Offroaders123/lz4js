// Simple hash function, from: http://burtleburtle.net/bob/hash/integer.html.
// Chosen because it doesn't use multiply and achieves full avalanche.
export function hashU32(a: number): number {
    a = a | 0;
    a = a + 2127912214 + (a << 12) | 0;
    a = a ^ -949894596 ^ a >>> 19;
    a = a + 374761393 + (a << 5) | 0;
    a = a + -744332180 ^ a << 9;
    a = a + -42973499 + (a << 3) | 0;
    return a ^ -1252372727 ^ a >>> 16 | 0;
}

// Reads a 64-bit little-endian integer from an array.
export function readU64(b: Uint8Array, n: number): number {
    let x = 0;
    x |= b[n++] << 0;
    x |= b[n++] << 8;
    x |= b[n++] << 16;
    x |= b[n++] << 24;
    x |= b[n++] << 32;
    x |= b[n++] << 40;
    x |= b[n++] << 48;
    x |= b[n++] << 56;
    return x;
}

// Reads a 32-bit little-endian integer from an array.
export function readU32(b: Uint8Array, n: number): number {
    let x = 0;
    x |= b[n++] << 0;
    x |= b[n++] << 8;
    x |= b[n++] << 16;
    x |= b[n++] << 24;
    return x;
}

// Writes a 32-bit little-endian integer from an array.
export function writeU32(b: Uint8Array, n: number, x: number): void {
    b[n++] = (x >> 0) & 0xff;
    b[n++] = (x >> 8) & 0xff;
    b[n++] = (x >> 16) & 0xff;
    b[n++] = (x >> 24) & 0xff;
}