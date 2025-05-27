import path from 'path';
import { printLoadedHTMLContents } from '../ingestion/htmlLoader';

const htmlDir = path.join(__dirname, '../../tests/test-pages');

console.log(`📂 Printing contents from: ${htmlDir}`);
printLoadedHTMLContents(htmlDir);