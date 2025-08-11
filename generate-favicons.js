// generate-favicons.js
// Script to generate favicon files from Chinese character using the Zhi Mang Xing font

const fs = require('fs');
const { createCanvas, registerFont } = require('canvas');
const path = require('path');

// Character to use for favicon
const CHARACTER = '汉'; // "Han" meaning "Chinese"

// Register the Zhi Mang Xing font for use with Canvas
registerFont(path.join(__dirname, 'fonts', 'ZhiMangXing-Regular.ttf'), { family: 'Zhi Mang Xing' });

// Function to generate PNG favicon
function generatePNG(size, outputPath) {
  // Create a square canvas
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill background with dark red (#8B0000)
  ctx.fillStyle = '#8B0000';
  ctx.fillRect(0, 0, size, size);
  
  // Set text properties
  ctx.font = `${size * 0.8}px 'Zhi Mang Xing'`;
  ctx.fillStyle = '#FFFFFF'; // White color
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw character centered
  ctx.fillText(CHARACTER, size / 2, size / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated PNG favicon: ${outputPath}`);
}

// Generate favicons of different sizes
function generateFavicons() {
  console.log('Generating favicons with character: ' + CHARACTER);
  console.log('Background: Dark Red (#8B0000), Character: White');
  
  // Generate PNG favicons
  generatePNG(16, 'favicons/favicon-16x16.png');
  generatePNG(32, 'favicons/favicon-32x32.png');
  generatePNG(64, 'favicons/favicon-64x64.png');
  generatePNG(128, 'favicons/favicon-128x128.png');
  
  console.log('Favicon generation complete!');
}

// Run the favicon generation
generateFavicons();