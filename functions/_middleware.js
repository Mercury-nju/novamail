// Cloudflare Pages Functions middleware for Next.js API routes
export function onRequest(context) {
  var request = context.request;
  var next = context.next;
  var env = context.env;
  
  // Handle API routes
  if (request.url.indexOf('/api/') !== -1) {
    // Forward to Next.js API routes
    return next();
  }
  
  // Handle other requests normally
  return next();
}
