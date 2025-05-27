import path from 'path';
import { loadHTMLFiles } from '../src/ingestion/htmlLoader';

describe('loadHTMLFiles - Recursive', () => {
  it('should load and extract text from nested HTML files', () => {
    const testDir = path.join(__dirname, 'test-pages');
    const result = loadHTMLFiles(testDir);

    // The result order depends on how files are read — so use toEqual (any order)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Welcome to the Homepage'),
        expect.stringContaining('Understanding AI'),
        expect.stringContaining('impact of AI on modern industry sectors')
      ])
    );

    // Check exact count of HTML files found
    expect(result.length).toBe(3);
  });
});