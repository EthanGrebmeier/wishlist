import { createRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { z } from "zod";
import { ourFileRouter } from "~/server/uploadthing";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
