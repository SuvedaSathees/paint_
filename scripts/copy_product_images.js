const fs = require('fs');
const path = require('path');

const copies = [
  {
    src: 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4edf58ee-db34-46a3-a2b9-3d87bf3dd2fe\\product_waterproofing_bucket_1789137704735.jpg',
    dest: 'd:\\paint\\public\\product-waterproofing.jpg'
  },
  {
    src: 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4edf58ee-db34-46a3-a2b9-3d87bf3dd2fe\\product_paint_rollers_tray_1789137730177.jpg',
    dest: 'd:\\paint\\public\\product-rollers.jpg'
  },
  {
    src: 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4edf58ee-db34-46a3-a2b9-3d87bf3dd2fe\\product_threaded_rods_1789137778944.jpg',
    dest: 'd:\\paint\\public\\product-threaded-rods.jpg'
  }
];

for (const c of copies) {
  if (fs.existsSync(c.src)) {
    fs.copyFileSync(c.src, c.dest);
    console.log(`Copied ${c.src} to ${c.dest}`);
  } else {
    console.warn(`Source not found: ${c.src}`);
  }
}
