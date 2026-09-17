// tests/unit/cachedFetch.test.js — Unit tests for Payload encoding/decoding and cache TTL
import { encodePayload, decodePayload, getCached, setCache } from '../../src/utils/cachedFetch.js';

export function runCacheTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  // Test 1: Encode & Decode Object
  const sampleData = { college: 'Guru Nanak College', year: 1970, active: true };
  const encoded = encodePayload(sampleData);
  assert('Payload encoding produces a non-empty string', typeof encoded === 'string' && encoded.length > 0);

  const decoded = decodePayload(encoded);
  assert('Payload decoding restores original object', decoded && decoded.college === sampleData.college && decoded.year === 1970);

  // Test 2: Handle null/empty payload gracefully
  assert('Decode null returns null', decodePayload(null) === null);
  assert('Decode empty string returns null', decodePayload('') === null);

  // Test 3: Array payload encoding/decoding
  const sampleArray = [{ id: 1, name: 'BCA' }, { id: 2, name: 'BBA' }];
  const encodedArr = encodePayload(sampleArray);
  const decodedArr = decodePayload(encodedArr);
  assert('Array payload matches original length and items', Array.isArray(decodedArr) && decodedArr.length === 2 && decodedArr[0].name === 'BCA');

  return results;
}
