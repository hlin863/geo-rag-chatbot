import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

/**
 * Extracts limits from GEO HTML file as structured key-value rows.
 */
export function extractGeoLimitsFromTable(filePath: string): string[] {
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);
  const rows: string[] = [];

  $('table tr').each((_, row) => {
    const columns = $(row).find('td');
    if (columns.length === 2) {
      const key = $(columns[0]).text().trim().replace(/\s+/g, ' ');
      const value = $(columns[1]).text().trim().replace(/\s+/g, ' ');
      if (key && value) {
        rows.push(`${key}: ${value}`);
      }
    }
  });

  return rows;
}

function getAllHTMLFilePaths(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getAllHTMLFilePaths(fullPath); // recursively search subfolders
    }
    if (entry.isFile() && (entry.name.endsWith('.htm') || entry.name.endsWith('.html'))) {
      return [fullPath];
    }
    return [];
  });

  return files;
}

export function loadHTMLFiles(rootDir: string): string[] {
  const filePaths = getAllHTMLFilePaths(rootDir);

  return filePaths.map(filePath => {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    return $('body').text().replace(/\s+/g, ' ').trim();
  });
}

/**
 * Loads HTML files and prints their cleaned content.
 */
export function printLoadedHTMLContents(rootDir: string): void {
  const filePaths = getAllHTMLFilePaths(rootDir);

  filePaths.forEach(filePath => {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    const extractedText = $('body').text().replace(/\s+/g, ' ').trim();

    console.log(`\n--- ${filePath} ---\n`);
    console.log(extractedText);
  });
}

/**
 * Chunks structured rows into blocks by character length.
 */
export function chunkTextRows(rows: string[], maxLength: number = 500): string[] {
  const chunks: string[] = [];
  let current = '';

  for (const row of rows) {
    if ((current + ' ' + row).length > maxLength) {
      if (current) chunks.push(current.trim());
      current = row;
    } else {
      current += ' ' + row;
    }
  }

  if (current) chunks.push(current.trim());
  return chunks;
}
