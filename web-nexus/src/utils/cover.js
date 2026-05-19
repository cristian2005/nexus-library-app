// Genera una portada SVG inline (data URI) para un libro.
// No requiere servicios externos: funciona siempre, incluso sin internet.

const FALLBACK_COLORS = [
  '#1e5aa8', '#8b4513', '#2c3e50', '#4a2c2a',
  '#3b3b5b', '#005f73', '#6d213c', '#e76f51',
  '#264653', '#8d5524', '#3a5a40', '#6a040f'
];

const hashToColor = (id) => {
  const n = parseInt(id, 10) || 0;
  return FALLBACK_COLORS[Math.abs(n) % FALLBACK_COLORS.length];
};

// Si el API devuelve una URL tipo placehold.co/300x400/1e5aa8/... extraemos el color.
const parseColorFromImage = (imageUrl) => {
  if (!imageUrl) return null;
  const m = imageUrl.match(/\/\d+x\d+\/([0-9a-f]{3,8})\//i);
  return m ? `#${m[1]}` : null;
};

const xmlEscape = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Divide un texto en líneas de ~20 caracteres (máximo 3 líneas).
const wrap = (text, max = 20) => {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > max && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
};

export const generateCover = (book) => {
  const color = parseColorFromImage(book.image) || hashToColor(book.id);
  const titleLines = wrap(book.title || 'Sin título');
  const author = xmlEscape(book.author || '');
  const startY = 170 - ((titleLines.length - 1) * 14);

  const titleSvg = titleLines
    .map((line, i) =>
      `<text x="150" y="${startY + i * 30}" fill="#fff" font-size="22" font-weight="700" text-anchor="middle" font-family="Segoe UI, Tahoma, sans-serif">${xmlEscape(line)}</text>`
    )
    .join('');

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">` +
      `<rect width="100%" height="100%" fill="${color}"/>` +
      `<rect x="18" y="18" width="264" height="364" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" rx="4"/>` +
      `<line x1="60" y1="60" x2="240" y2="60" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>` +
      titleSvg +
      `<line x1="60" y1="300" x2="240" y2="300" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>` +
      `<text x="150" y="325" fill="rgba(255,255,255,0.85)" font-size="14" font-style="italic" text-anchor="middle" font-family="Segoe UI, Tahoma, sans-serif">${author}</text>` +
      `<text x="150" y="365" fill="rgba(255,255,255,0.6)" font-size="11" text-anchor="middle" font-family="Segoe UI, Tahoma, sans-serif">NEXUS · Librería universitaria</text>` +
    `</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
