import { generateSvg } from "./lib/generate-svg";
import indexHtml from "./static/index.html";

const server = Bun.serve({
  routes: {
    "/": indexHtml,
    "/:station": {
      GET: async request => {
        const url = new URL(request.url);
        const station = request.params.station;
        const border = Number.parseInt(url.searchParams.get("border") || "");

        const svg = await generateSvg(station, {
          border: Number.isNaN(border) ? undefined : border,
        });
        return new Response(svg, {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, s-maxage=3600",
          },
        });
      },
      OPTIONS: () => {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
          },
        });
      },
    },
  },
});

console.log(`Serving on port ${server.port}`);
