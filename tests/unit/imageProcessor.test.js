// tests/unit/imageProcessor.test.js — Unit tests for imageProcessor utility
import { formatBytes, calculateOptimalDimensions } from '../../src/utils/imageProcessor.js';

export function runImageProcessorTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  // Test 1: formatBytes accurately converts byte counts
  assert('formatBytes(0) returns "0 Bytes"', formatBytes(0) === '0 Bytes');
  assert('formatBytes(1024) returns "1 KB"', formatBytes(1024) === '1 KB');
  assert('formatBytes(1024 * 1024) returns "1 MB"', formatBytes(1024 * 1024) === '1 MB');
  assert('formatBytes(1.5 * 1024 * 1024) returns "1.5 MB"', formatBytes(1.5 * 1024 * 1024) === '1.5 MB');
  assert('formatBytes(350 * 1024) returns "350 KB"', formatBytes(350 * 1024) === '350 KB');

  // Test 2: calculateOptimalDimensions scales wide landscape 4K down to 1920 max bounds
  const res4K = calculateOptimalDimensions(3840, 2160, 1920, 1080);
  assert('4K image scales to exactly 1920 width', res4K.width === 1920);
  assert('4K image scales to exactly 1080 height', res4K.height === 1080);

  // Test 3: calculateOptimalDimensions maintains aspect ratio for 4:3 camera photo
  const res4_3 = calculateOptimalDimensions(4000, 3000, 1920, 1080);
  assert('4:3 image width <= 1920', res4_3.width <= 1920);
  assert('4:3 image height <= 1080', res4_3.height <= 1080);
  assert('4:3 image height clamps to 1080', res4_3.height === 1080);
  assert('4:3 image width is 1440', res4_3.width === 1440);

  // Test 4: Preserves smaller images without artificial distortion
  const res720p = calculateOptimalDimensions(1280, 720, 1920, 1080);
  assert('720p image width preserved at 1280', res720p.width === 1280);
  assert('720p image height preserved at 720', res720p.height === 720);

  // Test 5: Ensures even dimensions for video codecs
  const resOdd = calculateOptimalDimensions(1921, 1079, 1920, 1080);
  assert('Dimensions are even integer for width', resOdd.width % 2 === 0);
  assert('Dimensions are even integer for height', resOdd.height % 2 === 0);

  return results;
}
