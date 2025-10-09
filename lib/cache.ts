import { LRUCache } from "lru-cache";

// Source: LTA Identity Font Typeface.zip in https://github.com/jglim/IdentityFont/issues/3
// LTA Identity.ttf file
// Reason we have to do this: The ttf/woff file hosted in the repo doesn't work with Satori for some
// reasons (probably Satori's fault), but the ttf file uploaded in the issue works fine.
const FONT_URL = "https://r2.joulev.dev/files/v9w4vh2nf0t8mxk71y4zi4xs";

class LTAFontManager {
  private fontCache: ArrayBuffer | null;

  constructor() {
    this.fontCache = null;
  }

  async getFont() {
    if (this.fontCache) return this.fontCache;
    const response = await fetch(FONT_URL);
    this.fontCache = await response.arrayBuffer();
    return this.fontCache;
  }
}
export const ltaFontManager = new LTAFontManager();

export const svgCache = new LRUCache<string, string>({
  max: 1000,
  maxSize: 50_000_000, // 50 MB
  sizeCalculation: (value: string) => value.length,
});
