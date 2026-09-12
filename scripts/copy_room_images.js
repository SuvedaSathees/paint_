import fs from 'node:fs';
import path from 'node:path';

const srcBefore = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4edf58ee-db34-46a3-a2b9-3d87bf3dd2fe/akshara_before_room_1789102433546.jpg';
const srcAfter = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4edf58ee-db34-46a3-a2b9-3d87bf3dd2fe/akshara_after_room_1789102461368.jpg';

const destBefore = path.resolve('public/akshara-before-room.jpg');
const destAfter = path.resolve('public/akshara-after-room.jpg');

fs.copyFileSync(srcBefore, destBefore);
console.log('Copied before room image to:', destBefore);

fs.copyFileSync(srcAfter, destAfter);
console.log('Copied after room image to:', destAfter);
