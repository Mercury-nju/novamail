// Cloudflare Pages Functions middleware for Next.js API routes
export async function onRequest(context) {
  const { request, next, env } = context;
  
  // Handle API routes
  if (request.url.includes('/api/')) {
    // Forward to Next.js API routes
    return next();
  }
  
  // Handle other requests normally
  return next();
}
