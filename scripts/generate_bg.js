import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw image data with 0 filter byte for each scanline
  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width * 0.65;
  const cy = height * 0.45;
  const ringRadius = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Distance from glowing red ring center
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Distance from center of ring edge
      const ringDist = Math.abs(dist - ringRadius);
      const ringGlow = Math.exp(-ringDist / 24) * 0.9 + Math.exp(-ringDist / 85) * 0.4;

      // Volcanic rock terrain base gradient
      const terrainHeight = height * 0.6 + Math.sin(x * 0.015) * 35 + Math.cos(x * 0.04) * 15;
      const isTerrain = y > terrainHeight;
      const terrainGradient = isTerrain ? (y - terrainHeight) / (height - terrainHeight) : 0;

      // Red lava veins
      let lavaGlow = 0;
      if (isTerrain) {
        const noise = Math.sin(x * 0.08 + y * 0.04) * Math.cos(x * 0.03 - y * 0.07);
        if (noise > 0.65) {
          lavaGlow = (noise - 0.65) * 3.0;
        }
      }

      // Ambient radial dark gradient
      const ambientDist = Math.sqrt(Math.pow((x - cx) / width, 2) + Math.pow((y - cy) / height, 2));
      const ambientRed = Math.max(0, 1 - ambientDist * 1.8) * 0.35;

      let r = Math.min(255, Math.floor((ringGlow * 255 * 0.95) + (ambientRed * 180) + (lavaGlow * 255) + (isTerrain ? 12 : 5)));
      let g = Math.min(255, Math.floor((ringGlow * 30) + (lavaGlow * 35) + (isTerrain ? 8 : 4)));
      let b = Math.min(255, Math.floor((ringGlow * 25) + (lavaGlow * 20) + (isTerrain ? 10 : 7)));
      let a = 255;

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const buffer = Buffer.alloc(length + 12);
  buffer.writeUInt32BE(length, 0);
  buffer.write(type, 4, 4, 'ascii');
  data.copy(buffer, 8);

  const crc = crc32(buffer.subarray(4, length + 8));
  buffer.writeInt32BE(crc, length + 8);
  return buffer;
}

// Simple CRC-32 implementation
function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    crc = crc ^ byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
    }
  }
  return crc ^ -1;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating /public/bg.png (1920x1080)...');
const pngBuffer = createPng(1920, 1080);
fs.writeFileSync(path.join(publicDir, 'bg.png'), pngBuffer);
fs.writeFileSync(path.resolve('bg.png'), pngBuffer);
console.log('Successfully written bg.png to /public/bg.png and /bg.png');
