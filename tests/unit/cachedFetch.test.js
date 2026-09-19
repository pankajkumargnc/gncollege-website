// tests/unit/cachedFetch.test.js — Unit tests for Payload encoding/decoding and cache TTL
import fs from 'fs';
import path from 'path';
import { 
  encodePayload, decodePayload, getCached, setCache, 
  getCacheTimestamp, isCacheOlderThan 
} from '../../src/utils/cachedFetch.js';

export function runCacheTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  // Mock localStorage for Node.js environment if not present
  const memoryStorage = new Map();
  if (typeof globalThis.localStorage === 'undefined') {
    globalThis.localStorage = {
      getItem: (k) => memoryStorage.get(k) || null,
      setItem: (k, v) => memoryStorage.set(k, String(v)),
      removeItem: (k) => memoryStorage.delete(k),
      clear: () => memoryStorage.clear()
    };
  }

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

  // Test 4: Cache timestamp tracking and stale detection
  localStorage.clear();
  assert('getCacheTimestamp returns 0 for uncached collection', getCacheTimestamp('faculties') === 0);
  assert('isCacheOlderThan returns false when no local cache exists', isCacheOlderThan('faculties', Date.now()) === false);

  const pastTs = Date.now() - 60000; // 1 minute ago
  localStorage.setItem('gnc_coll_faculties_ts', String(pastTs));
  assert('getCacheTimestamp retrieves recorded timestamp', getCacheTimestamp('faculties') === pastTs);

  const remoteUpdateNow = Date.now();
  assert('isCacheOlderThan returns true when remote update is newer than local cache', isCacheOlderThan('faculties', remoteUpdateNow) === true);

  const ancientRemoteUpdate = pastTs - 10000;
  assert('isCacheOlderThan returns false when remote update is older than local cache', isCacheOlderThan('faculties', ancientRemoteUpdate) === false);

  // Test 5: Static verification of useAppData.js handling initial snapshot
  const appDataPath = path.resolve(process.cwd(), 'src/hooks/useAppData.js');
  const appDataCode = fs.readFileSync(appDataPath, 'utf8');
  assert('useAppData.js imports isCacheOlderThan', appDataCode.includes('isCacheOlderThan'));
  assert('useAppData.js compares remoteEpoch on initial site_sync snapshot', appDataCode.includes('if (!initialSyncHandled.current)') && appDataCode.includes('isCacheOlderThan'));

  return results;
}
