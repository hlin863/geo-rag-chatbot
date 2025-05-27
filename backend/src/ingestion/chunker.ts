export function splitTextIntoChunks(text: string, maxLength: number = 500): string[] {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      chunks.push(current);
      current = '';
    }
    current += sentence;
  }

  if (current) chunks.push(current);
  return chunks;
}
